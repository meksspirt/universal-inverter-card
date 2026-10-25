import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
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
import { formatDurationHours } from './utils/format';
import { getActiveLanguage } from './localize/localize';

// Console banner on load
console.info(
  `%c  ANINEREL-POWER-CARD  %c  Version ${CARD_VERSION}  `,
  'color: #ffffff; background: #F59E0B; font-weight: bold; border-radius: 3px 0 0 3px;',
  'color: #000000; background: #10B981; font-weight: bold; border-radius: 0 3px 3px 0;'
);

const DEFAULT_SELF_POWER_ENTITY =
  'sensor.aninerel_anl_4200t_24l_w_pro_invertor_sobstvennoe_potreblenie';
const DEFAULT_SELF_DAILY_ENTITY =
  'sensor.aninerel_anl_4200t_24l_w_pro_invertor_sobstvennoe_potreblenie_za_den';
const DEFAULT_SELF_MONTHLY_ENTITY =
  'sensor.aninerel_anl_4200t_24l_w_pro_invertor_sobstvennoe_potreblenie_za_mesiats';
const DEFAULT_BREAKER_ENTITY = 'switch.invertor_vkhod';
const DEFAULT_BREAKER_POWER_ENTITY = 'sensor.invertor_vkhod_power';
const DEFAULT_BREAKER_VOLTAGE_ENTITY = 'sensor.invertor_vkhod_voltage';
const DEFAULT_REMAINING_ENERGY_ENTITY =
  'sensor.kukhnia_redodo_24v_bms_to_inverter_rs485_bridge_redodo_24v_remaining_energy';
const DEFAULT_LOAD_PERCENT_ENTITY =
  'sensor.aninerel_anl_4200t_24l_w_pro_load_percent';

@customElement(CARD_NAME)
export class AninerelPowerCard extends LitElement implements LovelaceCard {
  @state() private _config!: AninerelCardConfig;
  @state() private _hass!: HomeAssistant;
  @state() private _controlsExpanded = false;
  @state() private _chargeCurrentPreview: number | null = null;
  @state() private _equalizationConfirmPending = false;
  private _equalizationConfirmTimer?: ReturnType<typeof setTimeout>;

