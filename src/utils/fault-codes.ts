/**
 * Voltronic Axpert / Aninerel ANL-4200T / EASUN SMG II / PowMr Fault and Warning Code Mappings
 *
 * Supports both:
 * 1. Direct LCD codes (W01-W73, F01-F82)
 * 2. Modbus bitmask registers (holding registers 105, 108, 109)
 */

export interface FaultDetail {
  code: number;
  title: string;
  description: string;
  recommendation: string;
  severity: 'critical' | 'warning' | 'info';
}

export interface WarningDetail {
  title: string;
  description: string;
  recommendation?: string;
  isPvRelated?: boolean;
}

export const FAULT_CODES: Record<number, FaultDetail> = {
  0: {
    code: 0,
    title: 'Normal',
    description: 'Inverter is operating normally. No faults detected.',
    recommendation: 'System is functioning properly.',
    severity: 'info',
  },
  1: {
    code: 1,
    title: 'Fan Locked',
    description: 'Cooling fan is locked or stopped by an obstruction.',
    recommendation: 'Inspect cooling vents, remove dust or foreign objects from fans.',
    severity: 'critical',
  },
  2: {
    code: 2,
    title: 'Inverter Over-Temperature',
    description: 'Internal heatsink temperature exceeded the safe operating limit (>100°C).',
    recommendation: 'Ensure adequate ventilation, reduce inverter load and allow it to cool down.',
    severity: 'critical',
  },
  3: {
    code: 3,
    title: 'Battery Over-Voltage',
    description: 'Battery terminal voltage exceeded the maximum safety threshold.',
    recommendation: 'Verify Bulk/Float charging voltage settings and BMS parameters.',
    severity: 'critical',
  },
  4: {
    code: 4,
    title: 'Battery Under-Voltage (Critical Discharge)',
    description: 'Battery voltage dropped below the critical cut-off protection threshold.',
    recommendation: 'Connect AC grid power to charge the battery or shed heavy loads.',
    severity: 'warning',
  },
  5: {
    code: 5,
    title: 'Output Short Circuit',
    description: 'Short circuit or extreme over-current detected on the AC output circuit.',
    recommendation: 'Immediately disconnect AC load breakers and resolve short circuits in wiring or appliances.',
    severity: 'critical',
  },
  6: {
    code: 6,
    title: 'Output Voltage Too High',
    description: 'Inverter AC output voltage exceeded the safe operating range (>260V).',
    recommendation: 'Disconnect sensitive appliances, restart inverter. If error persists, service is required.',
    severity: 'critical',
  },
  7: {
    code: 7,
    title: 'Overload Time-Out',
    description: 'Connected load exceeded rated inverter power longer than allowed duration.',
    recommendation: 'Disconnect high-power loads (heaters, water heaters, kettles).',
    severity: 'warning',
  },
  8: {
    code: 8,
    title: 'DC Bus Over-Voltage',
    description: 'Internal DC bus voltage exceeded the maximum safety limit.',
    recommendation: 'Restart inverter. If issue persists, check solar panel array Voc specifications.',
    severity: 'critical',
  },
  9: {
    code: 9,
    title: 'DC Bus Soft-Start Failed',
    description: 'High-voltage DC bus pre-charge circuit failed during startup.',
    recommendation: 'Check battery and PV input voltages, then restart the inverter.',
    severity: 'critical',
  },
  10: {
    code: 10,
    title: 'PV Over-Current',
    description: 'Solar array input current exceeded MPPT controller maximum rating.',
    recommendation: 'Verify solar string configuration and parallel panel wiring.',
    severity: 'critical',
  },
  11: {
    code: 11,
    title: 'PV Over-Voltage',
    description: 'Solar panel open-circuit voltage (Voc) exceeded the maximum MPPT limit.',
    recommendation: 'Immediately disconnect solar input, reduce number of panels in series.',
    severity: 'critical',
  },
  12: {
    code: 12,
    title: 'DC-DC Converter Over-Current',
    description: 'Over-current detected in the battery DC-DC converter stage.',
    recommendation: 'Check battery cable integrity, terminal torque, and eliminate surge loads.',
    severity: 'critical',
  },
  13: {
    code: 13,
    title: 'Inverter Current Surge',
    description: 'Hardware protection triggered due to sudden current spike or inrush surge.',
    recommendation: 'Avoid simultaneous starting of heavy inductive loads (motors, pumps, compressors).',
    severity: 'critical',
  },
  14: {
    code: 14,
    title: 'DC Bus Under-Voltage',
    description: 'DC bus voltage dropped below minimum required operating level.',
    recommendation: 'Check battery health under load and AC grid input stability.',
    severity: 'warning',
  },
  51: {
    code: 51,
    title: 'Inverter Over-Current',
    description: 'Hardware over-current protection triggered on power bridge transistors (IGBT/MOSFET).',
    recommendation: 'Disconnect devices with high inrush currents, power cycle the inverter.',
    severity: 'critical',
  },
  52: {
    code: 52,
    title: 'DC Bus Voltage Low',
    description: 'DC bus voltage dropped sharply below 230V generation threshold.',
    recommendation: 'Inspect battery condition, terminal connections, and cable lugs.',
    severity: 'warning',
  },
  53: {
    code: 53,
    title: 'Inverter Soft-Start Failed',
    description: 'Failed to establish smooth AC output waveform during startup.',
    recommendation: 'Disconnect all AC output loads before powering on the inverter.',
    severity: 'critical',
  },
  55: {
    code: 55,
    title: 'DC Voltage on AC Output',
    description: 'Dangerous DC voltage component detected on the 230V AC output.',
    recommendation: 'Hazardous to transformers and motors! Immediately disconnect loads and contact service.',
    severity: 'critical',
  },
  56: {
    code: 56,
    title: 'Battery Connection Open',
    description: 'Inverter did not detect a connected battery during operation.',
    recommendation: 'Check battery breaker, DC fuse, and terminal connections.',
    severity: 'critical',
  },
  57: {
    code: 57,
    title: 'Current Sensor Failed',
    description: 'Internal current measurement sensor (Hall sensor) communication or calibration failure.',
    recommendation: 'Restart the inverter. If error persists, main control board repair is needed.',
    severity: 'critical',
  },
  58: {
    code: 58,
    title: 'Output Voltage Too Low',
    description: 'Inverter cannot maintain 230V AC output (voltage dropped below 190V) due to overload.',
    recommendation: 'Reduce load on the inverter.',
    severity: 'warning',
  },
  59: {
    code: 59,
    title: 'Control Board Communication Error',
    description: 'Internal communication loss between control board and power module.',
    recommendation: 'Restart the inverter. If error persists, inspect internal ribbon cables.',
    severity: 'critical',
  },
  60: {
    code: 60,
    title: 'Grid Feedback / Sync Error',
    description: 'Reverse power flow detected or grid synchronization failed during bypass switch.',
    recommendation: 'Verify AC grid input parameters and phase polarity.',
    severity: 'warning',
  },
  71: {
    code: 71,
    title: 'Firmware / BMS Incompatibility',
    description: 'Firmware version mismatch or lost communication with lithium battery BMS.',
    recommendation: 'Check BMS communication cable and selected battery protocol settings.',
    severity: 'critical',
  },
  72: {
    code: 72,
    title: 'BMS Critical Error',
    description: 'Battery Management System triggered an emergency protection signal.',
    recommendation: 'Check battery health and error logs in the BMS app.',
    severity: 'critical',
  },
  80: {
    code: 80,
    title: 'Parallel CAN Bus Fault',
    description: 'Lost communication over CAN bus between parallel inverters.',
    recommendation: 'Check parallel communication cables and bus termination resistors.',
    severity: 'critical',
  },
  81: {
    code: 81,
    title: 'Host Loss in Parallel System',
    description: 'Follower inverter lost communication with Master unit.',
    recommendation: 'Check power and state of the Master inverter and cable connections.',
    severity: 'critical',
  },
  82: {
    code: 82,
    title: 'AC Phase Sync Loss',
    description: 'Parallel inverters failed to synchronize AC output phases.',
    recommendation: 'Ensure simultaneous AC grid connection to all parallel units.',
    severity: 'critical',
  },
};

