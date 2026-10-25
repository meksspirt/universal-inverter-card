/**
 * Utility functions for formatting sensor values, wattages, voltages, runtime, and percentages
 */

export function formatPower(watts: number, decimals = 1): string {
  const absWatts = Math.abs(watts);
  if (absWatts >= 1000) {
    return `${(watts / 1000).toFixed(decimals)} kW`;
  }
  return `${Math.round(watts)} W`;
}

export function formatVoltage(volts: number | null | undefined, decimals = 1): string {
  if (volts === null || volts === undefined || isNaN(volts)) return 'N/A';
  return `${volts.toFixed(decimals)} V`;
}

export function formatCurrent(amps: number | null | undefined, decimals = 1): string {
  if (amps === null || amps === undefined || isNaN(amps)) return 'N/A';
  return `${amps.toFixed(decimals)} A`;
}

export function formatEnergy(kwh: number | null | undefined, decimals = 1): string {
  if (kwh === null || kwh === undefined || isNaN(kwh)) return '0.0 kWh';
  return `${kwh.toFixed(decimals)} kWh`;
}

export function formatTemperature(celsius: number | null | undefined, decimals = 0): string {
  if (celsius === null || celsius === undefined || isNaN(celsius)) return 'N/A';
  return `${celsius.toFixed(decimals)} °C`;
}

export function formatDurationHours(
  hours: number | null | undefined,
  lang: 'ru' | 'en' | 'uk' = 'uk'
): string | null {
  if (hours === null || hours === undefined || isNaN(hours) || !isFinite(hours) || hours <= 0) {
    return null;
  }
  const clamped = Math.min(99, hours);
  const h = Math.floor(clamped);
  const m = Math.round((clamped - h) * 60);
  if (lang === 'uk') {
    if (h <= 0) return `~${Math.max(1, m)} хв`;
    if (m <= 0 || h >= 24) return `~${h} год`;
    return `~${h}г ${m}хв`;
  }
  if (lang === 'ru') {
    if (h <= 0) return `~${Math.max(1, m)} мин`;
    if (m <= 0 || h >= 24) return `~${h} ч`;
    return `~${h}ч ${m}м`;
  }
  if (h <= 0) return `~${Math.max(1, m)}m`;
  if (m <= 0 || h >= 24) return `~${h}h`;
  return `~${h}h ${m}m`;
}
