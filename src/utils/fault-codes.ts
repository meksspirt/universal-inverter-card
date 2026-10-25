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
export const MODBUS_WARNING_BITS_RU: Record<number, { title: string; description: string }> = {
  0: { title: 'Автономный режим (От батареи)', description: 'Инвертор питает дом от аккумулятора при отсутствии городской сети.' },
  1: { title: 'Искажение формы сети', description: 'Форма напряжения в городской сети искажена во время аварии или переключения.' },
  2: { title: 'Статусный бит 2', description: 'Служебный статус инвертора.' },
  3: { title: 'Отключение сети (0В)', description: 'Напряжение в городской сети 0В или ниже нормы (отключение электричества).' },
  4: { title: 'Высокая частота сети', description: 'Частота переменного тока в городской сети превысила норму.' },
  5: { title: 'Низкая частота сети', description: 'Частота переменного тока в городской сети упала ниже нормы.' },
  6: { title: 'Низкое напряжение панелей', description: 'Напряжение панелей ниже порога запуска MPPT (пасмурно или ночь).' },
  7: { title: 'W02: Повышенная температура', description: 'Температура радиатора охлаждения инвертора повышена.' },
  8: { title: 'W04: Низкое напряжение батареи', description: 'Напряжение аккумулятора упало до уровня предупреждения.' },
  9: { title: 'W09: Батарея не подключена', description: 'Цепь аккумулятора разомкнута или батарея не обнаружена.' },
  10: { title: 'W07: Перегрузка инвертора', description: 'Потребление дома приближается к номинальной мощности инвертора.' },
  11: { title: 'Выравнивающий заряд АКБ', description: 'Идет цикл выравнивания аккумулятора.' },
  12: { title: 'Батарея глубоко разряжена', description: 'Батарея разряжена ниже порога автовосстановления.' },
  13: { title: 'W10: Ограничение мощности', description: 'Инвертор временно снизил мощность из-за нагрева.' },
  14: { title: 'W14: Вентилятор заблокирован', description: 'Вентилятор охлаждения остановлен или забит пылью.' },
  15: { title: 'W15: Слабая энергия солнца', description: 'Мощность солнечных панелей недостаточна для MPPT.' },
  16: { title: 'Сбой параллельной связи', description: 'Нарушена связь между параллельными блоками.' },
  17: { title: 'Несовпадение режима выхода', description: 'Несовпадение одиночного и параллельного режима.' },
  18: { title: 'Разность напряжений батарей', description: 'Большая разница напряжений между параллельными АКБ.' },
  19: { title: 'Сбой связи с BMS батареи', description: 'Потеряна телеметрия RS485/CAN с BMS аккумулятора.' },
  20: { title: 'Сверхток разряда АКБ', description: 'Ток разряда аккумулятора превысил безопасный предел.' },
};

export function getWarningDetail(
  code: number,
  detailsText?: string | null,
  language?: string
): { title: string; description: string; isBitmask: boolean; isPv: boolean } {
  const isUk = language === 'uk';
  const isRu = language === 'ru';
  if (code === 0 || isNaN(code)) {
    return {
      title: isUk ? 'Немає попереджень' : isRu ? 'Нет предупреждений' : 'No Warnings',
      description: isUk ? 'Попередження відсутні.' : isRu ? 'Предупреждения отсутствуют.' : 'Warnings are absent.',
      isBitmask: false,
      isPv: false,
    };
  }

  // Check if this matches active bits in Modbus bitmask
  const activeBits = MODBUS_WARNING_BITS.filter((b) => (code & b.mask) !== 0);

  if (activeBits.length > 1) {
    const titles = activeBits
      .map((b) => (isRu && MODBUS_WARNING_BITS_RU[b.code]?.title) || b.title)
      .join('; ');
    const descriptions = activeBits
      .map((b) => {
        const t = (isRu && MODBUS_WARNING_BITS_RU[b.code]?.title) || b.title;
        const d = (isRu && MODBUS_WARNING_BITS_RU[b.code]?.description) || b.description;
        return `${t}: ${d}`;
      })
      .join(' | ');
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
    const bTitle = (isRu && MODBUS_WARNING_BITS_RU[bit.code]?.title) || bit.title;
    const bDesc = (isRu && MODBUS_WARNING_BITS_RU[bit.code]?.description) || bit.description;
    return {
      title: bTitle,
      description: detailsText && detailsText !== bit.title && detailsText !== bTitle
        ? `${bDesc} (Status: ${detailsText})`
        : bDesc,
      isBitmask: true,
      isPv: !!bit.isPvRelated,
    };
  }

  // Single direct code lookup in WARNING_CODES
  const direct = WARNING_CODES[code];
  const directRu = language === 'ru' ? WARNING_CODES_RU[code] : undefined;
  if (direct) {
    const title = directRu?.title || direct.title;
    const desc = directRu?.description || direct.description;
    return {
      title,
      description: detailsText && detailsText !== direct.title && detailsText !== directRu?.title
        ? `${desc} (Status: ${detailsText})`
        : desc,
      isBitmask: false,
      isPv: !!direct.isPvRelated,
    };
  }

  // Fallback with HA detailsText if available
  const fallbackTitle = detailsText || (isRu ? `Предупреждение W${code}` : `Warning W${code}`);
  const fallbackDesc = detailsText
    ? (isRu ? `Отчет инвертора: ${detailsText}` : `Inverter reports: ${detailsText}`)
    : (isRu ? 'Инвертор сообщил об отклонении рабочего параметра.' : 'Inverter reported an operational parameter deviation.');

  return {
    title: fallbackTitle,
    description: fallbackDesc,
    isBitmask: false,
    isPv: code === 64 || code === 15,
  };
}