export const WARNING_CODES: Record<number, WarningDetail> = {
  0: { title: 'No Warnings', description: 'System operating normally without warnings.' },
  1: { title: 'Off-Grid / Battery Mode', description: 'Inverter operating in autonomous battery mode (grid outage).' },
  2: { title: 'Mains Waveform Abnormal', description: 'Utility AC grid waveform distorted during outage or switching.' },
  4: { title: 'Low Battery Voltage', description: 'Battery voltage below warning threshold (recharge recommended).' },
  7: { title: 'Overload Warning', description: 'Home consumption approaching rated inverter limit (4.2 kW).' },
  8: { title: 'Mains Low Voltage', description: 'Utility AC grid voltage is 0V or below acceptable threshold (grid outage).' },
  10: { title: 'Output Power Derating', description: 'Inverter automatically derating power to prevent overheating.' },
  14: { title: 'Fan Blocked', description: 'Cooling fan is blocked or operating at reduced speed.' },
  15: { title: 'PV Energy Weak', description: 'Solar voltage below MPPT operating threshold (panels not connected or night).', isPvRelated: true },
  16: { title: 'Mains Over Frequency', description: 'Utility AC grid frequency out of acceptable range.' },
  19: { title: 'Lithium Battery Comm Abnormal', description: 'Lost RS485/CAN telemetry communication with lithium battery BMS.' },
  20: { title: 'Battery Discharge Over-Current', description: 'Battery discharge current exceeded configured threshold.' },
  32: { title: 'Mains Low Frequency', description: 'Utility AC grid frequency dropped below acceptable range.' },
  64: { title: 'PV Low Voltage', description: 'Solar array voltage below MPPT operating threshold (panels not connected or overcast).', isPvRelated: true },
  128: { title: 'Inverter Over-Temperature', description: 'Internal heatsink temperature is too high.' },
  256: { title: 'Battery Low Voltage', description: 'Battery voltage has dropped below warning threshold (recharge needed).' },
  512: { title: 'Battery Not Connected', description: 'Battery circuit is open or battery is not detected.' },
  1024: { title: 'Overload Warning', description: 'Home consumption is approaching or exceeding rated inverter limit (4.2 kW).' },
  2048: { title: 'Battery Equalization Active', description: 'Battery equalization charging cycle is currently active.' },
  4096: { title: 'Battery Discharged Below Recovery', description: 'Battery voltage discharged below recovery threshold.' },
  8192: { title: 'Output Power Derating', description: 'Inverter automatically derating output power due to thermal or voltage limits.' },
  16384: { title: 'Fan Blocked', description: 'Cooling fan is blocked or operating at reduced speed.' },
  32768: { title: 'PV Energy Too Low', description: 'Solar input power is too weak for MPPT conversion.', isPvRelated: true },
  524288: { title: 'Lithium Battery Comm Abnormal', description: 'Lost RS485/CAN telemetry communication with lithium battery BMS.' },
  1048576: { title: 'Battery Discharge Over-Current', description: 'Battery discharge current exceeded configured safety threshold.' },
};

