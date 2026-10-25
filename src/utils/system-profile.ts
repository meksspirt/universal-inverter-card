import { AninerelCardConfig, BmsConfig, HomeAssistant } from '../types';
import { getActiveLanguage, localize } from '../localize/localize';

export type NominalSystemVoltage = 12 | 24 | 36 | 48;

export interface DualOrSinglePackLike {
  voltage?: number | null;
  cells?: Array<{ voltage: number }>;
}

/**
 * Automatically detects the nominal DC bus voltage (12V, 24V, 36V, or 48V)
 * from explicit config, live battery voltage, BMS pack telemetry, or entity IDs.
 */
export function detectSystemVoltage(
  config: AninerelCardConfig,
  batteryVoltage: number | null,
  packs?: DualOrSinglePackLike[]
): NominalSystemVoltage {
  // 1. Explicit user configuration override
  if (
    config.system_voltage === 12 ||
    config.system_voltage === 24 ||
    config.system_voltage === 36 ||
    config.system_voltage === 48
  ) {
    return config.system_voltage;
  }

  // 2. From live total battery DC voltage
  if (batteryVoltage !== null && !isNaN(batteryVoltage) && batteryVoltage > 8) {
    if (batteryVoltage >= 38) return 48; // 15S (48V Pylontech) & 16S (51.2V LiFePO4)
    if (batteryVoltage >= 30) return 36; // 36V system
    if (batteryVoltage >= 18) return 24; // 24V system
    return 12; // 12V system
  }

  // 3. From multi-pack or single-pack voltages/cell counts
  const bms: BmsConfig | undefined = config.bms;
  if (packs && packs.length > 0) {
    const validVoltages = packs
      .map((p) => p.voltage ?? 0)
      .filter((v) => v > 8);
    if (validVoltages.length > 0) {
      const isParallel = bms?.topology === 'parallel';
      const estTotalV = isParallel
        ? validVoltages[0]
        : validVoltages.reduce((a, b) => a + b, 0);
      if (estTotalV >= 38) return 48;
      if (estTotalV >= 30) return 36;
      if (estTotalV >= 18) return 24;
      return 12;
    }
  }

  if (bms?.cell_count) {
    if (bms.cell_count >= 13) return 48;
    if (bms.cell_count >= 10) return 36;
    if (bms.cell_count >= 6) return 24;
    if (bms.cell_count >= 3) return 12;
  }

  // 4. Inspect entity ID strings for voltage hints (e.g. "48v", "51_2v", "24l", "12v")
  const configStr = JSON.stringify({
    e: config.entities,
    bv: config.battery_voltage_entity,
    bms: config.bms?.soc_entity || config.bms?.voltage_entity,
  }).toLowerCase();

  if (configStr.includes('48v') || configStr.includes('51.2v') || configStr.includes('51_2v')) {
    return 48;
  }
  if (configStr.includes('12v')) {
    return 12;
  }

  return 24;
}

/**
 * Returns voltage health color and sparkline minRange scaled for 12V / 24V / 36V / 48V systems.
 */
export function getBatteryVoltageStatus(
  batteryVoltage: number | null,
  systemVoltage: NominalSystemVoltage
): { color: string; sparklineRange: number } {
  const scale = systemVoltage / 24; // 0.5 for 12V, 1.0 for 24V, 1.5 for 36V, 2.0 for 48V
  const sparklineRange = Number((1.5 * scale).toFixed(1));

  if (batteryVoltage === null || isNaN(batteryVoltage)) {
    return { color: '#64748b', sparklineRange };
  }

  // Normalize to 24V equivalent for universal threshold evaluation
  // Note: 48V systems can be 15S (Pylontech ~48V nominal) or 16S (51.2V nominal),
  // so allow slightly wider lower normal window on 48V.
  const lowCrit = systemVoltage === 48 ? 47.0 : 24.0 * scale;
  const lowWarn = systemVoltage === 48 ? 49.5 : 25.6 * scale;
  const highCrit = 29.2 * scale;

  if (batteryVoltage < lowCrit || batteryVoltage > highCrit) {
    return { color: '#ef4444', sparklineRange };
  }
  if (batteryVoltage < lowWarn) {
    return { color: '#f59e0b', sparklineRange };
  }
  return { color: '#10b981', sparklineRange };
}

/**
 * Universal fallback voltage-based SoC estimation when BMS SoC sensor is not configured/available.
 * Works across 12V, 24V, 36V, and 48V LiFePO4 systems.
 */
export function estimateSocFromVoltage(
  batteryVoltage: number | null,
  systemVoltage: NominalSystemVoltage
): number | null {
  if (batteryVoltage === null || isNaN(batteryVoltage)) return null;
  const scale = systemVoltage / 24;
  const vNorm24 = batteryVoltage / scale; // Normalized to 24V (8S LiFePO4) equivalent

  if (vNorm24 < 19.5 || vNorm24 > 31.0) return null;

  if (vNorm24 >= 27.2) return 100;
  if (vNorm24 >= 26.8) return Math.round(80 + ((vNorm24 - 26.8) / 0.4) * 20);
  if (vNorm24 >= 26.4) return Math.round(50 + ((vNorm24 - 26.4) / 0.4) * 30);
  if (vNorm24 >= 26.0) return Math.round(20 + ((vNorm24 - 26.0) / 0.4) * 30);
  if (vNorm24 >= 24.0) return Math.max(5, Math.round(((vNorm24 - 24.0) / 2.0) * 20));
  return 5;
}

