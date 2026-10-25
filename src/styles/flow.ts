import { css } from 'lit';

export const flowStyles = css`
  /* ============================================================
     POWER FLOW VISUALIZATION SECTION
     ============================================================ */
  .power-flow-container {
    position: relative;
    width: 100%;
    max-width: 520px;
    margin: 2px auto 6px;
    aspect-ratio: var(--flow-aspect-ratio, 500 / 305);
    user-select: none;
  }

  svg.flow-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    overflow: visible;
  }

  .pipe-track-outer {
    fill: none;
    stroke: rgba(148, 163, 184, 0.12);
    stroke-width: 5;
    stroke-linecap: round;
  }

  .pipe-track {
    fill: none;
    stroke: rgba(255, 255, 255, 0.14);
    stroke-width: 1.5;
    stroke-dasharray: 2 5;
    stroke-linecap: round;
  }

  .pipe-port {
    fill: #0f172a;
    stroke: rgba(148, 163, 184, 0.45);
    stroke-width: 1.6;
  }

  .flow-glow-line {
    fill: none;
    stroke-linecap: round;
    opacity: 0.22;
    filter: blur(2px);
  }

  .flow-line {
    fill: none;
    stroke-dasharray: 6 10;
    stroke-linecap: round;
    animation: flow-dash var(--flow-duration, 2.5s) linear infinite;
    will-change: stroke-dashoffset;
    filter: drop-shadow(0 0 5px currentColor);
  }

  .flow-orb-halo {
    opacity: 0.35;
    filter: blur(2px);
  }

  .flow-orb-core {
    filter: drop-shadow(0 0 4px currentColor);
  }

  @keyframes flow-dash {
    from {
      stroke-dashoffset: 32;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  .flow-nodes-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    pointer-events: none;
  }

  /* Precision anchor: (left, top) is ALWAYS the exact center of .node-badge */
  .flow-node {
    position: absolute;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: auto;
    cursor: pointer;
    transition: transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), filter 0.2s ease;
  }

  .flow-node:hover {
    transform: translate(-50%, -50%) scale(1.04);
    filter: brightness(1.1);
  }

  .node-badge {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 25%, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.92) 100%);
    border: 2px solid var(--node-border, rgba(255, 255, 255, 0.16));
    box-shadow:
      0 8px 20px rgba(0, 0, 0, 0.42),
      inset 0 1px 1px rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  /* Metadata block hangs below the badge without shifting the badge center */
  .node-meta {
    position: absolute;
    top: calc(100% + 5px);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    pointer-events: none;
    min-width: 110px;
  }

  .node-value {
    font-size: 0.96rem;
    font-weight: 800;
    letter-spacing: 0.2px;
    line-height: 1.15;
    white-space: nowrap;
  }

  .node-label {
    font-size: 0.68rem;
    color: var(--secondary-text);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    line-height: 1.2;
    margin-top: 1px;
    white-space: nowrap;
  }

  .node-sub {
    font-size: 0.66rem;
    color: rgba(148, 163, 184, 0.85);
    font-weight: 600;
    line-height: 1.2;
    margin-top: 2px;
    padding: 1px 6px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.07);
    white-space: nowrap;
  }

  .critical-countdown-label {
    color: #fca5a5 !important;
    background: rgba(239, 68, 68, 0.16);
    border: 1px solid rgba(239, 68, 68, 0.45);
    padding: 1px 6px;
    border-radius: 999px;
    font-weight: 800;
    text-transform: none;
    letter-spacing: 0.2px;
  }

  .node-shedding-hint {
    font-size: 0.61rem;
    color: #fde68a;
    background: rgba(245, 158, 11, 0.14);
    border: 1px solid rgba(245, 158, 11, 0.32);
    border-radius: 999px;
    padding: 1px 6px;
    margin-top: 2px;
    font-weight: 600;
    white-space: nowrap;
  }

  /* SOLAR NODE */
  .node-solar { --node-border: var(--solar-color); }
  .node-solar .node-badge {
    width: 66px;
    height: 66px;
    box-shadow: 0 0 18px rgba(245, 158, 11, 0.18), 0 6px 16px rgba(0, 0, 0, 0.4);
  }
  .node-solar ha-icon { --mdc-icon-size: 30px; color: var(--solar-color); }
  .node-solar .node-value { color: var(--solar-color); }

  /* CENTRAL INVERTER HUB (Self-contained Glassmorphic Core) */
  .node-inverter .inverter-hub-badge {
    width: 122px;
    height: 88px;
    border-radius: 20px;
    flex-direction: column;
    justify-content: space-between;
    padding: 9px 10px 8px;
    box-sizing: border-box;
    background: linear-gradient(155deg, rgba(30, 41, 59, 0.96) 0%, rgba(15, 23, 42, 0.96) 100%);
    border: 1.8px solid color-mix(in srgb, var(--hub-accent, #3b82f6) 55%, rgba(255, 255, 255, 0.15));
    box-shadow:
      0 10px 24px rgba(0, 0, 0, 0.48),
      0 0 22px color-mix(in srgb, var(--hub-accent, #3b82f6) 20%, transparent),
      inset 0 1px 1px rgba(255, 255, 255, 0.14);
  }

  .hub-top-row {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .inverter-core-svg {
    width: 36px;
    height: 26px;
    color: var(--hub-accent, #3b82f6);
    filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.3));
  }

  .inverter-status-dot {
    position: absolute;
    top: 1px;
    right: 4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #10b981;
  }

  .hub-mode-title {
    font-size: 0.82rem;
    font-weight: 800;
    color: var(--primary-text, #f8fafc);
    letter-spacing: 0.2px;
    line-height: 1.1;
    max-width: 106px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .hub-sub-pill {
    font-size: 0.64rem;
    font-weight: 700;
    color: rgba(148, 163, 184, 0.92);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 999px;
    padding: 1.5px 7px;
    line-height: 1.15;
    white-space: nowrap;
    max-width: 110px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .hub-sub-pill.active-self {
    color: #fbbf24;
    background: rgba(245, 158, 11, 0.12);
    border-color: rgba(245, 158, 11, 0.3);
  }

  /* BATTERY NODE */
  .node-battery { --node-border: transparent; }
  .node-battery .node-badge {
    width: 78px;
    height: 78px;
    border: none;
    background: transparent;
    box-shadow: none;
  }
  .battery-gauge-svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.38));
  }
  .battery-gauge-bg {
    fill: rgba(15, 23, 42, 0.92);
    stroke: rgba(255, 255, 255, 0.09);
    stroke-width: 5.5;
  }
  .battery-gauge-fill {
    fill: none;
    stroke-width: 5.8;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.5s ease, stroke 0.3s ease;
  }
  .battery-gauge-center {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .battery-gauge-center ha-icon { --mdc-icon-size: 20px; }
  .battery-soc-text {
    font-size: 0.84rem;
    font-weight: 800;
    line-height: 1;
    margin-top: 2px;
  }

  /* HOME NODE */
  .node-home { --node-border: rgba(6, 182, 212, 0.35); }
  .node-home .node-badge {
    width: 72px;
    height: 72px;
    border: none;
    background: transparent;
    box-shadow: none;
  }
  .home-gauge-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.38));
  }
  .home-gauge-bg {
    fill: rgba(15, 23, 42, 0.92);
    stroke: rgba(6, 182, 212, 0.25);
    stroke-width: 2.5;
  }
  .home-gauge-fill {
    fill: none;
    stroke-width: 4;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.5s ease;
  }
  .node-home ha-icon {
    position: relative;
    z-index: 1;
    --mdc-icon-size: 30px;
    color: var(--home-color);
  }
  .node-home .node-value { color: var(--home-color); }

  /* GRID NODE */
  .node-grid { --node-border: rgba(59, 130, 246, 0.45); }
  .node-grid .node-badge {
    width: 68px;
    height: 68px;
  }
  .node-grid ha-icon { --mdc-icon-size: 29px; color: var(--grid-import-color); }
  .node-grid .node-value { color: var(--grid-import-color); }
  .grid-status-dot {
    position: absolute;
    bottom: 3px;
    right: 3px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid #0f172a;
  }
`;
