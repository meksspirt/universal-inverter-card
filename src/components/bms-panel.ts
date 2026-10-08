import { html, TemplateResult } from 'lit';
import { BmsConfig } from '../types';

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
    const packDeltaMv = v1 > 0 && v2 > 0 ? Math.round(Math.abs(v1 - v2) * 1000) : 0;

    let packBalanceColor = '#10b981';
    let packBalanceText = 'Balanced';
    if (packDeltaMv > 200) {
      packBalanceColor = '#ef4444';
      packBalanceText = 'Pack Imbalance!';
    } else if (packDeltaMv > 80) {
      packBalanceColor = '#f59e0b';
      packBalanceText = 'Pack Drift';
    }

    // All 8 cells across both batteries for min/max calculation
    const allCells = [...battery1.cells, ...battery2.cells];
    const validVoltages = allCells.map((c) => c.voltage).filter((v) => v > 0);
    const minV = validVoltages.length > 0 ? Math.min(...validVoltages) : 3.0;
    const maxV = validVoltages.length > 0 ? Math.max(...validVoltages) : 3.65;
    const overallCellDelta =
      validVoltages.length > 0 ? Math.round((maxV - minV) * 1000) : 0;

    return html`
      <div class="bms-card-section dual-bms-section">
        <!-- Dual Battery Header -->
        <div class="bms-header">
          <div class="bms-header-title">
            <ha-icon icon="mdi:battery-sync"></ha-icon>
            <span>BMS Redodo: 2× 12V Series (24V)</span>
          </div>

          <div class="bms-header-status">
            <!-- Midpoint battery drift badge -->
            <span
              class="bms-delta-pill"
              style="--delta-color: ${packBalanceColor}"
              title="Pack Voltage Delta: ${packBalanceText}"
            >
              <ha-icon icon="mdi:scale-balance"></ha-icon>
              <span>Δ Packs: ${packDeltaMv} mV</span>
            </span>

            <!-- Cell delta badge -->
            <span
              class="bms-delta-pill cell-delta-pill"
              style="--delta-color: ${overallCellDelta > 40 ? '#f59e0b' : '#10b981'}"
              title="Delta between highest and lowest cell"
            >
              <span>Δ Cells: ${overallCellDelta} mV</span>
            </span>
          </div>
        </div>

        <!-- Warning banner if series midpoint drift is significant -->
        ${packDeltaMv > 150
          ? html`
              <div class="series-drift-alert">
                <ha-icon icon="mdi:alert"></ha-icon>
                <span>
                  Pack voltage drift detected: ${packDeltaMv} mV (Battery 1: ${v1.toFixed(2)}V, Battery 2: ${v2.toFixed(2)}V).
                  A 24V active battery equalizer is recommended.
                </span>
              </div>
            `
          : ''}

        <!-- Dual Battery Grid: Battery 1 and Battery 2 -->
        <div class="dual-battery-container">
          <!-- BATTERY 1 (12V Pack) -->
          <div class="pack-column">
            <div
              class="pack-header"
              @click=${() => onBmsClick(bmsConfig.bat1_voltage_entity || bmsConfig.bat1_soc_entity || bmsConfig.battery_1?.voltage_entity || bmsConfig.battery_1?.soc_entity)}
              style="cursor: pointer;"
              title="Click for Battery #1 details"
            >
              <div class="pack-name-row">
                <span class="pack-name">${battery1.name}</span>
                ${battery1.soc !== null && !isNaN(battery1.soc)
                  ? html`<span class="pack-soc-badge">${Math.round(battery1.soc)}%</span>`
                  : ''}
              </div>
              <div class="pack-telemetry-row">
                <span class="pack-voltage">${battery1.voltage ? `${battery1.voltage.toFixed(2)}V` : '-'}</span>
                ${battery1.temperature !== null && !isNaN(battery1.temperature)
                  ? html`<span class="pack-temp">${Math.round(battery1.temperature)}°C</span>`
                  : ''}
              </div>
            </div>

            <!-- 4 Cells of Battery 1 -->
            <div class="cells-grid pack-cells" role="group" aria-label="${battery1.name} Cells">
              ${battery1.cells.map((cell) => {
                const isMin = cell.voltage === minV && validVoltages.length > 1;
                const isMax = cell.voltage === maxV && validVoltages.length > 1;
                const heightPct = Math.max(
                  15,
                  Math.min(100, Math.round(((cell.voltage - minRange) / range) * 100))
                );
                const barFillColor = isMax ? '#10b981' : isMin ? '#3b82f6' : '#0ea5e9';

                return html`
                  <div
                    class="cell-col"
                    @click=${() => onBmsClick(cell.rawEntityId)}
                    title="Cell #${cell.index}: ${cell.voltage.toFixed(3)} V ${isMax ? '(MAX)' : isMin ? '(MIN)' : ''}"
                  >
                    <div class="cell-bar-track">
                      <div
                        class="cell-bar-fill ${isMax ? 'cell-max' : ''} ${isMin ? 'cell-min' : ''}"
                        style="height: ${heightPct}%; background-color: ${barFillColor};"
                      ></div>
                    </div>
                    <span class="cell-voltage">${cell.voltage > 0 ? cell.voltage.toFixed(2) : '-'}V</span>
                    <span class="cell-id">#${cell.index}</span>
                  </div>
                `;
              })}
            </div>
          </div>

          <!-- Series Bridge Divider -->
          <div class="series-bridge" title="24V Series Connection (+ to -)">
            <span class="bridge-line"></span>
            <span class="bridge-badge">24V Series</span>
            <span class="bridge-line"></span>
          </div>

          <!-- BATTERY 2 (12V Pack) -->
          <div class="pack-column">
            <div
              class="pack-header"
              @click=${() => onBmsClick(bmsConfig.bat2_voltage_entity || bmsConfig.bat2_soc_entity || bmsConfig.battery_2?.voltage_entity || bmsConfig.battery_2?.soc_entity)}
              style="cursor: pointer;"
              title="Click for Battery #2 details"
            >
              <div class="pack-name-row">
                <span class="pack-name">${battery2.name}</span>
                ${battery2.soc !== null && !isNaN(battery2.soc)
                  ? html`<span class="pack-soc-badge">${Math.round(battery2.soc)}%</span>`
                  : ''}
              </div>
              <div class="pack-telemetry-row">
                <span class="pack-voltage">${battery2.voltage ? `${battery2.voltage.toFixed(2)}V` : '-'}</span>
                ${battery2.temperature !== null && !isNaN(battery2.temperature)
                  ? html`<span class="pack-temp">${Math.round(battery2.temperature)}°C</span>`
                  : ''}
              </div>
            </div>

            <!-- 4 Cells of Battery 2 -->
            <div class="cells-grid pack-cells" role="group" aria-label="${battery2.name} Cells">
              ${battery2.cells.map((cell) => {
                const isMin = cell.voltage === minV && validVoltages.length > 1;
                const isMax = cell.voltage === maxV && validVoltages.length > 1;
                const heightPct = Math.max(
                  15,
                  Math.min(100, Math.round(((cell.voltage - minRange) / range) * 100))
                );
                const barFillColor = isMax ? '#10b981' : isMin ? '#3b82f6' : '#0ea5e9';

                return html`
                  <div
                    class="cell-col"
                    @click=${() => onBmsClick(cell.rawEntityId)}
                    title="Cell #${cell.index}: ${cell.voltage.toFixed(3)} V ${isMax ? '(MAX)' : isMin ? '(MIN)' : ''}"
                  >
                    <div class="cell-bar-track">
                      <div
                        class="cell-bar-fill ${isMax ? 'cell-max' : ''} ${isMin ? 'cell-min' : ''}"
                        style="height: ${heightPct}%; background-color: ${barFillColor};"
                      ></div>
                    </div>
                    <span class="cell-voltage">${cell.voltage > 0 ? cell.voltage.toFixed(2) : '-'}V</span>
                    <span class="cell-id">#${cell.index}</span>
                  </div>
                `;
              })}
            </div>
          </div>
        </div>

        <!-- Optional summary footer if cycleCount or capacity is configured -->
        ${(cycleCount !== null || remainingCapacity !== null)
          ? html`
              <div class="bms-footer-stats">
                ${cycleCount !== null && !isNaN(cycleCount)
                  ? html`
                      <div class="bms-footer-item" @click=${() => onBmsClick(bmsConfig.cycle_count_entity)}>
                        <ha-icon icon="mdi:refresh"></ha-icon>
                        <span>Cycles: <strong>${cycleCount}</strong></span>
                      </div>
                    `
                  : ''}
                ${remainingCapacity !== null && !isNaN(remainingCapacity)
                  ? html`
                      <div class="bms-footer-item" @click=${() => onBmsClick(bmsConfig.remaining_capacity_entity)}>
                        <ha-icon icon="mdi:battery-charging-high"></ha-icon>
                        <span>Remaining: <strong>${remainingCapacity.toFixed(1)} Ah</strong></span>
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
  const minV = validVoltages.length > 0 ? Math.min(...validVoltages) : 3.0;
  const maxV = validVoltages.length > 0 ? Math.max(...validVoltages) : 3.65;

  const deltaMv =
    cellDelta !== null && !isNaN(cellDelta)
      ? cellDelta
      : validVoltages.length > 0
      ? Math.round((maxV - minV) * 1000)
      : 0;

  let deltaColor = '#10b981';
  let balanceStatus = 'Balanced';
  if (deltaMv > 50) {
    deltaColor = '#ef4444';
    balanceStatus = 'Imbalance Alert';
  } else if (deltaMv > 20) {
    deltaColor = '#f59e0b';
    balanceStatus = 'Normal Drift';
  }

  return html`
    <div class="bms-card-section">
      <!-- Section Header -->
      <div class="bms-header">
        <div class="bms-header-title">
          <ha-icon icon="mdi:battery-heart-variant"></ha-icon>
          <span>BMS Redodo LiFePO4</span>
          ${soc !== null && !isNaN(soc)
            ? html`<span class="bms-soc-badge">${Math.round(soc)}% SOC</span>`
            : ''}
        </div>

        <div class="bms-header-status">
          <span
            class="bms-delta-pill"
            style="--delta-color: ${deltaColor}"
            @click=${() => onBmsClick(bmsConfig.cell_delta_entity)}
            title="Delta between highest and lowest cell: ${balanceStatus}"
          >
            <ha-icon icon="mdi:scale-balance"></ha-icon>
            <span>Δ ${deltaMv} mV</span>
          </span>
        </div>
      </div>

      <!-- Main BMS Body: Cell Bars + Key Telemetry -->
      <div class="bms-body">
        <!-- 8-Cell Bar Chart -->
        <div class="cells-grid" role="group" aria-label="LiFePO4 Cell Voltages">
          ${cells.map((cell) => {
            const isMin = cell.voltage === minV && validVoltages.length > 1;
            const isMax = cell.voltage === maxV && validVoltages.length > 1;
            const heightPct = Math.max(
              15,
              Math.min(100, Math.round(((cell.voltage - minRange) / range) * 100))
            );
            const barFillColor = isMax ? '#10b981' : isMin ? '#3b82f6' : '#0ea5e9';

            return html`
              <div
                class="cell-col"
                @click=${() => onBmsClick(cell.rawEntityId)}
                title="Cell #${cell.index}: ${cell.voltage.toFixed(3)} V ${isMax ? '(MAX)' : isMin ? '(MIN)' : ''}"
              >
                <div class="cell-bar-track">
                  <div
                    class="cell-bar-fill ${isMax ? 'cell-max' : ''} ${isMin ? 'cell-min' : ''}"
                    style="height: ${heightPct}%; background-color: ${barFillColor};"
                  ></div>
                </div>
                <span class="cell-voltage">${cell.voltage > 0 ? cell.voltage.toFixed(2) : '-'}V</span>
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
                  title="BMS Temperature Probe"
                >
                  <ha-icon icon="mdi:thermometer"></ha-icon>
                  <div class="bms-stat-text">
                    <span class="bms-stat-val">${temperature.toFixed(1)}°C</span>
                    <span class="bms-stat-lbl">Temp</span>
                  </div>
                </div>
              `
            : ''}

          ${cycleCount !== null && !isNaN(cycleCount)
            ? html`
                <div
                  class="bms-stat-item"
                  @click=${() => onBmsClick(bmsConfig.cycle_count_entity)}
                  title="Charge/Discharge Cycle Count"
                >
                  <ha-icon icon="mdi:refresh"></ha-icon>
                  <div class="bms-stat-text">
                    <span class="bms-stat-val">${cycleCount}</span>
                    <span class="bms-stat-lbl">Cycles</span>
                  </div>
                </div>
              `
            : ''}

          ${remainingCapacity !== null && !isNaN(remainingCapacity)
            ? html`
                <div
                  class="bms-stat-item"
                  @click=${() => onBmsClick(bmsConfig.remaining_capacity_entity)}
                  title="Remaining Battery Capacity"
                >
                  <ha-icon icon="mdi:battery-high"></ha-icon>
                  <div class="bms-stat-text">
                    <span class="bms-stat-val">
                      ${Math.round(remainingCapacity)}${fullCapacity ? `/${Math.round(fullCapacity)}` : ''}Ah
                    </span>
                    <span class="bms-stat-lbl">Capacity</span>
                  </div>
                </div>
              `
            : ''}
        </div>
      </div>
    </div>
  `;
}
