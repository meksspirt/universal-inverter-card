import { html, TemplateResult } from 'lit';
import { AninerelCardConfig, HomeAssistant } from '../types';
import { localize } from '../localize/localize';
import {
  NominalSystemVoltage,
  resolveCardTitle,
  resolveDefaultSubtitle,
} from '../utils/system-profile';

export interface HeaderBarProps {
  hass?: HomeAssistant;
  config: AninerelCardConfig;
  hasSolar?: boolean;
  systemVoltage?: NominalSystemVoltage;
  isOffline?: boolean;
  operatingMode: string;
  temperature: number | null;
  selfConsumptionWatts?: number | null;
  selfConsumptionEntity?: string;
  efficiencyPct?: number | null;
  thermalLossWatts?: number | null;
  isCompact?: boolean;
  onToggleCompact?: () => void;
  gridBreakerState?: string | null;
  gridBreakerEntity?: string;
  isCharging: boolean;
  isFault: boolean;
  faultCode?: number | null;
  isWarning: boolean;
  warningCode?: number | null;
  onChipClick: (entityId?: string) => void;
}

export function renderHeaderBar(props: HeaderBarProps): TemplateResult {
  const {
    hass,
    config,
    hasSolar = false,
    systemVoltage = 24,
    isOffline = false,
    operatingMode,
    temperature,
    selfConsumptionWatts,
    selfConsumptionEntity,
    efficiencyPct = null,
    thermalLossWatts = null,
    isCompact = false,
    onToggleCompact,
    gridBreakerState,
    gridBreakerEntity,
    isCharging,
    isFault,
    faultCode,
    isWarning,
    warningCode,
    onChipClick,
  } = props;

  const lang = config.language;

  // Universal operating mode color & icon mapping across Voltronic, Deye, Growatt, PowMr, Victron, etc.
  const modeNormalized = operatingMode ? operatingMode.toLowerCase() : '';
  let modeColor = '#10b981'; // default battery/green
  let modeIcon = 'mdi:battery-charging-60';

  if (
    modeNormalized.includes('fault') ||
    modeNormalized.includes('error') ||
    modeNormalized.includes('alarm')
  ) {
    modeColor = '#ef4444';
    modeIcon = 'mdi:alert-octagon';
  } else if (modeNormalized.includes('bypass')) {
    modeColor = '#ef4444';
    modeIcon = 'mdi:transit-connection-variant';
  } else if (
    modeNormalized.includes('solar') ||
    modeNormalized.includes('pv') ||
    modeNormalized.includes('hybrid') ||
    modeNormalized === 'sbu' ||
    modeNormalized === 'sub'
  ) {
    modeColor = '#f59e0b';
    modeIcon = 'mdi:solar-power-variant';
  } else if (
    modeNormalized.includes('mains') ||
    modeNormalized.includes('line') ||
    modeNormalized.includes('grid') ||
    modeNormalized.includes('utility') ||
    modeNormalized === 'usb' ||
    modeNormalized === 'uti'
  ) {
    modeColor = '#3b82f6';
    modeIcon = 'mdi:transmission-tower';
  } else if (
    modeNormalized.includes('standby') ||
    modeNormalized.includes('idle') ||
    modeNormalized.includes('saving') ||
    modeNormalized.includes('eco')
  ) {
    modeColor = '#94a3b8';
    modeIcon = 'mdi:power-sleep';
  } else if (
    modeNormalized.includes('battery') ||
    modeNormalized.includes('off-grid') ||
    modeNormalized.includes('off_grid') ||
    modeNormalized.includes('inverter') ||
    modeNormalized.includes('discharg') ||
    modeNormalized.includes('backup') ||
    modeNormalized.includes('ups')
  ) {
    modeColor = '#10b981';
    modeIcon = 'mdi:battery-outline';
  }

  // Inverter Temperature color thresholds
  let tempColor = '#10b981';
  if (temperature !== null && !isNaN(temperature)) {
    if (temperature > 55) {
      tempColor = '#ef4444';
    } else if (temperature > 42) {
      tempColor = '#f59e0b';
    }
  }

  const defaultIcon = hasSolar ? 'mdi:solar-power-variant-outline' : 'mdi:home-battery-outline';
  const resolvedTitle = resolveCardTitle(config, hass);
  const resolvedSubtitle = resolveDefaultSubtitle(config, hasSolar, systemVoltage, hass);

  return html`
    <div class="header-bar">
      <!-- Card Title & Inverter Model -->
      <div class="header-left">
        <div class="header-icon-box">
          <ha-icon icon="${config.icon || defaultIcon}"></ha-icon>
        </div>
        <div class="header-title-box">
          <span class="header-title">${resolvedTitle}</span>
          <span class="header-subtitle">${resolvedSubtitle}</span>
        </div>
      </div>

      <!-- Live Status Chips -->
      <div class="header-chips">
        <!-- Operating Mode Chip -->
        ${operatingMode && operatingMode !== 'N/A' && !isOffline
          ? html`
              <button
                type="button"
                class="status-chip"
                style="--chip-color: ${modeColor}"
                @click=${() => onChipClick(config.operating_mode_entity)}
                title="Inverter operating mode"
              >
                <ha-icon .icon=${modeIcon}></ha-icon>
                <span>${operatingMode}</span>
              </button>
            `
          : ''}

        <!-- Inverter Temperature Chip -->
        ${temperature !== null && !isNaN(temperature)
          ? html`
              <button
                type="button"
                class="status-chip"
                style="--chip-color: ${tempColor}"
                @click=${() => onChipClick(config.inverter_temperature_entity)}
                title="Inverter power unit temperature"
              >
                <ha-icon icon="mdi:thermometer"></ha-icon>
                <span>${Math.round(temperature)}°C</span>
              </button>
            `
          : ''}

        <!-- Real-Time Conversion Efficiency & Heat Loss Chip -->
        ${efficiencyPct !== null && !isNaN(efficiencyPct) && !isOffline
          ? html`
              <button
                type="button"
                class="status-chip"
                style="--chip-color: ${efficiencyPct >= 90 ? '#10b981' : efficiencyPct >= 80 ? '#f59e0b' : '#f97316'}"
                @click=${() => onChipClick(selfConsumptionEntity || config.entities?.load_power)}
                title="${localize('params.conversion_efficiency', hass, lang)}: ${efficiencyPct.toFixed(1)}%${thermalLossWatts ? ` (${localize('header.heat_loss', hass, lang)}: ${Math.round(thermalLossWatts)}W)` : ''}"
              >
                <ha-icon icon="mdi:fire-circle"></ha-icon>
                <span>
                  ${localize('header.efficiency', hass, lang)}: ${efficiencyPct.toFixed(1)}%${thermalLossWatts !== null && thermalLossWatts > 0 ? ` • ${Math.round(thermalLossWatts)}W` : ''}
                </span>
              </button>
            `
          : selfConsumptionWatts !== null && selfConsumptionWatts !== undefined && !isNaN(selfConsumptionWatts) && selfConsumptionWatts > 0
          ? html`
              <button
                type="button"
                class="status-chip"
                style="--chip-color: #a855f7"
                @click=${() => onChipClick(selfConsumptionEntity)}
                title="Inverter own power consumption"
              >
                <ha-icon icon="mdi:flash-outline"></ha-icon>
                <span>${localize('header.self_power', hass, lang)}: ${Math.round(selfConsumptionWatts)}W</span>
              </button>
            `
          : ''}

        <!-- Input Breaker Chip (Zigbee Smart Plug / Breaker) -->
        ${gridBreakerState === 'on' || gridBreakerState === 'off'
          ? html`
              <button
                type="button"
                class="status-chip"
                style="--chip-color: ${gridBreakerState === 'on' ? '#3b82f6' : '#f59e0b'}"
                @click=${() => onChipClick(gridBreakerEntity)}
                title="AC Input Breaker (${gridBreakerState.toUpperCase()})"
              >
                <ha-icon icon="${gridBreakerState === 'on' ? 'mdi:electric-switch-closed' : 'mdi:electric-switch'}"></ha-icon>
                <span>${localize('header.input_breaker', hass, lang)}: ${gridBreakerState.toUpperCase()}</span>
              </button>
            `
          : ''}

        <!-- Charging Active Flag -->
        ${isCharging && !isOffline
          ? html`
              <button
                type="button"
                class="status-chip pulse-chip"
                style="--chip-color: #10b981"
                @click=${() => onChipClick(config.charging_active_entity)}
                title="Charging active"
              >
                <ha-icon icon="mdi:battery-charging"></ha-icon>
                <span>${localize('common.chg', hass, lang)}</span>
              </button>
            `
          : ''}

        <!-- Offline Chip -->
        ${isOffline
          ? html`
              <button
                type="button"
                class="status-chip pulse-chip-danger"
                style="--chip-color: #ef4444"
                @click=${() => onChipClick(config.operating_mode_entity || config.entities?.load_power)}
                title="${localize('alerts.offline_title', hass, lang)}"
              >
                <ha-icon icon="mdi:lan-disconnect"></ha-icon>
                <span>${localize('common.offline', hass, lang)}</span>
              </button>
            `
          : ''}

        <!-- Fault Active Chip -->
        ${isFault && !isOffline
          ? html`
              <button
                type="button"
                class="status-chip pulse-chip-danger"
                style="--chip-color: #ef4444"
                @click=${() => onChipClick(config.safety?.fault_code_entity || config.safety?.fault_active_entity)}
                title="Inverter fault status"
              >
                <ha-icon icon="mdi:alert-circle"></ha-icon>
                <span>${faultCode ? `F${faultCode}` : localize('common.fault', hass, lang)}</span>
              </button>
            `
          : ''}

        <!-- Warnings Active Chip -->
        ${isWarning && !isFault && !isOffline
          ? html`
              <button
                type="button"
                class="status-chip"
                style="--chip-color: #f59e0b"
                @click=${() => onChipClick(config.safety?.warning_code_entity || config.safety?.warnings_active_entity)}
                title="Inverter warning"
              >
                <ha-icon icon="mdi:alert"></ha-icon>
                <span>${warningCode ? `W${warningCode}` : localize('common.warn', hass, lang)}</span>
              </button>
            `
          : ''}

        <!-- System Normal Chip -->
        ${!isFault && !isWarning && !isOffline
          ? html`
              <div class="status-chip chip-ok" title="System normal">
                <ha-icon icon="mdi:check-circle"></ha-icon>
                <span>${localize('common.ok', hass, lang)}</span>
              </div>
            `
          : ''}

        <!-- Quick Compact / Full Mode Toggle Button -->
        ${onToggleCompact
          ? html`
              <button
                type="button"
                class="status-chip compact-toggle-chip"
                style="--chip-color: #38bdf8"
                @click=${onToggleCompact}
                title="${localize('header.compact_toggle', hass, lang)}"
              >
                <ha-icon icon="${isCompact ? 'mdi:arrow-expand-all' : 'mdi:arrow-collapse-all'}"></ha-icon>
              </button>
            `
          : ''}
      </div>
    </div>
  `;
}
