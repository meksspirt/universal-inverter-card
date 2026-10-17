import { html, svg, TemplateResult } from 'lit';
import { AninerelCardConfig, HomeAssistant } from '../types';
import { getFlowLayout, calculateFlowPaths, calcFlowDuration, calcStrokeWidth } from '../utils/flow-math';
import { formatPower } from '../utils/format';
import { localize } from '../localize/localize';

export interface PowerFlowRenderParams {
  hass: HomeAssistant;
  config: AninerelCardConfig;
  hasSolar?: boolean;
  isOffline?: boolean;
  gridPosition?: 'bottom' | 'top';
  solarWatts?: number;
  batteryWatts: number;
  gridWatts: number;
  loadWatts: number;
  batterySoc: number | null;
  batteryRuntimeText?: string | null;
  selfConsumptionWatts?: number | null;
  operatingMode: string;
  isFault: boolean;
  onNodeClick: (entityId?: string) => void;
}

export function renderPowerFlow(params: PowerFlowRenderParams): TemplateResult {
  const {
    hass,
    config,
    hasSolar = false,
    isOffline = false,
    gridPosition = 'bottom',
    solarWatts = 0,
    batteryWatts,
    gridWatts,
    loadWatts,
    batterySoc,
    batteryRuntimeText,
    selfConsumptionWatts,
    operatingMode,
    isFault,
    onNodeClick,
  } = params;

  const lang = config.language;
  const maxPower = config.max_power || 4200;
  const useLog = config.use_log_flow_model !== false;
  const minRate = config.min_flow_rate || 0.75;
  const maxRate = config.max_flow_rate || 5.0;

  const layout = getFlowLayout(hasSolar, gridPosition);
  const { viewBoxHeight } = layout;
  const { solar, inverter, battery, home, grid } = layout.nodes;

  const flowPaths = isOffline
    ? []
    : calculateFlowPaths(
        solarWatts,
        batteryWatts,
        gridWatts,
        loadWatts,
        config.colors,
        hasSolar,
        gridPosition
      );

  // Battery SOC calculations (honest handling of null/unavailable)
  const hasValidSoc = batterySoc !== null && !isNaN(batterySoc);
  const clampedSoc = hasValidSoc ? Math.max(0, Math.min(100, Math.round(batterySoc!))) : 0;
  const gaugeRadius = 32;
  const circumference = 2 * Math.PI * gaugeRadius;
  const strokeOffset = circumference * (1 - clampedSoc / 100);

  const socColor = !hasValidSoc
    ? '#64748b'
    : clampedSoc > 50
    ? '#10b981'
    : clampedSoc > 20
    ? '#f59e0b'
    : '#ef4444';

  const batteryStatusText =
    batteryWatts >= 5
      ? localize('flow.charge', hass, lang)
      : batteryWatts <= -5
      ? localize('flow.discharge', hass, lang)
      : localize('flow.standby', hass, lang);

  let selfSourceLabel = '';
  if (hasSolar && solarWatts >= 10) {
    selfSourceLabel = ` ← ${localize('nodes.solar', hass, lang)}`;
  } else if (gridWatts >= 5) {
    selfSourceLabel = ` ← ${localize('nodes.grid', hass, lang)}`;
  } else if (batteryWatts <= -5) {
    selfSourceLabel = ` ← ${localize('nodes.battery', hass, lang)}`;
  }

  const inverterSubLabel =
    selfConsumptionWatts !== null &&
    selfConsumptionWatts !== undefined &&
    !isNaN(selfConsumptionWatts) &&
    selfConsumptionWatts > 0
      ? `${localize('flow.self', hass, lang)}: ${Math.round(selfConsumptionWatts)} W${selfSourceLabel}`
      : `${(maxPower / 1000).toFixed(1)} kW`;

  return html`
    <div
      class="power-flow-container ${hasSolar ? 'with-solar' : 'no-solar'}"
      style="--flow-aspect-ratio: 500 / ${viewBoxHeight};"
    >
      <!-- 1. Background Pipelines and Animated Energy Flows -->
      <svg class="flow-svg" viewBox="0 0 500 ${viewBoxHeight}" preserveAspectRatio="xMidYMid meet">
        <!-- Static background wire tracks with clean clearance -->
        ${layout.tracks.map((trackD) => svg`<path class="pipe-track" d="${trackD}" />`)}

        <!-- Active animated flow lines -->
        ${flowPaths.map((p) => {
          const duration = calcFlowDuration(p.watts, maxPower, minRate, maxRate, useLog);
          const strokeWidth = calcStrokeWidth(p.watts, maxPower);

          return svg`
            <path
              id="${p.id}"
              class="flow-line ${p.reversed ? 'reverse' : ''}"
              d="${p.d}"
              stroke="${p.color}"
              stroke-width="${strokeWidth}"
              style="--flow-duration: ${duration}s; color: ${p.color};"
            />
          `;
        })}
      </svg>

      <!-- 2. Interactive Badges Layer -->
      <div class="flow-nodes-layer">
        <!-- SOLAR NODE (Top) - Only rendered when solar is enabled -->
        ${hasSolar && solar
          ? html`
              <div
                class="flow-node node-solar"
                style="left: ${(solar.x / 500) * 100}%; top: ${(solar.y / viewBoxHeight) * 100}%;"
                @click=${() => onNodeClick(config.entities?.solar_power)}
                title="${localize('nodes.solar', hass, lang)}"
              >
                <div class="node-badge">
                  <ha-icon icon="mdi:solar-power-variant"></ha-icon>
                </div>
                <span class="node-value">${formatPower(solarWatts)}</span>
                <span class="node-label">${localize('nodes.solar', hass, lang)}</span>
              </div>
            `
          : ''}

        <!-- BATTERY NODE (Left) -->
        <div
          class="flow-node node-battery"
          style="left: ${(battery.x / 500) * 100}%; top: ${(battery.y / viewBoxHeight) * 100}%;"
          @click=${() =>
            onNodeClick(
              config.bms?.soc_entity ||
                config.bms?.battery_1?.soc_entity ||
                config.bms?.bat1_soc_entity ||
                config.entities?.battery_power
            )}
          title="${localize('nodes.battery', hass, lang)}"
        >
          <div class="node-badge">
            <svg class="battery-gauge-svg" viewBox="0 0 80 80">
              <circle
                class="battery-gauge-bg"
                cx="40"
                cy="40"
                r="${gaugeRadius}"
              />
              <circle
                class="battery-gauge-fill"
                cx="40"
                cy="40"
                r="${gaugeRadius}"
                stroke="${socColor}"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${strokeOffset}"
              />
            </svg>
            <div class="battery-gauge-center">
              <ha-icon
                icon="${!hasValidSoc
                  ? 'mdi:battery-unknown'
                  : batteryWatts > 20
                  ? 'mdi:battery-charging'
                  : clampedSoc > 80
                  ? 'mdi:battery-high'
                  : clampedSoc > 30
                  ? 'mdi:battery-medium'
                  : 'mdi:battery-low'}"
                style="color: ${socColor};"
              ></ha-icon>
              <span class="battery-soc-text" style="color: ${socColor};">
                ${hasValidSoc ? `${clampedSoc}%` : '—'}
              </span>
            </div>
          </div>
          <span class="node-value" style="color: ${socColor};">
            ${formatPower(Math.abs(batteryWatts))}
          </span>
          <span class="node-label">
            ${batteryRuntimeText ? `${batteryStatusText} • ${batteryRuntimeText}` : batteryStatusText}
          </span>
        </div>

        <!-- CENTRAL INVERTER NODE -->
        <div
          class="flow-node node-inverter"
          style="left: ${(inverter.x / 500) * 100}%; top: ${(inverter.y / viewBoxHeight) * 100}%;"
          @click=${() => onNodeClick(config.self_consumption_power_entity || config.operating_mode_entity)}
          title="${localize('nodes.inverter', hass, lang)}"
        >
          <div class="node-badge">
            <ha-icon icon="mdi:inverter"></ha-icon>
            <span
              class="inverter-status-dot"
              style="background: ${isFault || isOffline ? '#ef4444' : '#10b981'}; box-shadow: 0 0 6px ${isFault || isOffline ? '#ef4444' : '#10b981'};"
            ></span>
          </div>
          <span class="node-value">${operatingMode || localize('nodes.inverter', hass, lang)}</span>
          <span class="node-label">${inverterSubLabel}</span>
        </div>

        <!-- HOME LOAD NODE (Right) -->
        <div
          class="flow-node node-home"
          style="left: ${(home.x / 500) * 100}%; top: ${(home.y / viewBoxHeight) * 100}%;"
          @click=${() => onNodeClick(config.entities?.load_power)}
          title="${localize('nodes.home', hass, lang)}"
        >
          <div class="node-badge">
            <ha-icon icon="mdi:home-lightning-bolt"></ha-icon>
          </div>
          <span class="node-value">${isOffline ? '—' : formatPower(loadWatts)}</span>
          <span class="node-label">${localize('nodes.home', hass, lang)}</span>
        </div>

        <!-- GRID NODE (Bottom or Top) -->
        <div
          class="flow-node node-grid"
          style="left: ${(grid.x / 500) * 100}%; top: ${(grid.y / viewBoxHeight) * 100}%;"
          @click=${() => onNodeClick(config.grid_breaker_power_entity || config.entities?.grid_power)}
          title="${localize('nodes.grid', hass, lang)}"
        >
          <div class="node-badge">
            <ha-icon icon="mdi:transmission-tower"></ha-icon>
          </div>
          <span class="node-value">${isOffline ? '—' : formatPower(Math.abs(gridWatts))}</span>
          <span class="node-label">
            ${gridWatts >= 5
              ? localize('flow.import', hass, lang)
              : gridWatts <= -5
              ? localize('flow.export', hass, lang)
              : localize('nodes.grid', hass, lang)}
          </span>
        </div>
      </div>
    </div>
  `;
}
