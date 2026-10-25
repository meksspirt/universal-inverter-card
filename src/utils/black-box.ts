import { getFaultDetail, getWarningDetail } from './fault-codes';
import { NominalSystemVoltage } from './system-profile';

export type BlackBoxEventType =
  | 'fault'
  | 'warning'
  | 'peak_surge'
  | 'voltage_sag'
  | 'grid_outage'
  | 'grid_restored'
  | 'cell_imbalance';

export type BlackBoxSeverity = 'critical' | 'warning' | 'info' | 'success';

export interface BlackBoxEvent {
  id: string;
  timestamp: number;
  type: BlackBoxEventType;
  severity: BlackBoxSeverity;
  code?: string;
  titleRu: string;
  titleEn: string;
  metricsText: string;
}

export interface BlackBoxExtremes {
  peakLoadWatts: number | null;
  peakLoadTime: number | null;
  minBatteryVoltage: number | null;
  minBatteryVoltageLoad: number | null;
  minBatteryVoltageTime: number | null;
  maxBatteryCurrent: number | null;
  maxBatteryCurrentTime: number | null;
  maxInverterTemp: number | null;
  maxInverterTempTime: number | null;
}

export interface BlackBoxState {
  extremes: BlackBoxExtremes;
  events: BlackBoxEvent[];
  lastGridOnline?: boolean;
}

export interface BlackBoxSample {
  cardKey: string;
  systemVoltage: NominalSystemVoltage;
  maxPower: number;
  loadWatts: number;
  batteryVoltage: number | null;
  batteryCurrent: number | null;
  gridVoltage: number | null;
  inverterTemp: number | null;
  cellDeltaMv: number | null;
  isFault: boolean;
  faultCode: number | null;
  isWarning: boolean;
  warningCode: number | null;
}

const STORAGE_PREFIX = 'uic_blackbox_v1_';
const MAX_EVENTS = 12;
const COOLDOWN_MS = 10 * 60 * 1000; // 10 minutes cooldown for same event signature

const memoryStore = new Map<string, BlackBoxState>();
const cooldownMap = new Map<string, number>();

function createEmptyState(): BlackBoxState {
  return {
    extremes: {
      peakLoadWatts: null,
      peakLoadTime: null,
      minBatteryVoltage: null,
      minBatteryVoltageLoad: null,
      minBatteryVoltageTime: null,
      maxBatteryCurrent: null,
      maxBatteryCurrentTime: null,
      maxInverterTemp: null,
      maxInverterTempTime: null,
    },
    events: [],
    lastGridOnline: undefined,
  };
}

export function loadBlackBoxState(cardKey: string): BlackBoxState {
  if (memoryStore.has(cardKey)) {
    return memoryStore.get(cardKey)!;
  }
  try {
    if (typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem(STORAGE_PREFIX + cardKey);
      if (raw) {
        const parsed = JSON.parse(raw) as BlackBoxState;
        if (parsed && parsed.extremes && Array.isArray(parsed.events)) {
          memoryStore.set(cardKey, parsed);
          return parsed;
        }
      }
    }
  } catch {
    // Ignore storage security/quota errors
  }
  const initial = createEmptyState();
  memoryStore.set(cardKey, initial);
  return initial;
}

function saveBlackBoxState(cardKey: string, state: BlackBoxState): void {
  memoryStore.set(cardKey, state);
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_PREFIX + cardKey, JSON.stringify(state));
    }
  } catch {
    // Ignore quota errors
  }
}

export function clearBlackBoxState(cardKey: string): BlackBoxState {
  const fresh = createEmptyState();
  saveBlackBoxState(cardKey, fresh);
  for (const key of cooldownMap.keys()) {
    if (key.startsWith(`${cardKey}:`)) {
      cooldownMap.delete(key);
    }
  }
  return fresh;
}

function canLogEvent(cardKey: string, signature: string, now: number, cooldownMs = COOLDOWN_MS): boolean {
  const fullKey = `${cardKey}:${signature}`;
  const lastTime = cooldownMap.get(fullKey) || 0;
  if (now - lastTime < cooldownMs) {
    return false;
  }
  cooldownMap.set(fullKey, now);
  return true;
}

function pushEvent(state: BlackBoxState, event: BlackBoxEvent): void {
  // Avoid consecutive identical type+code at top of stack within 60s
  const top = state.events[0];
  if (
    top &&
    top.type === event.type &&
    top.code === event.code &&
    event.timestamp - top.timestamp < 60000
  ) {
    top.metricsText = event.metricsText;
    top.timestamp = event.timestamp;
    return;
  }
  state.events.unshift(event);
  if (state.events.length > MAX_EVENTS) {
    state.events.length = MAX_EVENTS;
  }
}

