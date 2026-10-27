import { css } from 'lit';

export const paramsStyles = css`
  /* ============================================================
     ELECTRICAL PARAMETERS SECTION
     ============================================================ */
  .params-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .param-tile {
    background: linear-gradient(160deg, rgba(30, 41, 59, 0.45) 0%, rgba(15, 23, 42, 0.45) 100%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 86px;
    box-sizing: border-box;
    gap: 6px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }

  .param-tile:hover {
    background: linear-gradient(160deg, rgba(30, 41, 59, 0.65) 0%, rgba(15, 23, 42, 0.65) 100%);
    border-color: rgba(255, 255, 255, 0.16);
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
  }

  .param-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    min-height: 22px;
  }

  .param-header ha-icon {
    --mdc-icon-size: 16px;
    color: var(--secondary-text);
    flex-shrink: 0;
  }

  .param-title {
    font-size: 0.70rem;
    color: var(--secondary-text);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1 1 auto;
    min-width: 0;
  }

  .param-badge {
    font-size: 0.62rem;
    font-weight: 700;
    padding: 1.5px 7px;
    border-radius: 999px;
    white-space: nowrap;
    line-height: 1.2;
    display: inline-flex;
    align-items: center;
    gap: 2px;
    letter-spacing: 0.2px;
    box-sizing: border-box;
    flex-shrink: 0;
  }

  .param-badge.badge-good {
    color: #34d399;
    background: rgba(16, 185, 129, 0.14);
    border: 1px solid rgba(16, 185, 129, 0.4);
    box-shadow: 0 0 6px rgba(16, 185, 129, 0.18);
  }

  .param-badge.badge-mid {
    color: #fbbf24;
    background: rgba(245, 158, 11, 0.15);
    border: 1px solid rgba(245, 158, 11, 0.4);
    box-shadow: 0 0 6px rgba(245, 158, 11, 0.18);
  }

  .param-badge.badge-low {
    color: #f87171;
    background: rgba(239, 68, 68, 0.15);
    border: 1px solid rgba(239, 68, 68, 0.4);
    box-shadow: 0 0 6px rgba(239, 68, 68, 0.18);
  }

  .param-badge.badge-purple {
    color: #c084fc;
    background: rgba(168, 85, 247, 0.15);
    border: 1px solid rgba(168, 85, 247, 0.4);
    box-shadow: 0 0 6px rgba(168, 85, 247, 0.18);
  }

  .param-main-value {
    font-size: 1.12rem;
    font-weight: 800;
    letter-spacing: -0.2px;
    line-height: 1.2;
    display: flex;
    align-items: baseline;
    gap: 4px;
  }

  .param-slash {
    color: rgba(255, 255, 255, 0.3);
    font-size: 0.9rem;
    font-weight: 400;
  }

  .param-chart-box {
    width: 100%;
    height: 24px;
    display: flex;
    align-items: center;
  }

  .sparkline-svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .sparkline-placeholder {
    width: 100%;
    height: 2px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1px;
  }

  .param-kpi-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    min-height: 38px;
  }

  .param-kpi-val-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
  }

  .kpi-val {
    font-size: 1.35rem;
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.3px;
  }

  .kpi-sub-watts {
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--secondary-text);
    line-height: 1.2;
    margin-top: 1px;
    white-space: nowrap;
  }

  .arc-gauge-wrapper {
    width: 54px;
    height: 32px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .arc-gauge-svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }
`;
