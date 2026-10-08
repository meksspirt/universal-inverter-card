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
  2: { title: 'Inverter High Temperature', description: 'Heatsink temperature elevated, fans running at maximum speed.' },
  3: { title: 'Battery Over-Charged', description: 'Battery voltage close to high cut-off threshold.' },
  4: { title: 'Low Battery Voltage', description: 'Battery voltage below warning threshold (recharge recommended).' },
  7: { title: 'Overload Warning', description: 'Home consumption approaching rated inverter limit (4.2 kW).' },
  8: { title: 'Battery Disconnected', description: 'Battery circuit open or battery not detected.' },
  10: { title: 'Output Power Derating', description: 'Inverter automatically derating power to prevent overheating.' },
  12: { title: 'Solar Charger Stopped: Low Battery', description: 'MPPT charger suspended due to deep battery discharge.' },
  13: { title: 'Solar Charger Stopped: High PV Voltage', description: 'Solar array voltage exceeded safe operating range of MPPT.', isPvRelated: true },
  14: { title: 'Solar Charger Stopped: Overload / Fan', description: 'Solar charger derated or stopped due to overload or fan speed drop.' },
  15: { title: 'PV Energy Weak', description: 'Solar voltage below MPPT operating threshold (dusk, night, or panels not connected).', isPvRelated: true },
  16: { title: 'Parallel / Grid Comm Fault', description: 'Synchronization error between units or unstable AC line.' },
  19: { title: 'Lithium Battery Comm Failure', description: 'Lost data telemetry with lithium battery protocol.' },
  20: { title: 'BMS Communication Lost', description: 'No response from battery BMS over CAN/RS485 cable.' },
  21: { title: 'Lithium Battery Over-Current', description: 'Current through battery exceeded BMS protection threshold.' },
  32: { title: 'Communication Board / EEPROM Warning', description: 'Internal communication bus or EEPROM memory warning.' },
  61: { title: 'Battery Discharge Over-Current', description: 'Battery discharge current exceeded rated parameter.' },
  62: { title: 'Battery Charge Over-Current', description: 'Total charge current from grid and solar exceeded battery limit.' },
  63: { title: 'Battery Over-Temperature', description: 'Battery cell temperature probe exceeded safety threshold.' },
  64: { title: 'PV Low Voltage', description: 'Solar array voltage below MPPT operating threshold (panels not connected or overcast).', isPvRelated: true },
  65: { title: 'Battery Under-Temperature', description: 'Battery temperature too low for charging (LiFePO4 risk below 0°C).' },
  67: { title: 'Critical Battery Under-Voltage', description: 'Battery voltage approaching inverter shutdown threshold.' },
  68: { title: 'Charge Stopped: High Battery Temp', description: 'Charging halted automatically due to battery overheating.' },
  69: { title: 'Charge Stopped: Low Battery Temp', description: 'Charging halted to protect battery cells from freezing.' },
  70: { title: 'Discharge Stopped: High Battery Temp', description: 'Discharging halted to protect cells from thermal stress.' },
  72: { title: 'Lithium Battery Comm Lost', description: 'Inverter is not receiving telemetry from lithium battery.' },
  73: { title: 'BMS Protection Active', description: 'Battery built-in BMS entered protection mode.' },
};

