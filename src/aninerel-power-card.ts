import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, AninerelCardConfig, LovelaceCard } from './types';
import { CARD_NAME, CARD_VERSION, DEFAULT_CONFIG, STUB_CONFIG } from './const';
import { cardStyles } from './styles';
import { renderHeaderBar } from './components/header-bar';
import { renderPowerFlow } from './components/power-flow';
import { renderElectricalParams } from './components/electrical-params';
import { renderBmsPanel, CellData, DualBatteryData } from './components/bms-panel';
import { renderControlsPanel } from './components/controls-panel';
import { renderEnergyStats } from './components/energy-stats';
import { renderAlertPanel } from './components/alert-panel';
import { filterWarningCodeForNoSolar } from './utils/fault-codes';

// Console banner on load
console.info(
  `%c  ANINEREL-POWER-CARD  %c  Version ${CARD_VERSION}  `,
  'color: #ffffff; background: #F59E0B; font-weight: bold; border-radius: 3px 0 0 3px;',
  'color: #000000; background: #10B981; font-weight: bold; border-radius: 0 3px 3px 0;'
);

@customElement(CARD_NAME)
export class AninerelPowerCard extends LitElement implements LovelaceCard {
  @state() private _config!: AninerelCardConfig;
  @state() private _hass!: HomeAssistant;
  @state() private _controlsExpanded = false;

  // Sliding history buffer for sparkline generation
  private _historyMap: Map<string, number[]> = new Map();
  private readonly _maxHistoryPoints = 32;
  private _lastHistoryFetch = 0;
  private readonly _historyFetchInterval = 15 * 60 * 1000; // 15 minutes

  static styles = [cardStyles];

  // 1. Lifecycle: setConfig
  public setConfig(config: AninerelCardConfig): void {
    if (!config) {
      throw new Error('Invalid card configuration');
    }
    if (!config.entities) {
      throw new Error('Required "entities" block is not defined in configuration');
    }
    if (!config.entities.load_power) {
      throw new Error('At least entities.load_power must be specified');
    }

    this._config = {
      ...DEFAULT_CONFIG,
      ...config,
      entities: { ...config.entities },
      bms: config.bms ? { ...config.bms } : undefined,
      controls: config.controls ? { ...config.controls } : undefined,
      safety: config.safety ? { ...config.safety } : undefined,
      daily_energy: config.daily_energy ? { ...config.daily_energy } : undefined,
      colors: config.colors ? { ...config.colors } : undefined,
    } as AninerelCardConfig;
  }

  // 2. Lifecycle: hass setter with dirty checking and history recording
  set hass(hass: HomeAssistant) {
    const oldHass = this._hass;
    this._hass = hass;

    if (!oldHass) {
      this._fetchHistory();
    }

    if (!oldHass || this._hasRelevantEntitiesChanged(oldHass, hass)) {
      this._updateHistoryBuffers();
      this.requestUpdate();
    }
  }

  get hass(): HomeAssistant {
    return this._hass;
  }

  protected firstUpdated(): void {
    this._fetchHistory();
  }

  // 3. Lovelace Sizing for Masonry layout (1 unit = 50px)
  public getCardSize(): number {
    return 14;
  }

  // 4. Modern Sections View Grid Options (HA 2024.3+)
  public getLayoutOptions() {
    return {
      grid_rows: 14,
      grid_columns: 4,
      grid_min_rows: 8,
      grid_min_columns: 2,
    };
  }

  // 5. Default stub configuration when clicking "+ Add Card" in HA UI
  public static getStubConfig(): Record<string, any> {
    return STUB_CONFIG;
  }

  // 6. Connect Visual GUI Configuration Editor
  public static async getConfigElement(): Promise<HTMLElement> {
    await import('./editor');
    return document.createElement('aninerel-power-card-editor');
  }

