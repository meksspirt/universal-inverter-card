import { AninerelCardConfig, HomeAssistant } from '../types';

export interface DiscoveredDeviceGroup {
  prefix: string;
  label: string;
  matchCount: number;
  kind: 'inverter' | 'bms';
  sampleEntities: string[];
}

export interface AutoBindSummary {
  updatedConfig: AninerelCardConfig;
  boundCount: number;
  inverterMatched: number;
  bmsMatched: number;
  detectedDualBms: boolean;
}

const INVERTER_SUFFIX_PATTERNS = [
  '_load_power',
  '_ac_output_active_power',
  '_grid_power',
  '_grid_voltage',
  '_mains_voltage',
  '_operating_mode',
  '_device_mode',
  '_work_mode',
  '_inverter_temperature',
  '_heatsink_temperature',
  '_load_percent',
  '_charging_active',
  '_charge_source_priority',
  '_output_source_priority',
  '_max_ac_charge_current',
  '_battery_bulk_voltage',
  '_battery_float_voltage',
  '_battery_equalization',
  '_fault_code',
  '_fault_active',
  '_warning_code',
  '_warnings_active',
  '_estimated_load_energy_today',
  '_load_energy_today',
  '_estimated_grid_import_energy_today',
  '_grid_import_energy_today',
  '_invertor_sobstvennoe_potreblenie',
];

const BMS_SUFFIX_PATTERNS = [
  '_soc',
  '_state_of_charge',
  '_battery_soc',
  '_delta_cell_voltage',
  '_cell_delta',
  '_cell_voltage_delta',
  '_remaining_energy',
  '_remaining_capacity',
  '_cell_1',
  '_cell_01',
  '_cell_voltage_1',
  '_cell_voltage_01',
  '_1_soc',
  '_2_soc',
  '_1_cell_1',
  '_2_cell_1',
  '_cycle_count',
  '_charging_cycles',
];

