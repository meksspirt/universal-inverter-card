import { html, TemplateResult } from 'lit';
import { BmsConfig, HomeAssistant } from '../types';
import { localize } from '../localize/localize';

export interface CellData {
  index: number;
  packCellIndex?: number;
  voltage: number;
  rawEntityId?: string;
}

export interface DualBatteryData {
  name: string;
  soc: number | null;
  voltage: number | null;
  current?: number | null;
  temperature: number | null;
  cycleCount?: number | null;
  remainingCapacity?: number | null;
  voltageEntity?: string;
  socEntity?: string;
  temperatureEntity?: string;
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

  // Multi-pack / Dual battery setup (1 to N packs in Single, Series, or Parallel)
  isDual?: boolean;
  battery1?: DualBatteryData;
  battery2?: DualBatteryData;
  packs?: DualBatteryData[];
}

function detectBrandTitle(bmsConfig: BmsConfig, hass?: HomeAssistant, language?: string): string {
  if (bmsConfig.bank_name && bmsConfig.bank_name.trim() !== '') {
    return bmsConfig.bank_name.trim();
  }
  const allEntityStrings = JSON.stringify(bmsConfig).toLowerCase();
  if (allEntityStrings.includes('redodo')) return 'BMS Redodo';
  if (allEntityStrings.includes('growatt')) return 'Growatt BMS';
  if (allEntityStrings.includes('jikong') || allEntityStrings.includes('jk_bms')) return 'JK BMS';
  if (allEntityStrings.includes('daly')) return 'Daly BMS';
  if (allEntityStrings.includes('pylon')) return 'Pylontech BMS';
  if (allEntityStrings.includes('seplos')) return 'Seplos BMS';
  if (allEntityStrings.includes('pace')) return 'Pace BMS';
  if (allEntityStrings.includes('jbd')) return 'JBD BMS';
  if (allEntityStrings.includes('deye')) return 'Deye BMS';
  if (allEntityStrings.includes('felicity')) return 'Felicity BMS';
  return localize('bms.title', hass, language);
}

function detectNominalPackVoltage(pack: DualBatteryData): number {
  const v = pack.voltage ?? 0;
  if (v >= 40) return 48;
  if (v >= 30) return 36;
  if (v >= 19) return 24;
  if (v >= 8) return 12;
  const n = pack.cells.length;
  if (n >= 13) return 48;
  if (n >= 10) return 36;
  if (n >= 6) return 24;
  return 12;
}

function formatCellVoltage(v: number): string {
  if (v <= 0) return '—';
  // Show 3 decimals if the sensor reports non-zero 3rd decimal digit, otherwise 2 decimals
  const millivolts = Math.round(v * 1000);
  if (millivolts % 10 !== 0) {
    return `${v.toFixed(3)}V`;
  }
  return `${v.toFixed(2)}V`;
}