/**
 * Modbus SMG warning bitmask definitions (register 108-109, u32_high_first)
 * Exact mapping from modbus_smg/base.json for Aninerel ANL-4200T-24L-W-PRO
 */
export interface ModbusWarningBit {
  bit: number;
  mask: number;
  code: number;
  title: string;
  description: string;
  isPvRelated?: boolean;
  isInformational?: boolean;
}

export const MODBUS_WARNING_BITS: ModbusWarningBit[] = [
  { bit: 0, mask: 1 << 0, code: 0, title: 'Off-Grid Mode', description: 'Inverter operating in autonomous battery mode (grid outage).', isInformational: true },
  { bit: 1, mask: 1 << 1, code: 1, title: 'Mains Waveform Abnormal', description: 'Utility AC grid waveform distorted during outage or switching.', isInformational: true },
  { bit: 2, mask: 1 << 2, code: 2, title: 'Vendor Status Bit 2', description: 'Vendor-specific operational status bit 2.', isInformational: true },
  { bit: 3, mask: 1 << 3, code: 3, title: 'Mains Low Voltage', description: 'Utility AC grid voltage is low or 0V (grid outage).', isInformational: true },
  { bit: 4, mask: 1 << 4, code: 4, title: 'Mains Over Frequency', description: 'Utility AC grid frequency exceeded upper bound.', isInformational: true },
  { bit: 5, mask: 1 << 5, code: 5, title: 'Mains Low Frequency', description: 'Utility AC grid frequency dropped below lower bound.', isInformational: true },
  { bit: 6, mask: 1 << 6, code: 6, title: 'PV Low Voltage', description: 'Solar array voltage below MPPT startup range (panels not connected or night).', isPvRelated: true },
  { bit: 7, mask: 1 << 7, code: 7, title: 'W02: Over Temperature', description: 'Internal inverter heatsink temperature is elevated.' },
  { bit: 8, mask: 1 << 8, code: 8, title: 'W04: Battery Low Voltage', description: 'Battery voltage has dropped below warning threshold.' },
  { bit: 9, mask: 1 << 9, code: 9, title: 'W09: Battery Not Connected', description: 'Battery circuit is open or battery is not detected.' },
  { bit: 10, mask: 1 << 10, code: 10, title: 'W07: Overload', description: 'Home consumption is approaching rated inverter power (4.2 kW).' },
  { bit: 11, mask: 1 << 11, code: 11, title: 'Battery Equalization Charging', description: 'Battery equalization charging cycle is active.', isInformational: true },
  { bit: 12, mask: 1 << 12, code: 12, title: 'Battery Discharged Below Recovery', description: 'Battery discharged below recovery voltage threshold.' },
  { bit: 13, mask: 1 << 13, code: 13, title: 'W10: Output Power Derating', description: 'Output power derating active due to high temperature.' },
  { bit: 14, mask: 1 << 14, code: 14, title: 'W14: Fan Blocked', description: 'Cooling fan is blocked or operating at reduced speed.' },
  { bit: 15, mask: 1 << 15, code: 15, title: 'W15: PV Energy Too Low', description: 'Solar input energy is too low to use.', isPvRelated: true },
  { bit: 16, mask: 1 << 16, code: 16, title: 'Parallel Comm Interrupted', description: 'Parallel communication link interrupted.' },
  { bit: 17, mask: 1 << 17, code: 17, title: 'Output Mode Mismatch', description: 'Single/Parallel output mode mismatch.' },
  { bit: 18, mask: 1 << 18, code: 18, title: 'Parallel Battery Voltage Diff', description: 'Parallel battery voltage difference is too large.' },
  { bit: 19, mask: 1 << 19, code: 19, title: 'Lithium Battery Comm Abnormal', description: 'Lithium battery BMS communication abnormal.' },
  { bit: 20, mask: 1 << 20, code: 20, title: 'Battery Discharge Over-Current', description: 'Battery discharge current exceeds set value.' },
];