/**
 * Evaluates AC Grid voltage health across both 220V-240V (EU/CIS/Asia) and 110V-127V (Americas/Japan) grids.
 */
export function getGridVoltageStatus(
  gridVoltage: number | null,
  hass?: HomeAssistant,
  language?: string
): { color: string; label: string; sparklineRange: number } {
  if (gridVoltage === null || isNaN(gridVoltage)) {
    return {
      color: '#64748b',
      label: localize('params.offline', hass, language),
      sparklineRange: 20.0,
    };
  }

  // Complete AC blackout / grid disconnected (0V .. 50V)
  if (gridVoltage < 50) {
    return {
      color: '#ef4444',
      label: localize('params.sag', hass, language),
      sparklineRange: 20.0,
    };
  }

  // 110V - 127V nominal grid region
  if (gridVoltage >= 85 && gridVoltage <= 150) {
    if (gridVoltage < 98 || gridVoltage > 138) {
      return {
        color: '#ef4444',
        label:
          gridVoltage < 98
            ? localize('params.sag', hass, language)
            : localize('params.surge', hass, language),
        sparklineRange: 12.0,
      };
    }
    if (gridVoltage < 108 || gridVoltage > 132) {
      return {
        color: '#f59e0b',
        label: localize('params.deviated', hass, language),
        sparklineRange: 12.0,
      };
    }
    return {
      color: '#4285f4',
      label: localize('params.normal', hass, language),
      sparklineRange: 12.0,
    };
  }

  // 220V - 240V nominal grid region
  if (gridVoltage < 190 || gridVoltage > 255) {
    return {
      color: '#ef4444',
      label:
        gridVoltage < 190
          ? localize('params.sag', hass, language)
          : localize('params.surge', hass, language),
      sparklineRange: 20.0,
    };
  }
  if (gridVoltage < 208 || gridVoltage > 246) {
    return {
      color: '#f59e0b',
      label: localize('params.deviated', hass, language),
      sparklineRange: 20.0,
    };
  }

  return {
    color: '#4285f4',
    label: localize('params.normal', hass, language),
    sparklineRange: 20.0,
  };
}

/**
 * Detects inverter brand/title automatically if the user has not explicitly customized `title`.
 */
export function resolveCardTitle(config: AninerelCardConfig, hass?: HomeAssistant): string {
  if (config.title && config.title.trim() !== '') {
    return config.title.trim();
  }

  const probeIds = [
    config.entities?.load_power,
    config.entities?.battery_power,
    config.operating_mode_entity,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  if (probeIds.includes('aninerel')) return 'Aninerel ANL 4200T';
  if (probeIds.includes('anenji')) return 'Anenji Hybrid Inverter';
  if (probeIds.includes('powmr')) return 'PowMr Hybrid Inverter';
  if (probeIds.includes('easun')) return 'EASun Power Inverter';
  if (probeIds.includes('growatt')) return 'Growatt Inverter';
  if (probeIds.includes('deye')) return 'Deye Hybrid Inverter';
  if (probeIds.includes('sunsynk')) return 'Sunsynk Hybrid Inverter';
  if (probeIds.includes('srne')) return 'SRNE Solar Inverter';
  if (probeIds.includes('must')) return 'Must Power Inverter';
  if (probeIds.includes('victron')) return 'Victron Energy';
  if (probeIds.includes('luxpower')) return 'LuxPower Inverter';
  if (probeIds.includes('sofar')) return 'Sofar Solar';
  if (probeIds.includes('huawei')) return 'Huawei FusionSolar';
  if (probeIds.includes('fronius')) return 'Fronius Inverter';
  if (probeIds.includes('axioma')) return 'Axioma Energy';
  if (probeIds.includes('voltronic') || probeIds.includes('axpert') || probeIds.includes('mppsolar')) {
    return 'Voltronic Axpert';
  }

  const isRu = getActiveLanguage(hass, config.language) === 'ru';
  return isRu ? 'Гибридный инвертор' : 'Hybrid Power Inverter';
}

/**
 * Formats the default subtitle dynamically using the detected system voltage (12V/24V/36V/48V)
 * and configured max_power (e.g. 4.2 kW, 5.0 kW, 6.2 kW).
 */
export function resolveDefaultSubtitle(
  config: AninerelCardConfig,
  hasSolar: boolean,
  systemVoltage: NominalSystemVoltage,
  hass?: HomeAssistant
): string {
  if (config.subtitle && config.subtitle.trim() !== '') {
    return config.subtitle.trim();
  }

  const maxPower = config.max_power || config.inverter_capacity || 4200;
  const kwNum = maxPower / 1000;
  const kwStr = kwNum % 1 === 0 ? kwNum.toFixed(0) : kwNum.toFixed(1);
  const isRu = getActiveLanguage(hass, config.language) === 'ru';

  if (isRu) {
    return hasSolar
      ? `Гибридный инвертор ${systemVoltage}В ${kwStr} кВт`
      : `ИБП ${systemVoltage}В ${kwStr} кВт`;
  }
  return hasSolar
    ? `Hybrid ${systemVoltage}V ${kwStr}kW Inverter`
    : `${systemVoltage}V ${kwStr}kW UPS Inverter`;
}
