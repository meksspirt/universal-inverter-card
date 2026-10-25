import { html, TemplateResult } from 'lit';
import { HomeAssistant, SafetyConfig } from '../types';
import { FaultDetail, getFaultDetail, getWarningDetail } from '../utils/fault-codes';
import { localize } from '../localize/localize';

export interface AlertPanelProps {
  hass?: HomeAssistant;
  language?: string;
  safetyConfig?: SafetyConfig;
  isOffline?: boolean;
  offlineEntity?: string;
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
    hass,
    language,
    safetyConfig,
    isOffline = false,
    offlineEntity,
    isFault,
    faultCode,
    faultDetailsText,
    isWarning,
    warningCode,
    warningDetailsText,
    onAlertClick,
  } = props;

  // If no offline state, no faults, and no warnings, hide alert panel completely
  if (!isOffline && !isFault && !isWarning) {
    return html``;
  }

  const fCode = faultCode ?? 0;
  const faultDetail: FaultDetail = getFaultDetail(fCode, faultDetailsText, language);

  const wCode = warningCode ?? 0;
  const warningDetail = getWarningDetail(wCode, warningDetailsText, language);

  return html`
    <div class="alert-section-wrapper">
      <!-- Collector / Inverter Offline Banner -->
      ${isOffline
        ? html`
            <div
              class="alert-box alert-warn"
              @click=${() => onAlertClick(offlineEntity)}
              title="Click to view entity status"
            >
              <div class="alert-icon-col">
                <ha-icon icon="mdi:lan-disconnect"></ha-icon>
              </div>
              <div class="alert-content-col">
                <div class="alert-headline">
                  <span class="alert-badge">${localize('common.offline', hass, language)}</span>
                  <span class="alert-title">${localize('alerts.offline_title', hass, language)}</span>
                </div>
                <p class="alert-desc">${localize('alerts.offline_desc', hass, language)}</p>
              </div>
            </div>
          `
        : ''}

      <!-- Critical Inverter Fault Banner -->
      ${isFault && !isOffline
        ? html`
            <div
              class="alert-box alert-critical"
              @click=${() =>
                onAlertClick(
                  safetyConfig?.fault_details_entity ||
                    safetyConfig?.fault_code_entity ||
                    safetyConfig?.fault_active_entity
                )}
              title="Click to view details"
            >
              <div class="alert-icon-col">
                <ha-icon icon="mdi:alert-octagon"></ha-icon>
              </div>
              <div class="alert-content-col">
                <div class="alert-headline">
                  <span class="alert-badge">${localize('common.fault', hass, language)} F${fCode}</span>
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
      ${isWarning && !isFault && !isOffline
        ? html`
            <div
              class="alert-box alert-warn"
              @click=${() =>
                onAlertClick(
                  safetyConfig?.warning_details_entity ||
                    safetyConfig?.warning_code_entity ||
                    safetyConfig?.warnings_active_entity
                )}
              title="Click to view details"
            >
              <div class="alert-icon-col">
                <ha-icon icon="mdi:alert"></ha-icon>
              </div>
              <div class="alert-content-col">
                <div class="alert-headline">
                  <span class="alert-badge">${localize('common.warn', hass, language)} W${wCode}</span>
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