export const FAULT_CODES_RU: Record<number, Partial<FaultDetail>> = {
  0: {
    title: 'Норма',
    description: 'Инвертор работает в штатном режиме. Ошибок не обнаружено.',
    recommendation: 'Система функционирует нормально.',
  },
  1: {
    title: 'Вентилятор заблокирован',
    description: 'Охлаждающий вентилятор остановлен или заклинен посторонним предметом.',
    recommendation: 'Проверьте решетки охлаждения, очистите вентиляторы от пыли или помех.',
  },
  2: {
    title: 'Перегрев инвертора',
    description: 'Температура внутреннего радиатора превысила безопасный порог (>100°C).',
    recommendation: 'Обеспечьте приток свежего воздуха, снизьте нагрузку дома и дайте инвертору остыть.',
  },
  3: {
    title: 'Перенапряжение батареи',
    description: 'Напряжение на клеммах аккумулятора превысило максимальный предел безопасности.',
    recommendation: 'Проверьте настройки напряжения заряда Bulk/Float и параметры BMS.',
  },
  4: {
    title: 'Критический разряд батареи',
    description: 'Напряжение батареи упало ниже порога защитного отключения.',
    recommendation: 'Включите сетевое питание AC для заряда или отключите мощные электроприборы.',
  },
  5: {
    title: 'Короткое замыкание на выходе',
    description: 'Обнаружено короткое замыкание или сверхток в выходной цепи 230В дома.',
    recommendation: 'Немедленно отключите автоматы нагрузки и устраните замыкание в проводке или приборах.',
  },
  6: {
    title: 'Высокое напряжение на выходе',
    description: 'Выходное напряжение AC 230В превысило безопасный диапазон (>260В).',
    recommendation: 'Отключите чувствительную технику, перезапустите инвертор. При повторении требуется сервис.',
  },
  7: {
    title: 'Перегрузка по времени',
    description: 'Подключенная нагрузка превышала номинальную мощность дольше допустимого времени.',
    recommendation: 'Отключите мощные потребители (бойлер, электроплиту, чайник, обогреватели).',
  },
  8: {
    title: 'Высокое напряжение шины DC',
    description: 'Напряжение внутренней высоковольтной шины DC превысило порог безопасности.',
    recommendation: 'Перезапустите инвертор. Если ошибка повторяется, проверьте напряжение Voc солнечных панелей.',
  },
  9: {
    title: 'Сбой плавного пуска шины',
    description: 'Цепь плавного предзаряда высоковольтной шины DC не смогла выйти на режим.',
    recommendation: 'Проверьте стабильность напряжения АКБ и панелей, затем перезапустите инвертор.',
  },
  10: {
    title: 'Сверхток солнечных панелей',
    description: 'Входной ток от солнечных панелей превысил допустимый предел контроллера MPPT.',
    recommendation: 'Проверьте схему параллельного соединения солнечных стрингов.',
  },
  11: {
    title: 'Перенапряжение солнечных панелей',
    description: 'Напряжение холостого хода панелей (Voc) превысило максимальный предел MPPT.',
    recommendation: 'Немедленно отключите солнечный автомат, уменьшите число панелей в последовательной цепочке.',
  },
  12: {
    title: 'Сверхток преобразователя DC-DC',
    description: 'Обнаружен сверхток в каскаде DC-DC преобразования батареи.',
    recommendation: 'Проверьте надежность затяжки клемм АКБ, целостность кабелей и исключите броски пусковых токов.',
  },
  13: {
    title: 'Бросок тока инвертора',
    description: 'Сработала аппаратная защита из-за резкого импульса тока или пусковой перегрузки.',
    recommendation: 'Избегайте одновременного пуска мощных индуктивных нагрузок (насосы, компрессоры, моторы).',
  },
  14: {
    title: 'Низкое напряжение шины DC',
    description: 'Напряжение шины DC просело ниже минимально допустимого рабочего уровня.',
    recommendation: 'Проверьте просадку напряжения аккумулятора под нагрузкой и стабильность сети.',
  },
  51: {
    title: 'Сверхток силового моста',
    description: 'Сработала аппаратная защита силовых транзисторов (IGBT/MOSFET) от перегрузки по току.',
    recommendation: 'Отключите приборы с высокими пусковыми токами, перезапустите инвертор по питанию.',
  },
  52: {
    title: 'Критически низкая шина DC',
    description: 'Напряжение внутренней шины DC резко упало ниже порога генерации 230В.',
    recommendation: 'Проверьте состояние батареи, клеммные соединения и наконечники силовых проводов.',
  },
  53: {
    title: 'Сбой плавного пуска инвертора',
    description: 'Не удалось сформировать плавную синусоиду 230В на выходе при включении.',
    recommendation: 'Отключите все нагрузки перед включением кнопки питания инвертора.',
  },
  55: {
    title: 'Постоянный ток на выходе AC',
    description: 'Обнаружена опасная постоянная составляющая напряжения на выходе 230В.',
    recommendation: 'Опасно для трансформаторов и моторов! Немедленно отключите нагрузку и обратитесь в сервис.',
  },
  56: {
    title: 'Батарея не обнаружена',
    description: 'Инвертор потерял контакт с аккумулятором во время работы.',
    recommendation: 'Проверьте автомат АКБ, плавкий предохранитель и контакт на клеммах батареи.',
  },
  57: {
    title: 'Отказ датчика тока',
    description: 'Сбой калибровки нуля или потеря сигнала внутреннего датчика тока (датчик Холла).',
    recommendation: 'Перезапустите инвертор. При повторении ошибки требуется диагностика платы управления.',
  },
  58: {
    title: 'Просадка выходного напряжения',
    description: 'Инвертор не может удержать 230В (напряжение просело ниже 190В) из-за тяжелой перегрузки.',
    recommendation: 'Снизьте нагрузку на инвертор.',
  },
  59: {
    title: 'Ошибка связи плат управления',
    description: 'Потеряна внутренняя связь между микроконтроллером и силовой платой.',
    recommendation: 'Перезагрузите инвертор. При сохранении ошибки проверьте внутренние шлейфы.',
  },
  60: {
    title: 'Сбой синхронизации с сетью',
    description: 'Обнаружен обратный переток мощности или сбой синхронизации фазы при переходе на байпас.',
    recommendation: 'Проверьте правильность подключения фазы и нуля (L/N) на входе инвертора.',
  },
  71: {
    title: 'Несовместимость прошивки / BMS',
    description: 'Несовпадение версии прошивки или потеря связи по протоколу с BMS аккумулятора.',
    recommendation: 'Проверьте кабель связи BMS и выбранный протокол обмена в настройках батареи.',
  },
  72: {
    title: 'Критическая авария BMS',
    description: 'Система управления батареей (BMS) послала сигнал аварийного отключения.',
    recommendation: 'Проверьте состояние аккумулятора и журнал аварий в приложении BMS.',
  },
  80: {
    title: 'Сбой шины CAN параллельного режима',
    description: 'Потеряна связь по шине CAN между параллельно соединенными инверторами.',
    recommendation: 'Проверьте кабели связи CAN и согласующие терминальные резисторы.',
  },
  81: {
    title: 'Потеря ведущего инвертора (Master)',
    description: 'Ведомый инвертор (Slave) потерял связь с ведущим блоком (Master).',
    recommendation: 'Проверьте питание и состояние ведущего инвертора, а также кабели связи.',
  },
  82: {
    title: 'Рассинхронизация фаз AC',
    description: 'Параллельные инверторы не смогли синхронизировать фазы выходного напряжения.',
    recommendation: 'Убедитесь, что все блоки подключены к одной фазе сетевого входа.',
  },
};

