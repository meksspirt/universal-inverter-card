import { html, svg, TemplateResult } from 'lit';
import { AninerelCardConfig, HomeAssistant } from '../types';
import { getFlowLayout, calculateFlowPaths, calcFlowDuration, calcStrokeWidth } from '../utils/flow-math';
import { formatPower } from '../utils/format';

export interface PowerFlowRenderParams {
  hass: HomeAssistant;
  config: AninerelCardConfig;
  hasSolar?: boolean;
  gridPosition?: 'bottom' | 'top';
  solarWatts?: number;
  batteryWatts: number;
  gridWatts: number;
  loadWatts: number;
  batterySoc: number;
  operatingMode: string;
  isFault: boolean;
  onNodeClick: (entityId?: string) => void;
}

export function renderPowerFlow(params: PowerFlowRenderParams): TemplateResult {
  const {
    config,
    hasSolar = false,
    gridPosition = 'bottom',
    solarWatts = 0,
    batteryWatts,
    gridWatts,
    loadWatts,
    batterySoc,
    operatingMode,
    isFault,
    onNodeClick,
  } = params;

  const maxPower = config.max_power || 4200;
  const useLog = config.use_log_flow_model !== false;
  const minRate = config.min_flow_rate || 0.75;
  const maxRate = config.max_flow_rate || 5.0;

  const layout = getFlowLayout(hasSolar, gridPosition);
  const { viewBoxHeight } = layout;
  const { solar, inverter, battery, home, grid } = layout.nodes;

  const flowPaths = calculateFlowPaths(
    solarWatts,
    batteryWatts,
    gridWatts,
    loadWatts,
    config.colors,
    hasSolar,
    gridPosition
  );

  // Battery SOC calculations
  const clampedSoc = Math.max(0, Math.min(100, isNaN(batterySoc) ? 0 : batterySoc));
  const gaugeRadius = 32;
  const circumference = 2 * Math.PI * gaugeRadius;
  const strokeOffset = circumference * (1 - clampedSoc / 100);

  const socColor =
    clampedSoc > 50 ? '#10b981' : clampedSoc > 20 ? '#f59e0b' : '#ef4444';

  const batteryStatusText =
    batteryWatts > 20 ? 'Charge' : batteryWatts < -20 ? 'Discharge' : 'Standby';

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
                title="Solar Generation"
              >
                <div class="node-badge">
                  <ha-icon icon="mdi:solar-power-variant"></ha-icon>
                </div>
                <span class="node-value">${formatPower(solarWatts)}</span>
                <span class="node-label">Solar</span>
              </div>
            `
          : ''}

        <!-- BATTERY NODE (Left) -->
        <div
          class="flow-node node-battery"
          style="left: ${(battery.x / 500) * 100}%; top: ${(battery.y / viewBoxHeight) * 100}%;"
          @click=${() => onNodeClick(config.bms?.soc_entity || config.entities?.battery_power)}
          title="Battery Storage"
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
                icon="${batteryWatts > 20
                  ? 'mdi:battery-charging'
                  : clampedSoc > 80
                  ? 'mdi:battery-high'
                  : clampedSoc > 30
                  ? 'mdi:battery-medium'
                  : 'mdi:battery-low'}"
                style="color: ${socColor};"
              ></ha-icon>
              <span class="battery-soc-text" style="color: ${socColor};">
                ${clampedSoc}%
              </span>
            </div>
          </div>
          <span class="node-value" style="color: ${socColor};">
            ${formatPower(Math.abs(batteryWatts))}
          </span>
          <span class="node-label">${batteryStatusText}</span>
        </div>

        <!-- CENTRAL INVERTER NODE -->
        <div
          class="flow-node node-inverter"
          style="left: ${(inverter.x / 500) * 100}%; top: ${(inverter.y / viewBoxHeight) * 100}%;"
          @click=${() => onNodeClick(config.operating_mode_entity)}
          title="Inverter Status"
        >
          <div class="node-badge">
            <ha-icon icon="mdi:inverter"></ha-icon>
            <span
              class="inverter-status-dot"
              style="background: ${isFault ? '#ef4444' : '#10b981'}; box-shadow: 0 0 6px ${isFault ? '#ef4444' : '#10b981'};"
            ></span>
          </div>
          <span class="node-value">${operatingMode || 'Inverter'}</span>
          <span class="node-label">4.2 kW</span>
        </div>

        <!-- HOME LOAD NODE (Right) -->
        <div
          class="flow-node node-home"
          style="left: ${(home.x / 500) * 100}%; top: ${(home.y / viewBoxHeight) * 100}%;"
          @click=${() => onNodeClick(config.entities?.load_power)}
          title="Home Consumption"
        >
          <div class="node-badge">
            <ha-icon icon="mdi:home-lightning-bolt"></ha-icon>
          </div>
          <span class="node-value">${formatPower(loadWatts)}</span>
          <span class="node-label">Home</span>
        </div>

        <!-- GRID NODE (Bottom or Top) -->
        <div
          class="flow-node node-grid"
          style="left: ${(grid.x / 500) * 100}%; top: ${(grid.y / viewBoxHeight) * 100}%;"
          @click=${() => onNodeClick(config.entities?.grid_power)}
          title="Power Grid"
        >
          <div class="node-badge">
            <ha-icon icon="mdi:transmission-tower"></ha-icon>
          </div>
          <span class="node-value">${formatPower(Math.abs(gridWatts))}</span>
          <span class="node-label">
            ${gridWatts > 20 ? 'Import' : gridWatts < -20 ? 'Export' : 'Grid'}
          </span>
        </div>
      </div>
    </div>
  `;
}
