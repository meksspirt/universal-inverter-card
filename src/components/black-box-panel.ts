import { html, TemplateResult } from 'lit';
import { HomeAssistant } from '../types';
import { BlackBoxState, formatEventTimestamp } from '../utils/black-box';
import { getActiveLanguage } from '../localize/localize';

export interface BlackBoxPanelProps {
  hass?: HomeAssistant;
  language?: string;
  state: BlackBoxState;
  expanded: boolean;
  forceOpen?: boolean; // Used when rendered inside modal tab
  onToggleExpand: () => void;
  onClear: () => void;
}

export function renderBlackBoxPanel(props: BlackBoxPanelProps): TemplateResult {
  const { hass, language, state, expanded, forceOpen = false, onToggleExpand, onClear } = props;
  const lang = getActiveLanguage(hass, language);
  const { extremes, events } = state;

  const isOpen = forceOpen || expanded;
  const eventCount = events.length;
  const hasCritical = events.some((e) => e.severity === 'critical');
  const hasWarning = events.some((e) => e.severity === 'warning');

  const badgeColor = hasCritical ? '#ef4444' : hasWarning ? '#f59e0b' : '#38bdf8';

  const getEventIcon = (type: string): string => {
    switch (type) {
      case 'fault':
        return 'mdi:alert-octagon';
      case 'warning':
        return 'mdi:alert-outline';
      case 'peak_surge':
        return 'mdi:flash-alert';
      case 'voltage_sag':
        return 'mdi:battery-arrow-down-outline';
      case 'grid_outage':
        return 'mdi:transmission-tower-off';
      case 'grid_restored':
        return 'mdi:transmission-tower';
      case 'cell_imbalance':
        return 'mdi:scale-unbalanced';
      default:
        return 'mdi:history';
    }
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'critical':
        return '#ef4444';
      case 'warning':
        return '#f59e0b';
      case 'success':
        return '#10b981';
      default:
        return '#38bdf8';
    }
  };

  return html`
    <div class="blackbox-section ${forceOpen ? 'in-modal' : ''}">
      ${!forceOpen
        ? html`
            <div class="blackbox-header" @click=${onToggleExpand}>
              <div class="blackbox-header-left">
                <ha-icon icon="mdi:Radar" style="display:none"></ha-icon>
                <ha-icon
                  icon="mdi:database-clock-outline"
                  style="color: ${badgeColor}; --mdc-icon-size: 19px;"
                ></ha-icon>
                <span class="blackbox-title">
                  ${lang === 'ru' ? 'Черный ящик: Пики и События' : 'Black-Box: Peaks & Events'}
                </span>
                ${extremes.peakLoadWatts !== null
                  ? html`
                      <span class="blackbox-quick-pill" title="${lang === 'ru' ? 'Пиковая нагрузка' : 'Peak Load'}">
                        ⚡ ${extremes.peakLoadWatts}W
                      </span>
                    `
                  : ''}
                ${extremes.minBatteryVoltage !== null
                  ? html`
                      <span class="blackbox-quick-pill" title="${lang === 'ru' ? 'Мин. напряжение АКБ' : 'Min Battery Voltage'}">
                        📉 ${extremes.minBatteryVoltage.toFixed(1)}V
                      </span>
                    `
                  : ''}
                ${eventCount > 0
                  ? html`
                      <span
                        class="blackbox-count-badge"
                        style="background: ${badgeColor}22; color: ${badgeColor}; border-color: ${badgeColor}55;"
                      >
                        ${eventCount}
                      </span>
                    `
                  : ''}
              </div>
              <ha-icon
                class="blackbox-chevron ${isOpen ? 'open' : ''}"
                icon="mdi:chevron-down"
              ></ha-icon>
            </div>
          `
        : ''}

      ${isOpen
        ? html`
            <div class="blackbox-body">
              <!-- 1. Extremes Summary Grid -->
              <div class="blackbox-extremes-grid">
                <div class="bb-extreme-tile">
                  <span class="bb-ext-label">
                    <ha-icon icon="mdi:flash-triangle-outline"></ha-icon>
                    ${lang === 'ru' ? 'Макс. пик нагрузки' : 'Peak Load'}
                  </span>
                  <span class="bb-ext-val" style="color: #f59e0b">
                    ${extremes.peakLoadWatts !== null ? `${extremes.peakLoadWatts} W` : '—'}
                  </span>
                  <span class="bb-ext-time">
                    ${formatEventTimestamp(extremes.peakLoadTime, lang)}
                  </span>
                </div>

                <div class="bb-extreme-tile">
                  <span class="bb-ext-label">
                    <ha-icon icon="mdi:battery-low"></ha-icon>
                    ${lang === 'ru' ? 'Мин. просадка АКБ' : 'Min Voltage Sag'}
                  </span>
                  <span class="bb-ext-val" style="color: #38bdf8">
                    ${extremes.minBatteryVoltage !== null
                      ? `${extremes.minBatteryVoltage.toFixed(2)} V`
                      : '—'}
                  </span>
                  <span class="bb-ext-time">
                    ${extremes.minBatteryVoltageLoad
                      ? `${extremes.minBatteryVoltageLoad}W • ${formatEventTimestamp(
                          extremes.minBatteryVoltageTime,
                          lang
                        )}`
                      : formatEventTimestamp(extremes.minBatteryVoltageTime, lang)}
                  </span>
                </div>

                <div class="bb-extreme-tile">
                  <span class="bb-ext-label">
                    <ha-icon icon="mdi:current-dc"></ha-icon>
                    ${lang === 'ru' ? 'Макс. ток АКБ' : 'Max DC Current'}
                  </span>
                  <span class="bb-ext-val" style="color: #10b981">
                    ${extremes.maxBatteryCurrent !== null
                      ? `${extremes.maxBatteryCurrent.toFixed(1)} A`
                      : '—'}
                  </span>
                  <span class="bb-ext-time">
                    ${formatEventTimestamp(extremes.maxBatteryCurrentTime, lang)}
                  </span>
                </div>

                <div class="bb-extreme-tile">
                  <span class="bb-ext-label">
                    <ha-icon icon="mdi:thermometer-high"></ha-icon>
                    ${lang === 'ru' ? 'Пик темп. инвертора' : 'Max Inverter Temp'}
                  </span>
                  <span class="bb-ext-val" style="color: #a855f7">
                    ${extremes.maxInverterTemp !== null ? `${extremes.maxInverterTemp} °C` : '—'}
                  </span>
                  <span class="bb-ext-time">
                    ${formatEventTimestamp(extremes.maxInverterTempTime, lang)}
                  </span>
                </div>
              </div>

              <!-- 2. Event Timeline -->
              <div class="blackbox-log-header">
                <span>
                  ${lang === 'ru'
                    ? `Журнал зафиксированных всплесков и сбоев (${eventCount})`
                    : `Captured Surges & Fault Events (${eventCount})`}
                </span>
                ${eventCount > 0 || extremes.peakLoadWatts !== null
                  ? html`
                      <button
                        type="button"
                        class="bb-clear-btn"
                        @click=${(e: Event) => {
                          e.stopPropagation();
                          onClear();
                        }}
                      >
                        <ha-icon icon="mdi:trash-can-outline"></ha-icon>
                        <span>${lang === 'ru' ? 'Сброс' : 'Reset'}</span>
                      </button>
                    `
                  : ''}
              </div>

              ${eventCount === 0
                ? html`
                    <div class="blackbox-empty">
                      <ha-icon icon="mdi:shield-check-outline"></ha-icon>
                      <span>
                        ${lang === 'ru'
                          ? 'Аномалий, глубоких просадок и ночных сбоев не зафиксировано'
                          : 'No surges, deep voltage sags, or transient faults recorded'}
                      </span>
                    </div>
                  `
                : html`
                    <div class="blackbox-timeline">
                      ${events.map((ev) => {
                        const col = getSeverityColor(ev.severity);
                        return html`
                          <div class="bb-event-row" style="--ev-color: ${col}">
                            <div class="bb-event-icon">
                              <ha-icon icon="${getEventIcon(ev.type)}"></ha-icon>
                            </div>
                            <div class="bb-event-content">
                              <div class="bb-event-top">
                                <span class="bb-event-time">
                                  ${formatEventTimestamp(ev.timestamp, lang)}
                                </span>
                                ${ev.code
                                  ? html`<span class="bb-event-code">${ev.code}</span>`
                                  : ''}
                                <span class="bb-event-title">
                                  ${lang === 'ru' ? ev.titleRu : ev.titleEn}
                                </span>
                              </div>
                              ${ev.metricsText
                                ? html`<div class="bb-event-metrics">${ev.metricsText}</div>`
                                : ''}
                            </div>
                          </div>
                        `;
                      })}
                    </div>
                  `}
            </div>
          `
        : ''}
    </div>
  `;
}
