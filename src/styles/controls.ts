import { css } from 'lit';

export const controlsStyles = css`
  /* ============================================================
     UNIVERSAL INVERTER CONTROLS & SETTINGS SECTION
     ============================================================ */
  .controls-card-section {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 14px;
    overflow: hidden;
    transition: border-color 0.2s ease, background 0.2s ease;
  }

  .controls-card-section.expanded {
    border-color: rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.03);
  }

  .controls-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 14px;
    cursor: pointer;
    user-select: none;
    transition: background 0.15s ease;
    gap: 8px;
  }

  .controls-header:hover {
    background: rgba(255, 255, 255, 0.03);
  }

  .controls-header-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.3px;
    min-width: 0;
  }

  .controls-header-title ha-icon {
    --mdc-icon-size: 18px;
    color: var(--inverter-color);
    flex-shrink: 0;
  }

  .controls-header-right {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    flex-shrink: 0;
  }

  .controls-quick-summary {
    font-size: 0.72rem;
    color: var(--secondary-text);
    font-weight: 600;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.07);
    padding: 2px 8px;
    border-radius: 999px;
    white-space: nowrap;
  }

  .chevron-icon {
    --mdc-icon-size: 20px;
    color: var(--secondary-text);
    transition: transform 0.25s ease;
  }

  .chevron-icon.open {
    transform: rotate(180deg);
  }

  .controls-body {
    padding: 10px 14px 14px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-top: 1px solid var(--divider);
  }

  /* Responsive Priority Selectors Grid (Stacks cleanly on standard cards, 2-col on wide cards) */
  .controls-select-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 10px;
    width: 100%;
  }

  /* Responsive Steppers Grid (2-col on standard cards, 1-col on narrow mobile) */
  .controls-stepper-grid,
  .controls-grid-2 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(155px, 1fr));
    gap: 10px;
    width: 100%;
  }

  .control-box {
    background: rgba(0, 0, 0, 0.22);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 11px;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
    box-sizing: border-box;
  }

  .control-box-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    min-width: 0;
    cursor: pointer;
  }

  .control-box-header ha-icon {
    --mdc-icon-size: 16px;
    color: var(--inverter-color);
    opacity: 0.85;
    flex-shrink: 0;
  }

  .control-box-header label {
    font-size: 0.71rem;
    color: var(--secondary-text);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.45px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }

  .control-label-wrap {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    flex: 1;
  }

  .control-current-tag {
    font-size: 0.68rem;
    font-weight: 700;
    color: var(--inverter-color);
    background: rgba(59, 130, 246, 0.14);
    border: 1px solid rgba(59, 130, 246, 0.3);
    padding: 1px 7px;
    border-radius: 6px;
    flex-shrink: 0;
    letter-spacing: 0.3px;
  }

  .control-live-val {
    font-size: 0.9rem;
    font-weight: 800;
    color: var(--inverter-color);
    background: rgba(59, 130, 246, 0.12);
    border: 1px solid rgba(59, 130, 246, 0.25);
    padding: 2px 8px;
    border-radius: 6px;
    flex-shrink: 0;
    cursor: pointer;
  }

  /* Smart Pill Selector (Never clips horizontally) */
  .pill-selector {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(82px, 1fr));
    background: rgba(0, 0, 0, 0.35);
    padding: 4px;
    border-radius: 9px;
    gap: 5px;
    width: 100%;
    box-sizing: border-box;
  }

  .pill-btn {
    min-width: 0;
    border: 1px solid transparent;
    background: rgba(255, 255, 255, 0.02);
    color: var(--secondary-text);
    padding: 6px 6px;
    border-radius: 7px;
    cursor: pointer;
    outline: none;
    transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
    text-align: center;
    font-family: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
  }

  .pill-btn:hover {
    color: var(--primary-text);
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(255, 255, 255, 0.08);
  }

  .pill-btn:focus-visible {
    outline: 2px solid var(--inverter-color);
    outline-offset: 1px;
  }

  .pill-btn.active {
    background: linear-gradient(135deg, var(--inverter-color), #2563eb);
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.45);
  }

  .pill-code {
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.35px;
    line-height: 1.15;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pill-sub {
    font-size: 0.61rem;
    font-weight: 500;
    opacity: 0.78;
    line-height: 1.1;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pill-btn.active .pill-sub {
    opacity: 0.92;
  }

  /* ============================================================
     RANGE SLIDER WITH FILLED TRACK, STEPPERS & PRESET CHIPS
     ============================================================ */
  .slider-box {
    padding: 11px 12px;
    gap: 9px;
  }

  .slider-input-container {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
  }

  .slider-track-wrap {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .slider-Sub-bounds {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2px;
  }

  .slider-boundary {
    font-size: 0.64rem;
    color: var(--secondary-text);
    font-weight: 600;
    opacity: 0.75;
  }

  .slider-step-btn {
    width: 30px;
    height: 30px;
    flex-shrink: 0;
  }

  /* Cross-browser <input type="range"> styling (separate WebKit & Firefox rule blocks) */
  .control-range {
    --slider-track-size: 6px;
    --slider-thumb-size: 18px;
    width: 100%;
    margin: 4px 0;
    background: transparent;
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
    outline: none;
  }

  .control-range:focus-visible {
    outline: 2px solid var(--inverter-color);
    outline-offset: 3px;
    border-radius: 4px;
  }

  .control-range::-webkit-slider-runnable-track {
    height: var(--slider-track-size);
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      var(--inverter-color) 0%,
      #60a5fa var(--slider-progress, 0%),
      rgba(255, 255, 255, 0.14) var(--slider-progress, 0%)
    );
  }

  .control-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: var(--slider-thumb-size);
    height: var(--slider-thumb-size);
    margin-block-start: calc((var(--slider-track-size) - var(--slider-thumb-size)) / 2);
    border-radius: 50%;
    background: #ffffff;
    border: 3px solid var(--inverter-color);
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.85);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .control-range::-webkit-slider-thumb:hover {
    transform: scale(1.14);
    box-shadow: 0 0 14px rgba(59, 130, 246, 1);
  }

  .control-range::-moz-range-track {
    height: var(--slider-track-size);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.14);
  }

  .control-range::-moz-range-progress {
    height: var(--slider-track-size);
    border-radius: 999px;
    background: linear-gradient(90deg, var(--inverter-color), #60a5fa);
  }

  .control-range::-moz-range-thumb {
    width: var(--slider-thumb-size);
    height: var(--slider-thumb-size);
    border-radius: 50%;
    background: #ffffff;
    border: 3px solid var(--inverter-color);
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.85);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .control-range::-moz-range-thumb:hover {
    transform: scale(1.14);
  }

  /* Quick-Select Preset Chips under Slider */
  .slider-presets-row {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    padding-top: 2px;
  }

  .preset-chip {
    flex: 1;
    min-width: 42px;
    padding: 4px 6px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.04);
    color: var(--secondary-text);
    font-size: 0.68rem;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.15s ease;
    text-align: center;
  }

  .preset-chip:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--primary-text);
    border-color: rgba(255, 255, 255, 0.16);
  }

  .preset-chip.active {
    background: rgba(59, 130, 246, 0.2);
    color: #60a5fa;
    border-color: rgba(59, 130, 246, 0.5);
  }

  /* ============================================================
     PRECISION VOLTAGE / SOC STEPPERS
     ============================================================ */
  .voltage-stepper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.32);
    border-radius: 8px;
    padding: 3px 4px;
    gap: 6px;
  }

  .stepper-btn {
    width: 28px;
    height: 28px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    background: rgba(255, 255, 255, 0.06);
    color: var(--primary-text);
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    transition: background 0.15s ease, transform 0.1s ease;
    user-select: none;
  }

  .stepper-btn:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.15);
  }

  .stepper-btn:active:not(:disabled) {
    transform: scale(0.92);
  }

  .stepper-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .stepper-val {
    font-size: 0.88rem;
    font-weight: 700;
    letter-spacing: 0.2px;
    cursor: pointer;
    text-align: center;
  }

  /* ============================================================
     NORMAL SWITCHES & DANGER ZONE (EQUALIZATION)
     ============================================================ */
  .normal-switch-row {
    background: rgba(0, 0, 0, 0.22);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 10px;
    padding: 9px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .normal-switch-row.switch-row-active {
    border-color: rgba(59, 130, 246, 0.3);
    background: rgba(59, 130, 246, 0.06);
  }

  .switch-row-left {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    cursor: pointer;
  }

  .switch-row-left ha-icon {
    --mdc-icon-size: 17px;
    color: var(--inverter-color);
    flex-shrink: 0;
  }

  .switch-row-title {
    font-size: 0.76rem;
    font-weight: 600;
    color: var(--primary-text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .danger-switch-row {
    background: rgba(239, 68, 68, 0.08);
    border: 1px solid rgba(239, 68, 68, 0.25);
    border-radius: 10px;
    padding: 10px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .danger-switch-row.danger-active {
    background: rgba(239, 68, 68, 0.2);
    border-color: #ef4444;
    animation: pulse-danger 1.5s infinite ease-in-out;
  }

  .danger-info {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
    cursor: pointer;
  }

  .danger-title {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.76rem;
    font-weight: 700;
    color: #ef4444;
  }

  .danger-title ha-icon {
    --mdc-icon-size: 16px;
    flex-shrink: 0;
  }

  .danger-desc {
    font-size: 0.65rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.25;
  }

  .toggle-switch-btn {
    min-width: 54px;
    padding: 6px 10px;
    border-radius: 8px;
    border: none;
    font-size: 0.74rem;
    font-weight: 700;
    cursor: pointer;
    outline: none;
    transition: all 0.2s ease;
    font-family: inherit;
    flex-shrink: 0;
  }

  .switch-off {
    background: rgba(255, 255, 255, 0.1);
    color: var(--secondary-text);
  }

  .switch-off:hover {
    background: rgba(255, 255, 255, 0.16);
    color: var(--primary-text);
  }

  .normal-toggle.normal-on {
    background: var(--inverter-color);
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.45);
  }

  .switch-on {
    background: #ef4444;
    color: #ffffff;
    box-shadow: 0 0 10px rgba(239, 68, 68, 0.8);
  }
`;