/**
 * Checks whether a warning code is purely PV-related.
 */
export function isPvWarningCode(code: number | null): boolean {
  if (code === null || code === 0 || isNaN(code)) return false;
  if (code === 64 || code === 32768 || code === 15) return true;
  const pvMask = (1 << 6) | (1 << 15);
  if ((code & pvMask) !== 0 && (code & ~pvMask) === 0) return true;
  return false;
}

/**
 * Strips PV-related warning flags (bits 6, 15) and normal AC grid blackout /
 * Off-Grid transition flags (bits 0..5: Off-Grid, Mains Low Voltage, Mains Waveform/Freq)
 * when operating in UPS mode without solar panels.
 * Returns the effective warning code and whether any genuine hardware/battery warning remains active.
 */
export function filterWarningCodeForNoSolar(warningCode: number | null): {
  effectiveCode: number | null;
  hasNonPvWarning: boolean;
} {
  if (warningCode === null || warningCode === 0 || isNaN(warningCode)) {
    return { effectiveCode: null, hasNonPvWarning: false };
  }

  // In modbus_smg:
  // Bits 0..5 (mask 0b111111 = 63): Mains/Grid outage status bits
  //   - Bit 0 (1): Off-Grid autonomous mode
  //   - Bit 1 (2): Mains Waveform Abnormal (during grid disconnect)
  //   - Bit 2 (4): Vendor Bit 2
  //   - Bit 3 (8): Mains Low Voltage (0V during grid blackout -> 64 + 8 + 1 = 73)
  //   - Bit 4 (16): Mains Over Frequency
  //   - Bit 5 (32): Mains Low Frequency
  // Bit 6 (64) & Bit 15 (32768): PV Low Voltage / PV Energy Too Low
  // Bit 11 (2048): Battery Equalization informational status
  const suppressMask = 0b111111 | (1 << 6) | (1 << 11) | (1 << 15);
  const remaining = warningCode & ~suppressMask;

  if (remaining === 0) {
    return { effectiveCode: null, hasNonPvWarning: false };
  }

  return { effectiveCode: remaining, hasNonPvWarning: true };
}


