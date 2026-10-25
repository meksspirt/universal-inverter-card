import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const BUNDLE_PATH = path.join(ROOT_DIR, 'dist', 'aninerel-power-card.js');
const ENV_PATH = path.join(ROOT_DIR, '.env');

// Load local .env file if present (zero external dependencies)
if (fs.existsSync(ENV_PATH)) {
  if (typeof process.loadEnvFile === 'function') {
    process.loadEnvFile(ENV_PATH);
  } else {
    const envLines = fs.readFileSync(ENV_PATH, 'utf-8').split(/\r?\n/);
    for (const line of envLines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx > 0) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim();
        if (!process.env[key]) process.env[key] = val;
      }
    }
  }
}

const HA_SHARE = process.env.HA_SHARE || '';
const WS_URL = process.env.WS_URL || '';
const HA_TOKEN = process.env.HA_TOKEN || '';

async function deploy() {
  if (!fs.existsSync(BUNDLE_PATH)) {
    console.error(`Build artifact not found at ${BUNDLE_PATH}. Please run 'npm run build' first.`);
    process.exit(1);
  }

  const jsContent = fs.readFileSync(BUNDLE_PATH);
  console.log(`📦 Bundled file size: ${(jsContent.length / 1024).toFixed(1)} KB`);

  // Copy to repository root for release/HACS
  fs.writeFileSync(path.join(ROOT_DIR, 'universal-inverter-card.js'), jsContent);
  fs.writeFileSync(path.join(ROOT_DIR, 'aninerel-power-card.js'), jsContent);

  // 1. Copy bundle and gzip to HA Samba share
  if (HA_SHARE) {
    try {
      const files = ['aninerel-power-card.js', 'universal-inverter-card.js'];
      for (const fileName of files) {
        const destJs = path.join(HA_SHARE, fileName);
        const destGz = path.join(HA_SHARE, `${fileName}.gz`);
        fs.writeFileSync(destJs, jsContent);
        const gzContent = zlib.gzipSync(jsContent, { level: 9 });
        fs.writeFileSync(destGz, gzContent);
        console.log(`✅ Files written to HA Samba share: ${destJs}`);
        console.log(`✅ Gzip archive created: ${destGz} (${(gzContent.length / 1024).toFixed(1)} KB)`);
      }
    } catch (err) {
      console.warn(`⚠️ Samba share copy failed (${err.message}). Skipping file copy.`);
    }
  } else {
    console.log('ℹ️ HA_SHARE not set in .env, skipping Samba file copy.');
  }

  // 2. Bump Lovelace resource cache buster in Home Assistant
  if (WS_URL && HA_TOKEN) {
    console.log('🔄 Updating Lovelace resource cache buster via WebSocket...');
    await new Promise((resolve) => {
      const ws = new WebSocket(WS_URL);
      let msgId = 1;
      let resourceId = null;
      let currentUrl = '';

      const timer = setTimeout(() => {
        console.warn('⚠️ WebSocket update timed out.');
        ws.close();
        resolve();
      }, 10000);

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.type === 'auth_required') {
          ws.send(JSON.stringify({ type: 'auth', access_token: HA_TOKEN }));
        } else if (msg.type === 'auth_ok') {
          ws.send(JSON.stringify({ id: msgId++, type: 'lovelace/resources' }));
        } else if (msg.type === 'result') {
          if (!resourceId && Array.isArray(msg.result)) {
            const res = msg.result.find((r) => r.url && (r.url.includes('aninerel-power-card') || r.url.includes('universal-inverter-card')));
            if (res) {
              resourceId = res.id;
              currentUrl = res.url.split('?')[0];
              const newTag = Date.now();
              const newUrl = `${currentUrl}?v=${newTag}`;
              console.log(`📌 Found resource (${resourceId}: ${res.url}). Updating URL to ${newUrl}...`);
              ws.send(
                JSON.stringify({
                  id: msgId++,
                  type: 'lovelace/resources/update',
                  resource_id: resourceId,
                  url: newUrl,
                  res_type: 'module',
                })
              );
            } else {
              console.warn('⚠️ Card resource not found in Lovelace resources.');
              clearTimeout(timer);
              ws.close();
              resolve();
            }
          } else {
            if (msg.success) {
              console.log('🎉 Lovelace cache buster updated! All browsers will load the new version immediately.');
            } else {
              console.warn('⚠️ Resource update failed:', msg.error);
            }
            clearTimeout(timer);
            ws.close();
            resolve();
          }
        }
      };

      ws.onerror = (err) => {
        console.warn('⚠️ WebSocket error:', err.message);
        clearTimeout(timer);
        resolve();
      };
    });
  } else {
    console.log('ℹ️ WS_URL or HA_TOKEN not set in .env, skipping WebSocket cache buster update.');
  }

  console.log('✨ Deployment finished successfully!');
}

deploy();
