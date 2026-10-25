import { css } from 'lit';

export const baseStyles = css`
  :host {
    display: block;
    box-sizing: border-box;
    container-type: inline-size;
    --card-bg: var(--ha-card-background, var(--card-background-color, #1a1a2e));
    --primary-text: var(--primary-text-color, #ffffff);
    --secondary-text: var(--secondary-text-color, #9ca3af);
    --divider: var(--divider-color, rgba(255, 255, 255, 0.08));
    --solar-color: var(--energy-solar-color, #f59e0b);
    --battery-charge-color: var(--energy-battery-in-color, #10b981);
    --battery-discharge-color: var(--energy-battery-out-color, #ff9800);
    --grid-import-color: var(--energy-grid-consumption-color, #4285f4);
    --grid-export-color: var(--energy-grid-return-color, #2ecc71);
    --home-color: var(--primary-text-color, #ffffff);
    --inverter-color: #3b82f6;
  }

  ha-card {
    background: var(--card-bg);
    color: var(--primary-text);
    border-radius: var(--ha-card-border-radius, 16px);
    padding: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 14px;
    box-shadow: var(--ha-card-box-shadow, 0 6px 24px rgba(0, 0, 0, 0.3));
    border: 1px solid var(--divider);
    position: relative;
  }

  ha-card.compact {
    padding: 10px 12px;
    gap: 10px;
  }

  ha-card.compact .power-flow-container {
    max-width: 420px;
  }

  button,
  input,
  select {
    font: inherit;
    color: inherit;
  }

  /* ============================================================
     HEADER BAR SECTION
     ============================================================ */
  .header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--divider);
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .header-icon-box {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: rgba(245, 158, 11, 0.15);
    border: 1px solid rgba(245, 158, 11, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-icon-box ha-icon {
    --mdc-icon-size: 24px;
    color: var(--solar-color);
  }

  .header-title-box {
    display: flex;
    flex-direction: column;
  }

  .header-title {
    font-size: 1.05rem;
    font-weight: 700;
    letter-spacing: 0.3px;
    line-height: 1.2;
  }

  .header-subtitle {
    font-size: 0.72rem;
    color: var(--secondary-text);
  }

  .header-chips {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
  }

  .status-chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 9px;
    border-radius: 9999px;
    font-size: 0.73rem;
    font-weight: 600;
    color: var(--chip-color, #10b981);
    background: color-mix(in srgb, var(--chip-color, #10b981) 15%, transparent);
    border: 1px solid color-mix(in srgb, var(--chip-color, #10b981) 35%, transparent);
    cursor: pointer;
    border-style: solid;
    outline: none;
    font-family: inherit;
    transition: transform 0.15s ease, filter 0.15s ease;
  }

  .status-chip:hover {
    transform: scale(1.04);
    filter: brightness(1.15);
  }

  .status-chip ha-icon {
    --mdc-icon-size: 14px;
  }

  .pulse-chip {
    animation: pulse-glow 2s infinite ease-in-out;
  }

  .pulse-chip-danger {
    animation: pulse-danger 1.2s infinite ease-in-out;
  }

  @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 0 0 4px rgba(16, 185, 129, 0.4);
    }
    50% {
      box-shadow: 0 0 12px rgba(16, 185, 129, 0.9);
    }
  }

  @keyframes pulse-danger {
    0%, 100% {
      box-shadow: 0 0 4px rgba(239, 68, 68, 0.4);
    }
    50% {
      box-shadow: 0 0 14px rgba(239, 68, 68, 0.9);
    }
  }

  .self-power-chip {
    background: rgba(59, 130, 246, 0.12);
    border-color: rgba(59, 130, 246, 0.3);
    color: #60a5fa;
  }

  .input-breaker-chip {
    background: rgba(239, 68, 68, 0.12);
    border-color: rgba(239, 68, 68, 0.3);
    color: #f87171;
  }

  .input-breaker-chip.breaker-on {
    color: #34d399;
    background: rgba(16, 185, 129, 0.12);
    border-color: rgba(16, 185, 129, 0.25);
    cursor: default;
  }
`;