/**
 * Resolves comprehensive warning details, decoding bitmasks and utilizing HA details text.
 */
export function getWarningDetail(
  code: number,
  detailsText?: string | null
): { title: string; description: string; isBitmask: boolean; isPv: boolean } {
  if (code === 0 || isNaN(code)) {
    return {
      title: 'No Warnings',
      description: 'Warnings are absent.',
      isBitmask: false,
      isPv: false,
    };
  }

  // Check if this matches active bits in Modbus bitmask
  const activeBits = MODBUS_WARNING_BITS.filter((b) => (code & b.mask) !== 0);

  if (activeBits.length > 1) {
    const titles = activeBits.map((b) => b.title).join('; ');
    const descriptions = activeBits.map((b) => `${b.title}: ${b.description}`).join(' | ');
    const hasPv = activeBits.some((b) => b.isPvRelated);
    return {
      title: titles,
      description: detailsText ? `${descriptions} (Status: ${detailsText})` : descriptions,
      isBitmask: true,
      isPv: hasPv,
    };
  }

  // If matched exactly 1 bit from bitmask table, prioritize bitmask definition
  if (activeBits.length === 1) {
    const bit = activeBits[0];
    return {
      title: bit.title,
      description: detailsText && detailsText !== bit.title
        ? `${bit.description} (Status: ${detailsText})`
        : bit.description,
      isBitmask: true,
      isPv: !!bit.isPvRelated,
    };
  }

  // Single direct code lookup in WARNING_CODES
  const direct = WARNING_CODES[code];
  if (direct) {
    return {
      title: direct.title,
      description: detailsText && detailsText !== direct.title
        ? `${direct.description} (Status: ${detailsText})`
        : direct.description,
      isBitmask: false,
      isPv: !!direct.isPvRelated,
    };
  }

  // Fallback with HA detailsText if available
  const fallbackTitle = detailsText || `Warning W${code}`;
  const fallbackDesc = detailsText
    ? `Inverter reports: ${detailsText}`
    : 'Inverter reported an operational parameter deviation.';

  return {
    title: fallbackTitle,
    description: fallbackDesc,
    isBitmask: false,
    isPv: code === 64 || code === 15,
  };
}

/**
 * Resolves comprehensive fault details, utilizing HA details text when available.
 */
export function getFaultDetail(code: number, detailsText?: string | null): FaultDetail {
  const direct = FAULT_CODES[code];
  if (direct) {
    if (detailsText && detailsText !== direct.title && detailsText !== 'N/A' && detailsText !== '0') {
      return {
        ...direct,
        description: `${direct.description} (Inverter: ${detailsText})`,
      };
    }
    return direct;
  }

  return {
    code,
    title: detailsText || `Fault Code F${code}`,
    description: detailsText
      ? `Inverter reports error: ${detailsText}`
      : 'Hardware or firmware fault detected by inverter.',
    recommendation: 'Check inverter LCD display messages and documentation.',
    severity: 'critical',
  };
}
