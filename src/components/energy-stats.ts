import { html, TemplateResult } from 'lit';
import { DailyEnergyConfig, HomeAssistant } from '../types';
import { formatEnergy } from '../utils/format';
import { localize } from '../localize/localize';

export interface EnergyStatsProps {
  hass?: HomeAssistant;
  language?: string;
  dailyConfig: DailyEnergyConfig;
  loadEnergy: number | null;
  gridImportEnergy: number | null;
  batteryChargeEnergy: number | null;
  batteryDischargeEnergy: number | null;
  selfConsumptionDailyEnergy?: number | null;
  selfConsumptionDailyEntity?: string;
  selfConsumptionMonthlyEnergy?: number | null;
  selfConsumptionMonthlyEntity?: string;
  onEnergyClick: (entityId?: string) => void;
}

export function renderEnergyStats(props: EnergyStatsProps): TemplateResult {
  const {
    hass,
    language,
    dailyConfig,
    loadEnergy,
    gridImportEnergy,
    batteryChargeEnergy,
    batteryDischargeEnergy,
    selfConsumptionDailyEnergy,
    selfConsumptionDailyEntity,
    selfConsumptionMonthlyEnergy,
    selfConsumptionMonthlyEntity,
    onEnergyClick,
  } = props;

  const load = loadEnergy !== null && !isNaN(loadEnergy) ? Math.max(0, loadEnergy) : 0;
  const grid = gridImportEnergy !== null && !isNaN(gridImportEnergy) ? Math.max(0, gridImportEnergy) : 0;
  const batChg = batteryChargeEnergy !== null && !isNaN(batteryChargeEnergy) ? Math.max(0, batteryChargeEnergy) : 0;
  const batDis = batteryDischargeEnergy !== null && !isNaN(batteryDischargeEnergy) ? Math.max(0, batteryDischargeEnergy) : 0;
  const selfDay =
    selfConsumptionDailyEnergy !== null &&
    selfConsumptionDailyEnergy !== undefined &&
    !isNaN(selfConsumptionDailyEnergy)
      ? Math.max(0, selfConsumptionDailyEnergy)
      : null;
  const selfMonth =
    selfConsumptionMonthlyEnergy !== null &&
    selfConsumptionMonthlyEnergy !== undefined &&
    !isNaN(selfConsumptionMonthlyEnergy)
      ? Math.max(0, selfConsumptionMonthlyEnergy)
      : null;

  // Maximum value for scaling bar widths
  const maxVal = Math.max(load, grid, batChg, batDis, selfDay ?? 0, 0.1);

  const items: Array<{
    id?: string;
    label: string;
    value: number;
    color: string;
    icon: string;
    pct: number;
    extraTag?: string;
  }> = [
    {
      id: dailyConfig.load_energy_entity,
      label: localize('energy.load', hass, language),
      value: load,
      color: '#e2e8f0',
      icon: 'mdi:home-lightning-bolt',
      pct: load > 0 ? 100 : 0,
    },
    {
      id: dailyConfig.grid_import_entity,
      label: localize('energy.grid_import', hass, language),
      value: grid,
      color: '#4285f4',
      icon: 'mdi:transmission-tower',
      pct: load > 0 ? Math.round((grid / load) * 100) : 0,
    },
    {
      id: dailyConfig.battery_charge_entity,
      label: localize('energy.bat_charge', hass, language),
      value: batChg,
      color: '#10b981',
      icon: 'mdi:battery-plus-variant',
      pct: load > 0 ? Math.round((batChg / load) * 100) : 0,
    },
    {
      id: dailyConfig.battery_discharge_entity,
      label: localize('energy.bat_discharge', hass, language),
      value: batDis,
      color: '#f59e0b',
      icon: 'mdi:battery-minus-variant',
      pct: load > 0 ? Math.round((batDis / load) * 100) : 0,
    },
  ];

  if (selfDay !== null) {
    items.push({
      id: selfConsumptionDailyEntity || dailyConfig.self_consumption_daily_entity,
      label: localize('energy.self_consumption', hass, language),
      value: selfDay,
      color: '#a855f7',
      icon: 'mdi:flash-outline',
      pct: 0,
      extraTag:
        selfMonth !== null
          ? `${localize('energy.month_short', hass, language)}: ${selfMonth.toFixed(1)} kWh`
          : undefined,
    });
  }

  return html`
    <div class="energy-card-section">
      <!-- Section Header -->
      <div class="energy-header">
        <div class="energy-header-title">
          <ha-icon icon="mdi:chart-box-outline"></ha-icon>
          <span>${localize('energy.title', hass, language)}</span>
        </div>
        <div class="energy-header-pills">
          ${selfMonth !== null
            ? html`
                <span
                  class="energy-total-pill"
                  style="color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.3); cursor: pointer;"
                  @click=${() => onEnergyClick(selfConsumptionMonthlyEntity || dailyConfig.self_consumption_monthly_entity)}
                  title="${localize('energy.self_consumption', hass, language)} (${localize('energy.month_short', hass, language)})"
                >
                  ${localize('flow.self', hass, language)} ${localize('energy.month_short', hass, language)}: ${selfMonth.toFixed(2)} kWh
                </span>
              `
            : ''}
          <span class="energy-total-pill">
            ${localize('energy.total', hass, language)}: ${formatEnergy(load)}
          </span>
        </div>
      </div>

      <!-- Horizontal Energy Bars List -->
      <div class="energy-bars-container">
        ${items.map((item) => {
          const barWidth = Math.max(3, Math.min(100, Math.round((item.value / maxVal) * 100)));

          return html`
            <div
              class="energy-row"
              @click=${() => onEnergyClick(item.id)}
              title="${item.label}: ${item.value.toFixed(2)} kWh ${item.extraTag ? `(${item.extraTag})` : ''}"
            >
              <!-- Icon and Label -->
              <div class="energy-row-info">
                <ha-icon icon="${item.icon}" style="color: ${item.color}"></ha-icon>
                <span class="energy-row-label">${item.label}</span>
              </div>

              <!-- Bar Track -->
              <div class="energy-track-wrapper">
                <div class="energy-track">
                  <div
                    class="energy-fill"
                    style="width: ${barWidth}%; background-color: ${item.color};"
                  ></div>
                </div>
              </div>

              <!-- Numeric Value & Percentage -->
              <div class="energy-row-val">
                <span class="energy-kwh" style="color: ${item.color}">
                  ${item.value.toFixed(2)} <small>kWh</small>
                </span>
                ${item.pct > 0 && item.pct !== 100
                  ? html`<span class="energy-pct">(${item.pct}%)</span>`
                  : ''}
              </div>
            </div>
          `;
        })}
      </div>
    </div>
  `;
}
