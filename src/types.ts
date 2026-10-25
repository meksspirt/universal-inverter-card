// Home Assistant & Lovelace Types

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: {
    unit_of_measurement?: string;
    friendly_name?: string;
    icon?: string;
    options?: string[];
    min?: number;
    max?: number;
    step?: number;
    [key: string]: any;
  };
  last_changed: string;
  last_updated: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  services: Record<string, Record<string, any>>;
  language?: string;
  locale?: {
    language: string;
    [key: string]: any;
  };
  themes?: {
    darkMode?: boolean;
    theme?: string;
    [key: string]: any;
  };
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, any>,
    target?: { entity_id?: string | string[]; [key: string]: any }
  ): Promise<any>;
  callWS?<T = any>(msg: Record<string, any>): Promise<T>;
  callApi?<T = any>(method: string, path: string, data?: Record<string, any>): Promise<T>;
}

export interface LovelaceCardConfig {
  type: string;
  [key: string]: any;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: LovelaceCardConfig): void;
  getCardSize?(): number;
}

export interface LovelaceGridOptions {
  columns?: number;
  rows?: number;
  min_columns?: number;
  min_rows?: number;
}

// Card Specific Configurations

export interface EntitiesConfig {
  solar_power?: string;   // sensor...pv_power (W, optional)
  battery_power?: string; // sensor...battery_power (W, + charge / - discharge)
  grid_power?: string;    // sensor...grid_power (W)
  load_power: string;     // sensor...load_power (W)
}

export type BatteryTopology = 'auto' | 'single' | 'series' | 'parallel';
export type BatteryChemistry = 'auto' | 'lifepo4' | 'li_ion' | 'lto';

export interface SingleBatteryConfig {
  name?: string;
  soc_entity?: string;
  voltage_entity?: string;
  current_entity?: string;
  temperature_entity?: string;
  cell_count?: number; // default: 4 for 12V, 8 for 24V, 16 for 48V
  cell_voltage_prefix?: string;
  cycle_count_entity?: string;
  remaining_capacity_entity?: string;
  cell_delta_entity?: string;
}

export interface BmsConfig {
  bank_name?: string;                 // Custom BMS / battery brand name (e.g. 'Redodo', 'JK BMS', 'LiFePO4')
  topology?: BatteryTopology;         // 'auto' | 'single' | 'series' | 'parallel'
  chemistry?: BatteryChemistry;       // 'auto' | 'lifepo4' | 'li_ion' | 'lto'
  cell_numbering?: 'continuous' | 'per_pack'; // '#1..#8' across bank vs '#1..#4' per pack
  soc_entity?: string;                // sensor.battery_state_of_charge (%)
  voltage_entity?: string;            // sensor.battery_total_voltage (V)
  current_entity?: string;            // sensor.battery_current (A)
  temperature_entity?: string;        // sensor.battery_temperature_probe_1 (°C)
  temperature_2_entity?: string;      // sensor.battery_temperature_probe_2 (°C)
  cell_count?: number;                // default: 8
  cell_voltage_prefix?: string;       // default: 'sensor.redodo_battery_cell_voltage_'
  cycle_count_entity?: string;        // sensor.battery_discharge_cycles
  remaining_capacity_entity?: string; // sensor.battery_remaining_capacity (Ah)
  full_capacity_entity?: string;      // sensor.battery_full_charge_capacity (Ah)
  remaining_energy_entity?: string;   // sensor...remaining_energy (Wh or kWh)
  nominal_capacity_wh?: number;       // default: 2560 (Wh for 24V 100Ah LiFePO4)
  cell_delta_entity?: string;         // sensor.battery_cell_delta (mV)

  // Multi-Pack / Dual Battery Support (2x 12V Series, 2x 24V Parallel, 4x 12V Series, etc.)
  dual_battery?: boolean;
  bat1_name?: string;
  bat1_soc_entity?: string;
  bat1_voltage_entity?: string;
  bat1_temperature_entity?: string;
  bat1_cell_count?: number;
  bat1_cell_prefix?: string;