export function renderBmsPanel(props: BmsPanelProps): TemplateResult {
  const {
    hass,
    language,
    bmsConfig,
    soc,
    voltage = null,
    current = null,
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
    packs: rawPacks,
  } = props;

  // Build normalized list of packs (supports 1, 2, 3, 4+ packs seamlessly)
  let packs: DualBatteryData[] = [];
  if (rawPacks && rawPacks.length > 0) {
    packs = rawPacks;
  } else if (isDual && battery1 && battery2) {
    packs = [battery1, battery2];
  } else {
    packs = [
      {
        name: bmsConfig.bank_name || localize('bms.single_badge', hass, language),
        soc,
        voltage,
        current,
        temperature,
        cycleCount,
        remainingCapacity,
        voltageEntity: bmsConfig.voltage_entity,
        socEntity: bmsConfig.soc_entity,
        temperatureEntity: bmsConfig.temperature_entity,
        cells,
      },
    ];
  }

  const isMultiPack = packs.length > 1;
  const allCells = packs.flatMap((p) => p.cells);
  const validVoltages = allCells.map((c) => c.voltage).filter((v) => v > 0);
  const minV = validVoltages.length > 0 ? Math.min(...validVoltages) : 0;
  const maxV = validVoltages.length > 0 ? Math.max(...validVoltages) : 0;
  const avgV =
    validVoltages.length > 0
      ? validVoltages.reduce((acc, v) => acc + v, 0) / validVoltages.length
      : 0;

  // Auto-detect chemistry voltage window (LiFePO4 vs Li-Ion/NMC vs LTO)
  const chem = bmsConfig.chemistry || 'auto';
  let minRange = 3.0;
  let maxRange = 3.6;
  if (chem === 'li_ion' || (chem === 'auto' && avgV > 3.68)) {
    minRange = 3.1;
    maxRange = 4.2;
  } else if (chem === 'lto' || (chem === 'auto' && avgV > 0 && avgV < 2.85)) {
    minRange = 1.9;
    maxRange = 2.75;
  }
  const range = maxRange - minRange;

  // Detect topology: 'single' | 'series' | 'parallel'
  let topology: 'single' | 'series' | 'parallel' = 'single';
  if (isMultiPack) {
    if (bmsConfig.topology && bmsConfig.topology !== 'auto') {
      topology = bmsConfig.topology;
    } else {
      const validPackVoltages = packs.map((p) => p.voltage ?? 0).filter((v) => v > 0);
      if (validPackVoltages.length >= 2 && voltage !== null && voltage > 0) {
        const sumV = validPackVoltages.reduce((a, b) => a + b, 0);
        const avgPackV = sumV / validPackVoltages.length;
        topology = Math.abs(voltage - sumV) <= Math.abs(voltage - avgPackV) ? 'series' : 'parallel';
      } else {
        const nomV = detectNominalPackVoltage(packs[0]);
        topology = nomV <= 12 ? 'series' : 'parallel';
      }
    }
  }

  // Compute human-readable topology summary badge (e.g. "2× 12V → 24V (8S)" or "8S • 24V")
  const brandTitle = detectBrandTitle(bmsConfig, hass, language);
  const firstPackNomV = detectNominalPackVoltage(packs[0]);
  const totalCellsCount = allCells.length;
  let topologySubtitle = '';
  let topologyBadgeText = '';

  if (isMultiPack) {
    if (topology === 'series') {
      const totalNomV = packs.reduce((sum, p) => sum + detectNominalPackVoltage(p), 0);
      topologySubtitle = `${packs.length}× ${firstPackNomV}V → ${totalNomV}V (${totalCellsCount}S)`;
      topologyBadgeText = `${packs.length}S • ${localize('bms.series_badge', hass, language)}`;
    } else {
      topologySubtitle = `${packs.length}× ${firstPackNomV}V ∥ (${totalCellsCount} Cells)`;
      topologyBadgeText = `${packs.length}P • ${localize('bms.parallel_badge', hass, language)}`;
    }
  } else {
    topologySubtitle = `${firstPackNomV}V (${totalCellsCount}S)`;
    topologyBadgeText = `${totalCellsCount}S • ${firstPackNomV}V`;
  }

  // Pack-to-pack voltage delta (for multi-pack setups)
  const validPackVoltages = packs.map((p) => p.voltage ?? 0).filter((v) => v > 0);
  const packDeltaMv =
    validPackVoltages.length > 1
      ? Math.round((Math.max(...validPackVoltages) - Math.min(...validPackVoltages)) * 1000)
      : null;

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

  // Cell-to-cell voltage delta
  const overallCellDelta =
    cellDelta !== null && !isNaN(cellDelta)
      ? Math.round(cellDelta < 1 ? cellDelta * 1000 : cellDelta)
      : validVoltages.length > 1
      ? Math.round((maxV - minV) * 1000)
      : null;

  const cellDeltaColor =
    overallCellDelta === null
      ? '#64748b'
      : overallCellDelta > 50
      ? '#ef4444'
      : overallCellDelta > 25
      ? '#f59e0b'
      : '#10b981';

  const driftWarnText =
    isMultiPack && packDeltaMv !== null && packDeltaMv > 150 && validPackVoltages.length >= 2
      ? localize('bms.pack_drift_warn', hass, language)
          .replace('{delta}', String(packDeltaMv))
          .replace('{v1}', Math.min(...validPackVoltages).toFixed(2))
          .replace('{v2}', Math.max(...validPackVoltages).toFixed(2))
      : '';

  const renderCellColumns = (packCells: CellData[]) => {
    const cols = Math.min(Math.max(packCells.length, 4), 8);
    return html`
      <div
        class="cells-grid"
        style="--cell-cols: ${cols};"
        role="group"
        aria-label="Battery Cell Voltages"
      >
        ${packCells.map((cell) => {
          const hasV = cell.voltage > 0;
          const isMin = hasV && cell.voltage === minV && validVoltages.length > 1 && minV !== maxV;
          const isMax = hasV && cell.voltage === maxV && validVoltages.length > 1 && minV !== maxV;

          // Hybrid height calculation: combines absolute chemistry state + relative cell contrast
          let heightPct = 8;
          if (hasV) {
            const absRatio = Math.max(0, Math.min(1, (cell.voltage - minRange) / range));
            const spread = maxV - minV;
            const relRatio = spread > 0.002 ? (cell.voltage - minV) / spread : 0.5;
            const blended = absRatio * 0.72 + relRatio * 0.28;
            heightPct = Math.max(18, Math.min(98, Math.round(blended * 100)));
          }

          const stateClass = !hasV ? 'cell-offline' : isMax ? 'cell-max' : isMin ? 'cell-min' : 'cell-nom';
          const badgeTag = isMax ? '▲' : isMin ? '▼' : '';
          const displayIdx =
            bmsConfig.cell_numbering === 'per_pack' && cell.packCellIndex
              ? cell.packCellIndex
              : cell.index;

          return html`
            <div
              class="cell-col ${stateClass}"
              @click=${() => onBmsClick(cell.rawEntityId)}
              title="Cell #${displayIdx}: ${hasV ? `${cell.voltage.toFixed(3)} V` : 'Offline'} ${isMax ? '(MAX)' : isMin ? '(MIN)' : ''}"
            >
              <div class="cell-cap"></div>
              <div class="cell-bar-track">
                <div class="cell-bar-fill" style="height: ${heightPct}%;"></div>
              </div>
              <span class="cell-voltage">${formatCellVoltage(cell.voltage)}</span>
              <span class="cell-id">
                #${displayIdx}${badgeTag ? html`<span class="cell-tag">${badgeTag}</span>` : ''}
              </span>
            </div>
          `;
        })}
      </div>
    `;
  };

  return html`
    <div class="bms-card-section universal-bms-section">
      <!-- 1. Universal BMS Bank Header -->
      <div class="bms-header">
        <div class="bms-header-title">
          <ha-icon icon="${isMultiPack ? 'mdi:battery-sync' : 'mdi:battery-heart-variant'}"></ha-icon>
          <span class="bms-brand-text">${brandTitle}: ${topologySubtitle}</span>
          <span class="bms-topology-badge">${topologyBadgeText}</span>
        </div>

        <div class="bms-header-status">
          ${isMultiPack
            ? html`
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
              `
            : ''}

          <span
            class="bms-delta-pill cell-delta-pill"
            style="--delta-color: ${cellDeltaColor}"
            @click=${() => onBmsClick(bmsConfig.cell_delta_entity)}
            title="${validVoltages.length > 0 ? `Min: ${minV.toFixed(3)}V • Max: ${maxV.toFixed(3)}V • Avg: ${avgV.toFixed(3)}V` : ''}"
          >
            <ha-icon icon="mdi:vector-difference"></ha-icon>
            <span>
              ${localize('bms.delta_cells', hass, language)}:
              ${overallCellDelta !== null ? `${overallCellDelta} mV` : '—'}
            </span>
          </span>
        </div>
      </div>

      <!-- 2. Warning Banner if Pack Voltage Drift is High -->
      ${driftWarnText
        ? html`
            <div class="series-drift-alert">
              <ha-icon icon="mdi:alert"></ha-icon>
              <span>${driftWarnText}</span>
            </div>
          `
        : ''}

      <!-- 3. Universal Responsive Packs Grid (1, 2, 3, 4+ Packs) -->
      <div class="bms-packs-grid ${isMultiPack ? 'multi-pack' : 'single-pack'}">
        ${packs.map((pack, idx) => {
          const packSoc =
            pack.soc !== null && !isNaN(pack.soc)
              ? Math.max(0, Math.min(100, Math.round(pack.soc)))
              : null;
          const packSocColor =
            packSoc === null
              ? '#64748b'
              : packSoc > 50
              ? '#10b981'
              : packSoc > 20
              ? '#f59e0b'
              : '#ef4444';

          const clickEntity =
            pack.voltageEntity ||
            pack.socEntity ||
            (idx === 0
              ? bmsConfig.bat1_voltage_entity ||
                bmsConfig.battery_1?.voltage_entity ||
                bmsConfig.voltage_entity
              : idx === 1
              ? bmsConfig.bat2_voltage_entity || bmsConfig.battery_2?.voltage_entity
              : undefined);

          return html`
            <div class="pack-column">
              <!-- Pack Header: Single-line Name + SoC Badge on Left, Voltage + Temp on Right -->
              <div
                class="pack-header"
                @click=${() => onBmsClick(clickEntity)}
                title="${pack.name}"
              >
                <div class="pack-name-row">
                  <span
                    class="pack-dot"
                    style="background: ${packSocColor}; box-shadow: 0 0 6px ${packSocColor};"
                  ></span>
                  <span class="pack-name">${pack.name}</span>
                  ${packSoc !== null
                    ? html`
                        <span
                          class="pack-soc-badge"
                          style="color: ${packSocColor}; background: color-mix(in srgb, ${packSocColor} 15%, transparent); border-color: color-mix(in srgb, ${packSocColor} 32%, transparent);"
                        >
                          ${packSoc}%
                        </span>
                      `
                    : ''}
                </div>

                <div class="pack-telemetry-row">
                  <span class="pack-voltage">
                    ${pack.voltage !== null && pack.voltage > 0 ? `${pack.voltage.toFixed(2)}V` : '—'}
                  </span>
                  ${pack.temperature !== null && !isNaN(pack.temperature)
                    ? html`
                        <span class="pack-temp">
                          <ha-icon icon="mdi:thermometer"></ha-icon>
                          ${Math.round(pack.temperature)}°C
                        </span>
                      `
                    : ''}
                </div>
              </div>

              <!-- Thin SoC Progress Bar under Header -->
              <div class="pack-soc-bar-track">
                <div
                  class="pack-soc-bar-fill"
                  style="width: ${packSoc ?? 0}%; background: linear-gradient(90deg, ${packSocColor} 0%, #38bdf8 100%);"
                ></div>
              </div>

              <!-- Prismatic Cell Equalizer Columns -->
              ${renderCellColumns(pack.cells)}
            </div>
          `;
        })}
      </div>

      <!-- 4. Summary Footer (Min/Avg/Max Cell Voltages + Cycles & Remaining Capacity) -->
      ${validVoltages.length > 0 || cycleCount !== null || remainingCapacity !== null
        ? html`
            <div class="bms-footer-stats">
              ${validVoltages.length > 1
                ? html`
                    <div class="bms-footer-cells-summary">
                      <span class="cell-stat-chip min-chip">
                        ${localize('bms.min_cell', hass, language)}: <strong>${minV.toFixed(3)}V</strong>
                      </span>
                      <span class="cell-stat-chip avg-chip">
                        ${localize('bms.avg_cell', hass, language)}: <strong>${avgV.toFixed(3)}V</strong>
                      </span>
                      <span class="cell-stat-chip max-chip">
                        ${localize('bms.max_cell', hass, language)}: <strong>${maxV.toFixed(3)}V</strong>
                      </span>
                    </div>
                  `
                : html`<div></div>`}

              <div class="bms-footer-right">
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
                          <strong>${remainingCapacity.toFixed(1)}${fullCapacity ? `/${Math.round(fullCapacity)}` : ''} Ah</strong>
                        </span>
                      </div>
                    `
                  : ''}
              </div>
            </div>
          `
        : ''}
    </div>
  `;
}