/**
 * Modbus warning bitmask definitions (registers 105, 108, 109)
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
  { bit: 0, mask: 1 << 0, code: 1, title: 'Off-Grid Mode', description: 'Inverter operating in autonomous battery mode (grid outage).', isInformational: true },
  { bit: 1, mask: 1 << 1, code: 2, title: 'W02: Inverter Over-Temperature', description: 'Internal heatsink temperature is elevated.' },
  { bit: 2, mask: 1 << 2, code: 4, title: 'W04: Low Battery Voltage', description: 'Battery voltage has dropped below warning threshold.' },
  { bit: 3, mask: 1 << 3, code: 8, title: 'W08: Battery Disconnected', description: 'Battery circuit is open or battery is not detected.' },
  { bit: 4, mask: 1 << 4, code: 7, title: 'W07: Overload Warning', description: 'Home consumption is approaching rated inverter power (4.2 kW).' },
  { bit: 5, mask: 1 << 5, code: 32, title: 'W32: Comm Board / EEPROM Error', description: 'Internal communication bus or configuration memory failure.' },
  { bit: 6, mask: 1 << 6, code: 64, title: 'W64: PV Low Voltage', description: 'Solar array voltage below MPPT startup range (panels not connected or overcast).', isPvRelated: true },
  { bit: 7, mask: 1 << 7, code: 53, title: 'Inverter Soft-Start Warning', description: 'Inverter bridge soft-start pre-charge warning.' },
  { bit: 8, mask: 1 << 8, code: 55, title: 'DC Voltage on AC Output', description: 'DC voltage component detected on the 230V AC output.' },
  { bit: 9, mask: 1 << 9, code: 56, title: 'Battery Open Circuit', description: 'Inverter detected open battery circuit during operation.' },
  { bit: 10, mask: 1 << 10, code: 57, title: 'Current Sensor Fault', description: 'Inverter current sensor calibration deviation.' },
  { bit: 11, mask: 1 << 11, code: 11, title: 'MPPT Over-Current', description: 'Solar input current exceeded MPPT controller limit.', isPvRelated: true },
  { bit: 12, mask: 1 << 12, code: 12, title: 'MPPT Over-Temperature', description: 'Solar charger heatsink temperature is high.', isPvRelated: true },
  { bit: 13, mask: 1 << 13, code: 13, title: 'MPPT High Battery Voltage', description: 'Solar charger detected high battery terminal voltage.' },
  { bit: 14, mask: 1 << 14, code: 14, title: 'W14: Fan Blocked', description: 'Cooling fan operating at reduced speed or blocked by dust.' },
  { bit: 15, mask: 1 << 15, code: 15, title: 'AC Line Abnormal', description: 'Utility grid AC voltage or frequency out of acceptable bounds.' },
];

/**
 * Checks whether a warning code is purely PV-related.
 */
export function isPvWarningCode(code: number | null): boolean {
  if (code === null || code === 0 || isNaN(code)) return false;
  if (code === 64 || code === 15 || code === 13) return true;
  // If bitmask with only PV bit (bit 6 = 64) set
  const pvMask = 1 << 6;
  if ((code & pvMask) !== 0 && (code & ~pvMask) === 0) return true;
  return false;
}

/**
 * Strips PV-related warning flags and normal Off-Grid battery backup flags when
 * solar generation is disabled (UPS mode without solar panels).
 * Returns the effective warning code and whether any genuine non-PV hardware warning remains active.
 */
export function filterWarningCodeForNoSolar(warningCode: number | null): {
  effectiveCode: number | null;
  hasNonPvWarning: boolean;
} {
  if (warningCode === null || warningCode === 0 || isNaN(warningCode)) {
    return { effectiveCode: null, hasNonPvWarning: false };
  }

  // Direct single PV code matches or normal Off-Grid flag (code 1)
  if (warningCode === 64 || warningCode === 15 || warningCode === 13 || warningCode === 1) {
    return { effectiveCode: null, hasNonPvWarning: false };
  }

  // Bitmask filtering:
  // Bit 6 (64): PV Low Voltage (always set when no solar panels)
  // Bit 0 (1): Off-Grid / Battery Backup mode (raised normally on AC grid outage)
  // When running as a UPS without solar, 64 (no sun) + 1 (running on battery during blackout) = 65.
  // This is completely normal operation, not an equipment fault!
  const pvBitMask = 1 << 6; // 64
  const offGridBitMask = 1 << 0; // 1

  let remaining = (warningCode & pvBitMask) !== 0 ? (warningCode & ~pvBitMask) : warningCode;
  if ((remaining & offGridBitMask) !== 0) {
    remaining = remaining & ~offGridBitMask;
  }

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

  // Check if this matches multiple active bits in Modbus bitmask
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

  // If matched exactly 1 bit from bitmask table
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
