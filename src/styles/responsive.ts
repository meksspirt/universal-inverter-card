import { css } from 'lit';

export const responsiveStyles = css`
  /* ============================================================
     RESPONSIVE BREAKPOINTS & ACCESSIBILITY
     ============================================================ */
  @container (max-width: 440px) {
    .header-bar {
      flex-direction: column;
      align-items: flex-start;
    }
    .params-grid {
      grid-template-columns: 1fr;
      gap: 8px;
    }
    .controls-grid-2 {
      grid-template-columns: 1fr;
    }
    .energy-row {
      grid-template-columns: 100px 1fr 70px;
    }
    .bms-body {
      flex-direction: column;
      align-items: stretch;
      gap: 10px;
    }
    .bms-telemetry-panel {
      border-left: none;
      border-top: 1px solid var(--divider);
      padding-left: 0;
      padding-top: 8px;
      flex-direction: row;
      justify-content: space-around;
    }
    .node-solar .node-badge,
    .node-grid .node-badge {
      width: 56px;
      height: 56px;
    }
    .node-battery .node-badge {
      width: 68px;
      height: 68px;
    }
    .node-home .node-badge {
      width: 60px;
      height: 60px;
    }
    .node-inverter .inverter-hub-badge {
      width: 90px;
      height: 70px;
      padding: 5px 4px 4px;
      border-radius: 14px;
    }
    .node-inverter .inverter-core-svg {
      width: 30px;
      height: 23px;
    }
    .node-inverter .inverter-custom-icon {
      --mdc-icon-size: 23px;
    }
    .node-inverter .hub-mode-title {
      font-size: 0.70rem;
      max-width: 80px;
    }
    .node-inverter .hub-sub-pill {
      font-size: 0.58rem;
      padding: 1px 5px;
      max-width: 78px;
    }
    .node-value {
      font-size: 0.82rem;
    }
    .node-label {
      font-size: 0.65rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .flow-line {
      animation: none !important;
      stroke-dashoffset: 0 !important;
      opacity: 0.8;
    }
    .flow-node, .status-chip, .cell-col, .bms-stat-item, .pill-btn, .stepper-btn, .alert-box {
      transition: none !important;
      animation: none !important;
    }
  }
`;
