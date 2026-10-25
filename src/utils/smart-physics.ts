import { BatteryChemistry } from '../types';
import { NominalSystemVoltage } from './system-profile';

export interface ConversionEfficiencyResult {
  /** Real-time conversion efficiency (50..99.5%), or null when system is idle (<25W) */
  efficiencyPct: number | null;
  /** Instantaneous power lost as heat / inverter self-consumption (W) */
  thermalLossWatts: number | null;
  /** Total electrical input power entering the inverter (W) */
  totalInputWatts: number;
  /** Total useful electrical output power delivered by the inverter (W) */
  totalOutputWatts: number;
  /** Daily energy efficiency (%) if daily counters are available */
  dailyEfficiencyPct: number | null;
  /** Current conversion regime */
  regime: 'inverting' | 'charging' | 'hybrid' | 'bypass' | 'idle';
  /** Semantic status color */
  color: string;
}

export interface SmartRuntimeInput {
  cardId: string;
  batteryWatts: number; // +Charge / -Discharge
  batteryVoltage: number | null;
  batteryCurrent: number | null;
  batterySoc: number | null;
  remainingWh: number | null;
  nominalCapWh: number;
  systemVoltage: NominalSystemVoltage;
  chemistry?: BatteryChemistry;
  cutoffVoltage?: number | null;
  lang?: 'ru' | 'en';
}

export interface SmartRuntimeResult {
  /** Formatted runtime string with Attribute Dependency precision */
  runtimeText: string | null;
  /** Detailed subtitle / tooltip or cutoff warning */
  detailText: string | null;
  /** Actionable load shedding tip when runtime is < 2h on discharge */
  sheddingHint: string | null;
  /** Computed hours remaining (Peukert & cutoff adjusted) */
  hoursRemaining: number | null;
  /** Smoothed battery power (EMA) */
  smoothedBatteryWatts: number;
  /** Effective inverter cutoff voltage used */
  effectiveCutoffVoltage: number;
  /** True when voltage sag or low runtime (<1h) triggers high-precision countdown mode */
  isCriticalCountdown: boolean;
  /** True when battery terminal voltage is dangerously close to cutoff despite SoC */
  isCutoffVoltageRisk: boolean;
}

// Per-card EMA power smoothing state
const emaPowerState = new Map<string, { value: number; timestamp: number }>();

/**
 * Computes real-time DC <-> AC conversion efficiency (%) and thermal loss (W).
 */