  // Time-bucketed 24-hour history buffer for sparkline generation (32 buckets * 45 min = 24h)
  private _historyMap: Map<string, number[]> = new Map();
  private _lastBucketIndexMap: Map<string, number> = new Map();
  private readonly _maxHistoryPoints = 32;
  private readonly _bucketDurationMs = (24 * 60 * 60 * 1000) / 32; // 45 minutes per bucket
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
    return this._config?.compact_mode ? 10 : 14;
  }

  // 4. Modern Sections View Grid Options (HA 2024.3+)
  public getLayoutOptions() {
    return {
      grid_rows: this._config?.compact_mode ? 10 : 14,
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
      const startTimeMs = now - 24 * 60 * 60 * 1000;
      const startTime = new Date(startTimeMs).toISOString();
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
        const curBucket = Math.floor(now / this._bucketDurationMs);
        if (batEntity) {
          const rawList = this._extractStateList(historyData, batEntity);
          const points = this._sampleHistoryPoints(rawList, this._maxHistoryPoints, startTimeMs, now);
          if (points.length > 0) {
            this._historyMap.set('battery_voltage', points);
            this._lastBucketIndexMap.set('battery_voltage', curBucket);
          }
        }
        if (gridEntity) {
          const rawList = this._extractStateList(historyData, gridEntity);
          const points = this._sampleHistoryPoints(rawList, this._maxHistoryPoints, startTimeMs, now);
          if (points.length > 0) {
            this._historyMap.set('grid_voltage', points);
            this._lastBucketIndexMap.set('grid_voltage', curBucket);
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

  /**
   * Time-bucketed sampling across 24 hours so long steady periods and bursty periods
   * are represented proportionally in time rather than skewed by array index density.
   */
  private _sampleHistoryPoints(
    rawStates: any[],
    targetPoints: number,
    startTimeMs: number,
    endTimeMs: number
  ): number[] {
    if (!rawStates || rawStates.length === 0) return [];

    const timedValues: Array<{ t: number; v: number }> = [];
    for (const item of rawStates) {
      const s = item.s !== undefined ? item.s : item.state;
      const v = parseFloat(s);
      if (isNaN(v) || !isFinite(v)) continue;

      let t = NaN;
      if (typeof item.lu === 'number') {
        t = item.lu * 1000;
      } else if (typeof item.lc === 'number') {
        t = item.lc * 1000;
      } else if (item.last_updated || item.last_changed) {
        t = Date.parse(item.last_updated || item.last_changed);
      }
      timedValues.push({ t, v });
    }

    if (timedValues.length === 0) return [];

    // If timestamps are present, sample evenly across time buckets
    const hasTimestamps = timedValues.some((pt) => !isNaN(pt.t));
    if (hasTimestamps && endTimeMs > startTimeMs) {
      const result: number[] = [];
      const span = endTimeMs - startTimeMs;
      let cursor = 0;
      let lastKnownVal = timedValues[0].v;

      for (let i = 0; i < targetPoints; i++) {
        const bucketEnd = startTimeMs + ((i + 1) / targetPoints) * span;
        let sum = 0;
        let count = 0;
        while (cursor < timedValues.length) {
          const pt = timedValues[cursor];
          if (!isNaN(pt.t) && pt.t > bucketEnd) break;
          lastKnownVal = pt.v;
          sum += pt.v;
          count++;
          cursor++;
        }
        result.push(count > 0 ? Number((sum / count).toFixed(2)) : lastKnownVal);
      }
      return result;
    }

    // Fallback: index-based sampling if timestamps are unavailable
    const values = timedValues.map((pt) => pt.v);
    if (values.length <= targetPoints) return values;
    const result: number[] = [];
    const step = (values.length - 1) / (targetPoints - 1);
    for (let i = 0; i < targetPoints; i++) {
      result.push(values[Math.min(Math.round(i * step), values.length - 1)]);
    }
    return result;
  }

  // Records numeric history points for sparklines without evicting 24h history on rapid updates
  private _updateHistoryBuffers(): void {
    if (!this._config || !this._hass) return;

    const batEntity =
      this._config.battery_voltage_entity || this._config.bms?.voltage_entity;
    if (batEntity) {
      const batV = this._getNullableNumber(batEntity);
      if (batV !== null) {
        this._pushHistory('battery_voltage', batV);
      }
    }

    if (this._config.grid_voltage_entity) {
      const gridV = this._getNullableNumber(this._config.grid_voltage_entity);
      if (gridV !== null) {
        this._pushHistory('grid_voltage', gridV);
      }
    }
  }

  private _pushHistory(key: string, val: number): void {
    const arr = this._historyMap.get(key) || [];
    const curBucket = Math.floor(Date.now() / this._bucketDurationMs);
    const lastBucket = this._lastBucketIndexMap.get(key);

    if (arr.length < this._maxHistoryPoints) {
      // Initial live fill when history API has not populated 32 points yet
      if (arr.length === 0 || Math.abs(arr[arr.length - 1] - val) > 0.001) {
        arr.push(val);
        this._historyMap.set(key, arr);
        this._lastBucketIndexMap.set(key, curBucket);
      }
    } else if (lastBucket !== undefined && curBucket > lastBucket) {
      // A new 45-minute time bucket started: advance window by 1
      arr.push(val);
      if (arr.length > this._maxHistoryPoints) {
        arr.shift();
      }
      this._historyMap.set(key, arr);
      this._lastBucketIndexMap.set(key, curBucket);
    } else {
      // Within the same 45-minute bucket: update the current (latest) point in place
      arr[arr.length - 1] = val;
      this._historyMap.set(key, arr);
    }
  }

  // Dirty checking helper: only re-render if monitored entities update
  private _hasRelevantEntitiesChanged(oldHass: HomeAssistant, newHass: HomeAssistant): boolean {
    if (!this._config) return true;
    if (oldHass.language !== newHass.language || oldHass.locale?.language !== newHass.locale?.language) {
      return true;
    }
    const watched = this._getMonitoredEntityIds();
    for (const id of watched) {
      if (oldHass.states[id] !== newHass.states[id]) {
        return true;
      }
    }
    return false;
  }

  private _getMonitoredEntityIds(): string[] {
    const ids: string[] = [
      DEFAULT_SELF_POWER_ENTITY,
      DEFAULT_SELF_DAILY_ENTITY,
      DEFAULT_SELF_MONTHLY_ENTITY,
      DEFAULT_BREAKER_ENTITY,
      DEFAULT_BREAKER_POWER_ENTITY,
      DEFAULT_BREAKER_VOLTAGE_ENTITY,
      DEFAULT_REMAINING_ENERGY_ENTITY,
      DEFAULT_LOAD_PERCENT_ENTITY,
    ];
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
    if (this._config.inverter_load_percent_entity) ids.push(this._config.inverter_load_percent_entity);
    if (this._config.self_consumption_power_entity) ids.push(this._config.self_consumption_power_entity);
    if (this._config.grid_breaker_switch_entity) ids.push(this._config.grid_breaker_switch_entity);
    if (this._config.grid_breaker_power_entity) ids.push(this._config.grid_breaker_power_entity);
    if (this._config.kpi_entity) ids.push(this._config.kpi_entity);

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
      if (bms.remaining_energy_entity) ids.push(bms.remaining_energy_entity);

      const pushCellCandidates = (pfx: string, cnt: number) => {
        const clean = pfx.trim();
        for (let i = 1; i <= cnt; i++) {
          ids.push(`${clean}${i}`);
          ids.push(`${clean}${i}_voltage`);
        }
      };

      const count = bms.cell_count || 8;
      const prefix = bms.cell_voltage_prefix || 'sensor.redodo_battery_cell_voltage_';
      pushCellCandidates(prefix, count);

      // Battery 1 (flat & nested)
      const count1 = bms.battery_1?.cell_count || 4;
      if (bms.bat1_soc_entity) ids.push(bms.bat1_soc_entity);
      if (bms.bat1_voltage_entity) ids.push(bms.bat1_voltage_entity);
      if (bms.bat1_temperature_entity) ids.push(bms.bat1_temperature_entity);
      if (bms.bat1_cell_prefix) {
        pushCellCandidates(bms.bat1_cell_prefix, count1);
      }
      if (bms.battery_1) {
        const b1 = bms.battery_1;
        if (b1.soc_entity) ids.push(b1.soc_entity);
        if (b1.voltage_entity) ids.push(b1.voltage_entity);
        if (b1.temperature_entity) ids.push(b1.temperature_entity);
        if (b1.cell_voltage_prefix) {
          pushCellCandidates(b1.cell_voltage_prefix, count1);
        }
      }

      // Battery 2 (flat & nested)
      const count2 = bms.battery_2?.cell_count || 4;
      if (bms.bat2_soc_entity) ids.push(bms.bat2_soc_entity);
      if (bms.bat2_voltage_entity) ids.push(bms.bat2_voltage_entity);
      if (bms.bat2_temperature_entity) ids.push(bms.bat2_temperature_entity);
      if (bms.bat2_cell_prefix) {
        pushCellCandidates(bms.bat2_cell_prefix, count2);
      }
      if (bms.battery_2) {
        const b2 = bms.battery_2;
        if (b2.soc_entity) ids.push(b2.soc_entity);
        if (b2.voltage_entity) ids.push(b2.voltage_entity);
        if (b2.temperature_entity) ids.push(b2.temperature_entity);
        if (b2.cell_voltage_prefix) {
          pushCellCandidates(b2.cell_voltage_prefix, count2);
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
      if (daily_energy.self_consumption_daily_entity) ids.push(daily_energy.self_consumption_daily_entity);
      if (daily_energy.self_consumption_monthly_entity) ids.push(daily_energy.self_consumption_monthly_entity);
    }

    return ids.filter(Boolean);
  }

  private _resolveCellEntityId(prefix: string, cellIndex: number): string {
    const cleanPrefix = prefix.trim();
    const candidates = [
      `${cleanPrefix}${cellIndex}`,
      `${cleanPrefix}${cellIndex}_voltage`,
      `${cleanPrefix.replace(/_voltage_?$/, '_')}${cellIndex}_voltage`,
      `${cleanPrefix.replace(/_cell_?$/, '_cell_voltage_')}${cellIndex}`,
    ];
    if (this._hass?.states) {
      for (const candidate of candidates) {
        if (this._hass.states[candidate] && !this._isEntityUnavailable(candidate)) {
          return candidate;
        }
      }
      for (const candidate of candidates) {
        if (this._hass.states[candidate]) {
          return candidate;
        }
      }
    }
    return candidates[0];
  }

  private _findMatchingEntity(baseEntityId?: string, targetSuffix?: string): string | undefined {
    if (!baseEntityId || !targetSuffix || !this._hass || !this._hass.states) return undefined;
    const candidate = baseEntityId.replace(/_code$/, targetSuffix.replace(/^_+/, '_'));
    if (this._hass.states[candidate]) return candidate;
    return undefined;
  }

  private _resolveEntity(configured?: string, fallback?: string): string | undefined {
    if (configured && configured.trim() !== '') return configured;
    if (fallback && this._hass?.states?.[fallback]) return fallback;
    return undefined;
  }

  private _isEntityUnavailable(entityId?: string): boolean {
    if (!entityId || !this._hass || !this._hass.states[entityId]) return true;
    const st = this._hass.states[entityId].state;
    return st === 'unavailable' || st === 'unknown' || st === '';
  }

  private _getState(entityId?: string): string {
    if (!entityId || !this._hass || !this._hass.states[entityId]) return 'N/A';
    const st = this._hass.states[entityId].state;
    if (st === 'unavailable' || st === 'unknown') return 'N/A';
    return st;
  }

  private _getNumber(entityId?: string): number {
    const val = this._getNullableNumber(entityId);
    return val ?? 0;
  }

  private _getNullableNumber(entityId?: string): number | null {
    if (!entityId || !this._hass || !this._hass.states[entityId]) return null;
    const raw = this._hass.states[entityId].state;
    if (raw === 'unavailable' || raw === 'unknown' || raw === '') return null;
    const val = parseFloat(raw);
    return isNaN(val) || !isFinite(val) ? null : val;
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

  private async _handleToggleEqualization(entityId: string, currentState: boolean): Promise<void> {
    if (!this._hass) return;
    // Inline 2-step confirmation when turning ON Equalization
    if (!currentState && !this._equalizationConfirmPending) {
      this._equalizationConfirmPending = true;
      if (this._equalizationConfirmTimer) clearTimeout(this._equalizationConfirmTimer);
      this._equalizationConfirmTimer = setTimeout(() => {
        this._equalizationConfirmPending = false;
      }, 4000);
      return;
    }

    this._equalizationConfirmPending = false;
    if (this._equalizationConfirmTimer) clearTimeout(this._equalizationConfirmTimer);

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

    const activeLang = getActiveLanguage(this._hass, this._config.language);
    const maxPower = this._config.max_power || 4200;

    const hasSolar = Boolean(
      this._config.show_solar &&
        this._config.entities.solar_power &&
        this._config.entities.solar_power.trim() !== ''
    );

    // Detect if inverter datalogger collector is offline
    const loadUnavailable = this._isEntityUnavailable(this._config.entities.load_power);
    const modeUnavailable = this._config.operating_mode_entity
      ? this._isEntityUnavailable(this._config.operating_mode_entity)
      : loadUnavailable;
    const isOffline = Boolean(this._hass && loadUnavailable && modeUnavailable);

    // Power values
    const solarWatts =
      hasSolar && this._config.entities.solar_power
        ? this._getNumber(this._config.entities.solar_power)
        : 0;
    const batteryWatts = this._getNumber(this._config.entities.battery_power);
    const rawGridWatts = this._getNumber(this._config.entities.grid_power);
    const gridBreakerPowerEntity = this._resolveEntity(
      this._config.grid_breaker_power_entity,
      DEFAULT_BREAKER_POWER_ENTITY
    );
    const gridBreakerWatts = gridBreakerPowerEntity
      ? this._getNullableNumber(gridBreakerPowerEntity)
      : null;
    // Internal inverter grid_power ignores ~20W AC standby draw; prefer external input meter when higher
    const gridWatts =
      gridBreakerWatts !== null && gridBreakerWatts > rawGridWatts ? gridBreakerWatts : rawGridWatts;
    const loadWatts = this._getNumber(this._config.entities.load_power);

    // Electrical telemetry (honest null when sensor is unavailable)
    const batteryVoltage = this._getNullableNumber(
      this._config.battery_voltage_entity || this._config.bms?.voltage_entity
    );
    const batteryCurrent = this._getNullableNumber(
      this._config.battery_current_entity || this._config.bms?.current_entity
    );
    const gridVoltage =
      this._getNullableNumber(this._config.grid_voltage_entity) ??
      this._getNullableNumber(DEFAULT_BREAKER_VOLTAGE_ENTITY);

    // Self-consumption & Grid Input Breaker (configured or auto-discovered)
    const selfPowerEntity = this._resolveEntity(
      this._config.self_consumption_power_entity,
      DEFAULT_SELF_POWER_ENTITY
    );
    const selfConsumptionWatts = selfPowerEntity ? this._getNullableNumber(selfPowerEntity) : null;

    const gridBreakerEntity = this._resolveEntity(
      this._config.grid_breaker_switch_entity,
      DEFAULT_BREAKER_ENTITY
    );
    const gridBreakerState = gridBreakerEntity ? this._getState(gridBreakerEntity) : null;

    // Battery SOC (reads BMS sensor, with intelligent fallback for 24V 8S LiFePO4 pack when voltage is valid)
    let batterySoc: number | null = this._config.bms?.soc_entity
      ? this._getNullableNumber(this._config.bms.soc_entity)
      : null;

    // Inverter statuses & alerts
    const operatingMode = this._getState(this._config.operating_mode_entity);
    const temperature = this._getNullableNumber(this._config.inverter_temperature_entity);

    const isCharging = this._getState(this._config.charging_active_entity) === 'on';
    const isFault = this._getState(this._config.safety?.fault_active_entity) === 'on';
    const rawFaultCode = this._getNullableNumber(this._config.safety?.fault_code_entity);
    const faultCode = rawFaultCode !== null ? Math.round(rawFaultCode) : null;
    const faultDetailsEntity =
      this._config.safety?.fault_details_entity ||
      this._findMatchingEntity(this._config.safety?.fault_code_entity, '_fault_details');
    const rawFaultDetails = faultDetailsEntity ? this._getState(faultDetailsEntity) : null;
    const faultDetailsText =
      rawFaultDetails && rawFaultDetails !== 'N/A' && rawFaultDetails !== '0'
        ? rawFaultDetails
        : null;

    let isWarning = this._getState(this._config.safety?.warnings_active_entity) === 'on';
    const rawWarningNum = this._getNullableNumber(this._config.safety?.warning_code_entity);
    const rawWarningCode = rawWarningNum !== null ? Math.round(rawWarningNum) : null;
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
    // strip PV-related warning bits/codes and normal AC blackout status bits.
    if (!hasSolar) {
      const { effectiveCode, hasNonPvWarning } = filterWarningCodeForNoSolar(rawWarningCode);
      warningCode = effectiveCode;
      if (!hasNonPvWarning) {
        isWarning = false;
      }
    }

    // Daily energy & self-consumption counters
    const gridImportEnergyToday = this._getNullableNumber(
      this._config.daily_energy?.grid_import_entity
    );
    const loadEnergyToday = this._getNullableNumber(
      this._config.daily_energy?.load_energy_entity
    );
    const batChargeEnergyToday = this._getNullableNumber(
      this._config.daily_energy?.battery_charge_entity
    );
    const batDischargeEnergyToday = this._getNullableNumber(
      this._config.daily_energy?.battery_discharge_entity
    );
    const selfDailyEntity = this._resolveEntity(
      this._config.daily_energy?.self_consumption_daily_entity,
      DEFAULT_SELF_DAILY_ENTITY
    );
    const selfConsumptionDailyEnergy = selfDailyEntity
      ? this._getNullableNumber(selfDailyEntity)
      : null;

    const selfMonthlyEntity = this._resolveEntity(
      this._config.daily_energy?.self_consumption_monthly_entity,
      DEFAULT_SELF_MONTHLY_ENTITY
    );
    const selfConsumptionMonthlyEnergy = selfMonthlyEntity
      ? this._getNullableNumber(selfMonthlyEntity)
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

        const v1 = this._getNullableNumber(v1Entity);
        const v2 = this._getNullableNumber(v2Entity);

        const soc1Entity = bms.bat1_soc_entity || b1?.soc_entity;
        const soc2Entity = bms.bat2_soc_entity || b2?.soc_entity;

        const soc1 = this._getNullableNumber(soc1Entity);
        const soc2 = this._getNullableNumber(soc2Entity);

        const t1Entity = bms.bat1_temperature_entity || b1?.temperature_entity;
        const t2Entity = bms.bat2_temperature_entity || b2?.temperature_entity;

        const t1 = this._getNullableNumber(t1Entity);
        const t2 = this._getNullableNumber(t2Entity);

        // Scan cells for Battery 1 (supports both <prefix><N> and <prefix><N>_voltage)
        const cells1: CellData[] = [];
        const prefix1 = bms.bat1_cell_prefix || b1?.cell_voltage_prefix || 'sensor.redodo_1_cell_voltage_';
        const count1 = b1?.cell_count || 4;
        for (let i = 1; i <= count1; i++) {
          const cellEntity1 = this._resolveCellEntityId(prefix1, i);
          let val = this._getNullableNumber(cellEntity1) ?? 0;
          if (val > 100) val = val / 1000;
          cells1.push({ index: i, voltage: val > 0 ? val : 0, rawEntityId: cellEntity1 });
        }

        // Scan cells for Battery 2 (supports both <prefix><N> and <prefix><N>_voltage)
        const cells2: CellData[] = [];
        const prefix2 = bms.bat2_cell_prefix || b2?.cell_voltage_prefix || 'sensor.redodo_2_cell_voltage_';
        const count2 = b2?.cell_count || 4;
        for (let i = 1; i <= count2; i++) {
          const cellEntity2 = this._resolveCellEntityId(prefix2, i);
          let val = this._getNullableNumber(cellEntity2) ?? 0;
          if (val > 100) val = val / 1000;
          cells2.push({ index: i + count1, voltage: val > 0 ? val : 0, rawEntityId: cellEntity2 });
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
        if (soc1 !== null && soc2 !== null && soc1 >= 0 && soc2 >= 0) {
          batterySoc = Math.min(soc1, soc2);
        } else if (soc1 !== null) {
          batterySoc = soc1;
        } else if (soc2 !== null) {
          batterySoc = soc2;
        }
      } else {
        const cellCount = bms.cell_count || 8;
        const prefix = bms.cell_voltage_prefix || 'sensor.redodo_battery_cell_voltage_';

        for (let i = 1; i <= cellCount; i++) {
          const entityId = this._resolveCellEntityId(prefix, i);
          let rawVal = this._getNullableNumber(entityId) ?? 0;
          if (rawVal > 100) {
            rawVal = rawVal / 1000;
          }
          bmsCells.push({
            index: i,
            voltage: rawVal > 0 ? rawVal : 0,
            rawEntityId: entityId,
          });
        }
      }
    }

    // Fallback voltage-based SoC estimation ONLY when batteryVoltage is genuinely available (>= 20V)
    if ((batterySoc === null || isNaN(batterySoc)) && batteryVoltage !== null && batteryVoltage >= 20) {
      if (batteryVoltage >= 27.2) batterySoc = 100;
      else if (batteryVoltage >= 26.8) batterySoc = Math.round(80 + ((batteryVoltage - 26.8) / 0.4) * 20);
      else if (batteryVoltage >= 26.4) batterySoc = Math.round(50 + ((batteryVoltage - 26.4) / 0.4) * 30);
      else if (batteryVoltage >= 26.0) batterySoc = Math.round(20 + ((batteryVoltage - 26.0) / 0.4) * 30);
      else if (batteryVoltage >= 24.0) batterySoc = Math.max(5, Math.round(((batteryVoltage - 24.0) / 2.0) * 20));
      else batterySoc = 5;
    }

    // Calculate Battery Runtime (Time-to-Empty on discharge / Time-to-Full on charge)
    const nominalCapWh = bms?.nominal_capacity_wh || 2560;
    const remEnergyEntity = this._resolveEntity(
      bms?.remaining_energy_entity,
      DEFAULT_REMAINING_ENERGY_ENTITY
    );
    let remainingWh: number | null = null;
    if (remEnergyEntity) {
      const rawRem = this._getNullableNumber(remEnergyEntity);
      if (rawRem !== null) {
        const unit = this._hass?.states[remEnergyEntity]?.attributes?.unit_of_measurement?.toLowerCase() || '';
        remainingWh = unit === 'kwh' ? rawRem * 1000 : rawRem;
      }
    }
    if (remainingWh === null && batterySoc !== null) {
      remainingWh = (Math.max(0, batterySoc) / 100) * nominalCapWh;
    }

    let batteryRuntimeText: string | null = null;
    if (remainingWh !== null && Math.abs(batteryWatts) > 15) {
      if (batteryWatts < -15) {
        // Discharging: usable energy down to 10% SoC reserve
        const reserveWh = nominalCapWh * 0.1;
        const usableWh = Math.max(0, remainingWh - reserveWh);
        const hoursLeft = usableWh / Math.abs(batteryWatts);
        batteryRuntimeText = formatDurationHours(hoursLeft, activeLang);
      } else if (batteryWatts > 15 && (batterySoc === null || batterySoc < 99.5)) {
        // Charging: time until full
        const neededWh = Math.max(0, nominalCapWh - remainingWh);
        const hoursToFull = neededWh / batteryWatts;
        batteryRuntimeText = formatDurationHours(hoursToFull, activeLang);
      }
    }

    // Inverter Load % (configured sensor, auto-discovered sensor, or mathematical fallback)
    const loadPctEntity = this._resolveEntity(
      this._config.inverter_load_percent_entity,
      DEFAULT_LOAD_PERCENT_ENTITY
    );
    const rawLoadPct = loadPctEntity ? this._getNullableNumber(loadPctEntity) : null;
    const inverterLoadPercent =
      rawLoadPct !== null
        ? rawLoadPct
        : maxPower > 0
        ? Math.min(100, Math.round((loadWatts / maxPower) * 100))
        : 0;

    // Inverter Controls & dynamic number attributes
    const controls = this._config.controls;
    const safety = this._config.safety;
    const dailyEnergy = this._config.daily_energy;

    const chargeCurrentEntity = controls?.max_charge_current_entity;
    const chargeCurrentAttrs = chargeCurrentEntity
      ? this._hass?.states[chargeCurrentEntity]?.attributes
      : undefined;
    const maxChargeCurrentMin =
      typeof chargeCurrentAttrs?.min === 'number' ? chargeCurrentAttrs.min : 2;
    const maxChargeCurrentMax =
      typeof chargeCurrentAttrs?.max === 'number' ? chargeCurrentAttrs.max : 100;
    const maxChargeCurrentStep =
      typeof chargeCurrentAttrs?.step === 'number' ? chargeCurrentAttrs.step : 1;

    return html`
      <ha-card class="${this._config.compact_mode ? 'compact' : ''}">
        <!-- 1. Header Bar with live status chips -->
        ${this._config.show_header !== false
          ? renderHeaderBar({
              hass: this._hass,
              config: this._config,
              hasSolar,
              isOffline,
              operatingMode,
              temperature,
              selfConsumptionWatts,
              selfConsumptionEntity: selfPowerEntity,
              gridBreakerState,
              gridBreakerEntity,
              isCharging,
              isFault,
              faultCode,
              isWarning,
              warningCode,
              onChipClick: (id) => this._handleEntityClick(id),
            })
          : ''}

        <!-- 2. Active Safety & Diagnostics Alert Banners (if offline or any faults/warnings) -->
        ${this._config.show_alerts !== false && (safety || isOffline)
          ? renderAlertPanel({
              hass: this._hass,
              language: this._config.language,
              safetyConfig: safety,
              isOffline,
              offlineEntity: this._config.operating_mode_entity || this._config.entities.load_power,
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
              isOffline,
              gridPosition: this._config.grid_position || 'bottom',
              solarWatts,
              batteryWatts,
              gridWatts,
              loadWatts,
              batterySoc,
              batteryVoltage,
              batteryCurrent,
              gridVoltage,
              gridBreakerState,
              inverterLoadPercent,
              batteryRuntimeText,
              selfConsumptionWatts,
              operatingMode,
              isFault,
              onNodeClick: (id) => this._handleEntityClick(id),
            })
          : ''}

        <!-- 4. Electrical Telemetry & Battery SoC / Self-Sufficiency KPI -->
        ${this._config.show_params !== false
          ? renderElectricalParams({
              hass: this._hass,
              config: this._config,
              hasSolar,
              batteryVoltage,
              batteryCurrent,
              gridVoltage,
              batterySoc,
              gridImportEnergyToday,
              loadEnergyToday,
              batteryDischargeEnergyToday: batDischargeEnergyToday,
              inverterLoadPercent,
              historyMap: this._historyMap,
              onParamClick: (id) => this._handleEntityClick(id),
            })
          : ''}

        <!-- 5. BMS Redodo LiFePO4 Cell Telemetry & Balancing (Single or Dual Battery Series) -->
        ${this._config.show_bms !== false && bms
          ? renderBmsPanel({
              hass: this._hass,
              language: this._config.language,
              bmsConfig: bms,
              isDual,
              battery1: bat1Data,
              battery2: bat2Data,
              soc: batterySoc,
              temperature: this._getNullableNumber(bms.temperature_entity),
              temperature2: this._getNullableNumber(bms.temperature_2_entity),
              cycleCount: this._getNullableNumber(bms.cycle_count_entity),
              remainingCapacity: this._getNullableNumber(bms.remaining_capacity_entity),
              fullCapacity: this._getNullableNumber(bms.full_capacity_entity),
              cellDelta: this._getNullableNumber(bms.cell_delta_entity),
              cells: bmsCells,
              onBmsClick: (id) => this._handleEntityClick(id),
            })
          : ''}

        <!-- 6. Inverter Controls & Automations Panel -->
        ${this._config.show_controls !== false && controls
          ? renderControlsPanel({
              controlsConfig: controls,
              hass: this._hass,
              language: this._config.language,
              expanded: this._controlsExpanded,
              onToggleExpand: () => {
                this._controlsExpanded = !this._controlsExpanded;
              },
              chargeSource: controls.charge_source_entity
                ? this._getState(controls.charge_source_entity)
                : undefined,
              chargeSourceOptions: this._getOptions(controls.charge_source_entity),
              outputPriority: controls.output_priority_entity
                ? this._getState(controls.output_priority_entity)
                : undefined,
              outputPriorityOptions: this._getOptions(controls.output_priority_entity),
              maxChargeCurrent: this._getNullableNumber(controls.max_charge_current_entity),
              maxChargeCurrentPreview: this._chargeCurrentPreview,
              maxChargeCurrentMin,
              maxChargeCurrentMax,
              maxChargeCurrentStep,
              bulkVoltage: this._getNullableNumber(controls.bulk_voltage_entity),
              floatVoltage: this._getNullableNumber(controls.float_voltage_entity),
              isEqualization: controls.equalization_entity
                ? this._getState(controls.equalization_entity) === 'on'
                : false,
              equalizationConfirmPending: this._equalizationConfirmPending,
              onSelectOption: (id, opt) => this._handleSelectOption(id, opt),
              onPreviewNumber: (val) => {
                this._chargeCurrentPreview = val;
              },
              onSetNumber: (id, val) => this._handleSetNumber(id, val),
              onToggleEqualization: (id, cur) => this._handleToggleEqualization(id, cur),
            })
          : ''}

        <!-- 7. Daily Energy Statistics (Today's Production, Consumption & Self-Consumption) -->
        ${this._config.show_energy !== false && dailyEnergy
          ? renderEnergyStats({
              hass: this._hass,
              language: this._config.language,
              dailyConfig: dailyEnergy,
              loadEnergy: loadEnergyToday,
              gridImportEnergy: gridImportEnergyToday,
              batteryChargeEnergy: batChargeEnergyToday,
              batteryDischargeEnergy: batDischargeEnergyToday,
              selfConsumptionDailyEnergy,
              selfConsumptionDailyEntity: selfDailyEntity,
              selfConsumptionMonthlyEnergy,
              selfConsumptionMonthlyEntity: selfMonthlyEntity,
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
