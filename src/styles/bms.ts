import { css } from 'lit';

export const bmsStyles = css`
  /* ============================================================
     BMS SECTION (SINGLE & DUAL BATTERY)
     ============================================================ */
  .bms-card-section {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.015) 100%);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 14px;
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    container-type: inline-size;
    container-name: bms-card;
  }

  .bms-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  .bms-header-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.2px;
    flex-wrap: wrap;
  }

  .bms-header-title ha-icon {
    --mdc-icon-size: 18px;
    color: #10b981;
    filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.35));
  }

  .bms-brand-text {
    color: var(--primary-text);
    white-space: nowrap;
  }

  .bms-topology-badge {
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    color: #fbbf24;
    background: rgba(245, 158, 11, 0.14);
    border: 1px solid rgba(245, 158, 11, 0.32);
    padding: 2px 8px;
    border-radius: 9999px;
    white-space: nowrap;
  }

  .bms-soc-badge {
    font-size: 0.72rem;
    font-weight: 700;
    color: #10b981;
    background: rgba(16, 185, 129, 0.15);
    padding: 2px 7px;
    border-radius: 9999px;
    border: 1px solid rgba(16, 185, 129, 0.3);
  }

  .bms-header-status {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }

  .bms-delta-pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--delta-color, #10b981);
    background: color-mix(in srgb, var(--delta-color, #10b981) 14%, transparent);
    border: 1px solid color-mix(in srgb, var(--delta-color, #10b981) 32%, transparent);
    padding: 2.5px 8px;
    border-radius: 9999px;
    cursor: pointer;
    transition: transform 0.15s ease, background 0.15s ease;
    white-space: nowrap;
  }

  .bms-delta-pill:hover {
    transform: translateY(-1px);
    background: color-mix(in srgb, var(--delta-color, #10b981) 22%, transparent);
  }

  .bms-delta-pill ha-icon {
    --mdc-icon-size: 13px;
  }

  .series-drift-alert {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(245, 158, 11, 0.1);
    border: 1px solid rgba(245, 158, 11, 0.35);
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 0.72rem;
    color: #fbbf24;
    line-height: 1.3;
  }

  .series-drift-alert ha-icon {
    --mdc-icon-size: 18px;
    color: #f59e0b;
    flex-shrink: 0;
  }

  /* Universal Multi-Pack / Single-Pack Grid Layout */
  .bms-packs-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .bms-packs-grid.multi-pack {
    grid-template-columns: repeat(auto-fit, minmax(195px, 1fr));
  }

  @container bms-card (max-width: 410px) {
    .bms-packs-grid.multi-pack {
      grid-template-columns: 1fr;
    }
  }

  .pack-column {
    background: linear-gradient(180deg, rgba(15, 23, 42, 0.55) 0%, rgba(15, 23, 42, 0.35) 100%);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 12px;
    padding: 10px 11px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
    transition: border-color 0.2s ease;
  }

  .pack-column:hover {
    border-color: rgba(255, 255, 255, 0.14);
  }

  .pack-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    min-width: 0;
  }

  .pack-name-row {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    overflow: hidden;
  }

  .pack-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .pack-name {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--primary-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .pack-soc-badge {
    font-size: 0.66rem;
    font-weight: 800;
    padding: 1px 6px;
    border-radius: 9999px;
    border: 1px solid transparent;
    flex-shrink: 0;
    line-height: 1.3;
  }

  .pack-telemetry-row {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  .pack-voltage {
    font-size: 0.84rem;
    font-weight: 800;
    color: #38bdf8;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.2px;
  }

  .pack-temp {
    display: inline-flex;
    align-items: center;
    gap: 1px;
    font-size: 0.68rem;
    font-weight: 600;
    color: var(--secondary-text);
    background: rgba(255, 255, 255, 0.04);
    padding: 1px 5px;
    border-radius: 6px;
  }

  .pack-temp ha-icon {
    --mdc-icon-size: 12px;
    color: #94a3b8;
  }

  /* Thin Pack SoC Progress Bar */
  .pack-soc-bar-track {
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 9999px;
    overflow: hidden;
  }

  .pack-soc-bar-fill {
    height: 100%;
    border-radius: 9999px;
    transition: width 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* Prismatic Cell Equalizer Columns */
  .cells-grid {
    display: grid;
    grid-template-columns: repeat(var(--cell-cols, 4), minmax(0, 1fr));
    gap: 6px;
    padding-top: 2px;
  }

  .cell-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    cursor: pointer;
    min-width: 0;
    padding: 4px 2px 3px 2px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.015);
    border: 1px solid rgba(255, 255, 255, 0.04);
    transition: transform 0.15s ease, border-color 0.15s ease, background 0.15s ease;
  }

  .cell-col:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.12);
  }

  .cell-col.is-balancing {
    border-color: rgba(245, 158, 11, 0.38);
    background: rgba(245, 158, 11, 0.035);
  }

  .cell-top-indicator {
    height: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .cell-balance-tag {
    font-size: 0.68rem;
    color: #fbbf24;
    animation: balance-pulse 1.2s infinite ease-in-out;
    filter: drop-shadow(0 0 5px rgba(245, 158, 11, 0.9));
    line-height: 1;
  }

  @keyframes balance-pulse {
    0%, 100% {
      transform: scale(0.9);
      opacity: 0.75;
    }
    50% {
      transform: scale(1.25);
      opacity: 1;
    }
  }

  /* Battery Cell Positive Terminal Cap */
  .cell-cap {
    width: 38%;
    max-width: 16px;
    height: 3px;
    border-radius: 2px 2px 0 0;
    background: rgba(148, 163, 184, 0.35);
    margin-bottom: -2px;
    transition: background 0.25s ease;
  }

  .cell-cap.cap-balancing {
    background: #fbbf24;
    box-shadow: 0 0 6px rgba(245, 158, 11, 0.85);
  }

  .cell-col.cell-max .cell-cap {
    background: #10b981;
    box-shadow: 0 0 5px rgba(16, 185, 129, 0.6);
  }

  .cell-col.cell-min .cell-cap {
    background: #38bdf8;
    box-shadow: 0 0 5px rgba(56, 189, 248, 0.6);
  }

  .cell-bar-track {
    width: 100%;
    height: 44px;
    background: rgba(2, 6, 23, 0.55);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 5px;
    padding: 2px;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    box-sizing: border-box;
  }

  .cell-bar-fill {
    width: 100%;
    border-radius: 3px;
    transition: height 0.45s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s ease;
    background: linear-gradient(180deg, #38bdf8 0%, #0284c7 100%);
  }

  .cell-col.cell-max {
    border-color: rgba(16, 185, 129, 0.32);
    background: rgba(16, 185, 129, 0.04);
  }

  .cell-col.cell-max .cell-bar-fill {
    background: linear-gradient(180deg, #34d399 0%, #059669 100%);
    box-shadow: 0 0 8px rgba(16, 185, 129, 0.45);
  }

  .cell-col.cell-min {
    border-color: rgba(56, 189, 248, 0.32);
    background: rgba(56, 189, 248, 0.04);
  }

  .cell-col.cell-min .cell-bar-fill {
    background: linear-gradient(180deg, #60a5fa 0%, #2563eb 100%);
    box-shadow: 0 0 8px rgba(59, 130, 246, 0.45);
  }

  .cell-col.cell-offline .cell-bar-fill {
    background: rgba(100, 116, 139, 0.25);
  }

  .cell-voltage {
    font-size: 0.7rem;
    font-weight: 700;
    line-height: 1.15;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
    color: var(--primary-text);
    margin-top: 1px;
  }

  .cell-col.cell-max .cell-voltage {
    color: #34d399;
  }

  .cell-col.cell-min .cell-voltage {
    color: #60a5fa;
  }

  .cell-id {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    font-size: 0.62rem;
    font-weight: 600;
    color: var(--secondary-text);
    line-height: 1;
  }

  .cell-tag {
    font-size: 0.52rem;
    line-height: 1;
  }

  .cell-col.cell-max .cell-tag {
    color: #10b981;
  }

  .cell-col.cell-min .cell-tag {
    color: #38bdf8;
  }

  .cell-ir-text {
    font-size: 0.58rem;
    font-weight: 600;
    color: rgba(148, 163, 184, 0.78);
    font-variant-numeric: tabular-nums;
    line-height: 1;
    margin-top: 1px;
    white-space: nowrap;
  }

  /* Footer Summary Stats (Min / Avg / Max + Cycles & Ah) */
  .bms-footer-stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    padding-top: 8px;
    margin-top: 2px;
    border-top: 1px solid var(--divider);
    font-size: 0.7rem;
    color: var(--secondary-text);
  }

  .bms-footer-cells-summary {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }

  .cell-stat-chip {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 2px 7px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    font-size: 0.66rem;
    font-variant-numeric: tabular-nums;
  }

  .cell-stat-chip strong {
    color: var(--primary-text);
    font-weight: 700;
  }

  .cell-stat-chip.min-chip strong {
    color: #60a5fa;
  }

  .cell-stat-chip.max-chip strong {
    color: #34d399;
  }

  .bms-footer-right {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-left: auto;
  }

  .bms-footer-item {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    transition: opacity 0.15s ease;
  }

  .bms-footer-item:hover {
    opacity: 0.8;
  }

  .bms-footer-item ha-icon {
    --mdc-icon-size: 15px;
    color: #10b981;
  }

  .bms-footer-item strong {
    color: var(--primary-text);
  }
`;