export function calculateConversionEfficiency(params: {
  solarWatts: number;
  batteryWatts: number; // +Charge / -Discharge
  gridWatts: number; // +Import / -Export
  loadWatts: number;
  selfConsumptionWatts: number | null;
  loadEnergyToday?: number | null;
  gridImportEnergyToday?: number | null;
  solarEnergyToday?: number | null;
  batChargeEnergyToday?: number | null;
  batDischargeEnergyToday?: number | null;
  selfConsumptionDailyEnergy?: number | null;
}): ConversionEfficiencyResult {
  const {
    solarWatts = 0,
    batteryWatts = 0,
    gridWatts = 0,
    loadWatts = 0,
    selfConsumptionWatts = null,
    loadEnergyToday = null,
    gridImportEnergyToday = null,
    solarEnergyToday = null,
    batChargeEnergyToday = null,
    batDischargeEnergyToday = null,
    selfConsumptionDailyEnergy = null,
  } = params;

  const pvIn = Math.max(0, solarWatts);
  const gridIn = Math.max(0, gridWatts);
  const batDischargeIn = Math.max(0, -batteryWatts);

  const loadOut = Math.max(0, loadWatts);
  const batChargeOut = Math.max(0, batteryWatts);
  const gridExportOut = Math.max(0, -gridWatts);

  let totalInputWatts = pvIn + gridIn + batDischargeIn;
  const totalOutputWatts = loadOut + batChargeOut + gridExportOut;

  // Determine operating regime
  let regime: ConversionEfficiencyResult['regime'] = 'idle';
  if (totalOutputWatts < 20 && totalInputWatts < 20) {
    regime = 'idle';
  } else if (pvIn > 25 && (batDischargeIn > 15 || gridIn > 15 || batChargeOut > 15)) {
    regime = 'hybrid';
  } else if (batDischargeIn >= 20 && gridIn < 15) {
    regime = 'inverting';
  } else if (batChargeOut >= 20) {
    regime = 'charging';
  } else if (gridIn >= 20) {
    regime = 'bypass';
  }

  let thermalLossWatts: number | null = null;
  let efficiencyPct: number | null = null;

  const hasExplicitSelf =
    selfConsumptionWatts !== null &&
    !isNaN(selfConsumptionWatts) &&
    selfConsumptionWatts > 0;

  const rawPowerDelta = totalInputWatts - totalOutputWatts;

  if (hasExplicitSelf) {
    thermalLossWatts = Math.round(selfConsumptionWatts!);
    // Many inverters report grid_power = load_power mathematically without adding self-consumption.
    // If raw delta is smaller than explicit self-consumption, effective input includes self-consumption.
    const effectiveInput =
      rawPowerDelta >= selfConsumptionWatts! * 0.5
        ? totalInputWatts
        : totalOutputWatts + selfConsumptionWatts!;
    totalInputWatts = effectiveInput;

    if (totalOutputWatts >= 25 && effectiveInput > 0) {
      const rawEff = (totalOutputWatts / effectiveInput) * 100;
      efficiencyPct = Math.max(50, Math.min(99.4, Number(rawEff.toFixed(1))));
    }
  } else if (totalOutputWatts >= 35 && totalInputWatts > totalOutputWatts) {
    const diff = totalInputWatts - totalOutputWatts;
    const rawEff = (totalOutputWatts / totalInputWatts) * 100;
    if (rawEff >= 55 && rawEff <= 99.5) {
      thermalLossWatts = Math.round(diff);
      efficiencyPct = Number(rawEff.toFixed(1));
    }
  }

  // Daily Round-Trip / System Efficiency calculation
  let dailyEfficiencyPct: number | null = null;
  if (loadEnergyToday !== null && loadEnergyToday > 0.2) {
    if (selfConsumptionDailyEnergy !== null && selfConsumptionDailyEnergy > 0) {
      const totalDailyUsed = loadEnergyToday + selfConsumptionDailyEnergy;
      dailyEfficiencyPct = Number(((loadEnergyToday / totalDailyUsed) * 100).toFixed(1));
    } else {
      const dailyIn =
        (gridImportEnergyToday ?? 0) +
        (solarEnergyToday ?? 0) +
        (batDischargeEnergyToday ?? 0);
      const dailyOut = loadEnergyToday + (batChargeEnergyToday ?? 0);
      if (dailyIn > dailyOut && dailyOut > 0.2) {
        const eff = (dailyOut / dailyIn) * 100;
        if (eff >= 60 && eff <= 99.5) {
          dailyEfficiencyPct = Number(eff.toFixed(1));
        }
      }
    }
  }

  const metricForColor = efficiencyPct ?? dailyEfficiencyPct;
  const color =
    metricForColor === null
      ? '#64748b'
      : metricForColor >= 90
      ? '#10b981'
      : metricForColor >= 80
      ? '#f59e0b'
      : '#f97316';

  return {
    efficiencyPct,
    thermalLossWatts,
    totalInputWatts: Math.round(totalInputWatts),
    totalOutputWatts: Math.round(totalOutputWatts),
    dailyEfficiencyPct,
    regime,
    color,
  };
}

/**
 * Smart Runtime Predictor with:
 * 1. Rolling EMA smoothing (suppresses transient fridge/pump spikes)
 * 2. Peukert's Law non-linear capacity derating at high C-rates
 * 3. Inverter Cut-off Voltage headroom protection
 * 4. SIT Attribute Dependency formatting (>5h hours, 1..5h hours+min, <1h exact minutes + cutoff V)
 */
