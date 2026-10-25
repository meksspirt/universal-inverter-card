import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, AninerelCardConfig } from './types';
import { localize, getActiveLanguage } from './localize/localize';
import { discoverDevices, autoBindEntitiesFromDevices } from './utils/auto-discovery';

@customElement('universal-inverter-card-editor')
export class AninerelPowerCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: AninerelCardConfig;
  @state() private _selectedInverterPrefix = '';
  @state() private _selectedBmsPrefix = '';
  @state() private _autoBindMessage = '';

  public setConfig(config: AninerelCardConfig): void {
    const copy = JSON.parse(JSON.stringify(config || {}));
    if (copy.bms) {
      if (copy.bms.battery_1) {
        if (!copy.bms.bat1_name && copy.bms.battery_1.name) copy.bms.bat1_name = copy.bms.battery_1.name;
        if (!copy.bms.bat1_soc_entity && copy.bms.battery_1.soc_entity) copy.bms.bat1_soc_entity = copy.bms.battery_1.soc_entity;
        if (!copy.bms.bat1_voltage_entity && copy.bms.battery_1.voltage_entity) copy.bms.bat1_voltage_entity = copy.bms.battery_1.voltage_entity;
        if (!copy.bms.bat1_temperature_entity && copy.bms.battery_1.temperature_entity) copy.bms.bat1_temperature_entity = copy.bms.battery_1.temperature_entity;
        if (!copy.bms.bat1_cell_prefix && copy.bms.battery_1.cell_voltage_prefix) copy.bms.bat1_cell_prefix = copy.bms.battery_1.cell_voltage_prefix;
      }
      if (copy.bms.battery_2) {
        if (!copy.bms.bat2_name && copy.bms.battery_2.name) copy.bms.bat2_name = copy.bms.battery_2.name;
        if (!copy.bms.bat2_soc_entity && copy.bms.battery_2.soc_entity) copy.bms.bat2_soc_entity = copy.bms.battery_2.soc_entity;
        if (!copy.bms.bat2_voltage_entity && copy.bms.battery_2.voltage_entity) copy.bms.bat2_voltage_entity = copy.bms.battery_2.voltage_entity;
        if (!copy.bms.bat2_temperature_entity && copy.bms.battery_2.temperature_entity) copy.bms.bat2_temperature_entity = copy.bms.battery_2.temperature_entity;
        if (!copy.bms.bat2_cell_prefix && copy.bms.battery_2.cell_voltage_prefix) copy.bms.bat2_cell_prefix = copy.bms.battery_2.cell_voltage_prefix;
      }
    }
    this._config = copy;
  }

  private _computeLabel(schema: any): string {
    if (schema.label) return schema.label;
    return localize(`editor.${schema.name}`, this.hass, this._config?.language) || schema.name;
  }

  private _valueChanged(ev: CustomEvent): void {
    const value = ev.detail.value;
    const event = new CustomEvent('config-changed', {
      detail: { config: value },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private _getSchema() {
    const lang = this._config?.language;
    return [
      {
        name: 'title',
        label: localize('editor.title', this.hass, lang) || 'Card Title',
        selector: { text: {} },
      },
      {
        name: 'subtitle',
        label: 'Card Subtitle',
        selector: { text: {} },
      },
      {
        name: 'icon',
        label: 'Header Icon (MDI)',
        selector: { icon: {} },
      },
      {
        name: 'language',
        label: 'Interface Language (Мова інтерфейсу / Язык)',
        selector: {
          select: {
            options: [
              { value: 'auto', label: 'Auto (Home Assistant Default)' },
              { value: 'uk', label: 'Українська (Ukrainian)' },
              { value: 'ru', label: 'Русский (Russian)' },
              { value: 'en', label: 'English' },
            ],
          },
        },
      },
      // 1. Core Power Entities (Required: load_power)
      {
        name: 'entities',
        type: 'expandable',
        title: localize('editor.entities_group', this.hass, lang) || '⚡ Real-time Power Entities (Required)',
        schema: [
          {
            name: 'solar_power',
            label: 'Solar Generation (PV Power) [Optional]',
            required: false,
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'battery_power',
            label: 'Battery Power (+Charge / -Discharge) [Or use split sensors below]',
            required: false,
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'battery_charge_power',
            label: 'Battery Charge Power (W) [Optional, for split Deye/Growatt sensors]',
            required: false,
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'battery_discharge_power',
            label: 'Battery Discharge Power (W) [Optional, for split Deye/Growatt sensors]',
            required: false,
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'grid_power',
            label: 'Grid Power (AC Input)',
            required: true,
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'load_power',
            label: 'Home Load Power',
            required: true,
            selector: { entity: { domain: 'sensor' } },
          },
        ],
      },
      // 2. Electrical Telemetry
      {
        name: '',
        type: 'expandable',
        title: localize('editor.params_group', this.hass, lang) || '📊 Electrical Parameters & Telemetry',
        schema: [
          {
            name: 'system_voltage',
            label: 'Nominal System DC Voltage (Auto-detected from battery voltage)',
            selector: {
              select: {
                options: [
                  { value: 'auto', label: 'Auto-Detect (12V / 24V / 36V / 48V)' },
                  { value: 12, label: '12V System (4S LiFePO4)' },
                  { value: 24, label: '24V System (8S LiFePO4)' },
                  { value: 36, label: '36V System (12S LiFePO4)' },
                  { value: 48, label: '48V / 51.2V System (15S / 16S LiFePO4)' },
                ],
              },
            },
          },
          {
            name: 'invert_battery_power',
            label: 'Invert Battery Power & Current Polarity (Use if +W means Discharging)',
            selector: { boolean: {} },
          },
          {
            name: 'invert_grid_power',
            label: 'Invert Grid Power Polarity (Use if +W means Grid Export)',
            selector: { boolean: {} },
          },
          {
            name: 'battery_voltage_entity',
            label: 'Battery Voltage (V)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'battery_current_entity',
            label: 'Battery Current (A)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'grid_voltage_entity',
            label: 'Grid AC Voltage (V)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'operating_mode_entity',
            label: 'Inverter Operating Mode',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'inverter_temperature_entity',
            label: 'Inverter Temperature (°C)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'inverter_load_percent_entity',
            label: 'Inverter Load Percentage (%)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'self_consumption_power_entity',
            label: 'Inverter Self-Consumption Power (W)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'grid_breaker_switch_entity',
            label: 'AC Input Zigbee Breaker / Smart Plug (Switch)',
            selector: { entity: { domain: 'switch' } },
          },
          {
            name: 'charging_active_entity',
            label: 'Charging Active Flag',
            selector: { entity: { domain: 'binary_sensor' } },
          },
          {
            name: 'kpi_mode',
            label: '3rd Radial Gauge KPI Metric',
            selector: {
              select: {
                options: [
                  { value: 'auto', label: 'Auto (Battery SoC for UPS, Self-Sufficiency for Solar)' },
                  { value: 'battery_soc', label: 'Battery SoC % (State of Charge)' },
                  { value: 'battery_autonomy', label: 'Battery Autonomy % (Daily Load Powered by Battery)' },
                  { value: 'self_sufficiency', label: 'Solar Self-Sufficiency % (Autarky)' },
                  { value: 'inverter_load', label: 'Inverter Load %' },
                  { value: 'conversion_efficiency', label: 'Real-Time Inverter Conversion Efficiency % (КПД)' },
                ],
              },
            },
          },
          {
            name: 'kpi_entity',
            label: 'Custom KPI Entity (Overrides click/gauge entity)',
            selector: { entity: { domain: 'sensor' } },
          },
        ],
      },
      // 3. Universal BMS Battery Bank Telemetry
      {
        name: 'bms',
        type: 'expandable',
        title: localize('editor.bms_group', this.hass, lang) || '🔋 Universal BMS & Battery Bank Telemetry',
        schema: [
          {
            name: 'bank_name',
            label: 'Battery Bank / BMS Title (Auto-detected if empty, e.g. BMS Redodo, JK BMS, Pylontech)',
            selector: { text: {} },
          },
          {
            name: 'topology',
            label: 'Connection Topology (Series / Parallel / Single)',
            selector: {
              select: {
                options: [
                  { value: 'auto', label: 'Auto-Detect (From Pack & Total Voltages)' },
                  { value: 'series', label: 'Series Connection (e.g. 2× 12V → 24V)' },
                  { value: 'parallel', label: 'Parallel Connection (e.g. 2× 24V / 48V ∥)' },
                  { value: 'single', label: 'Single Battery Pack (12V / 24V / 48V)' },
                ],
              },
            },
          },
          {
            name: 'chemistry',
            label: 'Battery Chemistry (Cell Voltage Curve)',
            selector: {
              select: {
                options: [
                  { value: 'auto', label: 'Auto-Detect (LiFePO4 / Li-Ion / LTO)' },
                  { value: 'lifepo4', label: 'LiFePO4 (3.00V – 3.65V / cell)' },
                  { value: 'li_ion', label: 'Li-Ion / NMC / LCO (3.10V – 4.20V / cell)' },
                  { value: 'lto', label: 'LTO Lithium Titanate (1.90V – 2.75V / cell)' },
                ],
              },
            },
          },
          {
            name: 'cell_numbering',
            label: 'Multi-Pack Cell Numbering Style',
            selector: {
              select: {
                options: [
                  { value: 'continuous', label: 'Continuous (#1..#8 across packs)' },
                  { value: 'per_pack', label: 'Per Pack (#1..#4 in each pack)' },
                ],
              },
            },
          },
          {
            name: 'dual_battery',
            label: '🔋 Enable Multi-Pack / Dual Battery Mode',
            selector: { boolean: {} },
          },
          {
            name: 'nominal_capacity_wh',
            label: 'Total Battery Nominal Energy Capacity (Wh, e.g. 2560 for 24V 100Ah)',
            selector: { number: { min: 500, max: 60000, step: 100, mode: 'box' } },
          },
          {
            name: 'remaining_energy_entity',
            label: 'Remaining Battery Energy Entity (Wh / kWh, for Runtime calc)',
            selector: { entity: { domain: 'sensor' } },
          },
          // --- Battery #1 ---
          {
            name: 'bat1_name',
            label: 'Battery #1: Name (e.g. Redodo #1 / Pack 1)',
            selector: { text: {} },
          },
          {
            name: 'bat1_soc_entity',
            label: 'Battery #1: State of Charge (SOC %)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'bat1_voltage_entity',
            label: 'Battery #1: Voltage (V)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'bat1_temperature_entity',
            label: 'Battery #1: Temperature (°C)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'bat1_cell_count',
            label: 'Battery #1: Cell Count (e.g. 4 for 12V, 8 for 24V, 16 for 48V)',
            selector: { number: { min: 1, max: 24, step: 1, mode: 'box' } },
          },
          {
            name: 'bat1_cell_prefix',
            label: 'Battery #1: Cell Sensor Prefix (e.g. sensor.pack1_cell_)',
            selector: { text: {} },
          },
          // --- Battery #2 ---
          {
            name: 'bat2_name',
            label: 'Battery #2: Name (e.g. Redodo #2 / Pack 2)',
            selector: { text: {} },
          },
          {
            name: 'bat2_soc_entity',
            label: 'Battery #2: State of Charge (SOC %)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'bat2_voltage_entity',
            label: 'Battery #2: Voltage (V)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'bat2_temperature_entity',
            label: 'Battery #2: Temperature (°C)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'bat2_cell_count',
            label: 'Battery #2: Cell Count (e.g. 4 for 12V, 8 for 24V, 16 for 48V)',
            selector: { number: { min: 1, max: 24, step: 1, mode: 'box' } },
          },
          {
            name: 'bat2_cell_prefix',
            label: 'Battery #2: Cell Sensor Prefix (e.g. sensor.pack2_cell_)',
            selector: { text: {} },
          },
          // --- Single Battery Pack / Common Telemetry ---
          {
            name: 'soc_entity',
            label: 'Total / Bank SOC % (Single Pack or Bank Sensor)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'voltage_entity',
            label: 'Total Battery Voltage via BMS (V)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'temperature_entity',
            label: 'BMS Cell Temperature Probe (°C)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'cell_delta_entity',
            label: 'Cell Imbalance (Delta mV)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'cycle_count_entity',
            label: 'Battery Cycle Count',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'soh_entity',
            label: 'Battery State of Health (SOH %)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'active_balancer_entity',
            label: 'Active Balancer Switch / Balancing Status Sensor',
            selector: { entity: {} },
          },
          {
            name: 'cell_balancing_prefix',
            label: 'Cell Active Balancing Sensor Prefix (e.g. binary_sensor.cell_balancing_)',
            selector: { text: {} },
          },
          {
            name: 'cell_resistance_prefix',
            label: 'Cell Internal Resistance Prefix (e.g. sensor.cell_resistance_ [mΩ])',
            selector: { text: {} },
          },
          {
            name: 'remaining_capacity_entity',
            label: 'Remaining Capacity (Ah)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'cell_count',
            label: 'Single Pack Cell Count (0 for CAN-bus without cells, 4 for 12V, 8 for 24V, 16 for 48V)',
            selector: { number: { min: 0, max: 24, step: 1, mode: 'box' } },
          },
          {
            name: 'cell_voltage_prefix',
            label: 'Single Pack Cell Sensor Prefix (1..N)',
            selector: { text: {} },
          },
        ],
      },
      // 4. Inverter Controls
      {
        name: 'controls',
        type: 'expandable',
        title: localize('editor.controls_group', this.hass, lang) || '🎛️ Inverter Controls & Settings',
        schema: [
          {
            name: 'charge_source_entity',
            label: 'Charge Source Priority (Select / Input Select)',
            selector: { entity: { domain: ['select', 'input_select'] } },
          },
          {
            name: 'output_priority_entity',
            label: 'Output Source Priority / Work Mode (Select / Input Select)',
            selector: { entity: { domain: ['select', 'input_select'] } },
          },
          {
            name: 'max_charge_current_entity',
            label: 'Max AC Charge Current (Number)',
            selector: { entity: { domain: ['number', 'input_number'] } },
          },
          {
            name: 'max_charge_current_limit',
            label: 'Max AC Charge Slider Limit (A) [Overrides raw 200A Modbus ceiling]',
            selector: { number: { min: 10, max: 250, step: 5, mode: 'box' } },
          },
          {
            name: 'max_total_charge_current_entity',
            label: 'Max Total (PV + AC) Charge Current (Number) [Optional]',
            selector: { entity: { domain: ['number', 'input_number'] } },
          },
          {
            name: 'bulk_voltage_entity',
            label: 'Bulk / Absorption Voltage Setting (Number)',
            selector: { entity: { domain: ['number', 'input_number'] } },
          },
          {
            name: 'float_voltage_entity',
            label: 'Float Voltage Setting (Number)',
            selector: { entity: { domain: ['number', 'input_number'] } },
          },
          {
            name: 'back_to_grid_voltage_entity',
            label: 'Back to Grid Voltage / SoC Threshold (Number) [Optional]',
            selector: { entity: { domain: ['number', 'input_number'] } },
          },
          {
            name: 'cutoff_voltage_entity',
            label: 'Low DC Cut-off Voltage / SoC Threshold (Number) [Optional]',
            selector: { entity: { domain: ['number', 'input_number'] } },
          },
          {
            name: 'buzzer_entity',
            label: 'Inverter Buzzer / Beep Sound (Switch) [Optional]',
            selector: { entity: { domain: ['switch', 'input_boolean'] } },
          },
          {
            name: 'equalization_entity',
            label: 'Battery Equalization Mode (Switch - Danger Zone)',
            selector: { entity: { domain: ['switch', 'input_boolean'] } },
          },
        ],
      },
      // 5. Safety & Alerts
      {
        name: 'safety',
        type: 'expandable',
        title: localize('editor.safety_group', this.hass, lang) || '🛡️ Safety & Diagnostics',
        schema: [
          {
            name: 'fault_active_entity',
            label: 'Fault Active Flag (Binary Sensor)',
            selector: { entity: { domain: 'binary_sensor' } },
          },
          {
            name: 'fault_code_entity',
            label: 'Fault Code (Sensor)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'fault_details_entity',
            label: 'Fault Details Text [Optional]',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'warnings_active_entity',
            label: 'Warnings Active Flag (Binary Sensor)',
            selector: { entity: { domain: 'binary_sensor' } },
          },
          {
            name: 'warning_code_entity',
            label: 'Warning Code (Sensor)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'warning_details_entity',
            label: 'Warning Details Text [Optional]',
            selector: { entity: { domain: 'sensor' } },
          },
        ],
      },
      // 6. Daily Energy
      {
        name: 'daily_energy',
        type: 'expandable',
        title: localize('editor.energy_group', this.hass, lang) || '📈 Daily Energy Counters',
        schema: [
          {
            name: 'solar_energy_entity',
            label: 'Daily Solar Production (PV kWh) [Optional]',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'load_energy_entity',
            label: 'Daily Home Consumption (kWh)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'grid_import_entity',
            label: 'Daily Grid Import (kWh)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'grid_export_entity',
            label: 'Daily Grid Export (kWh) [Optional]',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'battery_charge_entity',
            label: 'Daily Battery Charge (kWh)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'battery_discharge_entity',
            label: 'Daily Battery Discharge (kWh)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'self_consumption_daily_entity',
            label: 'Daily Inverter Self-Consumption (kWh)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'self_consumption_monthly_entity',
            label: 'Monthly Inverter Self-Consumption (kWh)',
            selector: { entity: { domain: 'sensor' } },
          },
        ],
      },
      // 7. Visual & Section Visibility Options
      {
        name: '',
        type: 'expandable',
        title: localize('editor.display_group', this.hass, lang) || '🎨 Layout & Visualization Toggles',
        schema: [
          {
            name: 'max_power',
            label: 'Scale Max Power Rating (W)',
            selector: { number: { min: 1000, max: 20000, step: 200, mode: 'box' } },
          },
          {
            name: 'use_log_flow_model',
            label: 'Logarithmic flow animation speed model',
            selector: { boolean: {} },
          },
          {
            name: 'compact_mode',
            label: 'Compact layout mode (smaller padding & spacing)',
            selector: { boolean: {} },
          },
          {
            name: 'show_header',
            label: 'Show header bar with status chips',
            selector: { boolean: {} },
          },
          {
            name: 'show_flow',
            label: 'Show animated power flow diagram',
            selector: { boolean: {} },
          },
          {
            name: 'show_solar',
            label: 'Show solar generation (PV)',
            selector: { boolean: {} },
          },
          {
            name: 'grid_position',
            label: 'Grid position when solar is hidden',
            selector: {
              select: {
                options: [
                  { value: 'bottom', label: 'Bottom (Default)' },
                  { value: 'top', label: 'Top (Replaces solar)' },
                ],
              },
            },
          },
          {
            name: 'show_params',
            label: 'Show electrical telemetry parameters',
            selector: { boolean: {} },
          },
          {
            name: 'show_bms',
            label: 'Show Battery Bank & BMS section',
            selector: { boolean: {} },
          },
          {
            name: 'show_controls',
            label: 'Show inverter controls & settings',
            selector: { boolean: {} },
          },
          {
            name: 'show_energy',
            label: 'Show daily energy statistics',
            selector: { boolean: {} },
          },
          {
            name: 'show_alerts',
            label: 'Show diagnostic alerts & warnings',
            selector: { boolean: {} },
          },
          {
            name: 'show_blackbox',
            label: 'Show Black-Box Event Logger & Peak Telemetry (Черный ящик)',
            selector: { boolean: {} },
          },
        ],
      },
    ];
  }

  private _handleAutoBind(): void {
    if (!this.hass || !this._config) return;
    const { inverters, bmsList } = discoverDevices(this.hass);
    const invPrefix = this._selectedInverterPrefix || inverters[0]?.prefix;
    const bmsPrefix = this._selectedBmsPrefix || bmsList[0]?.prefix;

    const result = autoBindEntitiesFromDevices(this._config, this.hass, invPrefix, bmsPrefix);
    this._config = result.updatedConfig;

    const lang = getActiveLanguage(this.hass, this._config?.language);
    this._autoBindMessage =
      lang === 'uk'
        ? `✅ Авто-прив'язано ${result.boundCount} сенсорів (Інвертор: ${result.inverterMatched}, BMS: ${result.bmsMatched}${result.detectedDualBms ? ' • 2× АКБ' : ''})`
        : lang === 'ru'
        ? `✅ Авто-привязано ${result.boundCount} сенсоров (Инвертор: ${result.inverterMatched}, BMS: ${result.bmsMatched}${result.detectedDualBms ? ' • 2× АКБ' : ''})`
        : `✅ Auto-bound ${result.boundCount} entities (Inverter: ${result.inverterMatched}, BMS: ${result.bmsMatched}${result.detectedDualBms ? ' • Dual Pack' : ''})`;

    const event = new CustomEvent('config-changed', {
      detail: { config: result.updatedConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
    }
    ha-form {
      display: block;
      padding: 12px 0;
    }
    .autobind-card {
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(16, 185, 129, 0.1));
      border: 1px solid rgba(245, 158, 11, 0.35);
      border-radius: 12px;
      padding: 12px 14px;
      margin-bottom: 12px;
      box-sizing: border-box;
      width: 100%;
      max-width: 100%;
      overflow: hidden;
      container-type: inline-size;
    }
    .autobind-header {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 700;
      font-size: 14px;
      color: var(--primary-text-color);
      margin-bottom: 6px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .autobind-desc {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-bottom: 10px;
      line-height: 1.4;
      word-break: break-word;
    }
    .autobind-row {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: 10px;
      margin-bottom: 12px;
      width: 100%;
      box-sizing: border-box;
    }
    @container (max-width: 440px) {
      .autobind-row {
        grid-template-columns: minmax(0, 1fr);
      }
    }
    @media (max-width: 480px) {
      .autobind-row {
        grid-template-columns: minmax(0, 1fr);
      }
    }
    .autobind-field {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-width: 0;
      width: 100%;
      box-sizing: border-box;
    }
    .autobind-field label {
      font-size: 11px;
      font-weight: 600;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .autobind-select {
      width: 100%;
      max-width: 100%;
      min-width: 0;
      box-sizing: border-box;
      padding: 7px 10px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.2));
      background: var(--card-background-color, #1e293b);
      color: var(--primary-text-color, #fff);
      font-size: 12px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      cursor: pointer;
    }
    .autobind-select option {
      background: var(--card-background-color, #1e293b);
      color: var(--primary-text-color, #fff);
    }
    .autobind-btn {
      width: 100%;
      box-sizing: border-box;
      padding: 9px 14px;
      border-radius: 8px;
      border: none;
      background: linear-gradient(135deg, #f59e0b, #10b981);
      color: #0f172a;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: opacity 0.15s ease;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .autobind-btn:hover {
      opacity: 0.92;
    }
    .autobind-msg {
      margin-top: 8px;
      font-size: 12px;
      font-weight: 600;
      color: #10b981;
      text-align: center;
      word-break: break-word;
    }
  `;

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    const lang = getActiveLanguage(this.hass, this._config?.language);
    const { inverters, bmsList } = discoverDevices(this.hass);
    const curInv = this._selectedInverterPrefix || inverters[0]?.prefix || '';
    const curBms = this._selectedBmsPrefix || bmsList[0]?.prefix || '';

    return html`
      ${inverters.length > 0 || bmsList.length > 0
        ? html`
            <div class="autobind-card">
              <div class="autobind-header">
                <span>⚡ ${lang === 'uk' ? 'Авто-прив\'язка пристроїв в 1 клік (Smart Auto-Bind)' : lang === 'ru' ? 'Авто-привязка устройств в 1 клик (Smart Auto-Bind)' : '1-Click Device Auto-Discovery'}</span>
              </div>
              <div class="autobind-desc">
                ${lang === 'uk'
                  ? 'Оберіть виявлений інвертор та BMS — картка автоматично заповнить усі 30+ сенсорів потужності, напруг, комірок, налаштувань та помилок за 1 секунду.'
                  : lang === 'ru'
                  ? 'Выберите обнаруженный инвертор и BMS — карточка автоматически заполнит все 30+ сенсоров мощности, напряжений, ячеек, настроек и ошибок за 1 секунду.'
                  : 'Select your discovered Inverter and BMS prefix to automatically populate 30+ power, voltage, cell, control, and fault entities in 1 click.'}
              </div>
              <div class="autobind-row">
                <div class="autobind-field">
                  <label title="${lang === 'uk' ? 'Інвертор' : lang === 'ru' ? 'Инвертор' : 'Inverter Device'}">${lang === 'uk' ? 'Інвертор' : lang === 'ru' ? 'Инвертор' : 'Inverter Device'}</label>
                  <select
                    class="autobind-select"
                    .value=${curInv}
                    title="${curInv ? (inverters.find(i => i.prefix === curInv)?.label || curInv) : ''}"
                    @change=${(e: Event) => {
                      this._selectedInverterPrefix = (e.target as HTMLSelectElement).value;
                    }}
                  >
                    <option value="">${lang === 'uk' ? '— Не змінювати —' : lang === 'ru' ? '— Не менять —' : '— Keep current —'}</option>
                    ${inverters.map(
                      (inv) => html`<option value="${inv.prefix}" title="${inv.label}" ?selected=${inv.prefix === curInv}>${inv.label}</option>`
                    )}
                  </select>
                </div>
                <div class="autobind-field">
                  <label title="${lang === 'uk' ? 'Акумулятор / BMS' : lang === 'ru' ? 'Аккумулятор / BMS' : 'Battery / BMS Device'}">${lang === 'uk' ? 'Акумулятор / BMS' : lang === 'ru' ? 'Аккумулятор / BMS' : 'Battery / BMS Device'}</label>
                  <select
                    class="autobind-select"
                    .value=${curBms}
                    title="${curBms ? (bmsList.find(b => b.prefix === curBms)?.label || curBms) : ''}"
                    @change=${(e: Event) => {
                      this._selectedBmsPrefix = (e.target as HTMLSelectElement).value;
                    }}
                  >
                    <option value="">${lang === 'uk' ? '— Не змінювати —' : lang === 'ru' ? '— Не менять —' : '— Keep current —'}</option>
                    ${bmsList.map(
                      (b) => html`<option value="${b.prefix}" title="${b.label}" ?selected=${b.prefix === curBms}>${b.label}</option>`
                    )}
                  </select>
                </div>
              </div>
              <button type="button" class="autobind-btn" @click=${() => this._handleAutoBind()}>
                ✨ ${lang === 'uk' ? 'Авто-заповнити всі 30+ полів' : lang === 'ru' ? 'Авто-заполнить все 30+ полей' : 'Auto-Bind All 30+ Entities'}
              </button>
              ${this._autoBindMessage
                ? html`<div class="autobind-msg">${this._autoBindMessage}</div>`
                : ''}
            </div>
          `
        : ''}

      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._getSchema()}
        .computeLabel=${(s: any) => this._computeLabel(s)}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
}

// Backward compatibility alias for editor element
if (typeof customElements !== 'undefined' && !customElements.get('aninerel-power-card-editor')) {
  customElements.define('aninerel-power-card-editor', class extends AninerelPowerCardEditor {});
}