  bat2_name?: string;
  bat2_soc_entity?: string;
  bat2_voltage_entity?: string;
  bat2_temperature_entity?: string;
  bat2_cell_count?: number;
  bat2_cell_prefix?: string;

  // Nested object & array support (1 to N battery packs)
  battery_1?: SingleBatteryConfig;
  battery_2?: SingleBatteryConfig;
  battery_3?: SingleBatteryConfig;
  battery_4?: SingleBatteryConfig;
  packs?: SingleBatteryConfig[];
}

export interface ControlsConfig {
  charge_source_entity?: string;      // select...charge_source_priority
  output_priority_entity?: string;    // select...output_source_priority
  max_charge_current_entity?: string; // number...max_ac_charge_current
  bulk_voltage_entity?: string;       // number...battery_bulk_voltage
  float_voltage_entity?: string;      // number...battery_float_voltage
  equalization_entity?: string;       // switch...battery_equalization
}

export interface SafetyConfig {
  fault_active_entity?: string;       // binary_sensor...fault_active
  fault_code_entity?: string;         // sensor...fault_code
  fault_details_entity?: string;      // sensor...fault_details (optional)
  warnings_active_entity?: string;    // binary_sensor...warnings_active
  warning_code_entity?: string;       // sensor...warning_code
  warning_details_entity?: string;    // sensor...warning_details (optional)
}

export interface DailyEnergyConfig {
  load_energy_entity?: string;             // sensor...load_energy_today (kWh)
  grid_import_entity?: string;             // sensor...grid_import_energy_today (kWh)
  battery_charge_entity?: string;          // sensor...battery_charge_energy_today (kWh)
  battery_discharge_entity?: string;       // sensor...battery_discharge_energy_today (kWh)
  self_consumption_daily_entity?: string;  // sensor...invertor_sobstvennoe_potreblenie_za_den (kWh)
  self_consumption_monthly_entity?: string;// sensor...invertor_sobstvennoe_potreblenie_za_mesiats (kWh)
}

export interface ColorConfig {
  solar?: string;
  battery_charge?: string;
  battery_discharge?: string;
  grid_import?: string;
  grid_export?: string;
  home?: string;
  card_bg?: string;
}

export interface AninerelCardConfig extends LovelaceCardConfig {
  type: string;
  title?: string;
  subtitle?: string;
  icon?: string;

  entities: EntitiesConfig;

  // Electrical parameters
  battery_voltage_entity?: string;
  battery_current_entity?: string;
  grid_voltage_entity?: string;
  operating_mode_entity?: string;
  charging_active_entity?: string;
  inverter_temperature_entity?: string;
  inverter_load_percent_entity?: string;
  self_consumption_power_entity?: string;
  grid_breaker_switch_entity?: string;
  grid_breaker_power_entity?: string;

  // 3rd Circular Gauge KPI Configuration
  kpi_mode?: 'auto' | 'battery_soc' | 'battery_autonomy' | 'self_sufficiency' | 'inverter_load';
  kpi_entity?: string;

  // Subsections
  bms?: BmsConfig;
  controls?: ControlsConfig;
  safety?: SafetyConfig;
  daily_energy?: DailyEnergyConfig;

  // Power & Capacity limits
  max_power?: number;         // default: 4200
  inverter_capacity?: number; // default: 4200

  // Flow & Colors
  colors?: ColorConfig;
  min_flow_rate?: number;      // default: 0.75
  max_flow_rate?: number;      // default: 6.0
  use_log_flow_model?: boolean;// default: true

  // Section visibility toggles
  show_header?: boolean;
  show_flow?: boolean;
  show_solar?: boolean;        // default: false (hidden when no solar panels)
  grid_position?: 'bottom' | 'top'; // default: 'bottom' (when no solar)
  show_params?: boolean;
  show_bms?: boolean;
  show_controls?: boolean;
  show_energy?: boolean;
  show_alerts?: boolean;

  // View settings
  compact_mode?: boolean;
  language?: string;
}

export interface FlowPath {
  id: string;
  d: string;
  watts: number;
  color: string;
  reversed: boolean;
}
