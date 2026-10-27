import { html, svg, TemplateResult } from 'lit';
import { AninerelCardConfig, HomeAssistant } from '../types';
import { getFlowLayout, calculateFlowPaths, calcFlowDuration, calcStrokeWidth } from '../utils/flow-math';
import { formatPower } from '../utils/format';
import { localize } from '../localize/localize';
import { NominalSystemVoltage } from '../utils/system-profile';

export interface PowerFlowRenderParams {
  hass: HomeAssistant;
  config: AninerelCardConfig;
  hasSolar?: boolean;
  systemVoltage?: NominalSystemVoltage;
  isOffline?: boolean;
  gridPosition?: 'bottom' | 'top';
  solarWatts?: number;
  batteryWatts: number;
  gridWatts: number;
  loadWatts: number;
  batterySoc: number | null;
  batteryVoltage?: number | null;
  batteryCurrent?: number | null;
  gridVoltage?: number | null;
  gridBreakerState?: string | null;
  inverterLoadPercent?: number | null;
  batteryRuntimeText?: string | null;
  isCriticalCountdown?: boolean;
  sheddingHint?: string | null;
  efficiencyPct?: number | null;
  thermalLossWatts?: number | null;
  selfConsumptionWatts?: number | null;
  operatingMode: string;
  isFault: boolean;
  onNodeClick: (entityId?: string) => void;
}

function reverseLinearPath(d: string): string {
  const m = d.match(/M\s*([\d.]+)\s+([\d.]+)\s+L\s*([\d.]+)\s+([\d.]+)/i);
  if (!m) return d;
  return `M ${m[3]} ${m[4]} L ${m[1]} ${m[2]}`;
}