  // Fetches real 24-hour historical records from Home Assistant via WebSocket/API
  private async _fetchHistory(): Promise<void> {
    if (!this._config || !this._hass) return;

    const batEntity =
      this._config.battery_voltage_entity || this._config.bms?.voltage_entity;
    const gridEntity = this._config.grid_voltage_entity;

    const entityIds: string[] = [];
    if (batEntity) entityIds.push(batEntity);
    if (gridEntity) entityIds.push(gridEntity);

    if (entityIds.length === 0) return;

    const now = Date.now();
    if (now - this._lastHistoryFetch < this._historyFetchInterval && this._historyMap.size > 0) {
      return;
    }
    this._lastHistoryFetch = now;

    try {
      const startTime = new Date(now - 24 * 60 * 60 * 1000).toISOString();
      let historyData: any = null;

      if (typeof this._hass.callWS === 'function') {
        historyData = await this._hass.callWS({
          type: 'history/history_during_period',
          start_time: startTime,
          entity_ids: entityIds,
          minimal_response: true,
          no_attributes: true,
        });
      } else if (typeof this._hass.callApi === 'function') {
        const query = `history/period/${startTime}?filter_entity_id=${entityIds.join(',')}&minimal_response&no_attributes`;
        historyData = await this._hass.callApi('GET', query);
      }

      if (historyData) {
        if (batEntity) {
          const rawList = this._extractStateList(historyData, batEntity);
          const points = this._sampleHistoryPoints(rawList, this._maxHistoryPoints);
          if (points.length > 0) {
            this._historyMap.set('battery_voltage', points);
          }
        }
        if (gridEntity) {
          const rawList = this._extractStateList(historyData, gridEntity);
          const points = this._sampleHistoryPoints(rawList, this._maxHistoryPoints);
          if (points.length > 0) {
            this._historyMap.set('grid_voltage', points);
          }
        }
        this.requestUpdate();
      }
    } catch (err) {
      console.warn('AninerelPowerCard: using live buffer for sparklines (history API unavailable):', err);
    }
  }

  private _extractStateList(response: any, entityId: string): any[] {
    if (!response) return [];
    if (response[entityId] && Array.isArray(response[entityId])) {
      return response[entityId];
    }
    if (Array.isArray(response)) {
      for (const item of response) {
        if (Array.isArray(item) && item.length > 0) {
          if (item[0]?.entity_id === entityId) return item;
        } else if (item?.entity_id === entityId && Array.isArray(item.states)) {
          return item.states;
        }
      }
      if (response[0]?.state !== undefined || response[0]?.s !== undefined) {
        return response;
      }
    }
    if (response.entity_id === entityId && Array.isArray(response.states)) {
      return response.states;
    }
    return [];
  }

  private _sampleHistoryPoints(rawStates: any[], targetPoints: number): number[] {
    if (!rawStates || rawStates.length === 0) return [];
    const values: number[] = [];
    for (const item of rawStates) {
      const s = item.s !== undefined ? item.s : item.state;
      const v = parseFloat(s);
      if (!isNaN(v) && isFinite(v)) {
        values.push(v);
      }
    }
    if (values.length === 0) return [];
    if (values.length <= targetPoints) return values;

    const result: number[] = [];
    const step = (values.length - 1) / (targetPoints - 1);
    for (let i = 0; i < targetPoints; i++) {
      result.push(values[Math.min(Math.round(i * step), values.length - 1)]);
    }
    return result;
  }

  // Records numeric history points for sparklines
  private _updateHistoryBuffers(): void {
    if (!this._config || !this._hass) return;

    const batEntity =
      this._config.battery_voltage_entity || this._config.bms?.voltage_entity;
    if (batEntity) {
      const batV = this._getNumber(batEntity);
      if (batV !== null && !isNaN(batV)) {
        this._pushHistory('battery_voltage', batV);
      }
    }

    if (this._config.grid_voltage_entity) {
      const gridV = this._getNumber(this._config.grid_voltage_entity);
      if (gridV !== null && !isNaN(gridV)) {
        this._pushHistory('grid_voltage', gridV);
      }
    }
  }