export const WARNING_CODES_RU: Record<number, { title: string; description: string }> = {
  0: { title: 'Нет предупреждений', description: 'Система работает штатно без предупреждений.' },
  1: { title: 'Автономный режим (От батареи)', description: 'Инвертор питает дом от аккумулятора (сеть отключена).' },
  2: { title: 'Искажение формы сети', description: 'Форма напряжения в городской сети искажена во время аварии или переключения.' },
  4: { title: 'Низкий заряд батареи', description: 'Напряжение АКБ снизилось до порога предупреждения (рекомендуется заряд).' },
  7: { title: 'Предупреждение: Высокая нагрузка', description: 'Потребление дома приближается к предельной мощности инвертора.' },
  8: { title: 'Низкое напряжение сети / Авария', description: 'Напряжение в сети 0В или ниже нормы (отключение электричества).' },
  10: { title: 'Ограничение мощности (Derating)', description: 'Инвертор снижает мощность для предотвращения перегрева.' },
  14: { title: 'Вентилятор замедлен', description: 'Вентилятор охлаждения заблокирован или работает на пониженных оборотах.' },
  15: { title: 'Слабая солнечная генерация', description: 'Напряжение панелей ниже рабочего диапазона MPPT (ночь или нет панелей).' },
  16: { title: 'Высокая частота сети', description: 'Частота переменного тока в городской сети превысила норму.' },
  19: { title: 'Сбой связи с литиевой BMS', description: 'Потеряна связь телеметрии RS485/CAN с BMS аккумулятора.' },
  20: { title: 'Превышение тока разряда АКБ', description: 'Ток разряда аккумулятора превысил настроенный порог.' },
  32: { title: 'Низкая частота сети', description: 'Частота переменного тока в городской сети упала ниже нормы.' },
  64: { title: 'Низкое напряжение солнечных панелей', description: 'Напряжение панелей ниже порога запуска MPPT (пасмурно или ночь).' },
  128: { title: 'Повышенная температура инвертора', description: 'Температура радиатора охлаждения повышена.' },
  256: { title: 'Низкое напряжение батареи', description: 'Напряжение батареи упало до уровня предупреждения.' },
  512: { title: 'Батарея не подключена', description: 'Цепь аккумулятора разомкнута или батарея не обнаружена.' },
  1024: { title: 'Высокая нагрузка дома', description: 'Потребление дома превышает номинал инвертора.' },
  2048: { title: 'Выравнивание батареи активно', description: 'Идет цикл выравнивающего заряда батареи.' },
  4096: { title: 'Глубокий разряд аккумулятора', description: 'Батарея разряжена ниже порога автовосстановления.' },
  8192: { title: 'Ограничение мощности по температуре', description: 'Инвертор временно ограничивает мощность из-за нагрева.' },
  16384: { title: 'Вентилятор заблокирован', description: 'Вентилятор охлаждения остановлен или забит пылью.' },
  32768: { title: 'Слабая энергия солнца', description: 'Мощность солнечных панелей недостаточна для преобразования.' },
  524288: { title: 'Сбой связи с BMS', description: 'Потеряна связь RS485/CAN с контроллером батареи.' },
  1048576: { title: 'Сверхток разряда АКБ', description: 'Ток разряда аккумулятора превысил безопасный предел.' },
};