/**
 * Inspects live telemetry sample, updates extremes, and captures transient events/faults.
 */
export function recordBlackBoxSample(sample: BlackBoxSample): BlackBoxState {
  const {
    cardKey,
    systemVoltage,
    maxPower,
    loadWatts,
    batteryVoltage,
    batteryCurrent,
    gridVoltage,
    inverterTemp,
    cellDeltaMv,
    isFault,
    faultCode,
    isWarning,
    warningCode,
  } = sample;

  const state = loadBlackBoxState(cardKey);
  const now = Date.now();
  let dirty = false;

  const ext = state.extremes;

  // 1. Update Extremes
  if (loadWatts > 10 && (ext.peakLoadWatts === null || loadWatts > ext.peakLoadWatts)) {
    ext.peakLoadWatts = Math.round(loadWatts);
    ext.peakLoadTime = now;
    dirty = true;
  }

  if (
    batteryVoltage !== null &&
    batteryVoltage > 5 &&
    (ext.minBatteryVoltage === null || batteryVoltage < ext.minBatteryVoltage)
  ) {
    ext.minBatteryVoltage = Number(batteryVoltage.toFixed(2));
    ext.minBatteryVoltageLoad = Math.round(loadWatts);
    ext.minBatteryVoltageTime = now;
    dirty = true;
  }

  if (batteryCurrent !== null) {
    const absCur = Math.abs(batteryCurrent);
    if (absCur > 0.5 && (ext.maxBatteryCurrent === null || absCur > ext.maxBatteryCurrent)) {
      ext.maxBatteryCurrent = Number(absCur.toFixed(1));
      ext.maxBatteryCurrentTime = now;
      dirty = true;
    }
  }

  if (
    inverterTemp !== null &&
    inverterTemp > 5 &&
    (ext.maxInverterTemp === null || inverterTemp > ext.maxInverterTemp)
  ) {
    ext.maxInverterTemp = Math.round(inverterTemp);
    ext.maxInverterTempTime = now;
    dirty = true;
  }

  // Helper to build telemetry snapshot string
  const buildSnapshot = (): string => {
    const parts: string[] = [];
    if (loadWatts > 0) parts.push(`${Math.round(loadWatts)}W`);
    if (batteryVoltage !== null && batteryVoltage > 0) parts.push(`${batteryVoltage.toFixed(1)}V`);
    if (batteryCurrent !== null && Math.abs(batteryCurrent) > 0.5) {
      parts.push(`${batteryCurrent > 0 ? '+' : ''}${batteryCurrent.toFixed(1)}A`);
    }
    return parts.join(' • ');
  };

  // 2. Capture Inverter Faults (Even 1-second transient faults)
  if (isFault || (faultCode !== null && faultCode > 0)) {
    const codeNum = faultCode ?? 0;
    const sig = `fault:${codeNum}`;
    if (canLogEvent(cardKey, sig, now, 3 * 60 * 1000)) {
      const descRu = codeNum > 0 ? getFaultDetail(codeNum, null, 'ru').title : 'Аварийный сбой инвертора';
      const descEn = codeNum > 0 ? getFaultDetail(codeNum, null, 'en').title : 'Inverter Fault Active';
      pushEvent(state, {
        id: `${now}-fault`,
        timestamp: now,
        type: 'fault',
        severity: 'critical',
        code: codeNum > 0 ? `F${String(codeNum).padStart(2, '0')}` : 'FAULT',
        titleRu: descRu,
        titleEn: descEn,
        metricsText: buildSnapshot(),
      });
      dirty = true;
    }
  }

  // 3. Capture Inverter Warnings
  if (isWarning && warningCode !== null && warningCode > 0) {
    const sig = `warn:${warningCode}`;
    if (canLogEvent(cardKey, sig, now, 5 * 60 * 1000)) {
      const descRu = getWarningDetail(warningCode, null, 'ru').title;
      const descEn = getWarningDetail(warningCode, null, 'en').title;
      pushEvent(state, {
        id: `${now}-warn`,
        timestamp: now,
        type: 'warning',
        severity: 'warning',
        code: `W${String(warningCode).padStart(2, '0')}`,
        titleRu: descRu,
        titleEn: descEn,
        metricsText: buildSnapshot(),
      });
      dirty = true;
    }
  }

  // 4. Capture Peak Load Surges (>= 78% of rated maxPower or > 2500W new peak)
  const surgeThreshold = Math.max(1500, maxPower * 0.78);
  if (loadWatts >= surgeThreshold) {
    const bucket = Math.floor(loadWatts / 250) * 250;
    const sig = `surge:${bucket}`;
    if (canLogEvent(cardKey, sig, now, 10 * 60 * 1000)) {
      const pct = maxPower > 0 ? Math.round((loadWatts / maxPower) * 100) : 0;
      const vSagStr =
        batteryVoltage !== null ? ` (АКБ ${batteryVoltage.toFixed(1)}В)` : '';
      const vSagStrEn =
        batteryVoltage !== null ? ` (Bat ${batteryVoltage.toFixed(1)}V)` : '';
      pushEvent(state, {
        id: `${now}-surge`,
        timestamp: now,
        type: 'peak_surge',
        severity: loadWatts >= maxPower * 0.95 ? 'critical' : 'warning',
        code: `${pct}%`,
        titleRu: `Пиковая нагрузка ${Math.round(loadWatts)} Вт${vSagStr}`,
        titleEn: `Peak load surge ${Math.round(loadWatts)} W${vSagStrEn}`,
        metricsText: buildSnapshot(),
      });
      dirty = true;
    }
  }

  // 5. Capture Deep Battery Voltage Sag
  const mult = systemVoltage / 12;
  const sagThreshold = Number((11.95 * mult).toFixed(1)); // e.g. 23.9V for 24V, 47.8V for 48V
  if (batteryVoltage !== null && batteryVoltage > 6 && batteryVoltage <= sagThreshold) {
    const vRounded = batteryVoltage.toFixed(1);
    const sig = `sag:${vRounded}`;
    if (canLogEvent(cardKey, sig, now, 8 * 60 * 1000)) {
      pushEvent(state, {
        id: `${now}-sag`,
        timestamp: now,
        type: 'voltage_sag',
        severity: batteryVoltage <= 11.5 * mult ? 'critical' : 'warning',
        code: `${vRounded}V`,
        titleRu: `Просадка напряжения АКБ до ${vRounded} В`,
        titleEn: `Battery voltage sag to ${vRounded} V`,
        metricsText: buildSnapshot(),
      });
      dirty = true;
    }
  }

  // 6. Capture Grid Blackout & Grid Restoration transitions
  if (gridVoltage !== null) {
    const isNowOnline = gridVoltage >= 95;
    const isNowBlackout = gridVoltage < 45;

    if (state.lastGridOnline === true && isNowBlackout) {
      state.lastGridOnline = false;
      pushEvent(state, {
        id: `${now}-blackout`,
        timestamp: now,
        type: 'grid_outage',
        severity: 'warning',
        code: '0V AC',
        titleRu: 'Отключение внешней сети (Переход на АКБ)',
        titleEn: 'Grid outage detected (Switched to Battery)',
        metricsText: buildSnapshot(),
      });
      dirty = true;
    } else if (state.lastGridOnline === false && isNowOnline) {
      state.lastGridOnline = true;
      pushEvent(state, {
        id: `${now}-grid-ok`,
        timestamp: now,
        type: 'grid_restored',
        severity: 'success',
        code: `${Math.round(gridVoltage)}V`,
        titleRu: `Сеть восстановлена (${Math.round(gridVoltage)} В)`,
        titleEn: `Grid power restored (${Math.round(gridVoltage)} V)`,
        metricsText: buildSnapshot(),
      });
      dirty = true;
    } else if (state.lastGridOnline === undefined) {
      state.lastGridOnline = isNowOnline;
      dirty = true;
    }
  }

  // 7. Capture High BMS Cell Imbalance (> 100 mV)
  if (cellDeltaMv !== null && cellDeltaMv >= 100) {
    const deltaMv = Math.round(cellDeltaMv);
    const sig = `delta:${Math.floor(deltaMv / 30) * 30}`;
    if (canLogEvent(cardKey, sig, now, 15 * 60 * 1000)) {
      pushEvent(state, {
        id: `${now}-delta`,
        timestamp: now,
        type: 'cell_imbalance',
        severity: deltaMv >= 180 ? 'critical' : 'warning',
        code: `Δ${deltaMv}mV`,
        titleRu: `Разбаланс ячеек BMS: ${deltaMv} мВ`,
        titleEn: `BMS cell imbalance: ${deltaMv} mV`,
        metricsText: buildSnapshot(),
      });
      dirty = true;
    }
  }

  if (dirty) {
    saveBlackBoxState(cardKey, state);
  }

  return state;
}

export function formatEventTimestamp(ts: number | null, lang: 'ru' | 'en' = 'ru'): string {
  if (!ts) return '—';
  const d = new Date(ts);
  const now = new Date();
  const isToday =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();

  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');

  if (isToday) {
    return `${hh}:${mm}:${ss}`;
  }
  const day = String(d.getDate()).padStart(2, '0');
  const mon = String(d.getMonth() + 1).padStart(2, '0');
  return lang === 'ru' ? `${day}.${mon} ${hh}:${mm}` : `${mon}/${day} ${hh}:${mm}`;
}