export function calculateSmartRuntime(input: SmartRuntimeInput): SmartRuntimeResult {
  const {
    cardId,
    batteryWatts,
    batteryVoltage,
    batterySoc,
    remainingWh,
    nominalCapWh,
    systemVoltage,
    chemistry = 'lifepo4',
    cutoffVoltage,
    lang = 'ru',
  } = input;

  const mult = systemVoltage / 12;
  const defaultCutoff =
    chemistry === 'li_ion'
      ? Number((10.5 * mult).toFixed(1))
      : chemistry === 'lto'
      ? Number((9.6 * mult).toFixed(1))
      : Number((11.8 * mult).toFixed(1)); // 23.6V for 24V LiFePO4, 47.2V for 48V

  const effectiveCutoffVoltage =
    cutoffVoltage !== null && cutoffVoltage !== undefined && cutoffVoltage > 8
      ? cutoffVoltage
      : defaultCutoff;

  // 1. Exponential Moving Average (EMA) smoothing of battery power
  const now = Date.now();
  const prev = emaPowerState.get(cardId);
  let smoothedBatteryWatts = batteryWatts;

  if (prev && now - prev.timestamp < 120000) {
    // If polarity flipped (charge <-> discharge), reset immediately
    if (
      (batteryWatts > 15 && prev.value < -15) ||
      (batteryWatts < -15 && prev.value > 15) ||
      Math.abs(batteryWatts) < 10
    ) {
      smoothedBatteryWatts = batteryWatts;
    } else {
      // Smooth with alpha = 0.35 so real load shifts settle in ~3 updates while brief surges are dampened
      smoothedBatteryWatts = prev.value * 0.65 + batteryWatts * 0.35;
    }
  }
  emaPowerState.set(cardId, { value: smoothedBatteryWatts, timestamp: now });

  if (remainingWh === null || Math.abs(smoothedBatteryWatts) <= 15) {
    return {
      runtimeText: null,
      detailText: null,
      sheddingHint: null,
      hoursRemaining: null,
      smoothedBatteryWatts,
      effectiveCutoffVoltage,
      isCriticalCountdown: false,
      isCutoffVoltageRisk: false,
    };
  }

  // CHARGING MODE: Time to Full (100% SoC)
  if (smoothedBatteryWatts > 15) {
    if (batterySoc !== null && batterySoc >= 99.5) {
      return {
        runtimeText: null,
        detailText: null,
        sheddingHint: null,
        hoursRemaining: 0,
        smoothedBatteryWatts,
        effectiveCutoffVoltage,
        isCriticalCountdown: false,
        isCutoffVoltageRisk: false,
      };
    }
    const neededWh = Math.max(0, nominalCapWh - remainingWh);
    // Account for ~96% Coulombic charging efficiency + CV absorption tail above 90% SoC
    const tailFactor = batterySoc !== null && batterySoc > 88 ? 1.18 : 1.04;
    const hoursToFull = (neededWh * tailFactor) / smoothedBatteryWatts;

    return {
      runtimeText: formatAdaptiveDuration(hoursToFull, lang, false, effectiveCutoffVoltage),
      detailText: null,
      sheddingHint: null,
      hoursRemaining: hoursToFull,
      smoothedBatteryWatts,
      effectiveCutoffVoltage,
      isCriticalCountdown: false,
      isCutoffVoltageRisk: false,
    };
  }

  // DISCHARGING MODE: Peukert's Law + Cutoff Voltage Headroom
  const dischargeWatts = Math.abs(smoothedBatteryWatts);

  // Peukert exponent k by chemistry
  const peukertK =
    chemistry === 'li_ion' ? 1.11 : chemistry === 'lto' ? 1.02 : 1.05; // LiFePO4 = 1.05

  // Reference 0.2C power (5-hour nominal discharge rate)
  const refPower02C = Math.max(100, nominalCapWh * 0.2);

  // Peukert derating factor: at high discharge power (>0.2C), usable energy is reduced
  // At low power (<0.2C), clamp gain to max 1.03x so we never over-promise
  const peukertMultiplier = Math.min(
    1.03,
    Math.max(0.72, Math.pow(refPower02C / dischargeWatts, peukertK - 1))
  );

  // Usable energy down to reserve (10% SoC reserve)
  const reserveWh = nominalCapWh * 0.08;
  const rawUsableWh = Math.max(0, remainingWh - reserveWh);
  const peukertUsableWh = rawUsableWh * peukertMultiplier;

  let hoursLeft = peukertUsableWh / dischargeWatts;
  let isCutoffVoltageRisk = false;

  // Cutoff Voltage Headroom Check:
  // Under heavy load, DC voltage sags due to internal resistance (V_term = V_ocv - I * R_int).
  // If batteryVoltage is close to effectiveCutoffVoltage, cap the estimated runtime!
  if (batteryVoltage !== null && batteryVoltage > 5) {
    const voltageMargin = batteryVoltage - effectiveCutoffVoltage;
    const criticalSpan = 0.6 * mult; // e.g., 1.2V above cutoff on a 24V system
    if (voltageMargin <= 0.05) {
      hoursLeft = Math.min(hoursLeft, 0.05); // ~3 minutes
      isCutoffVoltageRisk = true;
    } else if (voltageMargin < criticalSpan) {
      const voltageRatio = voltageMargin / criticalSpan;
      // Blend voltage-limited time so we don't promise 45 min when voltage will trip cutoff in 10 min
      const maxHoursByVoltage = Math.max(0.08, voltageRatio * 0.85);
      if (hoursLeft > maxHoursByVoltage) {
        hoursLeft = hoursLeft * 0.35 + maxHoursByVoltage * 0.65;
        isCutoffVoltageRisk = true;
      }
    }
  }

  const isCriticalCountdown = hoursLeft < 1.0 || isCutoffVoltageRisk;

  const runtimeText = formatAdaptiveDuration(
    hoursLeft,
    lang,
    isCriticalCountdown,
    effectiveCutoffVoltage
  );

  // Calculate actionable Load Shedding Advisor ("What-If")
  let sheddingHint: string | null = null;
  if (hoursLeft < 3.5 && dischargeWatts >= 350) {
    const stepW = dischargeWatts >= 1000 ? 500 : 200;
    const reducedWatts = Math.max(80, dischargeWatts - stepW);
    const reducedMultiplier = Math.min(
      1.03,
      Math.max(0.72, Math.pow(refPower02C / reducedWatts, peukertK - 1))
    );
    const newHours = (rawUsableWh * reducedMultiplier) / reducedWatts;
    const gainedMinutes = Math.round((newHours - hoursLeft) * 60);
    if (gainedMinutes >= 10) {
      const gainStr =
        gainedMinutes >= 60
          ? lang === 'ru'
            ? `+${Math.floor(gainedMinutes / 60)}ч ${gainedMinutes % 60}м`
            : `+${Math.floor(gainedMinutes / 60)}h ${gainedMinutes % 60}m`
          : lang === 'ru'
          ? `+${gainedMinutes} мин`
          : `+${gainedMinutes}m`;
      sheddingHint =
        lang === 'ru'
          ? `💡 −${stepW} Вт нагрузки даст ${gainStr}`
          : `💡 −${stepW}W load adds ${gainStr}`;
    }
  }

  const detailText = isCutoffVoltageRisk
    ? lang === 'ru'
      ? `⚠️ Близко к отсечке ${effectiveCutoffVoltage.toFixed(1)}В`
      : `⚠️ Near ${effectiveCutoffVoltage.toFixed(1)}V cut-off`
    : null;

  return {
    runtimeText,
    detailText,
    sheddingHint,
    hoursRemaining: hoursLeft,
    smoothedBatteryWatts,
    effectiveCutoffVoltage,
    isCriticalCountdown,
    isCutoffVoltageRisk,
  };
}