  private _pushHistory(key: string, val: number): void {
    const arr = this._historyMap.get(key) || [];
    if (arr.length === 0 || Math.abs(arr[arr.length - 1] - val) > 0.001) {
      arr.push(val);
      if (arr.length > this._maxHistoryPoints) {
        arr.shift();
      }
      this._historyMap.set(key, arr);
    }
  }

  // Dirty checking helper: only re-render if monitored entities update
  private _hasRelevantEntitiesChanged(oldHass: HomeAssistant, newHass: HomeAssistant): boolean {
    if (!this._config) return true;
    const watched = this._getMonitoredEntityIds();
    for (const id of watched) {
      if (oldHass.states[id] !== newHass.states[id]) {
        return true;
      }
    }
    return false;
  }

  private _getMonitoredEntityIds(): string[] {
    const ids: string[] = [];
    if (!this._config) return ids;

    const { entities, bms, controls, safety, daily_energy } = this._config;

    if (entities) {
      if (entities.solar_power) ids.push(entities.solar_power);
      if (entities.battery_power) ids.push(entities.battery_power);
      if (entities.grid_power) ids.push(entities.grid_power);
      if (entities.load_power) ids.push(entities.load_power);
    }

    if (this._config.battery_voltage_entity) ids.push(this._config.battery_voltage_entity);
    if (this._config.battery_current_entity) ids.push(this._config.battery_current_entity);
    if (this._config.grid_voltage_entity) ids.push(this._config.grid_voltage_entity);
    if (this._config.operating_mode_entity) ids.push(this._config.operating_mode_entity);
    if (this._config.charging_active_entity) ids.push(this._config.charging_active_entity);
    if (this._config.inverter_temperature_entity) ids.push(this._config.inverter_temperature_entity);

    if (bms) {
      if (bms.soc_entity) ids.push(bms.soc_entity);
      if (bms.voltage_entity) ids.push(bms.voltage_entity);
      if (bms.current_entity) ids.push(bms.current_entity);
      if (bms.temperature_entity) ids.push(bms.temperature_entity);
      if (bms.temperature_2_entity) ids.push(bms.temperature_2_entity);
      if (bms.cycle_count_entity) ids.push(bms.cycle_count_entity);
      if (bms.cell_delta_entity) ids.push(bms.cell_delta_entity);
      if (bms.remaining_capacity_entity) ids.push(bms.remaining_capacity_entity);
      if (bms.full_capacity_entity) ids.push(bms.full_capacity_entity);

      const count = bms.cell_count || 8;
      const prefix = bms.cell_voltage_prefix || 'sensor.redodo_battery_cell_voltage_';
      for (let i = 1; i <= count; i++) {
        ids.push(`${prefix}${i}`);
      }

      // Battery 1 (flat & nested)
      if (bms.bat1_soc_entity) ids.push(bms.bat1_soc_entity);
      if (bms.bat1_voltage_entity) ids.push(bms.bat1_voltage_entity);
      if (bms.bat1_temperature_entity) ids.push(bms.bat1_temperature_entity);
      if (bms.bat1_cell_prefix) {
        for (let i = 1; i <= 4; i++) ids.push(`${bms.bat1_cell_prefix}${i}`);
      }
      if (bms.battery_1) {
        const b1 = bms.battery_1;
        if (b1.soc_entity) ids.push(b1.soc_entity);
        if (b1.voltage_entity) ids.push(b1.voltage_entity);
        if (b1.temperature_entity) ids.push(b1.temperature_entity);
        if (b1.cell_voltage_prefix) {
          for (let i = 1; i <= (b1.cell_count || 4); i++) ids.push(`${b1.cell_voltage_prefix}${i}`);
        }
      }

      // Battery 2 (flat & nested)
      if (bms.bat2_soc_entity) ids.push(bms.bat2_soc_entity);
      if (bms.bat2_voltage_entity) ids.push(bms.bat2_voltage_entity);
      if (bms.bat2_temperature_entity) ids.push(bms.bat2_temperature_entity);
      if (bms.bat2_cell_prefix) {
        for (let i = 1; i <= 4; i++) ids.push(`${bms.bat2_cell_prefix}${i}`);
      }
      if (bms.battery_2) {
        const b2 = bms.battery_2;
        if (b2.soc_entity) ids.push(b2.soc_entity);
        if (b2.voltage_entity) ids.push(b2.voltage_entity);
        if (b2.temperature_entity) ids.push(b2.temperature_entity);
        if (b2.cell_voltage_prefix) {
          for (let i = 1; i <= (b2.cell_count || 4); i++) ids.push(`${b2.cell_voltage_prefix}${i}`);
        }
      }
    }

    if (controls) {
      if (controls.charge_source_entity) ids.push(controls.charge_source_entity);
      if (controls.output_priority_entity) ids.push(controls.output_priority_entity);
      if (controls.max_charge_current_entity) ids.push(controls.max_charge_current_entity);
      if (controls.bulk_voltage_entity) ids.push(controls.bulk_voltage_entity);
      if (controls.float_voltage_entity) ids.push(controls.float_voltage_entity);
      if (controls.equalization_entity) ids.push(controls.equalization_entity);
    }

    if (safety) {
      if (safety.fault_active_entity) ids.push(safety.fault_active_entity);
      if (safety.fault_code_entity) {
        ids.push(safety.fault_code_entity);
        ids.push(safety.fault_code_entity.replace(/_code$/, '_details'));
      }
      if (safety.fault_details_entity) ids.push(safety.fault_details_entity);
      if (safety.warnings_active_entity) ids.push(safety.warnings_active_entity);
      if (safety.warning_code_entity) {
        ids.push(safety.warning_code_entity);
        ids.push(safety.warning_code_entity.replace(/_code$/, '_details'));
      }
      if (safety.warning_details_entity) ids.push(safety.warning_details_entity);
    }

    if (daily_energy) {
      if (daily_energy.load_energy_entity) ids.push(daily_energy.load_energy_entity);
      if (daily_energy.grid_import_entity) ids.push(daily_energy.grid_import_entity);
      if (daily_energy.battery_charge_entity) ids.push(daily_energy.battery_charge_entity);
      if (daily_energy.battery_discharge_entity) ids.push(daily_energy.battery_discharge_entity);
    }

    return ids.filter(Boolean);
  }

