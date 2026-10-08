import { html, svg, TemplateResult } from 'lit';
import { AninerelCardConfig } from '../types';

export interface ElectricalParamsProps {
  config: AninerelCardConfig;
  hasSolar?: boolean;
  batteryVoltage: number | null;
  batteryCurrent: number | null;
  gridVoltage: number | null;
  batterySoc?: number | null;
  gridImportEnergyToday: number | null;
  loadEnergyToday: number | null;
  batteryDischargeEnergyToday?: number | null;
  inverterLoadPercent?: number | null;
  historyMap: Map<string, number[]>;
  onParamClick: (entityId?: string) => void;
}

/**
 * Generates lightweight responsive SVG sparkline with minRange protection
 * to prevent microscopic ADC noise (e.g. 0.01V) from creating giant sawtooth artifacts.
 */
function renderSparkline(
  data: number[],
  strokeColor: string,
  minRange = 1.0,
  fillId = 'spark'
): TemplateResult {
  if (!data || data.length < 2) {
    return html`<div class="sparkline-placeholder"></div>`;
  }

  const width = 110;
  const height = 26;
  const padTop = 3;
  const padBottom = 3;
  const usableHeight = height - padTop - padBottom;

  const rawMin = Math.min(...data);
  const rawMax = Math.max(...data);
  const rawRange = rawMax - rawMin;

  // Clamping: If the variation across data is smaller than minRange,
  // center the curve symmetrically with minRange span.
  let min = rawMin;
  let max = rawMax;
  if (rawRange < minRange) {
    const mid = (rawMin + rawMax) / 2;
    min = mid - minRange / 2;
    max = mid + minRange / 2;
  }
  const range = max - min || 1;

  const pointCoords = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * width;
    const clampedVal = Math.max(min, Math.min(max, val));
    // Invert Y axis for SVG (0 is top)
    const y = height - padBottom - ((clampedVal - min) / range) * usableHeight;
    return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) };
  });

  const polylinePoints = pointCoords.map((pt) => `${pt.x},${pt.y}`).join(' ');
  const polygonPoints = `0,${height} ${polylinePoints} ${width},${height}`;
  const gradId = `spark-grad-${fillId}`;

  return svg`
    <svg class="sparkline-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
      <defs>
        <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${strokeColor}" stop-opacity="0.25" />
          <stop offset="100%" stop-color="${strokeColor}" stop-opacity="0.0" />
        </linearGradient>
      </defs>
      <polygon
        points="${polygonPoints}"
        fill="url(#${gradId})"
      />
      <polyline
        points="${polylinePoints}"
        fill="none"
        stroke="${strokeColor}"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `;
}

/**
 * Renders radial arc progress gauge for Autarky / Self-Sufficiency
 */
function renderArcGauge(percent: number, color: string): TemplateResult {
  const radius = 22;
  const stroke = 4.5;
  const normalizedRadius = radius - stroke / 2;
  const circumference = Math.PI * normalizedRadius; // Half circle arc (180 deg)
  const clampedPercent = Math.max(0, Math.min(100, percent));
  const strokeDashoffset = circumference * (1 - clampedPercent / 100);

  return svg`
    <svg class="arc-gauge-svg" viewBox="0 0 50 30">
      <!-- Background track -->
      <path
        d="M 5 26 A 20 20 0 0 1 45 26"
        fill="none"
        stroke="rgba(255, 255, 255, 0.08)"
        stroke-width="${stroke}"
        stroke-linecap="round"
      />
      <!-- Active gauge arc -->
      <path
        d="M 5 26 A 20 20 0 0 1 45 26"
        fill="none"
        stroke="${color}"
        stroke-width="${stroke}"
        stroke-linecap="round"
        stroke-dasharray="${circumference}"
        stroke-dashoffset="${strokeDashoffset}"
      />
    </svg>
  `;
}

