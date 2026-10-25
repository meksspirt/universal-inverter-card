import { html, TemplateResult } from 'lit';
import { ControlsConfig, CustomControlItem, HomeAssistant } from '../types';
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
  onPreviewNumber?: (value: number | null, entityId?: string) => void;
  onSetNumber: (entityId: string, value: number) => void;
  onToggleEqualization: (entityId: string, currentState: boolean) => void;
  onToggleSwitch?: (entityId: string, currentState: boolean) => void;
  onPressButton?: (entityId: string) => void;
  onEntityMoreInfo?: (entityId?: string) => void;
}

interface ParsedOption {
  raw: string;
  code: string;
  subtitle: string;
}

/**
 * Parses inverter select option strings such as:
 * - "Solar First (CSO)" -> { code: "CSO", subtitle: "Solar First" }
 * - "Utility First (UTI)" -> { code: "UTI", subtitle: "Utility First" }
 * - "01_USB (Utility First)" -> { code: "USB", subtitle: "Utility First" }
 * - "SBU" -> { code: "SBU", subtitle: "" }
 */
function parseOptionLabel(opt: string): ParsedOption {
  const trimmed = opt.trim();

  // Pattern 1: "Description (CODE)" where CODE is 2-6 uppercase/alphanumeric chars
  const parenMatch = trimmed.match(/^(.+?)\s*\(([A-Za-z0-9_-]{2,8})\)$/);
  if (parenMatch) {
    const desc = parenMatch[1].trim().replace(/\band\b/gi, '&');
    const code = parenMatch[2].trim();
    return { raw: opt, code, subtitle: desc };
  }

  // Pattern 2: "CODE (Description)" where CODE is short
  const reverseParenMatch = trimmed.match(/^([A-Za-z0-9_-]{2,6})\s*\((.+?)\)$/);
  if (reverseParenMatch) {
    return {
      raw: opt,
      code: reverseParenMatch[1].trim(),
      subtitle: reverseParenMatch[2].trim().replace(/\band\b/gi, '&'),
    };
  }

  // Pattern 3: "01_USB - Utility First" or "USB: Utility First"
  const prefixMatch = trimmed.match(/^(?:\d+[_:\s-]+)?([A-Z]{2,5})\s*[-:]\s*(.+)$/);
  if (prefixMatch) {
    return {
      raw: opt,
      code: prefixMatch[1].trim(),
      subtitle: prefixMatch[2].trim(),
    };
  }

  return { raw: opt, code: trimmed, subtitle: '' };
}

function getEntityDomain(entityId: string): string {
  return entityId.split('.')[0] || '';
}

