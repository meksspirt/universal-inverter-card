import { html, TemplateResult } from 'lit';
import { AninerelCardConfig, HomeAssistant } from '../types';
import { localize } from '../localize/localize';

export interface HeaderBarProps {
  hass?: HomeAssistant;
  config: AninerelCardConfig;
  hasSolar?: boolean;
  isOffline?: boolean;
  operatingMode: string;
  temperature: number | null;
  selfConsumptionWatts?: number | null;
  selfConsumptionEntity?: string;
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
    isOffline = false,
    operatingMode,
    temperature,
    selfConsumptionWatts,
    selfConsumptionEntity,
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

  // Operating mode color mapping
  const modeNormalized = operatingMode ? operatingMode.toLowerCase() : '';
  let modeColor = '#10b981'; // default battery/green
  let modeIcon = 'mdi:battery-charging-60';

  if (modeNormalized.includes('mains') || modeNormalized.includes('line') || modeNormalized.includes('grid')) {
    modeColor = '#3b82f6';
    modeIcon = 'mdi:transmission-tower';
  } else if (modeNormalized.includes('bypass')) {
    modeColor = '#ef4444';
    modeIcon = 'mdi:transit-connection-variant';
  } else if (modeNormalized.includes('battery') || modeNormalized.includes('off-grid') || modeNormalized.includes('off_grid')) {
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
  const defaultSubtitle = hasSolar
    ? localize('header.subtitle_solar', hass, lang)
    : localize('header.subtitle_ups', hass, lang);

  return html`
    <div class="header-bar">
      <!-- Card Title & Inverter Model -->
      <div class="header-left">
        <div class="header-icon-box">
          <ha-icon icon="${config.icon || defaultIcon}"></ha-icon>
        </div>
        <div class="header-title-box">
          <span class="header-title">${config.title || 'Aninerel ANL 4200T'}</span>
          <span class="header-subtitle">${config.subtitle || defaultSubtitle}</span>
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

        <!-- Self-Consumption Power Chip -->
        ${selfConsumptionWatts !== null && selfConsumptionWatts !== undefined && !isNaN(selfConsumptionWatts) && selfConsumptionWatts > 0
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
      </div>
    </div>
  `;
}
