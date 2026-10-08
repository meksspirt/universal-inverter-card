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
    title: 'Норма',
    description: 'Ошибок в работе инвертора не обнаружено.',
    recommendation: 'Система функционирует штатно.',
    severity: 'info',
  },
  1: {
    code: 1,
    title: 'Вентилятор заблокирован',
    description: 'Вентилятор охлаждения остановлен или заблокирован посторонним предметом.',
    recommendation: 'Проверьте решетки охлаждения, очистите вентиляторы от пыли.',
    severity: 'critical',
  },
  2: {
    code: 2,
    title: 'Перегрев инвертора',
    description: 'Внутренняя температура радиатора силовых ключей превысила допустимый предел (>100°C).',
    recommendation: 'Обеспечьте циркуляцию воздуха, снизьте нагрузку на инвертор.',
    severity: 'critical',
  },
  3: {
    code: 3,
    title: 'Перенапряжение батареи',
    description: 'Напряжение на клеммах аккумулятора превысило максимальный порог безопасности.',
    recommendation: 'Проверьте настройки Bulk/Float и параметры заряда на BMS.',
    severity: 'critical',
  },
  4: {
    code: 4,
    title: 'Критический разряд батареи',
    description: 'Аккумулятор полностью разряжен ниже минимального защитного порога отсечки.',
    recommendation: 'Подключите сетевое питание 230В для заряда батареи или снизьте нагрузку.',
    severity: 'warning',
  },
  5: {
    code: 5,
    title: 'Короткое замыкание на выходе',
    description: 'Обнаружено короткое замыкание или сверхток в цепи потребителей 230В дома.',
    recommendation: 'Немедленно отключите автоматические выключатели нагрузок и устраните КЗ.',
    severity: 'critical',
  },
  6: {
    code: 6,
    title: 'Выходное напряжение завышено',
    description: 'Выходное переменное напряжение инвертора превысило допустимую норму (>260В).',
    recommendation: 'Отключите чувствительную бытовую технику, перезапустите инвертор.',
    severity: 'critical',
  },
  7: {
    code: 7,
    title: 'Таймаут перегрузки',
    description: 'Суммарная нагрузка превышала номинальную мощность дольше допустимого лимита времени.',
    recommendation: 'Отключите мощные электроприборы (бойлер, чайник, обогреватель).',
    severity: 'warning',
  },
  8: {
    code: 8,
    title: 'Перенапряжение шины DC',
    description: 'Внутренняя постоянная шина высокого напряжения инвертора превысила безопасный предел.',
    recommendation: 'Перезагрузите инвертор. При повторении проверьте параметры солнечных панелей.',
    severity: 'critical',
  },
  9: {
    code: 9,
    title: 'Ошибка софт-старта шины DC',
    description: 'Сбой плавного пуска силовой высоковольтной части инвертора при включении.',
    recommendation: 'Проверьте входные напряжения PV и аккумулятора, перезапустите инвертор.',
    severity: 'critical',
  },
  10: {
    code: 10,
    title: 'Перегрузка по току PV',
    description: 'Входной ток от солнечных панелей превысил максимально допустимый ток контроллера MPPT.',
    recommendation: 'Проверьте конфигурацию стрингов солнечных модулей.',
    severity: 'critical',
  },
  11: {
    code: 11,
    title: 'Перенапряжение на входе PV',
    description: 'Напряжение холостого хода солнечных панелей превысило максимально допустимый предел MPPT.',
    recommendation: 'Немедленно отключите солнечные панели, уменьшите количество последовательных панелей.',
    severity: 'critical',
  },
  12: {
    code: 12,
    title: 'Перегрузка преобразователя DC-DC',
    description: 'Зафиксирован сверхток в низковольтном преобразователе аккумуляторного блока.',
    recommendation: 'Проверьте надежность кабелей аккумулятора и отсутствие импульсных перегрузок.',
    severity: 'critical',
  },
  13: {
    code: 13,
    title: 'Аппаратный бросок тока',
    description: 'Резкий скачок пускового тока или аппаратное срабатывание защиты силовых транзисторов.',
    recommendation: 'Исключите одновременный пуск двигателей, насосов и тяжелых индуктивных нагрузок.',
    severity: 'critical',
  },
  14: {
    code: 14,
    title: 'Критическая просадка шины DC',
    description: 'Напряжение высоковольтной шины опустилось ниже минимального рабочего уровня преобразования.',
    recommendation: 'Проверьте состояние аккумулятора под нагрузкой и стабильность питающей сети.',
    severity: 'warning',
  },
  51: {
    code: 51,
    title: 'Токовая перегрузка инвертора',
    description: 'Аппаратная защита силовых ключей инверторного моста по предельному импульсному току.',
    recommendation: 'Отключите приборы с высокими пусковыми токами, перезапустите инвертор.',
    severity: 'critical',
  },
  52: {
    code: 52,
    title: 'Просадка напряжения шины DC',
    description: 'Напряжение шины DC резко упало ниже порога генерации 230В.',
    recommendation: 'Проверьте состояние батареи, кабельные наконечники и затяжку клемм.',
    severity: 'warning',
  },
  53: {
    code: 53,
    title: 'Сбой софт-старта инвертора',
    description: 'Сбой плавного формирования выходного синусоидального напряжения 230В при запуске.',
    recommendation: 'Отключите все внешние нагрузки 230В перед повторным включением инвертора.',
    severity: 'critical',
  },
  55: {
    code: 55,
    title: 'Постоянное напряжение на выходе AC',
    description: 'Обнаружена опасная постоянная составляющая в выходном переменном напряжении 230В.',
    recommendation: 'Опасно для двигателей и трансформаторов! Немедленно отключите нагрузки и обратитесь в сервис.',
    severity: 'critical',
  },
  56: {
    code: 56,
    title: 'Цепь батареи разомкнута',
    description: 'Инвертор не обнаружил подключенный аккумулятор во время работы.',
    recommendation: 'Проверьте автомат батареи, предохранитель и силовые кабели.',
    severity: 'critical',
  },
  57: {
    code: 57,
    title: 'Сбой датчика тока',
    description: 'Внутренняя ошибка или неисправность датчика измерения тока инвертора.',
    recommendation: 'Перезагрузите устройство. При повторении требуется обслуживание силовой платы.',
    severity: 'critical',
  },
  58: {
    code: 58,
    title: 'Выходное напряжение занижено',
    description: 'Инвертор не может удержать 230В на выходе (напряжение ниже 190В) из-за перегрузки.',
    recommendation: 'Снизьте нагрузку на дом.',
    severity: 'warning',
  },
  59: {
    code: 59,
    title: 'Сбой связи плат управления',
    description: 'Потеря связи между внутренней управляющей платой и силовым модулем инвертора.',
    recommendation: 'Перезагрузите инвертор. При повторении проверьте внутренние шлейфы.',
    severity: 'critical',
  },
  60: {
    code: 60,
    title: 'Ошибка обратной мощности сети',
    description: 'Обнаружен обратный ток в сеть или рассинхронизация при переключении байпаса.',
    recommendation: 'Проверьте параметры входной электросети и фазировку подключения.',
    severity: 'warning',
  },
  71: {
    code: 71,
    title: 'Несовместимость прошивки / BMS',
    description: 'Несовместимость версий прошивки или потеря связи по протоколу батареи BMS.',
    recommendation: 'Проверьте кабель связи BMS и соответствие выбранного протокола литиевой батареи.',
    severity: 'critical',
  },
  72: {
    code: 72,
    title: 'Критическая ошибка BMS',
    description: 'Встроенная система управления аккумулятором передала сигнал аварийного отключения.',
    recommendation: 'Проверьте состояние батареи и ошибки в приложении BMS аккумулятора.',
    severity: 'critical',
  },
  80: {
    code: 80,
    title: 'Сбой шины CAN параллельной работы',
    description: 'Потеряна связь по кабелю CAN между инверторами в параллельной конфигурации.',
    recommendation: 'Проверьте кабели параллельного соединения и терминаторы шины.',
    severity: 'critical',
  },
  81: {
    code: 81,
    title: 'Потеря ведущего инвертора (Host Loss)',
    description: 'Ведомый инвертор потерял сигнал от ведущего блока (Master).',
    recommendation: 'Проверьте питание и состояние ведущего инвертора и целостность шлейфов.',
    severity: 'critical',
  },
  82: {
    code: 82,
    title: 'Сбой синхронизации фазы AC',
    description: 'Параллельные инверторы не смогли синхронизировать выходные фазы переменного тока.',
    recommendation: 'Проверьте одновременную подачу сетевого питания на все блоки системы.',
    severity: 'critical',
  },
};

