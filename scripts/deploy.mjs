import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const BUNDLE_PATH = path.join(ROOT_DIR, 'dist', 'aninerel-power-card.js');

const HA_SHARE = '\\\\192.168.0.137\\config\\www\\community\\aninerel-power-card';
const WS_URL = 'wss://meksspirt.pp.ua/api/websocket';
const HA_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIxMjBiNTExMzk5MzU0OWIwYmIyYjcwMWFiOWQzMzI1NyIsImlhdCI6MTc4OTA1NzkzNiwiZXhwIjoyMTA0NDE3OTM2fQ.W5Fa0zuuPsxI70S2X72hpfTy_iYeg7Sptl8Xb8jqf7E';

async function deploy() {
  if (!fs.existsSync(BUNDLE_PATH)) {
    console.error(`Build artifact not found at ${BUNDLE_PATH}. Please run 'npm run build' first.`);
    process.exit(1);
  }

  const jsContent = fs.readFileSync(BUNDLE_PATH);
  console.log(`📦 Bundled file size: ${(jsContent.length / 1024).toFixed(1)} KB`);

  // Copy to repository root for release/HACS
  fs.writeFileSync(path.join(ROOT_DIR, 'aninerel-power-card.js'), jsContent);

  // 1. Copy bundle and gzip to HA Samba share
  try {
    const destJs = path.join(HA_SHARE, 'aninerel-power-card.js');
    const destGz = path.join(HA_SHARE, 'aninerel-power-card.js.gz');

    fs.writeFileSync(destJs, jsContent);
    const gzContent = zlib.gzipSync(jsContent, { level: 9 });
    fs.writeFileSync(destGz, gzContent);
    console.log(`✅ Files written to HA Samba share: ${destJs}`);
    console.log(`✅ Gzip archive created: ${destGz} (${(gzContent.length / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.warn(`⚠️ Samba share copy failed (${err.message}). Skipping file copy.`);
  }

  // 2. Bump Lovelace resource cache buster in Home Assistant
  console.log('🔄 Updating Lovelace resource cache buster via WebSocket...');
  await new Promise((resolve) => {
    const ws = new WebSocket(WS_URL);
    let msgId = 1;
    let resourceId = null;

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
          const res = msg.result.find(r => r.url && r.url.includes('aninerel-power-card'));
          if (res) {
            resourceId = res.id;
            const newTag = Date.now();
            const newUrl = `/hacsfiles/aninerel-power-card/aninerel-power-card.js?v=${newTag}`;
            console.log(`📌 Found resource (${resourceId}). Updating URL to ${newUrl}...`);
            ws.send(JSON.stringify({
              id: msgId++,
              type: 'lovelace/resources/update',
              resource_id: resourceId,
              url: newUrl,
              res_type: 'module',
            }));
          } else {
            console.warn('⚠️ Aninerel power card resource not found in Lovelace resources.');
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

  console.log('✨ Deployment finished successfully!');
}

deploy();