  private _findMatchingEntity(baseEntityId?: string, targetSuffix?: string): string | undefined {
    if (!baseEntityId || !targetSuffix || !this._hass || !this._hass.states) return undefined;
    const candidate = baseEntityId.replace(/_code$/, targetSuffix.replace(/^_+/, '_'));
    if (this._hass.states[candidate]) return candidate;
    return undefined;
  }

  private _getState(entityId?: string): string {
    if (!entityId || !this._hass || !this._hass.states[entityId]) return 'N/A';
    return this._hass.states[entityId].state;
  }

  private _getNumber(entityId?: string): number {
    if (!entityId || !this._hass || !this._hass.states[entityId]) return 0;
    const val = parseFloat(this._hass.states[entityId].state);
    return isNaN(val) ? 0 : val;
  }

  private _getOptions(entityId?: string): string[] {
    if (!entityId || !this._hass || !this._hass.states[entityId]) return [];
    return this._hass.states[entityId].attributes?.options || [];
  }

  private _handleEntityClick(entityId?: string): void {
    if (!entityId) return;
    const event = new CustomEvent('hass-more-info', {
      bubbles: true,
      composed: true,
      detail: { entityId },
    });
    this.dispatchEvent(event);
  }

  // Service callers for inverter control commands
  private async _handleSelectOption(entityId: string, option: string): Promise<void> {
    if (!this._hass) return;
    try {
      await this._hass.callService('select', 'select_option', {
        entity_id: entityId,
        option,
      });
    } catch (err: any) {
      console.error('Failed to set option:', err);
    }
  }