/**
 * Resolves comprehensive fault details, utilizing HA details text when available.
 */
export function getFaultDetail(code: number, detailsText?: string | null, language?: string): FaultDetail {
  const direct = FAULT_CODES[code];
  const directRu = (language === 'ru' || language === 'uk') ? FAULT_CODES_RU[code] : undefined;

  if (direct) {
    const title = directRu?.title || direct.title;
    const desc = directRu?.description || direct.description;
    const rec = directRu?.recommendation || direct.recommendation;

    if (detailsText && detailsText !== direct.title && detailsText !== directRu?.title && detailsText !== 'N/A' && detailsText !== '0') {
      const invLabel = language === 'uk' ? 'Інвертор' : language === 'ru' ? 'Инвертор' : 'Inverter';
      return {
        ...direct,
        title,
        description: `${desc} (${invLabel}: ${detailsText})`,
        recommendation: rec,
      };
    }
    return {
      ...direct,
      title,
      description: desc,
      recommendation: rec,
    };
  }

  const isUk = language === 'uk';
  const isRu = language === 'ru';
  return {
    code,
    title: detailsText || (isUk ? `Код аварії F${code}` : isRu ? `Код аварии F${code}` : `Fault Code F${code}`),
    description: detailsText
      ? (isUk ? `Звіт інвертора про аварію: ${detailsText}` : isRu ? `Отчет инвертора об аварии: ${detailsText}` : `Inverter reports error: ${detailsText}`)
      : (isUk ? 'Інвертор виявив апаратний або програмний збій.' : isRu ? 'Инвертор обнаружил аппаратный или программный сбой.' : 'Hardware or firmware fault detected by inverter.'),
    recommendation: isUk
      ? 'Перевірте повідомлення на дисплеї інвертора та документацію виробника.'
      : isRu
      ? 'Проверьте сообщения на дисплее инвертора и документацию производителя.'
      : 'Check inverter LCD display messages and documentation.',
    severity: 'critical',
  };
}