export const WARNING_CODES: Record<number, WarningDetail> = {
  0: { title: 'Нет предупреждений', description: 'Предупреждения отсутствуют.' },
  1: { title: 'Вентилятор замедлен', description: 'Вентилятор работает на пониженных оборотах или запылен.' },
  2: { title: 'Высокая температура инвертора', description: 'Температура радиаторов повышена, вентиляторы включены на максимум.' },
  3: { title: 'Батарея перезаряжена', description: 'Напряжение АКБ близко к верхнему порогу отсечки.' },
  4: { title: 'Низкий заряд АКБ', description: 'Напряжение батареи ниже порога предупреждения (требуется зарядка).' },
  7: { title: 'Перегрузка нагрузки', description: 'Потребление дома приближается к максимуму 4.2 кВт.' },
  8: { title: 'Батарея отключена', description: 'Цепь аккумулятора разомкнута или батарея не обнаружена.' },
  10: { title: 'Дерайтинг мощности', description: 'Инвертор автоматически снижает выходную мощность для защиты от перегрева.' },
  12: { title: 'Останов заряда: разряд АКБ', description: 'Солнечный контроллер приостановил заряд из-за глубокого разряда батареи.' },
  13: { title: 'Останов заряда: высокое напряжение PV', description: 'Напряжение солнечных панелей превысило безопасный рабочий диапазон MPPT.', isPvRelated: true },
  14: { title: 'Останов заряда: перегрузка / вентилятор', description: 'Солнечный контроллер снизил ток из-за перегрузки или замедления вентилятора.' },
  15: { title: 'Низкое напряжение PV', description: 'Напряжение солнечных панелей ниже рабочего диапазона MPPT (сумерки или панели не подключены).', isPvRelated: true },
  16: { title: 'Сбой параллельной связи / сети', description: 'Ошибка синхронизации данных между блоками или нестабильность параметров сети.' },
  19: { title: 'Сбой связи с литиевой АКБ', description: 'Потерян опрос данных по протоколу связи с аккумулятором.' },
  20: { title: 'Сбой связи с BMS', description: 'Потеряна связь с протоколом BMS аккумулятора по кабелю CAN/RS485.' },
  21: { title: 'Превышение тока литиевой АКБ', description: 'Ток через батарею превысил допустимый предел, установленный в BMS.' },
  32: { title: 'Ошибка платы связи / EEPROM', description: 'Предупреждение внутренней шины коммуникации или памяти настроек EEPROM.' },
  61: { title: 'Превышение тока разряда АКБ', description: 'Ток разряда аккумулятора превышает номинальный предел.' },
  62: { title: 'Превышение тока заряда АКБ', description: 'Суммарный ток заряда батареи выше допустимого лимита.' },
  63: { title: 'Перегрев аккумулятора', description: 'Температура ячеек батареи превысила защитный порог.' },
  64: { title: 'Низкое напряжение PV (PV Low Voltage)', description: 'Напряжение солнечных панелей ниже рабочего диапазона MPPT (панели не подключены или пасмурно).', isPvRelated: true },
  65: { title: 'Низкая температура АКБ', description: 'Температура аккумулятора слишком низкая для безопасного заряда (риск деградации ячеек при <0°C).' },
  67: { title: 'Критически низкое напряжение АКБ', description: 'Напряжение аккумулятора приближается к порогу защитного отключения инвертора.' },
  68: { title: 'Останов заряда по перегреву батареи', description: 'Заряд прекращен автоматикой из-за перегрева аккумулятора.' },
  69: { title: 'Останов заряда по низкой температуре АКБ', description: 'Заряд прекращен для защиты ячеек аккумулятора от повреждения на морозе.' },
  70: { title: 'Останов разряда по перегреву батареи', description: 'Разряд прекращен для защиты ячеек батареи от критического перегрева.' },
  72: { title: 'Потеря связи с литиевой АКБ', description: 'Инвертор не получает телеметрию от литиевого аккумулятора.' },
  73: { title: 'Защита BMS активна', description: 'Встроенная плата BMS аккумулятора перешла в защитный режим.' },
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
}