  private async _handleSetNumber(entityId: string, value: number): Promise<void> {
    if (!this._hass) return;
    try {
      await this._hass.callService('number', 'set_value', {
        entity_id: entityId,
        value,
      });
    } catch (err: any) {
      console.error('Failed to set number value:', err);
    }
  }

  private async _handleToggleSwitch(entityId: string, currentState: boolean): Promise<void> {
    if (!this._hass) return;
    try {
      await this._hass.callService('switch', currentState ? 'turn_off' : 'turn_on', {
        entity_id: entityId,
      });
    } catch (err: any) {
      console.error('Failed to toggle switch:', err);
    }
  }

  protected render() {
    if (!this._config) return html``;

    const hasSolar = Boolean(
      this._config.show_solar &&
      this._config.entities.solar_power &&
      this._config.entities.solar_power.trim() !== ''
    );

    // Power values
    const solarWatts = hasSolar && this._config.entities.solar_power
      ? this._getNumber(this._config.entities.solar_power)
      : 0;
    const batteryWatts = this._getNumber(this._config.entities.battery_power);
    const gridWatts = this._getNumber(this._config.entities.grid_power);
    const loadWatts = this._getNumber(this._config.entities.load_power);
    // Electrical telemetry
    const batteryVoltage = this._config.battery_voltage_entity
      ? this._getNumber(this._config.battery_voltage_entity)
      : null;
    const batteryCurrent = this._config.battery_current_entity
      ? this._getNumber(this._config.battery_current_entity)
      : null;
    const gridVoltage = this._config.grid_voltage_entity
      ? this._getNumber(this._config.grid_voltage_entity)
      : null;

    // Battery SOC (reads BMS sensor, with intelligent fallback for 24V 8S LiFePO4 pack)
    let batterySoc = this._config.bms?.soc_entity
      ? this._getNumber(this._config.bms.soc_entity)
      : 0;

    if ((batterySoc <= 0 || isNaN(batterySoc)) && batteryVoltage && batteryVoltage >= 20) {
      if (batteryVoltage >= 27.2) batterySoc = 100;
      else if (batteryVoltage >= 26.8) batterySoc = Math.round(80 + ((batteryVoltage - 26.8) / 0.4) * 20);
      else if (batteryVoltage >= 26.4) batterySoc = Math.round(50 + ((batteryVoltage - 26.4) / 0.4) * 30);
      else if (batteryVoltage >= 26.0) batterySoc = Math.round(20 + ((batteryVoltage - 26.0) / 0.4) * 30);
      else if (batteryVoltage >= 24.0) batterySoc = Math.max(5, Math.round(((batteryVoltage - 24.0) / 2.0) * 20));
      else batterySoc = 5;
    } else if (batterySoc <= 0 && (!batteryVoltage || batteryVoltage < 20)) {
      batterySoc = 80;
    }

    // Inverter statuses & alerts
    const operatingMode = this._getState(this._config.operating_mode_entity);
    const temperature = this._config.inverter_temperature_entity
      ? this._getNumber(this._config.inverter_temperature_entity)
      : null;

    const isCharging = this._getState(this._config.charging_active_entity) === 'on';
    const isFault = this._getState(this._config.safety?.fault_active_entity) === 'on';
    const faultCode = this._config.safety?.fault_code_entity
      ? parseInt(this._getState(this._config.safety.fault_code_entity), 10)
      : null;
    const faultDetailsEntity =
      this._config.safety?.fault_details_entity ||
      this._findMatchingEntity(this._config.safety?.fault_code_entity, '_fault_details');
    const rawFaultDetails = faultDetailsEntity ? this._getState(faultDetailsEntity) : null;
    const faultDetailsText =
      rawFaultDetails && rawFaultDetails !== 'N/A' && rawFaultDetails !== '0'
        ? rawFaultDetails
        : null;

    let isWarning = this._getState(this._config.safety?.warnings_active_entity) === 'on';
    const rawWarningCode = this._config.safety?.warning_code_entity
      ? parseInt(this._getState(this._config.safety.warning_code_entity), 10)
      : null;
    const warningDetailsEntity =
      this._config.safety?.warning_details_entity ||
      this._findMatchingEntity(this._config.safety?.warning_code_entity, '_warning_details');
    const rawWarningDetails = warningDetailsEntity ? this._getState(warningDetailsEntity) : null;
    const warningDetailsText =
      rawWarningDetails && rawWarningDetails !== 'N/A' && rawWarningDetails !== '0'
        ? rawWarningDetails
        : null;

    let warningCode = rawWarningCode;
    // When solar generation is disabled (show_solar: false / no panels),
    // strip PV-related warning bits/codes (W64 / W15 / bit 6) so normal 0V MPPT doesn't alarm.
    if (!hasSolar) {
      const { effectiveCode, hasNonPvWarning } = filterWarningCodeForNoSolar(rawWarningCode);
      warningCode = effectiveCode;
      if (!hasNonPvWarning) {
        isWarning = false;
      }
    }

    // Daily energy
    const gridImportEnergyToday = this._config.daily_energy?.grid_import_entity
      ? this._getNumber(this._config.daily_energy.grid_import_entity)
      : null;
    const loadEnergyToday = this._config.daily_energy?.load_energy_entity
      ? this._getNumber(this._config.daily_energy.load_energy_entity)
      : null;
    const batChargeEnergyToday = this._config.daily_energy?.battery_charge_entity
      ? this._getNumber(this._config.daily_energy.battery_charge_entity)
      : null;
    const batDischargeEnergyToday = this._config.daily_energy?.battery_discharge_entity
      ? this._getNumber(this._config.daily_energy.battery_discharge_entity)
      : null;

    // BMS Redodo telemetry (Single or Dual 12V Series)
    const bms = this._config.bms;
    const isDual = Boolean(
      bms?.dual_battery ||
      (bms?.battery_1 && bms?.battery_2) ||
      bms?.bat1_soc_entity ||
      bms?.bat1_voltage_entity ||
      bms?.bat2_soc_entity ||
      bms?.bat2_voltage_entity
    );

    let bmsCells: CellData[] = [];
    let bat1Data: DualBatteryData | undefined;
    let bat2Data: DualBatteryData | undefined;

    if (bms) {
      if (isDual) {
        const b1 = bms.battery_1;
        const b2 = bms.battery_2;

        const v1Entity = bms.bat1_voltage_entity || b1?.voltage_entity;
        const v2Entity = bms.bat2_voltage_entity || b2?.voltage_entity;

        const v1 = v1Entity
          ? this._getNumber(v1Entity)
          : batteryVoltage
          ? Number((batteryVoltage / 2).toFixed(2))
          : null;
        const v2 = v2Entity
          ? this._getNumber(v2Entity)
          : batteryVoltage
          ? Number((batteryVoltage / 2).toFixed(2))
          : null;

        const soc1Entity = bms.bat1_soc_entity || b1?.soc_entity;
        const soc2Entity = bms.bat2_soc_entity || b2?.soc_entity;

        const soc1 = soc1Entity ? this._getNumber(soc1Entity) : (batterySoc || null);
        const soc2 = soc2Entity ? this._getNumber(soc2Entity) : (batterySoc || null);

        const t1Entity = bms.bat1_temperature_entity || b1?.temperature_entity;
        const t2Entity = bms.bat2_temperature_entity || b2?.temperature_entity;

        const t1 = t1Entity ? this._getNumber(t1Entity) : null;
        const t2 = t2Entity ? this._getNumber(t2Entity) : null;

        // Scan cells for Battery 1 (default 4 cells)
        const cells1: CellData[] = [];
        const prefix1 = bms.bat1_cell_prefix || b1?.cell_voltage_prefix || 'sensor.redodo_1_cell_voltage_';
        const count1 = b1?.cell_count || 4;
        for (let i = 1; i <= count1; i++) {
          let val = this._getNumber(`${prefix1}${i}`);
          if (val > 100) val = val / 1000;
          if (val <= 0 && v1 && v1 > 0) val = Number((v1 / count1).toFixed(3));
          cells1.push({ index: i, voltage: val > 0 ? val : 3.38, rawEntityId: `${prefix1}${i}` });
        }

        // Scan cells for Battery 2 (default 4 cells)
        const cells2: CellData[] = [];
        const prefix2 = bms.bat2_cell_prefix || b2?.cell_voltage_prefix || 'sensor.redodo_2_cell_voltage_';
        const count2 = b2?.cell_count || 4;
        for (let i = 1; i <= count2; i++) {
          let val = this._getNumber(`${prefix2}${i}`);
          if (val > 100) val = val / 1000;
          if (val <= 0 && v2 && v2 > 0) val = Number((v2 / count2).toFixed(3));
          cells2.push({ index: i + count1, voltage: val > 0 ? val : 3.38, rawEntityId: `${prefix2}${i}` });
        }

        bat1Data = {
          name: bms.bat1_name || b1?.name || 'Battery #1 (12V)',
          voltage: v1,
          soc: soc1,
          temperature: t1,
          cells: cells1,
        };

        bat2Data = {
          name: bms.bat2_name || b2?.name || 'Battery #2 (12V)',
          voltage: v2,
          soc: soc2,
          temperature: t2,
          cells: cells2,
        };

        // In series connection, lowest pack limits capacity
        if (soc1 !== null && soc2 !== null && soc1 > 0 && soc2 > 0) {
          batterySoc = Math.min(soc1, soc2);
        }
      } else {
        const cellCount = bms.cell_count || 8;
        const prefix = bms.cell_voltage_prefix || 'sensor.redodo_battery_cell_voltage_';

        for (let i = 1; i <= cellCount; i++) {
          const entityId = `${prefix}${i}`;
          let rawVal = this._getNumber(entityId);
          if (rawVal > 100) {
            rawVal = rawVal / 1000;
          }
          if (rawVal <= 0 && batteryVoltage && batteryVoltage > 0) {
            rawVal = Number((batteryVoltage / cellCount).toFixed(3));
          }
          bmsCells.push({
            index: i,
            voltage: rawVal > 0 ? rawVal : 3.33,
            rawEntityId: entityId,
          });
        }
      }
    }

    // Inverter Controls
    const controls = this._config.controls;
    const safety = this._config.safety;
    const dailyEnergy = this._config.daily_energy;

    return html`
      <ha-card>
        <!-- 1. Header Bar with live status chips -->
        ${this._config.show_header !== false
          ? renderHeaderBar({
              config: this._config,
              hasSolar,
              operatingMode,
              temperature,
              isCharging,
              isFault,
              faultCode,
              isWarning,
              warningCode,
              onChipClick: (id) => this._handleEntityClick(id),
            })
          : ''}

        <!-- 2. Active Safety & Diagnostics Alert Banners (if any faults/warnings) -->
        ${this._config.show_alerts !== false && safety
          ? renderAlertPanel({
              safetyConfig: safety,
              isFault,
              faultCode,
              faultDetailsText,
              isWarning,
              warningCode,
              warningDetailsText,
              onAlertClick: (id) => this._handleEntityClick(id),
            })
          : ''}

        <!-- 3. Power Flow Animated Diagram -->
        ${this._config.show_flow !== false
          ? renderPowerFlow({
              hass: this._hass,
              config: this._config,
              hasSolar,
              gridPosition: this._config.grid_position || 'bottom',
              solarWatts,
              batteryWatts,
              gridWatts,
              loadWatts,
              batterySoc,
              operatingMode: operatingMode !== 'N/A' ? operatingMode : 'Inverter',
              isFault,
              onNodeClick: (id) => this._handleEntityClick(id),
            })
          : ''}

        <!-- 4. Electrical Telemetry & Self-Sufficiency KPI -->
        ${this._config.show_params !== false
          ? renderElectricalParams({
              config: this._config,
              hasSolar,
              batteryVoltage,
              batteryCurrent,
              gridVoltage,
              gridImportEnergyToday,
              loadEnergyToday,
              historyMap: this._historyMap,
              onParamClick: (id) => this._handleEntityClick(id),
            })
          : ''}

        <!-- 5. BMS Redodo LiFePO4 Cell Telemetry & Balancing (Single or Dual Battery Series) -->
        ${this._config.show_bms !== false && bms
          ? renderBmsPanel({
              bmsConfig: bms,
              isDual,
              battery1: bat1Data,
              battery2: bat2Data,
              soc: batterySoc,
              temperature: bms.temperature_entity ? this._getNumber(bms.temperature_entity) : null,
              temperature2: bms.temperature_2_entity ? this._getNumber(bms.temperature_2_entity) : null,
              cycleCount: bms.cycle_count_entity ? this._getNumber(bms.cycle_count_entity) : null,
              remainingCapacity: bms.remaining_capacity_entity ? this._getNumber(bms.remaining_capacity_entity) : null,
              fullCapacity: bms.full_capacity_entity ? this._getNumber(bms.full_capacity_entity) : null,
              cellDelta: bms.cell_delta_entity ? this._getNumber(bms.cell_delta_entity) : null,
              cells: bmsCells,
              onBmsClick: (id) => this._handleEntityClick(id),
            })
          : ''}

        <!-- 6. Inverter Controls & Automations Panel -->
        ${this._config.show_controls !== false && controls
          ? renderControlsPanel({
              controlsConfig: controls,
              hass: this._hass,
              expanded: this._controlsExpanded,
              onToggleExpand: () => {
                this._controlsExpanded = !this._controlsExpanded;
              },
              chargeSource: controls.charge_source_entity ? this._getState(controls.charge_source_entity) : undefined,
              chargeSourceOptions: this._getOptions(controls.charge_source_entity),
              outputPriority: controls.output_priority_entity ? this._getState(controls.output_priority_entity) : undefined,
              outputPriorityOptions: this._getOptions(controls.output_priority_entity),
              maxChargeCurrent: controls.max_charge_current_entity ? this._getNumber(controls.max_charge_current_entity) : undefined,
              bulkVoltage: controls.bulk_voltage_entity ? this._getNumber(controls.bulk_voltage_entity) : undefined,
              floatVoltage: controls.float_voltage_entity ? this._getNumber(controls.float_voltage_entity) : undefined,
              isEqualization: controls.equalization_entity ? this._getState(controls.equalization_entity) === 'on' : false,
              onSelectOption: (id, opt) => this._handleSelectOption(id, opt),
              onSetNumber: (id, val) => this._handleSetNumber(id, val),
              onToggleSwitch: (id, cur) => this._handleToggleSwitch(id, cur),
            })
          : ''}

        <!-- 7. Daily Energy Statistics (Today's Production & Consumption) -->
        ${this._config.show_energy !== false && dailyEnergy
          ? renderEnergyStats({
              dailyConfig: dailyEnergy,
              loadEnergy: loadEnergyToday,
              gridImportEnergy: gridImportEnergyToday,
              batteryChargeEnergy: batChargeEnergyToday,
              batteryDischargeEnergy: batDischargeEnergyToday,
              onEnergyClick: (id?: string) => this._handleEntityClick(id),
            })
          : ''}
      </ha-card>
    `;
  }
}

// Global Custom Card Registration in Home Assistant Card Picker
declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_NAME,
  name: 'Aninerel Power Card',
  description: 'Ultimate power card for Aninerel ANL 4200T inverter + Redodo BMS',
  preview: true,
  documentationURL: 'https://github.com/ziffmafiya/aninerel-power-card',
});