export function renderElectricalParams(props: ElectricalParamsProps): TemplateResult {
  const {
    config,
    hasSolar = false,
    batteryVoltage,
    batteryCurrent,
    gridVoltage,
    batterySoc,
    gridImportEnergyToday,
    loadEnergyToday,
    batteryDischargeEnergyToday,
    inverterLoadPercent,
    historyMap,
    onParamClick,
  } = props;

  // Battery voltage color coding (for 24V LiFePO4 pack)
  let batVColor = '#10b981';
  if (batteryVoltage !== null && !isNaN(batteryVoltage)) {
    if (batteryVoltage < 24.0 || batteryVoltage > 29.0) {
      batVColor = '#ef4444';
    } else if (batteryVoltage < 25.6) {
      batVColor = '#f59e0b';
    }
  }

  // Grid voltage color coding (230V nominal)
  let gridVColor = '#4285f4';
  let gridStatusLabel = 'Normal';
  if (gridVoltage !== null && !isNaN(gridVoltage)) {
    if (gridVoltage < 190 || gridVoltage > 255) {
      gridVColor = '#ef4444';
      gridStatusLabel = gridVoltage < 190 ? 'Low (Sag)' : 'High (Surge)';
    } else if (gridVoltage < 210 || gridVoltage > 245) {
      gridVColor = '#f59e0b';
      gridStatusLabel = 'Deviated';
    }
  }

  // KPI (Tile 3) configuration & calculation
  // Modes: 'auto' | 'battery_soc' | 'battery_autonomy' | 'self_sufficiency' | 'inverter_load'
  // When 'auto' (default):
  //   - If hasSolar === true -> 'self_sufficiency' (solar autarky)
  //   - If hasSolar === false -> 'battery_soc' (UPS / apartment backup readiness)
  const effectiveKpiMode = (config.kpi_mode && config.kpi_mode !== 'auto')
    ? config.kpi_mode
    : (hasSolar ? 'self_sufficiency' : 'battery_soc');

  let kpiTitle = 'Battery SoC';
  let kpiTooltip = 'Battery State of Charge';
  let kpiIcon = 'mdi:battery-heart-variant';
  let kpiValue = 0;
  let kpiColor = '#10b981';
  let kpiClickEntity = config.kpi_entity
    || config.bms?.soc_entity
    || config.bms?.battery_1?.soc_entity
    || config.bms?.bat1_soc_entity
    || config.battery_voltage_entity;

  if (effectiveKpiMode === 'battery_soc') {
    kpiTitle = 'Battery SoC';
    kpiTooltip = 'Battery State of Charge';
    kpiIcon = batteryCurrent && batteryCurrent > 0.5 ? 'mdi:battery-charging-high' : 'mdi:battery-heart-variant';
    kpiValue = batterySoc !== null && batterySoc !== undefined && !isNaN(batterySoc)
      ? Math.max(0, Math.min(100, Math.round(batterySoc)))
      : 0;
    kpiColor = kpiValue >= 75 ? '#10b981' : kpiValue >= 30 ? '#f59e0b' : '#ef4444';
  } else if (effectiveKpiMode === 'battery_autonomy') {
    kpiTitle = 'Battery Autonomy';
    kpiTooltip = 'Daily Load Powered by Battery';
    kpiIcon = 'mdi:shield-battery-outline';
    kpiClickEntity = config.kpi_entity || config.daily_energy?.battery_discharge_entity || config.daily_energy?.load_energy_entity;
    kpiValue = 0;
    if (loadEnergyToday !== null && loadEnergyToday > 0 && batteryDischargeEnergyToday !== null && batteryDischargeEnergyToday !== undefined) {
      kpiValue = Math.max(0, Math.min(100, Math.round((Math.max(0, batteryDischargeEnergyToday) / loadEnergyToday) * 100)));
    }
    kpiColor = kpiValue >= 75 ? '#10b981' : kpiValue >= 30 ? '#f59e0b' : '#ef4444';
  } else if (effectiveKpiMode === 'inverter_load') {
    kpiTitle = 'Inverter Load';
    kpiTooltip = 'Current Inverter Load %';
    kpiIcon = 'mdi:gauge';
    kpiClickEntity = config.kpi_entity || config.entities?.load_power;
    kpiValue = inverterLoadPercent !== null && inverterLoadPercent !== undefined && !isNaN(inverterLoadPercent)
      ? Math.max(0, Math.min(100, Math.round(inverterLoadPercent)))
      : 0;
    kpiColor = kpiValue < 60 ? '#10b981' : kpiValue < 85 ? '#f59e0b' : '#ef4444';
  } else {
    // 'self_sufficiency'
    kpiTitle = 'Self-Sufficiency';
    kpiTooltip = 'Daily Solar Self-Sufficiency';
    kpiIcon = hasSolar ? 'mdi:shield-sun' : 'mdi:shield-battery-outline';
    kpiClickEntity = config.kpi_entity || config.daily_energy?.grid_import_entity;
    kpiValue = 100;
    if (loadEnergyToday !== null && loadEnergyToday > 0) {
      const imported = gridImportEnergyToday !== null ? Math.max(0, gridImportEnergyToday) : 0;
      kpiValue = Math.max(0, Math.min(100, Math.round((1 - imported / loadEnergyToday) * 100)));
    }
    kpiColor = kpiValue >= 75 ? '#10b981' : kpiValue >= 40 ? '#f59e0b' : '#ef4444';
  }

  const batHistory = historyMap.get('battery_voltage') || [];
  const gridHistory = historyMap.get('grid_voltage') || [];

  return html`
    <div class="params-grid">
      <!-- TILE 1: BATTERY TELEMETRY -->
      <div
        class="param-tile"
        @click=${() => onParamClick(config.battery_voltage_entity)}
        title="Battery Telemetry"
      >
        <div class="param-header">
          <ha-icon icon="mdi:car-battery"></ha-icon>
          <span class="param-title">Battery DC</span>
        </div>
        <div class="param-main-value">
          <span style="color: ${batVColor}">
            ${batteryVoltage !== null && !isNaN(batteryVoltage) ? `${batteryVoltage.toFixed(1)}V` : 'N/A'}
          </span>
          <span class="param-slash">/</span>
          <span style="color: ${batteryCurrent && batteryCurrent > 0 ? '#10b981' : '#f59e0b'}">
            ${batteryCurrent !== null && !isNaN(batteryCurrent)
              ? `${batteryCurrent > 0 ? '+' : ''}${batteryCurrent.toFixed(1)}A`
              : 'N/A'}
          </span>
        </div>
        <div class="param-chart-box">
          ${renderSparkline(batHistory, batVColor, 1.5, 'bat')}
        </div>
      </div>

      <!-- TILE 2: GRID TELEMETRY -->
      <div
        class="param-tile"
        @click=${() => onParamClick(config.grid_voltage_entity)}
        title="Grid AC Voltage"
      >
        <div class="param-header">
          <ha-icon icon="mdi:transmission-tower"></ha-icon>
          <span class="param-title">Grid AC</span>
          <span class="param-badge" style="background: ${gridVColor}22; color: ${gridVColor}">
            ${gridStatusLabel}
          </span>
        </div>
        <div class="param-main-value">
          <span style="color: ${gridVColor}">
            ${gridVoltage !== null && !isNaN(gridVoltage) ? `${Math.round(gridVoltage)}V` : 'N/A'}
          </span>
        </div>
        <div class="param-chart-box">
          ${renderSparkline(gridHistory, gridVColor, 20.0, 'grid')}
        </div>
      </div>

      <!-- TILE 3: KPI (BATTERY SOC / SELF-SUFFICIENCY / AUTONOMY / LOAD) -->
      <div
        class="param-tile"
        @click=${() => onParamClick(kpiClickEntity)}
        title="${kpiTooltip}"
      >
        <div class="param-header">
          <ha-icon icon="${kpiIcon}"></ha-icon>
          <span class="param-title">${kpiTitle}</span>
        </div>
        <div class="param-kpi-container">
          <div class="param-main-value kpi-val" style="color: ${kpiColor}">
            ${kpiValue}%
          </div>
          <div class="arc-gauge-wrapper">
            ${renderArcGauge(kpiValue, kpiColor)}
          </div>
        </div>
      </div>
    </div>
  `;
}