export function renderPowerFlow(params: PowerFlowRenderParams): TemplateResult {
  const {
    hass,
    config,
    hasSolar = false,
    systemVoltage = 24,
    isOffline = false,
    gridPosition = 'bottom',
    solarWatts = 0,
    batteryWatts,
    gridWatts,
    loadWatts,
    batterySoc,
    batteryVoltage = null,
    batteryCurrent = null,
    gridVoltage = null,
    gridBreakerState = null,
    inverterLoadPercent = 0,
    batteryRuntimeText,
    isCriticalCountdown = false,
    sheddingHint = null,
    efficiencyPct = null,
    thermalLossWatts = null,
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
  const hasValidSoc = batterySoc !== null && !isNaN(batterySoc);
  const clampedSoc = hasValidSoc ? Math.max(0, Math.min(100, Math.round(batterySoc!))) : 0;
  const gaugeRadius = 33;
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

  const batSubParts: string[] = [];
  if (batteryVoltage !== null && !isNaN(batteryVoltage)) {
    batSubParts.push(`${batteryVoltage.toFixed(1)}V`);
  }
  if (batteryCurrent !== null && !isNaN(batteryCurrent)) {
    batSubParts.push(`${batteryCurrent > 0 ? '+' : ''}${batteryCurrent.toFixed(1)}A`);
  }
  const batterySubText = batSubParts.join(' • ');

  // Inverter Hub state & self-consumption source
  let selfSourceLabel = '';
  if (hasSolar && solarWatts >= 10) {
    selfSourceLabel = ` ← ${localize('nodes.solar', hass, lang)}`;
  } else if (gridWatts >= 5) {
    selfSourceLabel = ` ← ${localize('nodes.grid', hass, lang)}`;
  } else if (batteryWatts <= -5) {
    selfSourceLabel = ` ← ${localize('nodes.battery', hass, lang)}`;
  }

  const effectiveThermalWatts =
    thermalLossWatts !== null && !isNaN(thermalLossWatts) && thermalLossWatts > 0
      ? thermalLossWatts
      : selfConsumptionWatts;

  const hasSelfPower =
    effectiveThermalWatts !== null &&
    effectiveThermalWatts !== undefined &&
    !isNaN(effectiveThermalWatts) &&
    effectiveThermalWatts > 0;

  const hasEfficiency =
    efficiencyPct !== null && efficiencyPct !== undefined && !isNaN(efficiencyPct);

  const inverterSubLabel = hasEfficiency && hasSelfPower
    ? `${efficiencyPct!.toFixed(0)}% • ${Math.round(effectiveThermalWatts!)}W`
    : hasEfficiency
    ? `${localize('header.efficiency', hass, lang)} ${efficiencyPct!.toFixed(0)}%`
    : hasSelfPower
    ? `${Math.round(effectiveThermalWatts!)} W`
    : `${(maxPower / 1000).toFixed(1)} kW`;

  const rawModeClean =
    operatingMode && operatingMode !== 'N/A' && operatingMode !== 'unavailable'
      ? operatingMode
      : null;

  const inverterModeLabel = rawModeClean
    ? rawModeClean
    : isOffline && Math.abs(batteryWatts) < 5 && Math.abs(gridWatts) < 5
    ? localize('flow.offline', hass, lang)
    : localize('flow.standby', hass, lang);

  const hubAccentColor = isFault
    ? '#ef4444'
    : isOffline && Math.abs(batteryWatts) < 5 && Math.abs(gridWatts) < 5
    ? '#64748b'
    : batteryWatts <= -5
    ? '#f59e0b'
    : '#3b82f6';

  const hubDotColor = isFault
    ? '#ef4444'
    : isOffline && Math.abs(batteryWatts) < 5 && Math.abs(gridWatts) < 5
    ? '#64748b'
    : batteryWatts <= -5
    ? '#f59e0b'
    : '#10b981';

  // Home Load ring & sub-telemetry
  const clampedLoadPct = Math.max(0, Math.min(100, Math.round(inverterLoadPercent ?? 0)));
  const homeRadius = 31;
  const homeCircumference = 2 * Math.PI * homeRadius;
  const homeStrokeOffset = homeCircumference * (1 - clampedLoadPct / 100);
  const homeSubText =
    isOffline && loadWatts === 0
      ? localize('flow.output_off', hass, lang)
      : `${localize('flow.load', hass, lang)} ${clampedLoadPct}%`;

  // Grid sub-telemetry (City AC voltage + Input breaker state)
  const gridSubParts: string[] = [];
  if (gridVoltage !== null && !isNaN(gridVoltage)) {
    gridSubParts.push(`${Math.round(gridVoltage)}V`);
  }
  if (gridBreakerState === 'off') {
    gridSubParts.push(localize('flow.input_off', hass, lang));
  } else if (gridBreakerState === 'on') {
    gridSubParts.push(localize('flow.input_on', hass, lang));
  }
  const gridSubText = gridSubParts.join(' • ');

  const gridDotColor =
    gridVoltage !== null && gridVoltage < 100
      ? '#ef4444'
      : gridBreakerState === 'off'
      ? '#f59e0b'
      : gridVoltage !== null && gridVoltage >= 190
      ? '#10b981'
      : '#3b82f6';

  return html`
    <div
      class="power-flow-container ${hasSolar ? 'with-solar' : 'no-solar'}"
      style="--flow-aspect-ratio: 500 / ${viewBoxHeight};"
    >
      <!-- 1. Background Conduits, Terminal Ports & Animated Energy Streams -->
      <svg class="flow-svg" viewBox="0 0 500 ${viewBoxHeight}" preserveAspectRatio="xMidYMid meet">
        <!-- Static dual-layer conduits with terminal port sockets -->
        ${layout.conduits.map(
          (c) => svg`
            <g class="conduit-group">
              <path class="pipe-track-outer" d="${c.d}" />
              <path class="pipe-track" d="${c.d}" />
              <circle class="pipe-port" cx="${c.x1}" cy="${c.y1}" r="3" />
              <circle class="pipe-port" cx="${c.x2}" cy="${c.y2}" r="3" />
            </g>
          `
        )}

        <!-- Active animated energy streams + moving glowing particles with dynamic power intensity -->
        ${flowPaths.map((p) => {
          const duration = calcFlowDuration(p.watts, maxPower, minRate, maxRate, useLog);
          const strokeWidth = calcStrokeWidth(p.watts, maxPower);
          const directionalD = p.reversed ? reverseLinearPath(p.d) : p.d;

          // Dynamic glow and particle intensity scaling based on active wattage
          const intensityRatio = Math.min(1, Math.max(0.12, Math.abs(p.watts) / maxPower));
          const glowOpacity = Number((0.18 + intensityRatio * 0.58).toFixed(2));
          const glowBlur = Number((1.5 + intensityRatio * 3.5).toFixed(1));
          const glowWidth = Number((strokeWidth + 2 + intensityRatio * 4.5).toFixed(1));
          const orbHaloRadius = Number((strokeWidth + 1.5 + intensityRatio * 3.2).toFixed(1));
          const orbCoreRadius = Number((2.0 + intensityRatio * 1.4).toFixed(1));

          return svg`
            <g class="active-flow-group" style="color: ${p.color};">
              <path
                class="flow-glow-line"
                d="${directionalD}"
                stroke="${p.color}"
                stroke-width="${glowWidth}"
                style="opacity: ${glowOpacity}; filter: blur(${glowBlur}px);"
              />
              <path
                id="${p.id}"
                class="flow-line"
                d="${directionalD}"
                stroke="${p.color}"
                stroke-width="${strokeWidth}"
                style="--flow-duration: ${duration}s; opacity: ${Number((0.78 + intensityRatio * 0.22).toFixed(2))};"
              />
              <circle
                class="flow-orb-halo"
                r="${orbHaloRadius}"
                fill="${p.color}"
                style="opacity: ${Number((0.28 + intensityRatio * 0.42).toFixed(2))};"
              >
                <animateMotion dur="${duration}s" repeatCount="indefinite" path="${directionalD}" />
              </circle>
              <circle
                class="flow-orb-core"
                r="${orbCoreRadius}"
                fill="#ffffff"
                style="filter: drop-shadow(0 0 ${Number((3 + intensityRatio * 4).toFixed(1))}px currentColor);"
              >
                <animateMotion dur="${duration}s" repeatCount="indefinite" path="${directionalD}" />
              </circle>
            </g>
          `;
        })}
      </svg>

      <!-- 2. Precision-Anchored Interactive Nodes (Center of badge = exact SVG (x, y)) -->
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
                <div class="node-meta">
                  <span class="node-value">${formatPower(solarWatts)}</span>
                  <span class="node-label">${localize('nodes.solar', hass, lang)}</span>
                </div>
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
              <circle class="battery-gauge-bg" cx="40" cy="40" r="${gaugeRadius}" />
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
                  : batteryWatts >= 5
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
          <div class="node-meta">
            <span class="node-value" style="color: ${socColor};">
              ${formatPower(Math.abs(batteryWatts))}
            </span>
            <span class="node-label ${isCriticalCountdown ? 'critical-countdown-label' : ''}">
              ${batteryRuntimeText
                ? `${batteryStatusText} • ${isCriticalCountdown ? '⚠️ ' : ''}${batteryRuntimeText}`
                : batteryStatusText}
            </span>
            ${batterySubText ? html`<span class="node-sub">${batterySubText}</span>` : ''}
            ${sheddingHint ? html`<span class="node-shedding-hint">${sheddingHint}</span>` : ''}
          </div>
        </div>

        <!-- CENTRAL INVERTER HUB (Self-contained Glassmorphic Core — Zero Wire Overlap) -->
        <div
          class="flow-node node-inverter"
          style="left: ${(inverter.x / 500) * 100}%; top: ${(inverter.y / viewBoxHeight) * 100}%; --hub-accent: ${hubAccentColor};"
          @click=${() => onNodeClick(config.self_consumption_power_entity || config.operating_mode_entity)}
          title="${localize('nodes.inverter', hass, lang)}"
        >
          <div class="node-badge inverter-hub-badge">
            <span
              class="inverter-status-dot"
              style="background: ${hubDotColor}; box-shadow: 0 0 8px ${hubDotColor};"
            ></span>
            <div class="hub-top-row">
              ${config.inverter_icon
                ? html`<ha-icon class="inverter-custom-icon" icon="${config.inverter_icon}"></ha-icon>`
                : html`
                    <svg class="inverter-core-svg" viewBox="0 0 38 28" fill="none" aria-hidden="true">
                      <defs>
                        <linearGradient id="invBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stop-color="#1e293b" />
                          <stop offset="100%" stop-color="#0f172a" />
                        </linearGradient>
                        <linearGradient id="invScreenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stop-color="#050a18" />
                          <stop offset="100%" stop-color="#0c162e" />
                        </linearGradient>
                      </defs>
                      <!-- Inverter Metal Enclosure / Beveled Chassis -->
                      <rect
                        x="1"
                        y="1"
                        width="36"
                        height="26"
                        rx="4.5"
                        fill="url(#invBodyGrad)"
                        stroke="var(--hub-accent, #3b82f6)"
                        stroke-width="1.3"
                        stroke-opacity="0.75"
                      />
                      <!-- Side Cooling Radiator Fins -->
                      <line x1="1" y1="8" x2="3.5" y2="8" stroke="var(--hub-accent, #3b82f6)" stroke-width="1" stroke-opacity="0.4" />
                      <line x1="1" y1="13" x2="3.5" y2="13" stroke="var(--hub-accent, #3b82f6)" stroke-width="1" stroke-opacity="0.4" />
                      <line x1="1" y1="18" x2="3.5" y2="18" stroke="var(--hub-accent, #3b82f6)" stroke-width="1" stroke-opacity="0.4" />
                      <line x1="37" y1="8" x2="34.5" y2="8" stroke="var(--hub-accent, #3b82f6)" stroke-width="1" stroke-opacity="0.4" />
                      <line x1="37" y1="13" x2="34.5" y2="13" stroke="var(--hub-accent, #3b82f6)" stroke-width="1" stroke-opacity="0.4" />
                      <line x1="37" y1="18" x2="34.5" y2="18" stroke="var(--hub-accent, #3b82f6)" stroke-width="1" stroke-opacity="0.4" />

                      <!-- High-contrast LCD Inverter Screen -->
                      <rect
                        x="6"
                        y="4.5"
                        width="26"
                        height="14"
                        rx="2.5"
                        fill="url(#invScreenGrad)"
                        stroke="rgba(255, 255, 255, 0.16)"
                        stroke-width="0.8"
                      />
                      <!-- Smooth Pure Sine AC Inverter Wave with Glow -->
                      <path
                        d="M 9 11.5 C 11.5 7.5, 13.5 7.5, 16 11.5 C 18.5 15.5, 20.5 15.5, 23 11.5 C 24.5 9, 26.5 9, 28 11.5"
                        fill="none"
                        stroke="#38bdf8"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <!-- Mini DC symbol on upper-left of LCD -->
                      <line x1="9" y1="7.2" x2="13" y2="7.2" stroke="#10b981" stroke-width="1" stroke-linecap="round" />

                      <!-- Lower Hardware Panel & Status Indicators -->
                      <circle cx="11.5" cy="22.5" r="1.3" fill="#10b981" />
                      <line x1="16" y1="22.5" x2="22" y2="22.5" stroke="rgba(255, 255, 255, 0.25)" stroke-width="1" stroke-linecap="round" />
                      <circle cx="26.5" cy="22.5" r="1.3" fill="${hubDotColor}" style="filter: drop-shadow(0 0 2px ${hubDotColor});" />
                    </svg>
                  `}
            </div>
            <span class="hub-mode-title">${inverterModeLabel}</span>
            <span class="hub-sub-pill ${hasSelfPower ? 'active-self' : ''}">${inverterSubLabel}</span>
          </div>
        </div>

        <!-- HOME LOAD NODE (Right) -->
        <div
          class="flow-node node-home"
          style="left: ${(home.x / 500) * 100}%; top: ${(home.y / viewBoxHeight) * 100}%;"
          @click=${() => onNodeClick(config.entities?.load_power)}
          title="${localize('nodes.home', hass, lang)}"
        >
          <div class="node-badge">
            <svg class="home-gauge-svg" viewBox="0 0 72 72">
              <circle class="home-gauge-bg" cx="36" cy="36" r="${homeRadius}" />
              ${clampedLoadPct > 0
                ? svg`
                    <circle
                      class="home-gauge-fill"
                      cx="36"
                      cy="36"
                      r="${homeRadius}"
                      stroke="var(--home-color, #06b6d4)"
                      stroke-dasharray="${homeCircumference}"
                      stroke-dashoffset="${homeStrokeOffset}"
                    />
                  `
                : ''}
            </svg>
            <ha-icon icon="mdi:home-lightning-bolt"></ha-icon>
          </div>
          <div class="node-meta">
            <span class="node-value">${formatPower(loadWatts)}</span>
            <span class="node-label">${localize('nodes.home', hass, lang)}</span>
            <span class="node-sub">${homeSubText}</span>
          </div>
        </div>

        <!-- GRID NODE (Bottom or Top) -->
        <div
          class="flow-node node-grid"
          style="left: ${(grid.x / 500) * 100}%; top: ${(grid.y / viewBoxHeight) * 100}%;"
          @click=${() =>
            onNodeClick(
              config.grid_breaker_power_entity ||
                config.grid_breaker_switch_entity ||
                config.entities?.grid_power
            )}
          title="${localize('nodes.grid', hass, lang)}"
        >
          <div class="node-badge">
            <ha-icon icon="mdi:transmission-tower"></ha-icon>
            <span
              class="grid-status-dot"
              style="background: ${gridDotColor}; box-shadow: 0 0 6px ${gridDotColor};"
            ></span>
          </div>
          <div class="node-meta">
            <span class="node-value">${formatPower(Math.abs(gridWatts))}</span>
            <span class="node-label">
              ${gridWatts >= 5
                ? localize('flow.import', hass, lang)
                : gridWatts <= -5
                ? localize('flow.export', hass, lang)
                : localize('nodes.grid', hass, lang)}
            </span>
            ${gridSubText ? html`<span class="node-sub">${gridSubText}</span>` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
}