function formatPrefixLabel(prefix: string): string {
  return prefix
    .split('_')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/**
 * Scans Home Assistant states and discovers candidate Inverter and BMS device prefixes.
 */
export function discoverDevices(hass?: HomeAssistant): {
  inverters: DiscoveredDeviceGroup[];
  bmsList: DiscoveredDeviceGroup[];
} {
  if (!hass || !hass.states) {
    return { inverters: [], bmsList: [] };
  }

  const allEntityIds = Object.keys(hass.states);
  const inverterMap = new Map<string, Set<string>>();
  const bmsMap = new Map<string, Set<string>>();

  for (const entityId of allEntityIds) {
    const dotIdx = entityId.indexOf('.');
    if (dotIdx < 0) continue;
    const objectId = entityId.slice(dotIdx + 1).toLowerCase();

    // Check Inverter patterns
    for (const suffix of INVERTER_SUFFIX_PATTERNS) {
      if (objectId.endsWith(suffix) && objectId.length > suffix.length) {
        const prefix = objectId.slice(0, objectId.length - suffix.length);
        if (!inverterMap.has(prefix)) inverterMap.set(prefix, new Set());
        inverterMap.get(prefix)!.add(entityId);
      }
    }

    // Check BMS patterns
    for (const suffix of BMS_SUFFIX_PATTERNS) {
      if (objectId.endsWith(suffix) && objectId.length > suffix.length) {
        let prefix = objectId.slice(0, objectId.length - suffix.length);
        // Normalize sub-pack suffixes like _redodo_1 or _pack_1 so the parent bridge/BMS is grouped cleanly
        prefix = prefix.replace(/_(redodo|bat|battery|pack|bms)_[12]$/i, '');
        if (!bmsMap.has(prefix)) bmsMap.set(prefix, new Set());
        bmsMap.get(prefix)!.add(entityId);
      }
    }
  }

  const inverters: DiscoveredDeviceGroup[] = [];
  for (const [prefix, set] of inverterMap.entries()) {
    if (set.size >= 2) {
      inverters.push({
        prefix,
        label: `${formatPrefixLabel(prefix)} (${set.size})`,
        matchCount: set.size,
        kind: 'inverter',
        sampleEntities: Array.from(set).slice(0, 5),
      });
    }
  }
  inverters.sort((a, b) => b.matchCount - a.matchCount);

  const bmsList: DiscoveredDeviceGroup[] = [];
  for (const [prefix, set] of bmsMap.entries()) {
    if (set.size >= 2) {
      bmsList.push({
        prefix,
        label: `${formatPrefixLabel(prefix)} (${set.size})`,
        matchCount: set.size,
        kind: 'bms',
        sampleEntities: Array.from(set).slice(0, 5),
      });
    }
  }
  bmsList.sort((a, b) => b.matchCount - a.matchCount);

  return { inverters, bmsList };
}

/**
 * 1-Click Auto-Bind: populates 30+ Inverter and BMS entities automatically from selected device prefixes.
 */
export function autoBindEntitiesFromDevices(
  baseConfig: AninerelCardConfig,
  hass: HomeAssistant,
  inverterPrefix?: string,
  bmsPrefix?: string
): AutoBindSummary {
  const config: AninerelCardConfig = JSON.parse(JSON.stringify(baseConfig || {}));
  if (!config.entities) {
    config.entities = { load_power: '' };
  }
  if (!config.controls) config.controls = {};
  if (!config.safety) config.safety = {};
  if (!config.daily_energy) config.daily_energy = {};
  if (!config.bms) config.bms = {};

  const allIds = Object.keys(hass.states);
  let inverterMatched = 0;
  let bmsMatched = 0;
  let detectedDualBms = false;

  const findInPrefix = (
    prefix: string,
    domains: string[],
    suffixCandidates: string[]
  ): string | undefined => {
    const cleanPrefix = prefix.toLowerCase();
    for (const suf of suffixCandidates) {
      const targetExact = `${cleanPrefix}${suf}`;
      for (const dom of domains) {
        const exactId = `${dom}.${targetExact}`;
        if (hass.states[exactId]) return exactId;
      }
      // Partial / contains match within prefix family
      const found = allIds.find((id) => {
        const [d, obj] = id.toLowerCase().split('.');
        return (
          domains.includes(d) &&
          obj.startsWith(cleanPrefix) &&
          obj.endsWith(suf)
        );
      });
      if (found) return found;
    }
    return undefined;
  };

  // 1. Bind Inverter Entities
  if (inverterPrefix) {
    const setInv = (
      assign: (id: string) => void,
      domains: string[],
      suffixes: string[]
    ) => {
      const id = findInPrefix(inverterPrefix, domains, suffixes);
      if (id) {
        assign(id);
        inverterMatched++;
      }
    };

    setInv(
      (id) => (config.entities.load_power = id),
      ['sensor'],
      ['_load_power', '_ac_output_active_power', '_output_power', '_house_load']
    );
    setInv(
      (id) => (config.entities.grid_power = id),
      ['sensor'],
      ['_grid_power', '_ac_input_power', '_mains_power']
    );
    setInv(
      (id) => (config.entities.solar_power = id),
      ['sensor'],
      ['_pv_power', '_solar_power', '_pv1_power']
    );
    setInv(
      (id) => (config.entities.battery_power = id),
      ['sensor'],
      ['_battery_power', '_bat_power']
    );

    setInv(
      (id) => (config.grid_voltage_entity = id),
      ['sensor'],
      ['_grid_voltage', '_ac_input_voltage', '_mains_voltage']
    );
    setInv(
      (id) => (config.battery_voltage_entity = id),
      ['sensor'],
      ['_battery_voltage', '_bat_voltage']
    );
    setInv(
      (id) => (config.battery_current_entity = id),
      ['sensor'],
      ['_battery_current', '_bat_current']
    );
    setInv(
      (id) => (config.operating_mode_entity = id),
      ['sensor'],
      ['_operating_mode', '_device_mode', '_work_mode', '_inverter_mode']
    );
    setInv(
      (id) => (config.charging_active_entity = id),
      ['binary_sensor'],
      ['_charging_active', '_is_charging', '_charging']
    );
    setInv(
      (id) => (config.inverter_temperature_entity = id),
      ['sensor'],
      ['_inverter_temperature', '_heatsink_temperature', '_temperature']
    );
    setInv(
      (id) => (config.inverter_load_percent_entity = id),
      ['sensor'],
      ['_load_percent', '_inverter_load_percent', '_ac_output_load_percent']
    );
    setInv(
      (id) => (config.self_consumption_power_entity = id),
      ['sensor'],
      [
        '_invertor_sobstvennoe_potreblenie',
        '_self_consumption_power',
        '_self_consumption',
      ]
    );

    // Controls
    setInv(
      (id) => (config.controls!.charge_source_entity = id),
      ['select', 'input_select'],
      ['_charge_source_priority', '_charger_source_priority']
    );
    setInv(
      (id) => (config.controls!.output_priority_entity = id),
      ['select', 'input_select'],
      ['_output_source_priority', '_output_priority']
    );
    setInv(
      (id) => (config.controls!.max_charge_current_entity = id),
      ['number', 'input_number'],
      ['_max_ac_charge_current', '_max_grid_charge_current']
    );
    setInv(
      (id) => (config.controls!.max_total_charge_current_entity = id),
      ['number', 'input_number'],
      ['_max_charge_current', '_max_total_charge_current']
    );
    setInv(
      (id) => (config.controls!.bulk_voltage_entity = id),
      ['number', 'input_number'],
      ['_battery_bulk_voltage', '_bulk_charge_voltage', '_cv_voltage']
    );
    setInv(
      (id) => (config.controls!.float_voltage_entity = id),
      ['number', 'input_number'],
      ['_battery_float_voltage', '_float_charge_voltage']
    );
    setInv(
      (id) => (config.controls!.back_to_grid_voltage_entity = id),
      ['number', 'input_number'],
      ['_back_to_grid_voltage', '_battery_recharge_voltage']
    );
    setInv(
      (id) => (config.controls!.cutoff_voltage_entity = id),
      ['number', 'input_number'],
      ['_battery_under_voltage', '_battery_cut_off_voltage', '_cutoff_voltage']
    );
    setInv(
      (id) => (config.controls!.equalization_entity = id),
      ['switch', 'input_boolean'],
      ['_battery_equalization', '_equalization_enable']
    );
    setInv(
      (id) => (config.controls!.buzzer_entity = id),
      ['switch', 'input_boolean'],
      ['_buzzer', '_alarm_buzzer', '_beep']
    );

    // Safety
    setInv(
      (id) => (config.safety!.fault_active_entity = id),
      ['binary_sensor'],
      ['_fault_active', '_fault']
    );
    setInv(
      (id) => (config.safety!.fault_code_entity = id),
      ['sensor'],
      ['_fault_code']
    );
    setInv(
      (id) => (config.safety!.warnings_active_entity = id),
      ['binary_sensor'],
      ['_warnings_active', '_warning_active']
    );
    setInv(
      (id) => (config.safety!.warning_code_entity = id),
      ['sensor'],
      ['_warning_code']
    );

    // Daily Energy
    setInv(
      (id) => (config.daily_energy!.load_energy_entity = id),
      ['sensor'],
      ['_estimated_load_energy_today', '_load_energy_today', '_daily_load_energy']
    );
    setInv(
      (id) => (config.daily_energy!.grid_import_entity = id),
      ['sensor'],
      [
        '_estimated_grid_import_energy_today',
        '_grid_import_energy_today',
        '_daily_grid_import',
      ]
    );
    setInv(
      (id) => (config.daily_energy!.solar_energy_entity = id),
      ['sensor'],
      ['_estimated_pv_energy_today', '_pv_energy_today', '_solar_energy_today']
    );
    setInv(
      (id) => (config.daily_energy!.battery_charge_entity = id),
      ['sensor'],
      [
        '_estimated_battery_charge_energy_today',
        '_battery_charge_energy_today',
        '_daily_battery_charge',
      ]
    );
    setInv(
      (id) => (config.daily_energy!.battery_discharge_entity = id),
      ['sensor'],
      [
        '_estimated_battery_discharge_energy_today',
        '_battery_discharge_energy_today',
        '_daily_battery_discharge',
      ]
    );
    setInv(
      (id) => (config.daily_energy!.self_consumption_daily_entity = id),
      ['sensor'],
      [
        '_invertor_sobstvennoe_potreblenie_za_den',
        '_self_consumption_energy_today',
      ]
    );
    setInv(
      (id) => (config.daily_energy!.self_consumption_monthly_entity = id),
      ['sensor'],
      [
        '_invertor_sobstvennoe_potreblenie_za_mesiats',
        '_self_consumption_energy_month',
      ]
    );
  }

  // 2. Bind BMS Entities (Supports both Single Pack and Dual Pack Series/Parallel)
  if (bmsPrefix) {
    const cleanBms = bmsPrefix.toLowerCase();
    const bmsEntities = allIds.filter((id) =>
      id.toLowerCase().startsWith(`sensor.${cleanBms}`)
    );

    const findBms = (suffixes: string[]): string | undefined => {
      for (const suf of suffixes) {
        const match = bmsEntities.find((id) => id.toLowerCase().endsWith(suf));
        if (match) return match;
      }
      return undefined;
    };

    // Bank-level power, voltage, current, delta, remaining energy
    const bmsPower = findBms(['_24v_power', '_48v_power', '_total_power', '_power']);
    if (bmsPower) {
      config.entities.battery_power = bmsPower;
      bmsMatched++;
    }

    const bmsTotalV = findBms([
      '_24v_voltage',
      '_48v_voltage',
      '_total_voltage',
      '_voltage',
    ]);
    if (bmsTotalV) {
      config.battery_voltage_entity = bmsTotalV;
      config.bms.voltage_entity = bmsTotalV;
      bmsMatched++;
    }

    const bmsTotalI = findBms([
      '_24v_current',
      '_48v_current',
      '_total_current',
      '_current',
    ]);
    if (bmsTotalI) {
      config.battery_current_entity = bmsTotalI;
      config.bms.current_entity = bmsTotalI;
      bmsMatched++;
    }

    const bmsDelta = findBms([
      '_delta_cell_voltage',
      '_cell_delta',
      '_cell_voltage_delta',
    ]);
    if (bmsDelta) {
      config.bms.cell_delta_entity = bmsDelta;
      bmsMatched++;
    }

    const bmsRemEnergy = findBms(['_remaining_energy', '_energy_remaining']);
    if (bmsRemEnergy) {
      config.bms.remaining_energy_entity = bmsRemEnergy;
      bmsMatched++;
    }

    const bmsRemCap = findBms(['_remaining_capacity', '_capacity_remaining']);
    if (bmsRemCap) {
      config.bms.remaining_capacity_entity = bmsRemCap;
      bmsMatched++;
    }

    const bmsCycles = findBms(['_cycle_count', '_charging_cycles', '_cycles']);
    if (bmsCycles) {
      config.bms.cycle_count_entity = bmsCycles;
      bmsMatched++;
    }

    // Check if this BMS prefix contains Dual Battery Packs (#1 and #2)
    const pack1Soc = findBms(['_1_soc', '_pack_1_soc', '_bat_1_soc']);
    const pack2Soc = findBms(['_2_soc', '_pack_2_soc', '_bat_2_soc']);

    if (pack1Soc && pack2Soc) {
      detectedDualBms = true;
      config.bms.dual_battery = true;
      config.bms.topology = config.bms.topology || 'series';
      config.bms.chemistry = config.bms.chemistry || 'lifepo4';

      const pack1V = findBms(['_1_voltage', '_pack_1_voltage', '_bat_1_voltage']);
      const pack2V = findBms(['_2_voltage', '_pack_2_voltage', '_bat_2_voltage']);
      const pack1T = findBms([
        '_1_cell_temperature',
        '_1_temperature',
        '_pack_1_temperature',
      ]);
      const pack2T = findBms([
        '_2_cell_temperature',
        '_2_temperature',
        '_pack_2_temperature',
      ]);

      const pack1Cell1 = findBms(['_1_cell_1', '_1_cell_voltage_1', '_1_cell_01']);
      const pack2Cell1 = findBms(['_2_cell_1', '_2_cell_voltage_1', '_2_cell_01']);

      const deriveCellPrefix = (cell1Id?: string): string | undefined => {
        if (!cell1Id) return undefined;
        return cell1Id.replace(/0?1(_voltage)?$/, '');
      };

      const p1Prefix = deriveCellPrefix(pack1Cell1);
      const p2Prefix = deriveCellPrefix(pack2Cell1);

      // Count cells for pack 1
      let p1Count = 4;
      if (p1Prefix) {
        let count = 0;
        for (let i = 1; i <= 24; i++) {
          if (
            hass.states[`${p1Prefix}${i}`] ||
            hass.states[`${p1Prefix}${String(i).padStart(2, '0')}`] ||
            hass.states[`${p1Prefix}${i}_voltage`]
          ) {
            count = i;
          }
        }
        if (count > 0) p1Count = count;
      }

      config.bms.bat1_name = config.bms.bat1_name || 'Battery #1';
      config.bms.bat1_soc_entity = pack1Soc;
      if (pack1V) config.bms.bat1_voltage_entity = pack1V;
      if (pack1T) config.bms.bat1_temperature_entity = pack1T;
      config.bms.bat1_cell_count = p1Count;
      if (p1Prefix) config.bms.bat1_cell_prefix = p1Prefix;

      config.bms.bat2_name = config.bms.bat2_name || 'Battery #2';
      config.bms.bat2_soc_entity = pack2Soc;
      if (pack2V) config.bms.bat2_voltage_entity = pack2V;
      if (pack2T) config.bms.bat2_temperature_entity = pack2T;
      config.bms.bat2_cell_count = p1Count;
      if (p2Prefix) config.bms.bat2_cell_prefix = p2Prefix;

      config.bms.battery_1 = {
        name: config.bms.bat1_name,
        soc_entity: pack1Soc,
        voltage_entity: pack1V,
        temperature_entity: pack1T,
        cell_count: p1Count,
        cell_voltage_prefix: p1Prefix,
      };
      config.bms.battery_2 = {
        name: config.bms.bat2_name,
        soc_entity: pack2Soc,
        voltage_entity: pack2V,
        temperature_entity: pack2T,
        cell_count: p1Count,
        cell_voltage_prefix: p2Prefix,
      };

      bmsMatched += 8;
    } else {
      // Single Pack BMS
      const singleSoc = findBms(['_soc', '_state_of_charge', '_battery_soc']);
      if (singleSoc) {
        config.bms.soc_entity = singleSoc;
        bmsMatched++;
      }
      const singleTemp = findBms([
        '_cell_temperature',
        '_temperature_1',
        '_temperature',
      ]);
      if (singleTemp) {
        config.bms.temperature_entity = singleTemp;
        bmsMatched++;
      }
      const singleCell1 = findBms([
        '_cell_voltage_1',
        '_cell_voltage_01',
        '_cell_1',
        '_cell_01',
      ]);
      if (singleCell1) {
        const cellPrefix = singleCell1.replace(/0?1(_voltage)?$/, '');
        config.bms.cell_voltage_prefix = cellPrefix;
        let count = 0;
        for (let i = 1; i <= 24; i++) {
          if (
            hass.states[`${cellPrefix}${i}`] ||
            hass.states[`${cellPrefix}${String(i).padStart(2, '0')}`] ||
            hass.states[`${cellPrefix}${i}_voltage`]
          ) {
            count = i;
          }
        }
        if (count > 0) config.bms.cell_count = count;
        bmsMatched += 2;
      }
    }
  }

  return {
    updatedConfig: config,
    boundCount: inverterMatched + bmsMatched,
    inverterMatched,
    bmsMatched,
    detectedDualBms,
  };
}