/**
 * SIT Attribute Dependency Formatter:
 * - > 5 hours: calm rounded hours (`~6.5 ч` / `~6.5h`)
 * - 1..5 hours: exact hours and minutes (`2ч 15м` / `2h 15m`)
 * - < 1 hour (or critical cutoff risk): high-precision minute countdown with cutoff voltage (`42 мин до 24.0В`)
 */
function formatAdaptiveDuration(
  hours: number,
  lang: 'ru' | 'en',
  isCritical: boolean,
  cutoffV: number
): string | null {
  if (!isFinite(hours) || isNaN(hours) || hours <= 0) return null;
  const clamped = Math.min(99, hours);

  // Attribute Dependency Level 1: Long horizon (> 5 hours) -> Calm fractional hours
  if (clamped >= 5 && !isCritical) {
    const roundedHalf = Math.round(clamped * 2) / 2;
    return lang === 'ru' ? `~${roundedHalf} ч` : `~${roundedHalf}h`;
  }

  // Attribute Dependency Level 2: Medium horizon (1 to 5 hours) -> Hours + Minutes
  if (clamped >= 1 && !isCritical) {
    const h = Math.floor(clamped);
    const m = Math.round((clamped - h) * 60);
    if (m === 60) {
      return lang === 'ru' ? `~${h + 1} ч` : `~${h + 1}h`;
    }
    if (m === 0) {
      return lang === 'ru' ? `~${h} ч` : `~${h}h`;
    }
    return lang === 'ru' ? `${h}ч ${m}м` : `${h}h ${m}m`;
  }

  // Attribute Dependency Level 3: Critical horizon (< 1 hour or Voltage Sag Risk)
  // High-precision countdown in minutes with cutoff voltage target
  const totalMinutes = Math.max(1, Math.round(clamped * 60));
  const cutoffStr = cutoffV.toFixed(1);
  if (lang === 'ru') {
    return `${totalMinutes} мин (до ${cutoffStr}В)`;
  }
  return `${totalMinutes}m (to ${cutoffStr}V)`;
}
