import { html, TemplateResult } from 'lit';
import { ControlsConfig, HomeAssistant } from '../types';
import { localize } from '../localize/localize';

export interface ControlsPanelProps {
  controlsConfig: ControlsConfig;
  hass?: HomeAssistant;
  language?: string;
  expanded: boolean;
  chargeSource?: string;
  chargeSourceOptions: string[];
  outputPriority?: string;
  outputPriorityOptions: string[];
  maxChargeCurrent?: number | null;
  maxChargeCurrentPreview?: number | null;
  maxChargeCurrentMin?: number;
  maxChargeCurrentMax?: number;
  maxChargeCurrentStep?: number;
  bulkVoltage?: number | null;
  floatVoltage?: number | null;
  isEqualization: boolean;
  equalizationConfirmPending?: boolean;
  onToggleExpand: () => void;
  onSelectOption: (entityId: string, option: string) => void;
  onPreviewNumber?: (value: number | null) => void;
  onSetNumber: (entityId: string, value: number) => void;
  onToggleEqualization: (entityId: string, currentState: boolean) => void;
}

export function renderControlsPanel(props: ControlsPanelProps): TemplateResult {
  const {
    controlsConfig,
    hass,
    language,
    expanded,
    chargeSource,
    chargeSourceOptions,
    outputPriority,
    outputPriorityOptions,
    maxChargeCurrent,
    maxChargeCurrentPreview,
    maxChargeCurrentMin = 2,
    maxChargeCurrentMax = 100,
    maxChargeCurrentStep = 1,
    bulkVoltage,
    floatVoltage,
    isEqualization,
    equalizationConfirmPending = false,
    onToggleExpand,
    onSelectOption,
    onPreviewNumber,
    onSetNumber,
    onToggleEqualization,
  } = props;

  const displayedCurrent = maxChargeCurrentPreview ?? maxChargeCurrent ?? 15;
  const summaryParts: string[] = [];
  if (outputPriority && outputPriority !== 'N/A' && outputPriority !== 'unavailable') {
    summaryParts.push(outputPriority);
  }
  if (maxChargeCurrent !== null && maxChargeCurrent !== undefined && !isNaN(maxChargeCurrent)) {
    summaryParts.push(`${maxChargeCurrent}A`);
  }
  const summaryText = summaryParts.join(' • ');

  return html`
    <div class="controls-card-section ${expanded ? 'expanded' : ''}">
      <!-- Accordion Header -->
      <div class="controls-header" @click=${onToggleExpand}>
        <div class="controls-header-title">
          <ha-icon icon="mdi:tune-vertical"></ha-icon>
          <span>${localize('controls.title', hass, language)}</span>
        </div>
        <div class="controls-header-right">
          ${summaryText
            ? html`<span class="controls-quick-summary">${summaryText}</span>`
            : ''}
          <ha-icon
            class="chevron-icon ${expanded ? 'open' : ''}"
            icon="mdi:chevron-down"
          ></ha-icon>
        </div>
      </div>

      <!-- Expandable Controls Content -->
      ${expanded
        ? html`
            <div class="controls-body">
              <!-- Grid Row: Priority Selectors -->
              <div class="controls-grid-2">
                <!-- Select 1: Charge Source Priority -->
                ${controlsConfig.charge_source_entity
                  ? html`
                      <div class="control-box">
                        <div class="control-box-header">
                          <ha-icon icon="mdi:battery-charging-wireless"></ha-icon>
                          <label>${localize('controls.charge_source', hass, language)}</label>
                        </div>
                        <div class="pill-selector">
                          ${(chargeSourceOptions.length > 0
                            ? chargeSourceOptions
                            : ['Solar First', 'Solar and Utility', 'Only Solar']
                          ).map(
                            (opt) => html`
                              <button
                                type="button"
                                class="pill-btn ${chargeSource === opt ? 'active' : ''}"
                                @click=${() =>
                                  onSelectOption(controlsConfig.charge_source_entity!, opt)}
                              >
                                ${opt}
                              </button>
                            `
                          )}
                        </div>
                      </div>
                    `
                  : ''}

                <!-- Select 2: Output Source Priority -->
                ${controlsConfig.output_priority_entity
                  ? html`
                      <div class="control-box">
                        <div class="control-box-header">
                          <ha-icon icon="mdi:power-plug-outline"></ha-icon>
                          <label>${localize('controls.output_priority', hass, language)}</label>
                        </div>
                        <div class="pill-selector">
                          ${(outputPriorityOptions.length > 0
                            ? outputPriorityOptions
                            : ['SUB', 'SBU', 'USB']
                          ).map(
                            (opt) => html`
                              <button
                                type="button"
                                class="pill-btn ${outputPriority === opt ? 'active' : ''}"
                                @click=${() =>
                                  onSelectOption(controlsConfig.output_priority_entity!, opt)}
                              >
                                ${opt}
                              </button>
                            `
                          )}
                        </div>
                      </div>
                    `
                  : ''}
              </div>

              <!-- Slider: Max AC Charging Current (Dynamic min/max/step) -->
              ${controlsConfig.max_charge_current_entity
                ? html`
                    <div class="control-box slider-box">
                      <div class="control-box-header">
                        <div class="control-label-wrap">
                          <ha-icon icon="mdi:current-ac"></ha-icon>
                          <label>${localize('controls.max_charge_current', hass, language)}</label>
                        </div>
                        <span class="control-live-val">${displayedCurrent} A</span>
                      </div>
                      <div class="slider-input-container">
                        <span class="slider-boundary">${maxChargeCurrentMin}A</span>
                        <input
                          type="range"
                          class="control-range"
                          min="${maxChargeCurrentMin}"
                          max="${maxChargeCurrentMax}"
                          step="${maxChargeCurrentStep}"
                          .value=${String(displayedCurrent)}
                          @input=${(e: Event) => {
                            const val = parseFloat((e.target as HTMLInputElement).value);
                            onPreviewNumber?.(val);
                          }}
                          @change=${(e: Event) => {
                            const val = parseFloat((e.target as HTMLInputElement).value);
                            onPreviewNumber?.(null);
                            onSetNumber(controlsConfig.max_charge_current_entity!, val);
                          }}
                        />
                        <span class="slider-boundary">${maxChargeCurrentMax}A</span>
                      </div>
                    </div>
                  `
                : ''}

              <!-- Dual Voltage Inputs: Bulk & Float -->
              <div class="controls-grid-2">
                <!-- Bulk Voltage -->
                ${controlsConfig.bulk_voltage_entity
                  ? html`
                      <div class="control-box mini-voltage">
                        <div class="control-box-header">
                          <ha-icon icon="mdi:arrow-up-bold-box-outline"></ha-icon>
                          <label>${localize('controls.bulk_voltage', hass, language)}</label>
                        </div>
                        <div class="voltage-stepper">
                          <button
                            type="button"
                            class="stepper-btn"
                            @click=${() => {
                              const next = Number(((bulkVoltage ?? 28.2) - 0.1).toFixed(1));
                              onSetNumber(controlsConfig.bulk_voltage_entity!, next);
                            }}
                          >
                            -
                          </button>
                          <span class="stepper-val">${bulkVoltage !== null && bulkVoltage !== undefined ? bulkVoltage.toFixed(1) : '28.2'} V</span>
                          <button
                            type="button"
                            class="stepper-btn"
                            @click=${() => {
                              const next = Number(((bulkVoltage ?? 28.2) + 0.1).toFixed(1));
                              onSetNumber(controlsConfig.bulk_voltage_entity!, next);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    `
                  : ''}

                <!-- Float Voltage -->
                ${controlsConfig.float_voltage_entity
                  ? html`
                      <div class="control-box mini-voltage">
                        <div class="control-box-header">
                          <ha-icon icon="mdi:arrow-down-bold-box-outline"></ha-icon>
                          <label>${localize('controls.float_voltage', hass, language)}</label>
                        </div>
                        <div class="voltage-stepper">
                          <button
                            type="button"
                            class="stepper-btn"
                            @click=${() => {
                              const next = Number(((floatVoltage ?? 27.0) - 0.1).toFixed(1));
                              onSetNumber(controlsConfig.float_voltage_entity!, next);
                            }}
                          >
                            -
                          </button>
                          <span class="stepper-val">${floatVoltage !== null && floatVoltage !== undefined ? floatVoltage.toFixed(1) : '27.0'} V</span>
                          <button
                            type="button"
                            class="stepper-btn"
                            @click=${() => {
                              const next = Number(((floatVoltage ?? 27.0) + 0.1).toFixed(1));
                              onSetNumber(controlsConfig.float_voltage_entity!, next);
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    `
                  : ''}
              </div>

              <!-- DANGER ZONE: Equalization Switch (Inline 2-Step Confirmation) -->
              ${controlsConfig.equalization_entity
                ? html`
                    <div class="danger-switch-row ${isEqualization || equalizationConfirmPending ? 'danger-active' : ''}">
                      <div class="danger-info">
                        <div class="danger-title">
                          <ha-icon icon="mdi:alert-octagon"></ha-icon>
                          <span>${localize('controls.equalization', hass, language)}</span>
                        </div>
                        <span class="danger-desc">
                          ${localize('controls.equalization_warning', hass, language)}
                        </span>
                      </div>

                      <button
                        type="button"
                        class="toggle-switch-btn ${isEqualization || equalizationConfirmPending ? 'switch-on' : 'switch-off'}"
                        @click=${() =>
                          onToggleEqualization(controlsConfig.equalization_entity!, isEqualization)}
                      >
                        ${isEqualization
                          ? 'ON'
                          : equalizationConfirmPending
                          ? localize('controls.confirm_on', hass, language)
                          : 'OFF'}
                      </button>
                    </div>
                  `
                : ''}
            </div>
          `
        : ''}
    </div>
  `;
}