export const MODBUS_WARNING_BITS: ModbusWarningBit[] = [
  { bit: 0, mask: 1 << 0, code: 1, title: 'W01: Вентилятор замедлен', description: 'Вентилятор охлаждения работает на пониженных оборотах или запылен.' },
  { bit: 1, mask: 1 << 1, code: 2, title: 'W02: Перегрев инвертора', description: 'Внутренняя температура радиаторов силовых ключей повышена.' },
  { bit: 2, mask: 1 << 2, code: 4, title: 'W04: Низкий заряд батареи', description: 'Напряжение аккумулятора опустилось ниже порога предупреждения.' },
  { bit: 3, mask: 1 << 3, code: 8, title: 'W08: Батарея отключена', description: 'Цепь аккумулятора разомкнута или АКБ не обнаружена.' },
  { bit: 4, mask: 1 << 4, code: 7, title: 'W07: Перегрузка по мощности', description: 'Потребление дома приближается к максимуму 4.2 кВт.' },
  { bit: 5, mask: 1 << 5, code: 32, title: 'W32: Ошибка платы связи / EEPROM', description: 'Сбой внутренней шины коммуникации или памяти настроек.' },
  { bit: 6, mask: 1 << 6, code: 64, title: 'W64: Низкое напряжение PV (PV Low Voltage)', description: 'Напряжение солнечных панелей ниже рабочего диапазона MPPT (панели не подключены или пасмурно).', isPvRelated: true },
  { bit: 7, mask: 1 << 7, code: 53, title: 'Предупреждение софт-старта', description: 'Предупреждение цепи плавного пуска инвертора.' },
  { bit: 8, mask: 1 << 8, code: 55, title: 'DC напряжение на выходе AC', description: 'Обнаружена постоянная составляющая напряжения на выходе 230В.' },
  { bit: 9, mask: 1 << 9, code: 56, title: 'Батарея не подключена', description: 'Инвертор зафиксировал размыкание цепи аккумулятора.' },
  { bit: 10, mask: 1 << 10, code: 57, title: 'Сбой датчика тока', description: 'Отклонение калибровки датчика тока инвертора.' },
  { bit: 11, mask: 1 << 11, code: 11, title: 'Превышение тока контроллера MPPT', description: 'Ток от солнечных панелей выше допустимого предела MPPT.', isPvRelated: true },
  { bit: 12, mask: 1 << 12, code: 12, title: 'Перегрев контроллера MPPT', description: 'Температура радиатора солнечного контроллера завышена.', isPvRelated: true },
  { bit: 13, mask: 1 << 13, code: 13, title: 'Высокое напряжение АКБ от MPPT', description: 'Солнечный контроллер зафиксировал перенапряжение на аккумуляторе.' },
  { bit: 14, mask: 1 << 14, code: 14, title: 'Низкое напряжение АКБ для MPPT', description: 'Напряжение батареи слишком низкое для работы MPPT.' },
  { bit: 15, mask: 1 << 15, code: 15, title: 'Сбой сети AC (AC abnormal)', description: 'Параметры входящей электросети вышли за допустимые пределы.' },
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
 * Strips PV-related warning flags when solar generation is disabled (no panels).
 * Returns the effective warning code and whether any non-PV warning remains active.
 */
export function filterWarningCodeForNoSolar(warningCode: number | null): {
  effectiveCode: number | null;
  hasNonPvWarning: boolean;
} {
  if (warningCode === null || warningCode === 0 || isNaN(warningCode)) {
    return { effectiveCode: null, hasNonPvWarning: false };
  }

  // Direct single PV code matches
  if (warningCode === 64 || warningCode === 15 || warningCode === 13) {
    return { effectiveCode: null, hasNonPvWarning: false };
  }

  // Check if bitmask has bit 6 (64) set
  const pvBitMask = 1 << 6;
  if ((warningCode & pvBitMask) !== 0) {
    const remaining = warningCode & ~pvBitMask;
    if (remaining === 0) {
      return { effectiveCode: null, hasNonPvWarning: false };
    }
    return { effectiveCode: remaining, hasNonPvWarning: true };
  }

  return { effectiveCode: warningCode, hasNonPvWarning: true };
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
      title: 'Нет предупреждений',
      description: 'Предупреждения отсутствуют.',
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
      description: detailsText ? `${descriptions} (Статус: ${detailsText})` : descriptions,
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
        ? `${direct.description} (Статус: ${detailsText})`
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
        ? `${bit.description} (Статус: ${detailsText})`
        : bit.description,
      isBitmask: true,
      isPv: !!bit.isPvRelated,
    };
  }

  // Fallback with HA detailsText if available
  const fallbackTitle = detailsText || `Предупреждение W${code}`;
  const fallbackDesc = detailsText
    ? `Инвертор зафиксировал предупреждение: ${detailsText}`
    : 'Инвертор зафиксировал отклонение рабочих параметров от нормы.';

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
        description: `${direct.description} (Инвертор: ${detailsText})`,
      };
    }
    return direct;
  }

  return {
    code,
    title: detailsText || `Код сбоя F${code}`,
    description: detailsText
      ? `Инвертор сообщает об ошибке: ${detailsText}`
      : 'Обнаружена аппаратная или программная ошибка инвертора.',
    recommendation: 'Проверьте сообщения на дисплее инвертора и документацию.',
    severity: 'critical',
  };
}