function getFriendlyLabel(
  hass: HomeAssistant | undefined,
  entityId: string,
  fallback: string
): string {
  if (fallback) return fallback;
  const friendly = hass?.states[entityId]?.attributes?.friendly_name;
  return friendly || entityId;
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
    maxChargeCurrentMin = 0,
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
    onToggleSwitch,
    onPressButton,
    onEntityMoreInfo,
  } = props;

  // Smart ceiling for Max AC Charge Current: many Modbus integrations report raw 200A register limit
  const effectiveMaxCurrent =
    controlsConfig.max_charge_current_limit ||
    (maxChargeCurrentMax >= 180 && (maxChargeCurrent ?? 0) <= 100 ? 100 : maxChargeCurrentMax);

  const displayedCurrent = maxChargeCurrentPreview ?? maxChargeCurrent ?? 15;
  const clampedCurrent = Math.max(
    maxChargeCurrentMin,
    Math.min(effectiveMaxCurrent, displayedCurrent)
  );
  const sliderProgressPct =
    effectiveMaxCurrent > maxChargeCurrentMin
      ? Math.max(
          0,
          Math.min(
            100,
            Math.round(
              ((clampedCurrent - maxChargeCurrentMin) /
                (effectiveMaxCurrent - maxChargeCurrentMin)) *
                100
            )
          )
        )
      : 0;

  // Quick summary in collapsed header
  const summaryParts: string[] = [];
  if (outputPriority && outputPriority !== 'N/A' && outputPriority !== 'unavailable') {
    const parsedOut = parseOptionLabel(outputPriority);
    summaryParts.push(parsedOut.code);
  }
  if (chargeSource && chargeSource !== 'N/A' && chargeSource !== 'unavailable') {
    const parsedChg = parseOptionLabel(chargeSource);
    summaryParts.push(parsedChg.code);
  }
  if (maxChargeCurrent !== null && maxChargeCurrent !== undefined && !isNaN(maxChargeCurrent)) {
    summaryParts.push(`${maxChargeCurrent}A`);
  }
  const summaryText = summaryParts.join(' • ');

  // Helper to render any Select / Priority control box
  const renderSelectBox = (
    entityId: string,
    label: string,
    icon: string,
    currentVal: string | undefined,
    options: string[],
    fallbackOptions: string[] = []
  ) => {
    const rawOpts = options.length > 0 ? options : fallbackOptions;
    const parsedOpts = rawOpts.map(parseOptionLabel);
    const hasSubtitles = parsedOpts.some((p) => p.subtitle.length > 0);

    return html`
      <div class="control-box select-control-box">
        <div class="control-box-header" @click=${() => onEntityMoreInfo?.(entityId)}>
          <div class="control-label-wrap">
            <ha-icon icon="${icon}"></ha-icon>
            <label>${label}</label>
          </div>
          ${currentVal && currentVal !== 'N/A'
            ? html`<span class="control-current-tag">${parseOptionLabel(currentVal).code}</span>`
            : ''}
        </div>
        <div
          class="pill-selector ${hasSubtitles ? 'with-subtitles' : ''}"
          style="--pill-count: ${Math.min(parsedOpts.length, 4)};"
          role="radiogroup"
          aria-label="${label}"
        >
          ${parsedOpts.map((item) => {
            const isActive = currentVal === item.raw;
            return html`
              <button
                type="button"
                role="radio"
                aria-checked="${isActive ? 'true' : 'false'}"
                class="pill-btn ${isActive ? 'active' : ''}"
                title="${item.raw}"
                @click=${() => onSelectOption(entityId, item.raw)}
              >
                <span class="pill-code">${item.code}</span>
                ${item.subtitle
                  ? html`<span class="pill-sub">${item.subtitle}</span>`
                  : ''}
              </button>
            `;
          })}
        </div>
      </div>
    `;
  };

  // Helper to render a Slider control box (for Charge Currents, Power Limits, etc.)
  const renderSliderBox = (
    entityId: string,
    label: string,
    icon: string,
    currentValue: number | null | undefined,
    minVal: number,
    maxVal: number,
    stepVal: number,
    unit: string,
    isPrimaryChargeSlider = false
  ) => {
    const val = isPrimaryChargeSlider
      ? clampedCurrent
      : currentValue ?? minVal;
    const pct =
      maxVal > minVal
        ? Math.max(0, Math.min(100, Math.round(((val - minVal) / (maxVal - minVal)) * 100)))
        : 0;

    // Generate 4–5 clean preset chips across [minVal..maxVal]
    const presets: number[] = [];
    if (unit === 'A' && maxVal >= 30) {
      const candidates = [2, 10, 15, 20, 30, 40, 50, 60, 80, 100, 120];
      for (const c of candidates) {
        if (c >= minVal && c <= maxVal && c % stepVal === 0) {
          presets.push(c);
        }
      }
    }
    const displayPresets =
      presets.length > 6
        ? [presets[0], presets[1], presets[2], presets[4], presets[presets.length - 1]]
        : presets;

    const sliderId = `slider-${entityId.replace(/[^a-zA-Z0-9_-]/g, '-')}`;

    return html`
      <div class="control-box slider-box">
        <div class="control-box-header">
          <div class="control-label-wrap" @click=${() => onEntityMoreInfo?.(entityId)}>
            <ha-icon icon="${icon}"></ha-icon>
            <label for="${sliderId}">${label}</label>
          </div>
          <span class="control-live-val" @click=${() => onEntityMoreInfo?.(entityId)}>
            ${currentValue !== null && currentValue !== undefined ? `${val} ${unit}` : '—'}
          </span>
        </div>

        <div class="slider-input-container">
          <button
            type="button"
            class="stepper-btn slider-step-btn"
            title="-${stepVal}${unit}"
            ?disabled=${currentValue === null || val <= minVal}
            @click=${() => {
              const next = Math.max(minVal, Number((val - stepVal).toFixed(2)));
              onSetNumber(entityId, next);
            }}
          >
            −
          </button>

          <div class="slider-track-wrap">
            <input
              id="${sliderId}"
              type="range"
              class="control-range"
              min="${minVal}"
              max="${maxVal}"
              step="${stepVal}"
              .value=${String(val)}
              aria-valuetext="${val} ${unit}"
              style="--slider-progress: ${isPrimaryChargeSlider ? sliderProgressPct : pct}%; --attr-min: ${minVal}; --attr-max: ${maxVal}; --control-value: ${val};"
              @input=${(e: Event) => {
                const inputEl = e.target as HTMLInputElement;
                const v = parseFloat(inputEl.value);
                const newPct =
                  maxVal > minVal
                    ? Math.max(0, Math.min(100, Math.round(((v - minVal) / (maxVal - minVal)) * 100)))
                    : 0;
                inputEl.style.setProperty('--slider-progress', `${newPct}%`);
                inputEl.style.setProperty('--control-value', String(v));
                if (isPrimaryChargeSlider) {
                  onPreviewNumber?.(v, entityId);
                }
              }}
              @change=${(e: Event) => {
                const v = parseFloat((e.target as HTMLInputElement).value);
                if (isPrimaryChargeSlider) {
                  onPreviewNumber?.(null, entityId);
                }
                onSetNumber(entityId, v);
              }}
            />
            <div class="slider-Sub-bounds">
              <span class="slider-boundary">${minVal}${unit}</span>
              <span class="slider-boundary">${maxVal}${unit}</span>
            </div>
          </div>

          <button
            type="button"
            class="stepper-btn slider-step-btn"
            title="+${stepVal}${unit}"
            ?disabled=${currentValue === null || val >= maxVal}
            @click=${() => {
              const next = Math.min(maxVal, Number((val + stepVal).toFixed(2)));
              onSetNumber(entityId, next);
            }}
          >
            +
          </button>
        </div>

        ${displayPresets.length > 0
          ? html`
              <div class="slider-presets-row">
                ${displayPresets.map(
                  (presetVal) => html`
                    <button
                      type="button"
                      class="preset-chip ${Math.abs(val - presetVal) < 0.01 ? 'active' : ''}"
                      @click=${() => onSetNumber(entityId, presetVal)}
                    >
                      ${presetVal}${unit}
                    </button>
                  `
                )}
              </div>
            `
          : ''}
      </div>
    `;
  };

  // Helper to render a Precision Stepper box (reads min/max/step/unit directly from HA entity)
  const renderStepperBox = (
    entityId: string,
    defaultLabel: string,
    defaultIcon: string,
    overrideValue?: number | null,
    customCfg?: CustomControlItem
  ) => {
    const stateObj = hass?.states[entityId];
    const attrs = stateObj?.attributes || {};
    const rawState = stateObj?.state;
    const parsedState =
      overrideValue !== undefined
        ? overrideValue
        : rawState !== undefined && rawState !== 'unavailable' && rawState !== 'unknown'
        ? parseFloat(rawState)
        : null;
    const liveVal = parsedState !== null && !isNaN(parsedState) ? parsedState : null;

    const unit = customCfg?.unit || attrs.unit_of_measurement || 'V';
    const step =
      customCfg?.step ||
      (typeof attrs.step === 'number' && attrs.step > 0 ? attrs.step : unit === 'V' ? 0.1 : 1);
    const min =
      customCfg?.min !== undefined
        ? customCfg.min
        : typeof attrs.min === 'number'
        ? attrs.min
        : undefined;
    const max =
      customCfg?.max !== undefined
        ? customCfg.max
        : typeof attrs.max === 'number'
        ? attrs.max
        : undefined;
    const decimals = step < 0.1 ? 2 : step < 1 ? 1 : 0;
    const icon = customCfg?.icon || attrs.icon || defaultIcon;
    const label = customCfg?.name || defaultLabel || attrs.friendly_name || entityId;

    return html`
      <div class="control-box mini-voltage">
        <div class="control-box-header" @click=${() => onEntityMoreInfo?.(entityId)}>
          <div class="control-label-wrap">
            <ha-icon icon="${icon}"></ha-icon>
            <label title="${label}">${label}</label>
          </div>
        </div>
        <div class="voltage-stepper">
          <button
            type="button"
            class="stepper-btn"
            ?disabled=${liveVal === null || (min !== undefined && liveVal <= min)}
            @click=${() => {
              if (liveVal === null) return;
              let next = Number((liveVal - step).toFixed(decimals));
              if (min !== undefined) next = Math.max(min, next);
              onSetNumber(entityId, next);
            }}
          >
            −
          </button>
          <span class="stepper-val" @click=${() => onEntityMoreInfo?.(entityId)}>
            ${liveVal !== null ? `${liveVal.toFixed(decimals)} ${unit}` : '—'}
          </span>
          <button
            type="button"
            class="stepper-btn"
            ?disabled=${liveVal === null || (max !== undefined && liveVal >= max)}
            @click=${() => {
              if (liveVal === null) return;
              let next = Number((liveVal + step).toFixed(decimals));
              if (max !== undefined) next = Math.min(max, next);
              onSetNumber(entityId, next);
            }}
          >
            +
          </button>
        </div>
      </div>
    `;
  };

  // Helper to render a normal Switch row (e.g. Buzzer, Grid Charge, ECO Mode)
  const renderSwitchRow = (
    entityId: string,
    defaultLabel: string,
    defaultIcon: string,
    customCfg?: CustomControlItem
  ) => {
    const stateObj = hass?.states[entityId];
    const isOn = stateObj?.state === 'on';
    const icon = customCfg?.icon || stateObj?.attributes?.icon || defaultIcon;
    const label = customCfg?.name || defaultLabel || stateObj?.attributes?.friendly_name || entityId;

    if (customCfg?.dangerous) {
      return html`
        <div class="danger-switch-row ${isOn ? 'danger-active' : ''}">
          <div class="danger-info" @click=${() => onEntityMoreInfo?.(entityId)}>
            <div class="danger-title">
              <ha-icon icon="${icon || 'mdi:alert-octagon'}"></ha-icon>
              <span>${label}</span>
            </div>
            ${customCfg.warning_text
              ? html`<span class="danger-desc">${customCfg.warning_text}</span>`
              : ''}
          </div>
          <button
            type="button"
            class="toggle-switch-btn ${isOn ? 'switch-on' : 'switch-off'}"
            @click=${() => (onToggleSwitch ? onToggleSwitch(entityId, isOn) : onToggleEqualization(entityId, isOn))}
          >
            ${isOn ? 'ON' : 'OFF'}
          </button>
        </div>
      `;
    }

    return html`
      <div class="normal-switch-row ${isOn ? 'switch-row-active' : ''}">
        <div class="switch-row-left" @click=${() => onEntityMoreInfo?.(entityId)}>
          <ha-icon icon="${icon}"></ha-icon>
          <span class="switch-row-title">${label}</span>
        </div>
        <button
          type="button"
          class="toggle-switch-btn normal-toggle ${isOn ? 'normal-on' : 'switch-off'}"
          @click=${() => (onToggleSwitch ? onToggleSwitch(entityId, isOn) : onToggleEqualization(entityId, isOn))}
        >
          ${isOn ? 'ON' : 'OFF'}
        </button>
      </div>
    `;
  };

  // Collect steppers so they can share a responsive multi-column grid
  const stepperTemplates: TemplateResult[] = [];
  if (controlsConfig.bulk_voltage_entity) {
    stepperTemplates.push(
      renderStepperBox(
        controlsConfig.bulk_voltage_entity,
        localize('controls.bulk_voltage', hass, language),
        'mdi:arrow-up-bold-box-outline',
        bulkVoltage
      )
    );
  }
  if (controlsConfig.float_voltage_entity) {
    stepperTemplates.push(
      renderStepperBox(
        controlsConfig.float_voltage_entity,
        localize('controls.float_voltage', hass, language),
        'mdi:arrow-down-bold-box-outline',
        floatVoltage
      )
    );
  }
  if (controlsConfig.back_to_grid_voltage_entity) {
    stepperTemplates.push(
      renderStepperBox(
        controlsConfig.back_to_grid_voltage_entity,
        localize('controls.back_to_grid_voltage', hass, language),
        'mdi:transmission-tower-import'
      )
    );
  }
  if (controlsConfig.cutoff_voltage_entity) {
    stepperTemplates.push(
      renderStepperBox(
        controlsConfig.cutoff_voltage_entity,
        localize('controls.cutoff_voltage', hass, language),
        'mdi:battery-alert-variant-outline'
      )
    );
  }

  // Process extra_entities if configured by the user for custom inverter controls
  const extraSelects: TemplateResult[] = [];
  const extraSliders: TemplateResult[] = [];
  const extraSwitches: TemplateResult[] = [];

  if (Array.isArray(controlsConfig.extra_entities)) {
    for (const rawItem of controlsConfig.extra_entities) {
      const item: CustomControlItem =
        typeof rawItem === 'string' ? { entity: rawItem } : rawItem;
      if (!item.entity) continue;

      const domain = getEntityDomain(item.entity);
      const stateObj = hass?.states[item.entity];
      const attrs = stateObj?.attributes || {};
      const label = getFriendlyLabel(hass, item.entity, item.name || '');
      const uiType = item.ui_type || 'auto';

      if (uiType === 'select' || (uiType === 'auto' && (domain === 'select' || domain === 'input_select'))) {
        extraSelects.push(
          renderSelectBox(
            item.entity,
            label,
            item.icon || attrs.icon || 'mdi:tune-variant',
            stateObj?.state,
            attrs.options || []
          )
        );
      } else if (uiType === 'slider') {
        const numVal = stateObj ? parseFloat(stateObj.state) : null;
        extraSliders.push(
          renderSliderBox(
            item.entity,
            label,
            item.icon || attrs.icon || 'mdi:ray-vertex',
            numVal !== null && !isNaN(numVal) ? numVal : null,
            item.min ?? attrs.min ?? 0,
            item.max ?? attrs.max ?? 100,
            item.step ?? attrs.step ?? 1,
            item.unit || attrs.unit_of_measurement || ''
          )
        );
      } else if (
        uiType === 'stepper' ||
        (uiType === 'auto' && (domain === 'number' || domain === 'input_number'))
      ) {
        stepperTemplates.push(
          renderStepperBox(
            item.entity,
            label,
            item.icon || attrs.icon || 'mdi:numeric',
            undefined,
            item
          )
        );
      } else if (
        uiType === 'switch' ||
        (uiType === 'auto' && (domain === 'switch' || domain === 'input_boolean'))
      ) {
        extraSwitches.push(
          renderSwitchRow(
            item.entity,
            label,
            item.icon || attrs.icon || 'mdi:toggle-switch-outline',
            item
          )
        );
      } else if (
        uiType === 'button' ||
        (uiType === 'auto' && (domain === 'button' || domain === 'input_button'))
      ) {
        extraSwitches.push(html`
          <div class="normal-switch-row">
            <div class="switch-row-left" @click=${() => onEntityMoreInfo?.(item.entity)}>
              <ha-icon icon="${item.icon || attrs.icon || 'mdi:gesture-tap-button'}"></ha-icon>
              <span class="switch-row-title">${label}</span>
            </div>
            <button
              type="button"
              class="toggle-switch-btn normal-toggle"
              @click=${() => onPressButton?.(item.entity)}
            >
              ${localize('controls.press', hass, language)}
            </button>
          </div>
        `);
      }
    }
  }

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
              <!-- 1. Priority Selectors Stack (Adaptive full-width or 2-col on wide screens, zero clipping) -->
              ${controlsConfig.charge_source_entity ||
              controlsConfig.output_priority_entity ||
              extraSelects.length > 0
                ? html`
                    <div class="controls-select-grid">
                      ${controlsConfig.charge_source_entity
                        ? renderSelectBox(
                            controlsConfig.charge_source_entity,
                            localize('controls.charge_source', hass, language),
                            'mdi:solar-power',
                            chargeSource,
                            chargeSourceOptions,
                            ['Solar First (CSO)', 'Solar and Utility (SNU)', 'Only Solar (OSO)']
                          )
                        : ''}
                      ${controlsConfig.output_priority_entity
                        ? renderSelectBox(
                            controlsConfig.output_priority_entity,
                            localize('controls.output_priority', hass, language),
                            'mdi:power-plug-outline',
                            outputPriority,
                            outputPriorityOptions,
                            ['Utility First (UTI)', 'Solar First (USB)', 'SBU Priority (SBU)']
                          )
                        : ''}
                      ${extraSelects}
                    </div>
                  `
                : ''}

              <!-- 2. Current / Power Sliders (Max AC Charge Current, Max Total Charge Current, etc.) -->
              ${controlsConfig.max_charge_current_entity
                ? renderSliderBox(
                    controlsConfig.max_charge_current_entity,
                    localize('controls.max_charge_current', hass, language),
                    'mdi:current-ac',
                    maxChargeCurrent,
                    maxChargeCurrentMin,
                    effectiveMaxCurrent,
                    maxChargeCurrentStep,
                    'A',
                    true
                  )
                : ''}

              ${controlsConfig.max_total_charge_current_entity
                ? (() => {
                    const totId = controlsConfig.max_total_charge_current_entity!;
                    const totState = hass?.states[totId];
                    const totAttrs = totState?.attributes || {};
                    const totVal = totState ? parseFloat(totState.state) : null;
                    const totMin = typeof totAttrs.min === 'number' ? totAttrs.min : 10;
                    const totMax =
                      typeof totAttrs.max === 'number'
                        ? totAttrs.max >= 180 && (totVal ?? 0) <= 120
                          ? 120
                          : totAttrs.max
                        : 120;
                    const totStep = typeof totAttrs.step === 'number' ? totAttrs.step : 10;
                    return renderSliderBox(
                      totId,
                      localize('controls.max_total_charge_current', hass, language),
                      'mdi:lightning-bolt',
                      totVal !== null && !isNaN(totVal) ? totVal : null,
                      totMin,
                      totMax,
                      totStep,
                      totAttrs.unit_of_measurement || 'A',
                      false
                    );
                  })()
                : ''}

              ${extraSliders}

              <!-- 3. Precision Steppers Grid (Bulk, Float, Back-to-Grid, Cut-off, or SoC Thresholds) -->
              ${stepperTemplates.length > 0
                ? html`
                    <div class="controls-stepper-grid">
                      ${stepperTemplates}
                    </div>
                  `
                : ''}

              <!-- 4. Standard Switches (Buzzer / Sound, Grid Charge, etc.) -->
              ${controlsConfig.buzzer_entity
                ? renderSwitchRow(
                    controlsConfig.buzzer_entity,
                    localize('controls.buzzer', hass, language),
                    'mdi:volume-high'
                  )
                : ''}

              ${extraSwitches}

              <!-- 5. DANGER ZONE: Equalization Switch (Inline 2-Step Confirmation) -->
              ${controlsConfig.equalization_entity
                ? html`
                    <div
                      class="danger-switch-row ${isEqualization || equalizationConfirmPending
                        ? 'danger-active'
                        : ''}"
                    >
                      <div
                        class="danger-info"
                        @click=${() => onEntityMoreInfo?.(controlsConfig.equalization_entity)}
                      >
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
                        class="toggle-switch-btn ${isEqualization || equalizationConfirmPending
                          ? 'switch-on'
                          : 'switch-off'}"
                        @click=${() =>
                          onToggleEqualization(
                            controlsConfig.equalization_entity!,
                            isEqualization
                          )}
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
