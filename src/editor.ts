import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, AninerelCardConfig } from './types';
import { localize } from './localize/localize';

@customElement('aninerel-power-card-editor')
export class AninerelPowerCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: AninerelCardConfig;

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
    return localize(`editor.${schema.name}`, this.hass) || schema.name;
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
    return [
      {
        name: 'title',
        label: localize('editor.title', this.hass) || 'Card Title',
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
      // 1. Core Power Entities (Required: load_power)
      {
        name: 'entities',
        type: 'expandable',
        title: localize('editor.entities_group', this.hass) || '⚡ Real-time Power Entities (Required)',
        schema: [
          {
            name: 'solar_power',
            label: 'Solar Generation (PV Power) [Optional]',
            required: false,
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'battery_power',
            label: 'Battery Power (+Charge / -Discharge)',
            required: true,
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
        title: localize('editor.params_group', this.hass) || '📊 Electrical Parameters & Telemetry',
        schema: [
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
      // 3. BMS Redodo
      {
        name: 'bms',
        type: 'expandable',
        title: localize('editor.bms_group', this.hass) || '🔋 BMS Redodo LiFePO4 Telemetry',
        schema: [
          {
            name: 'dual_battery',
            label: '🔋 Mode: Dual 12V Batteries in Series (24V Pack)',
            selector: { boolean: {} },
          },
          // --- Battery #1 (12V LiFePO4) ---
          {
            name: 'bat1_name',
            label: 'Battery #1: Name (e.g. Redodo #1)',
            selector: { text: {} },
          },
          {
            name: 'bat1_soc_entity',
            label: 'Battery #1: State of Charge (SOC %)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'bat1_voltage_entity',
            label: 'Battery #1: Voltage (~13.5V)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'bat1_temperature_entity',
            label: 'Battery #1: Temperature (°C)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'bat1_cell_prefix',
            label: 'Battery #1: Cell Sensor Prefix (1..4)',
            selector: { text: {} },
          },
          // --- Battery #2 (12V LiFePO4) ---
          {
            name: 'bat2_name',
            label: 'Battery #2: Name (e.g. Redodo #2)',
            selector: { text: {} },
          },
          {
            name: 'bat2_soc_entity',
            label: 'Battery #2: State of Charge (SOC %)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'bat2_voltage_entity',
            label: 'Battery #2: Voltage (~13.5V)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'bat2_temperature_entity',
            label: 'Battery #2: Temperature (°C)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'bat2_cell_prefix',
            label: 'Battery #2: Cell Sensor Prefix (1..4)',
            selector: { text: {} },
          },
          // --- Single Battery Pack / Common Telemetry ---
          {
            name: 'soc_entity',
            label: 'Total / Average SOC % (Single Pack)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'voltage_entity',
            label: 'Total Battery Voltage via BMS (24V)',
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
            name: 'remaining_capacity_entity',
            label: 'Remaining Capacity (Ah)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'cell_count',
            label: 'Single Pack Cell Count (8 for 24V)',
            selector: { number: { min: 4, max: 16, step: 1, mode: 'box' } },
          },
          {
            name: 'cell_voltage_prefix',
            label: 'Single Pack Cell Sensor Prefix (1..8)',
            selector: { text: {} },
          },
        ],
      },
      // 4. Inverter Controls
      {
        name: 'controls',
        type: 'expandable',
        title: localize('editor.controls_group', this.hass) || '🎛️ Inverter Controls & Settings',
        schema: [
          {
            name: 'charge_source_entity',
            label: 'Charge Source Priority (Select)',
            selector: { entity: { domain: 'select' } },
          },
          {
            name: 'output_priority_entity',
            label: 'Output Source Priority (Select)',
            selector: { entity: { domain: 'select' } },
          },
          {
            name: 'max_charge_current_entity',
            label: 'Max AC Charge Current (Number)',
            selector: { entity: { domain: 'number' } },
          },
          {
            name: 'bulk_voltage_entity',
            label: 'Bulk Voltage Setting (Number)',
            selector: { entity: { domain: 'number' } },
          },
          {
            name: 'float_voltage_entity',
            label: 'Float Voltage Setting (Number)',
            selector: { entity: { domain: 'number' } },
          },
          {
            name: 'equalization_entity',
            label: 'Battery Equalization Mode (Switch)',
            selector: { entity: { domain: 'switch' } },
          },
        ],
      },
      // 5. Safety & Alerts
      {
        name: 'safety',
        type: 'expandable',
        title: localize('editor.safety_group', this.hass) || '🛡️ Safety & Diagnostics',
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
        title: localize('editor.energy_group', this.hass) || '📈 Daily Energy Counters',
        schema: [
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
            name: 'battery_charge_entity',
            label: 'Daily Battery Charge (kWh)',
            selector: { entity: { domain: 'sensor' } },
          },
          {
            name: 'battery_discharge_entity',
            label: 'Daily Battery Discharge (kWh)',
            selector: { entity: { domain: 'sensor' } },
          },
        ],
      },
      // 7. Visual & Section Visibility Options
      {
        name: '',
        type: 'expandable',
        title: localize('editor.display_group', this.hass) || '🎨 Layout & Visualization Toggles',
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
            label: 'Show Redodo BMS section',
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
        ],
      },
    ];
  }

  static styles = css`
    ha-form {
      display: block;
      padding: 12px 0;
    }
  `;

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
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
