import { html, TemplateResult } from 'lit';
import { BmsConfig, HomeAssistant } from '../types';
import { localize } from '../localize/localize';

export interface CellData {
  index: number;
  voltage: number;
  rawEntityId?: string;
}

export interface DualBatteryData {
  name: string;
  soc: number | null;
  voltage: number | null;
  temperature: number | null;
  cells: CellData[];
}

export interface BmsPanelProps {
  hass?: HomeAssistant;
  language?: string;
  bmsConfig: BmsConfig;
  soc: number | null;
  voltage?: number | null;
  current?: number | null;
  temperature: number | null;
  temperature2?: number | null;
  cellDelta: number | null;
  cycleCount: number | null;
  remainingCapacity: number | null;
  fullCapacity: number | null;
  cells: CellData[];
  onBmsClick: (entityId?: string) => void;

  // Dual battery series setup (2x 12V LiFePO4 = 24V)
  isDual?: boolean;
  battery1?: DualBatteryData;
  battery2?: DualBatteryData;
}

export function renderBmsPanel(props: BmsPanelProps): TemplateResult {
  const {
    hass,
    language,
    bmsConfig,
    soc,
    temperature,
    cellDelta,
    cycleCount,
    remainingCapacity,
    fullCapacity,
    cells,
    onBmsClick,
    isDual = false,
    battery1,
    battery2,
  } = props;

  const minRange = 3.0;
  const maxRange = 3.65;
  const range = maxRange - minRange;

  // Render DUAL BATTERY SERIES MODE (2x 12V LiFePO4 in Series = 24V)
  if (isDual && battery1 && battery2) {
    const v1 = battery1.voltage ?? 0;
    const v2 = battery2.voltage ?? 0;
    const hasBothPacks = v1 > 0 && v2 > 0;
    const packDeltaMv = hasBothPacks ? Math.round(Math.abs(v1 - v2) * 1000) : null;

    let packBalanceColor = '#10b981';
    let packBalanceText = localize('bms.balanced', hass, language);
    if (packDeltaMv === null) {
      packBalanceColor = '#64748b';
      packBalanceText = localize('bms.offline', hass, language);
    } else if (packDeltaMv > 200) {
      packBalanceColor = '#ef4444';
      packBalanceText = localize('bms.imbalance', hass, language);
    } else if (packDeltaMv > 80) {
      packBalanceColor = '#f59e0b';
      packBalanceText = localize('bms.drift', hass, language);
    }

    // All cells across both batteries for min/max calculation
    const allCells = [...battery1.cells, ...battery2.cells];
    const validVoltages = allCells.map((c) => c.voltage).filter((v) => v > 0);
    const minV = validVoltages.length > 0 ? Math.min(...validVoltages) : 0;
    const maxV = validVoltages.length > 0 ? Math.max(...validVoltages) : 0;
    const overallCellDelta =
      validVoltages.length > 1 ? Math.round((maxV - minV) * 1000) : null;

    const driftWarnText =
      packDeltaMv !== null && packDeltaMv > 150
        ? localize('bms.pack_drift_warn', hass, language)
            .replace('{delta}', String(packDeltaMv))
            .replace('{v1}', v1.toFixed(2))
            .replace('{v2}', v2.toFixed(2))
        : '';

    return html`
      <div class="bms-card-section dual-bms-section">
        <!-- Dual Battery Header -->
        <div class="bms-header">
          <div class="bms-header-title">
            <ha-icon icon="mdi:battery-sync"></ha-icon>
            <span>${localize('bms.title_dual', hass, language)}</span>
          </div>

          <div class="bms-header-status">
            <!-- Midpoint battery drift badge -->
            <span
              class="bms-delta-pill"
              style="--delta-color: ${packBalanceColor}"
              title="${packBalanceText}"
            >
              <ha-icon icon="mdi:scale-balance"></ha-icon>
              <span>
                ${localize('bms.delta_packs', hass, language)}:
                ${packDeltaMv !== null ? `${packDeltaMv} mV` : '—'}
              </span>
            </span>

            <!-- Cell delta badge -->
            <span
              class="bms-delta-pill cell-delta-pill"
              style="--delta-color: ${overallCellDelta === null ? '#64748b' : overallCellDelta > 40 ? '#f59e0b' : '#10b981'}"
              title="Delta between highest and lowest cell"
            >
              <span>
                ${localize('bms.delta_cells', hass, language)}:
                ${overallCellDelta !== null ? `${overallCellDelta} mV` : '—'}
              </span>
            </span>
          </div>
        </div>

        <!-- Warning banner if series midpoint drift is significant -->
        ${driftWarnText
          ? html`
              <div class="series-drift-alert">
                <ha-icon icon="mdi:alert"></ha-icon>
                <span>${driftWarnText}</span>
              </div>
            `
          : ''}

        <!-- Dual Battery Grid: Battery 1 and Battery 2 -->
        <div class="dual-battery-container">
          <!-- BATTERY 1 (12V Pack) -->
          <div class="pack-column">
            <div
              class="pack-header"
              @click=${() =>
                onBmsClick(
                  bmsConfig.bat1_voltage_entity ||
                    bmsConfig.bat1_soc_entity ||
                    bmsConfig.battery_1?.voltage_entity ||
                    bmsConfig.battery_1?.soc_entity
                )}
              style="cursor: pointer;"
              title="${battery1.name}"
            >
              <div class="pack-name-row">
                <span class="pack-name">${battery1.name}</span>
                ${battery1.soc !== null && !isNaN(battery1.soc)
                  ? html`<span class="pack-soc-badge">${Math.round(battery1.soc)}%</span>`
                  : ''}
              </div>
              <div class="pack-telemetry-row">
                <span class="pack-voltage">
                  ${battery1.voltage && battery1.voltage > 0 ? `${battery1.voltage.toFixed(2)}V` : '—'}
                </span>
                ${battery1.temperature !== null && !isNaN(battery1.temperature)
                  ? html`<span class="pack-temp">${Math.round(battery1.temperature)}°C</span>`
                  : ''}
              </div>
            </div>

            <!-- Cells of Battery 1 -->
            <div class="cells-grid pack-cells" role="group" aria-label="${battery1.name} Cells">
              ${battery1.cells.map((cell) => {
                const hasV = cell.voltage > 0;
                const isMin = hasV && cell.voltage === minV && validVoltages.length > 1 && minV !== maxV;
                const isMax = hasV && cell.voltage === maxV && validVoltages.length > 1 && minV !== maxV;
                const heightPct = hasV
                  ? Math.max(15, Math.min(100, Math.round(((cell.voltage - minRange) / range) * 100)))
                  : 8;
                const barFillColor = !hasV
                  ? 'rgba(255,255,255,0.12)'
                  : isMax
                  ? '#10b981'
                  : isMin
                  ? '#3b82f6'
                  : '#0ea5e9';

                return html`
                  <div
                    class="cell-col"
                    @click=${() => onBmsClick(cell.rawEntityId)}
                    title="Cell #${cell.index}: ${hasV ? `${cell.voltage.toFixed(3)} V` : 'Offline'} ${isMax ? '(MAX)' : isMin ? '(MIN)' : ''}"
                  >
                    <div class="cell-bar-track">
                      <div
                        class="cell-bar-fill ${isMax ? 'cell-max' : ''} ${isMin ? 'cell-min' : ''}"
                        style="height: ${heightPct}%; background-color: ${barFillColor};"
                      ></div>
                    </div>
                    <span class="cell-voltage">${hasV ? `${cell.voltage.toFixed(2)}V` : '—'}</span>
                    <span class="cell-id">#${cell.index}</span>
                  </div>
                `;
              })}
            </div>
          </div>

          <!-- Series Bridge Divider -->
          <div class="series-bridge" title="24V Series Connection (+ to -)">
            <span class="bridge-line"></span>
            <span class="bridge-badge">${localize('bms.series_badge', hass, language)}</span>
            <span class="bridge-line"></span>
          </div>

          <!-- BATTERY 2 (12V Pack) -->
          <div class="pack-column">
            <div
              class="pack-header"
              @click=${() =>
                onBmsClick(
                  bmsConfig.bat2_voltage_entity ||
                    bmsConfig.bat2_soc_entity ||
                    bmsConfig.battery_2?.voltage_entity ||
                    bmsConfig.battery_2?.soc_entity
                )}
              style="cursor: pointer;"
              title="${battery2.name}"
            >
              <div class="pack-name-row">
                <span class="pack-name">${battery2.name}</span>
                ${battery2.soc !== null && !isNaN(battery2.soc)
                  ? html`<span class="pack-soc-badge">${Math.round(battery2.soc)}%</span>`
                  : ''}
              </div>
              <div class="pack-telemetry-row">
                <span class="pack-voltage">
                  ${battery2.voltage && battery2.voltage > 0 ? `${battery2.voltage.toFixed(2)}V` : '—'}
                </span>
                ${battery2.temperature !== null && !isNaN(battery2.temperature)
                  ? html`<span class="pack-temp">${Math.round(battery2.temperature)}°C</span>`
                  : ''}
              </div>
            </div>

            <!-- Cells of Battery 2 -->
            <div class="cells-grid pack-cells" role="group" aria-label="${battery2.name} Cells">
              ${battery2.cells.map((cell) => {
                const hasV = cell.voltage > 0;
                const isMin = hasV && cell.voltage === minV && validVoltages.length > 1 && minV !== maxV;
                const isMax = hasV && cell.voltage === maxV && validVoltages.length > 1 && minV !== maxV;
                const heightPct = hasV
                  ? Math.max(15, Math.min(100, Math.round(((cell.voltage - minRange) / range) * 100)))
                  : 8;
                const barFillColor = !hasV
                  ? 'rgba(255,255,255,0.12)'
                  : isMax
                  ? '#10b981'
                  : isMin
                  ? '#3b82f6'
                  : '#0ea5e9';

                return html`
                  <div
                    class="cell-col"
                    @click=${() => onBmsClick(cell.rawEntityId)}
                    title="Cell #${cell.index}: ${hasV ? `${cell.voltage.toFixed(3)} V` : 'Offline'} ${isMax ? '(MAX)' : isMin ? '(MIN)' : ''}"
                  >
                    <div class="cell-bar-track">
                      <div
                        class="cell-bar-fill ${isMax ? 'cell-max' : ''} ${isMin ? 'cell-min' : ''}"
                        style="height: ${heightPct}%; background-color: ${barFillColor};"
                      ></div>
                    </div>
                    <span class="cell-voltage">${hasV ? `${cell.voltage.toFixed(2)}V` : '—'}</span>
                    <span class="cell-id">#${cell.index}</span>
                  </div>
                `;
              })}
            </div>
          </div>
        </div>

        <!-- Optional summary footer if cycleCount or capacity is configured -->
        ${cycleCount !== null || remainingCapacity !== null
          ? html`
              <div class="bms-footer-stats">
                ${cycleCount !== null && !isNaN(cycleCount)
                  ? html`
                      <div class="bms-footer-item" @click=${() => onBmsClick(bmsConfig.cycle_count_entity)}>
                        <ha-icon icon="mdi:refresh"></ha-icon>
                        <span>${localize('bms.cycles', hass, language)}: <strong>${cycleCount}</strong></span>
                      </div>
                    `
                  : ''}
                ${remainingCapacity !== null && !isNaN(remainingCapacity)
                  ? html`
                      <div class="bms-footer-item" @click=${() => onBmsClick(bmsConfig.remaining_capacity_entity)}>
                        <ha-icon icon="mdi:battery-charging-high"></ha-icon>
                        <span>
                          ${localize('bms.remaining', hass, language)}:
                          <strong>${remainingCapacity.toFixed(1)} Ah</strong>
                        </span>
                      </div>
                    `
                  : ''}
              </div>
            `
          : ''}
      </div>
    `;
  }

  // Fallback: SINGLE 8-CELL BATTERY MODE
  const validVoltages = cells.map((c) => c.voltage).filter((v) => v > 0);
  const minV = validVoltages.length > 0 ? Math.min(...validVoltages) : 0;
  const maxV = validVoltages.length > 0 ? Math.max(...validVoltages) : 0;

  const deltaMv =
    cellDelta !== null && !isNaN(cellDelta)
      ? cellDelta
      : validVoltages.length > 1
      ? Math.round((maxV - minV) * 1000)
      : null;

  let deltaColor = '#10b981';
  let balanceStatus = localize('bms.balanced', hass, language);
  if (deltaMv === null) {
    deltaColor = '#64748b';
    balanceStatus = localize('bms.offline', hass, language);
  } else if (deltaMv > 50) {
    deltaColor = '#ef4444';
    balanceStatus = localize('bms.imbalance', hass, language);
  } else if (deltaMv > 20) {
    deltaColor = '#f59e0b';
    balanceStatus = localize('bms.drift', hass, language);
  }

  return html`
    <div class="bms-card-section">
      <!-- Section Header -->
      <div class="bms-header">
        <div class="bms-header-title">
          <ha-icon icon="mdi:battery-heart-variant"></ha-icon>
          <span>${localize('bms.title', hass, language)}</span>
          ${soc !== null && !isNaN(soc)
            ? html`<span class="bms-soc-badge">${Math.round(soc)}% SOC</span>`
            : ''}
        </div>

        <div class="bms-header-status">
          <span
            class="bms-delta-pill"
            style="--delta-color: ${deltaColor}"
            @click=${() => onBmsClick(bmsConfig.cell_delta_entity)}
            title="${balanceStatus}"
          >
            <ha-icon icon="mdi:scale-balance"></ha-icon>
            <span>Δ ${deltaMv !== null ? `${deltaMv} mV` : '—'}</span>
          </span>
        </div>
      </div>

      <!-- Main BMS Body: Cell Bars + Key Telemetry -->
      <div class="bms-body">
        <!-- Cell Bar Chart -->
        <div class="cells-grid" role="group" aria-label="LiFePO4 Cell Voltages">
          ${cells.map((cell) => {
            const hasV = cell.voltage > 0;
            const isMin = hasV && cell.voltage === minV && validVoltages.length > 1 && minV !== maxV;
            const isMax = hasV && cell.voltage === maxV && validVoltages.length > 1 && minV !== maxV;
            const heightPct = hasV
              ? Math.max(15, Math.min(100, Math.round(((cell.voltage - minRange) / range) * 100)))
              : 8;
            const barFillColor = !hasV
              ? 'rgba(255,255,255,0.12)'
              : isMax
              ? '#10b981'
              : isMin
              ? '#3b82f6'
              : '#0ea5e9';

            return html`
              <div
                class="cell-col"
                @click=${() => onBmsClick(cell.rawEntityId)}
                title="Cell #${cell.index}: ${hasV ? `${cell.voltage.toFixed(3)} V` : 'Offline'} ${isMax ? '(MAX)' : isMin ? '(MIN)' : ''}"
              >
                <div class="cell-bar-track">
                  <div
                    class="cell-bar-fill ${isMax ? 'cell-max' : ''} ${isMin ? 'cell-min' : ''}"
                    style="height: ${heightPct}%; background-color: ${barFillColor};"
                  ></div>
                </div>
                <span class="cell-voltage">${hasV ? `${cell.voltage.toFixed(2)}V` : '—'}</span>
                <span class="cell-id">#${cell.index}</span>
              </div>
            `;
          })}
        </div>

        <!-- Right Side: BMS Telemetry Columns -->
        <div class="bms-telemetry-panel">
          ${temperature !== null && !isNaN(temperature)
            ? html`
                <div
                  class="bms-stat-item"
                  @click=${() => onBmsClick(bmsConfig.temperature_entity)}
                  title="${localize('bms.temp', hass, language)}"
                >
                  <ha-icon icon="mdi:thermometer"></ha-icon>
                  <div class="bms-stat-text">
                    <span class="bms-stat-val">${temperature.toFixed(1)}°C</span>
                    <span class="bms-stat-lbl">${localize('bms.temp', hass, language)}</span>
                  </div>
                </div>
              `
            : ''}

          ${cycleCount !== null && !isNaN(cycleCount)
            ? html`
                <div
                  class="bms-stat-item"
                  @click=${() => onBmsClick(bmsConfig.cycle_count_entity)}
                  title="${localize('bms.cycles', hass, language)}"
                >
                  <ha-icon icon="mdi:refresh"></ha-icon>
                  <div class="bms-stat-text">
                    <span class="bms-stat-val">${cycleCount}</span>
                    <span class="bms-stat-lbl">${localize('bms.cycles', hass, language)}</span>
                  </div>
                </div>
              `
            : ''}

          ${remainingCapacity !== null && !isNaN(remainingCapacity)
            ? html`
                <div
                  class="bms-stat-item"
                  @click=${() => onBmsClick(bmsConfig.remaining_capacity_entity)}
                  title="${localize('bms.capacity', hass, language)}"
                >
                  <ha-icon icon="mdi:battery-high"></ha-icon>
                  <div class="bms-stat-text">
                    <span class="bms-stat-val">
                      ${Math.round(remainingCapacity)}${fullCapacity ? `/${Math.round(fullCapacity)}` : ''}Ah
                    </span>
                    <span class="bms-stat-lbl">${localize('bms.capacity', hass, language)}</span>
                  </div>
                </div>
              `
            : ''}
        </div>
      </div>
    </div>
  `;
}
