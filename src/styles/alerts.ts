import { css } from 'lit';

export const alertStyles = css`
  /* ============================================================
     ALERT & DIAGNOSTICS SECTION
     ============================================================ */
  .alert-section-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .alert-box {
    border-radius: 12px;
    padding: 12px 14px;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    cursor: pointer;
    transition: transform 0.15s ease, filter 0.15s ease;
  }

  .alert-box:hover {
    transform: translateY(-1px);
    filter: brightness(1.1);
  }

  .alert-critical {
    background: rgba(239, 68, 68, 0.12);
    border: 1px solid #ef4444;
    box-shadow: 0 0 16px rgba(239, 68, 68, 0.3);
    animation: pulse-danger 1.8s infinite ease-in-out;
  }

  .alert-critical .alert-icon-col ha-icon {
    --mdc-icon-size: 26px;
    color: #ef4444;
  }

  .alert-critical .alert-badge {
    background: #ef4444;
    color: #ffffff;
  }

  .alert-warn {
    background: rgba(245, 158, 11, 0.1);
    border: 1px solid rgba(245, 158, 11, 0.4);
  }

  .alert-warn .alert-icon-col ha-icon {
    --mdc-icon-size: 24px;
    color: #f59e0b;
  }

  .alert-warn .alert-badge {
    background: #f59e0b;
    color: #000000;
  }

  .alert-content-col {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex-grow: 1;
  }

  .alert-headline {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .alert-badge {
    font-size: 0.65rem;
    font-weight: 800;
    padding: 2px 6px;
    border-radius: 4px;
    letter-spacing: 0.3px;
  }

  .alert-title {
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.2px;
  }

  .alert-desc {
    margin: 0;
    font-size: 0.74rem;
    color: rgba(255, 255, 255, 0.85);
    line-height: 1.3;
  }

  .alert-rec {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 2px;
    font-size: 0.7rem;
    font-weight: 600;
    color: #fcd34d;
  }

  .alert-rec ha-icon {
    --mdc-icon-size: 14px;
  }

  /* ============================================================
     BLACK-BOX EVENT LOGGER & EXTREMES
     ============================================================ */
  .blackbox-section {
    background: var(--glass-bg, rgba(30, 41, 59, 0.55));
    border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.08));
    border-radius: 14px;
    padding: 10px 14px;
    transition: border-color 0.2s ease;
  }

  .blackbox-section.in-modal {
    background: transparent;
    border: none;
    padding: 0;
  }

  .blackbox-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
    gap: 8px;
  }

  .blackbox-header-left {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    min-width: 0;
  }

  .blackbox-title {
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--primary-text, #f8fafc);
    letter-spacing: 0.2px;
  }

  .blackbox-quick-pill {
    font-size: 0.68rem;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(226, 232, 240, 0.9);
  }

  .blackbox-count-badge {
    font-size: 0.68rem;
    font-weight: 800;
    padding: 1px 7px;
    border-radius: 999px;
    border: 1px solid transparent;
  }

  .blackbox-chevron {
    --mdc-icon-size: 20px;
    color: var(--muted-text, #94a3b8);
    transition: transform 0.2s ease;
  }

  .blackbox-chevron.open {
    transform: rotate(180deg);
  }

  .blackbox-body {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .blackbox-extremes-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 8px;
  }

  @media (max-width: 520px) {
    .blackbox-extremes-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  .bb-extreme-tile {
    background: rgba(15, 23, 42, 0.55);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 10px;
    padding: 8px 10px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .bb-ext-label {
    font-size: 0.65rem;
    color: var(--muted-text, #94a3b8);
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: 600;
  }

  .bb-ext-label ha-icon {
    --mdc-icon-size: 13px;
  }

  .bb-ext-val {
    font-size: 0.95rem;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
  }

  .bb-ext-time {
    font-size: 0.62rem;
    color: rgba(148, 163, 184, 0.72);
    font-variant-numeric: tabular-nums;
  }

  .blackbox-log-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--muted-text, #94a3b8);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding-top: 2px;
  }

  .bb-clear-btn {
    background: rgba(239, 68, 68, 0.12);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #fca5a5;
    border-radius: 6px;
    padding: 2px 8px;
    font-size: 0.68rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .bb-clear-btn ha-icon {
    --mdc-icon-size: 13px;
  }

  .blackbox-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px;
    border-radius: 10px;
    background: rgba(16, 185, 129, 0.06);
    border: 1px dashed rgba(16, 185, 129, 0.25);
    color: #6ee7b7;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .blackbox-empty ha-icon {
    --mdc-icon-size: 18px;
  }

  .blackbox-timeline {
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-height: 220px;
    overflow-y: auto;
    padding-right: 2px;
  }

  .bb-event-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 7px 10px;
    border-radius: 9px;
    background: rgba(15, 23, 42, 0.6);
    border-left: 3px solid var(--ev-color, #38bdf8);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    border-right: 1px solid rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .bb-event-icon ha-icon {
    --mdc-icon-size: 18px;
    color: var(--ev-color, #38bdf8);
  }

  .bb-event-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    flex: 1;
  }

  .bb-event-top {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }

  .bb-event-time {
    font-size: 0.67rem;
    font-weight: 700;
    color: rgba(148, 163, 184, 0.85);
    font-variant-numeric: tabular-nums;
  }

  .bb-event-code {
    font-size: 0.64rem;
    font-weight: 800;
    padding: 1px 5px;
    border-radius: 4px;
    background: color-mix(in srgb, var(--ev-color, #38bdf8) 20%, transparent);
    color: var(--ev-color, #38bdf8);
  }

  .bb-event-title {
    font-size: 0.76rem;
    font-weight: 600;
    color: var(--primary-text, #f8fafc);
  }

  .bb-event-metrics {
    font-size: 0.67rem;
    color: rgba(148, 163, 184, 0.8);
    font-variant-numeric: tabular-nums;
  }

  /* ============================================================
     COMPACT MODE DOCK & POPUP MODAL
     ============================================================ */
  .compact-dock {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 6px;
    margin-top: 2px;
  }

  @media (max-width: 440px) {
    .compact-dock {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  .compact-dock-btn {
    background: rgba(30, 41, 59, 0.65);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 7px 8px;
    color: var(--primary-text, #f8fafc);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    cursor: pointer;
    font-size: 0.73rem;
    font-weight: 700;
    transition: all 0.15s ease;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .compact-dock-btn:hover {
    background: rgba(59, 130, 246, 0.18);
    border-color: rgba(59, 130, 246, 0.45);
    transform: translateY(-1px);
  }

  .compact-dock-btn ha-icon {
    --mdc-icon-size: 16px;
    color: var(--dock-color, #38bdf8);
    flex-shrink: 0;
  }

  .compact-modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(2, 6, 23, 0.76);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    box-sizing: border-box;
    animation: fadeInModal 0.18s ease-out;
  }

  @keyframes fadeInModal {
    from {
      opacity: 0;
      transform: scale(0.97);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .compact-modal-dialog {
    width: 100%;
    max-width: 620px;
    max-height: 86vh;
    background: linear-gradient(160deg, #1e293b 0%, #0f172a 100%);
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 20px;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.75);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .compact-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(15, 23, 42, 0.5);
  }

  .compact-modal-tabs {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .compact-modal-tab {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: rgba(226, 232, 240, 0.8);
    border-radius: 9px;
    padding: 6px 11px;
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    transition: all 0.15s ease;
  }

  .compact-modal-tab ha-icon {
    --mdc-icon-size: 16px;
  }

  .compact-modal-tab.active {
    background: rgba(59, 130, 246, 0.22);
    border-color: #3b82f6;
    color: #ffffff;
  }

  .compact-modal-close {
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #e2e8f0;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
  }

  .compact-modal-close:hover {
    background: rgba(239, 68, 68, 0.25);
    border-color: #ef4444;
  }

  .compact-modal-content {
    padding: 16px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
`;
