import { html, TemplateResult } from 'lit';
import { SafetyConfig } from '../types';
import { FaultDetail, getFaultDetail, getWarningDetail } from '../utils/fault-codes';

export interface AlertPanelProps {
  safetyConfig: SafetyConfig;
  isFault: boolean;
  faultCode: number | null;
  faultDetailsText?: string | null;
  isWarning: boolean;
  warningCode: number | null;
  warningDetailsText?: string | null;
  onAlertClick: (entityId?: string) => void;
}

export function renderAlertPanel(props: AlertPanelProps): TemplateResult {
  const {
    safetyConfig,
    isFault,
    faultCode,
    faultDetailsText,
    isWarning,
    warningCode,
    warningDetailsText,
    onAlertClick,
  } = props;

  // If no faults and no warnings, hide alert panel completely
  if (!isFault && !isWarning) {
    return html``;
  }

  const fCode = faultCode ?? 0;
  const faultDetail: FaultDetail = getFaultDetail(fCode, faultDetailsText);

  const wCode = warningCode ?? 0;
  const warningDetail = getWarningDetail(wCode, warningDetailsText);

  return html`
    <div class="alert-section-wrapper">
      <!-- Critical Inverter Fault Banner -->
      ${isFault
        ? html`
            <div
              class="alert-box alert-critical"
              @click=${() =>
                onAlertClick(
                  safetyConfig.fault_details_entity ||
                    safetyConfig.fault_code_entity ||
                    safetyConfig.fault_active_entity
                )}
              title="Click to view details"
            >
              <div class="alert-icon-col">
                <ha-icon icon="mdi:alert-octagon"></ha-icon>
              </div>
              <div class="alert-content-col">
                <div class="alert-headline">
                  <span class="alert-badge">FAULT F${fCode}</span>
                  <span class="alert-title">${faultDetail.title}</span>
                </div>
                <p class="alert-desc">${faultDetail.description}</p>
                <div class="alert-rec">
                  <ha-icon icon="mdi:lightbulb-on-outline"></ha-icon>
                  <span>${faultDetail.recommendation}</span>
                </div>
              </div>
            </div>
          `
        : ''}

      <!-- Inverter Warning Banner -->
      ${isWarning && !isFault
        ? html`
            <div
              class="alert-box alert-warn"
              @click=${() =>
                onAlertClick(
                  safetyConfig.warning_details_entity ||
                    safetyConfig.warning_code_entity ||
                    safetyConfig.warnings_active_entity
                )}
              title="Click to view details"
            >
              <div class="alert-icon-col">
                <ha-icon icon="mdi:alert"></ha-icon>
              </div>
              <div class="alert-content-col">
                <div class="alert-headline">
                  <span class="alert-badge">WARNING W${wCode}</span>
                  <span class="alert-title">${warningDetail.title}</span>
                </div>
                <p class="alert-desc">${warningDetail.description}</p>
              </div>
            </div>
          `
        : ''}
    </div>
  `;
}
