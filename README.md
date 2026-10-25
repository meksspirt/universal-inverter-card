# 🔋⚡ Aninerel Power Card for Home Assistant

[![GitHub Release](https://img.shields.io/github/v/release/meksspirt/aninerel-power-card?style=flat-square&color=orange)](https://github.com/meksspirt/aninerel-power-card/releases)
[![HACS Custom](https://img.shields.io/badge/HACS-Custom-orange.svg?style=flat-square)](https://hacs.xyz)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg?style=flat-square)](https://www.home-assistant.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

The ultimate Lovelace custom card for all hybrid solar & off-grid inverters (**Aninerel**, **Anenji**, **Voltronic Axpert**, **EASUN SMG**, **PowMr**, **Growatt**, **Deye**, **Sunsynk**, **MUST**, **Victron MultiPlus**, **SRNE**, **LuxPower**, **Huawei**, **Sofar**) and battery banks / BMS (**LiFePO4**, **Li-Ion**, **LTO**, **JK BMS**, **Daly**, **Redodo**, **JBD**, **Seplos**, **Pylontech**, **Growatt HOPE**, **Pace**, **Felicity**).

Built from the ground up with **Lit 3** and **TypeScript**, completely standalone (100% local, no external CDN dependencies), GPU-accelerated, responsive for both desktop **Panel / Sections Mode** and mobile devices, and fully compatible with **HACS**.

---

## ✨ Key Features

### 1. ⚡ Animated Power Flow Diagram
* **GPU-Accelerated SVG Pipelines**: Ultra-smooth vector animations with dynamic glow and power-proportional line thickness & particle velocity.
* **Logarithmic Speed Model**: Accurately visualizes both low trickle charge currents (~10 W) and peak surge loads (6+ kW) without chaotic animation speeds.
* **Smart Solar Auto-Toggle**: If solar panels are not connected, the solar branch hides cleanly (`show_solar: false`), and the grid node moves to top or bottom as preferred.
* **Radial Battery SOC & Load Gauges**: High-contrast circular gauges with adaptive color transitions and real-time battery runtime estimation (hours to full / hours to empty).

### 2. 📊 Universal DC Bus & Electrical Telemetry
* **Auto-Detected System Voltage**: Automatically detects **12V**, **24V**, **36V**, or **48V/51.2V** nominal battery banks and adapts voltage thresholds, SoC curve estimation, and graph scales.
* **Universal AC Grid Support**: Native support for both **220V–240V** (Europe/CIS/Asia) and **110V–127V** (Americas/Japan) grids with automatic blackout / sag / surge detection.
* **Flexible Sensor Conventions**: Supports single signed power sensors, split charge/discharge sensors (`battery_charge_power` & `battery_discharge_power`), and sign inversion (`invert_battery_power`, `invert_grid_power`).
* **Embedded Sparklines**: Zero-dependency micro-charts showing 24-hour voltage trends with intelligent noise suppression.

### 3. 🔋 Universal BMS & Battery Bank Monitoring
* **1 to N Battery Packs**: Connect single packs, 2× 12V series strings, or parallel banks (2× 24V, 2× 48V, etc.).
* **Any Chemistry & Cell Count**: Supports `LiFePO4` (3.2V), `Li-Ion / NMC` (3.7V), and `LTO` (2.3V) across `4S`, `8S`, `12S`, `15S`, `16S`, and `24S`.
* **Active Balancing & Internal Resistance**: Live `⚡` badge on cells undergoing active balancing and internal resistance readout (`mΩ`) per cell.
* **Factory CAN-Bus Battery Support**: Cleanly supports ready-made packs (e.g. **Growatt HOPE 5.0L**, **Pylontech US3000C/US5000**, **Deye**, **Dyness**) that report bank-level `SOC %`, `SOH %`, voltage, and cycle counts without per-cell sensors.

### 4. 🎛️ Interactive Inverter Controls
* **Adaptive Priority Selectors**: Zero-overflow responsive pills for Output Source Priority (**UTI / USB / SBU / SUB**) and Charge Source Priority (**CSO / SNU / OSO**) with smart abbreviation parsing.
* **Enhanced Range Slider**: Active filled track, fine-tune `[-]` / `[+]` stepper buttons, quick-select preset chips (`2A`, `10A`, `15A`, `20A`, `30A`, `50A`, `100A`), and smart 100A ceiling for raw Modbus 200A limits.
* **Precision Voltage Steppers**: Bulk, Float, Back-to-Grid, and Cut-off voltage steppers reading `min`, `max`, `step`, and units directly from Home Assistant attributes.
* **LiFePO4 Equalization Safety Guard**: Equalization switch includes a two-step confirmation dialog to prevent accidental activation and damaging lithium cells.
* **Custom Entities Extension**: Easily attach arbitrary switches (e.g. buzzer), numbers, selects, or buttons into the control panel.

### 5. 🛡️ Comprehensive Safety, Diagnostics & Modbus Decoding
* **Complete Knowledge Base**: Built-in bilingual (EN / RU) reference for **F01–F82** fault codes and **W01–W73** warning codes based on Voltronic / Axpert / SMG II / PowMr documentation.
* **Modbus Bitmask Decoder**: Automatically decomposes multi-bit registers (105, 108, 109) into human-readable component warnings.

### 6. 📈 Daily Energy Balance
* Proportional color-coded bars for Daily Home Consumption, Solar PV Production, Grid Import, Grid Export, Battery Charge, Battery Discharge, and Inverter Self-Consumption.

---

## 🚀 Installation

### Option 1: Via HACS (Recommended)
1. Open **HACS** in your Home Assistant sidebar.
2. Go to **Frontend** → Click the three dots in the top right corner → **Custom repositories**.
3. Paste repository URL: `https://github.com/meksspirt/aninerel-power-card`
4. Set category to **Dashboard** (or **Lovelace**).
5. Click **Add**, find **Aninerel Power Card**, and click **Download**.
6. Refresh your browser cache (Ctrl + F5 or Cmd + Shift + R).

### Option 2: Manual Installation
1. Download `aninerel-power-card.js` from the [Latest Release](https://github.com/meksspirt/aninerel-power-card/releases/latest).
2. Copy the file to `/config/www/aninerel-power-card.js`.
3. In Home Assistant, navigate to **Settings** → **Dashboards** → three dots → **Resources**.
4. Add resource:
   - **URL**: `/local/aninerel-power-card.js?v=1.3.0`
   - **Resource Type**: `JavaScript Module`
5. Hard-refresh your browser.

---

## 📋 Configuration Examples

### Example 1: UPS Backup Mode (No Solar, 2× 12V LiFePO4 in Series = 24V)

```yaml
type: custom:aninerel-power-card
title: "Home UPS Power"
show_solar: false
grid_position: bottom

# 1. Power Entities (W)
entities:
  battery_power: sensor.inverter_battery_power
  grid_power: sensor.inverter_grid_power
  load_power: sensor.inverter_load_power

# 2. Inverter Telemetry
battery_voltage_entity: sensor.inverter_battery_voltage
battery_current_entity: sensor.inverter_battery_current
grid_voltage_entity: sensor.inverter_grid_voltage
operating_mode_entity: sensor.inverter_operating_mode
charging_active_entity: binary_sensor.inverter_charging_active
inverter_temperature_entity: sensor.inverter_temperature
self_consumption_power_entity: sensor.inverter_self_consumption

# 3. Dual Battery BMS Configuration (2× 12V Series = 24V)
bms:
  topology: series
  dual_battery: true
  battery_1:
    name: "Battery #1 (12V)"
    soc_entity: sensor.redodo_1_soc
    voltage_entity: sensor.redodo_1_voltage
    temperature_entity: sensor.redodo_1_temp
    cell_count: 4
    cell_voltage_prefix: "sensor.redodo_1_cell_voltage_"
  battery_2:
    name: "Battery #2 (12V)"
    soc_entity: sensor.redodo_2_soc
    voltage_entity: sensor.redodo_2_voltage
    temperature_entity: sensor.redodo_2_temp
    cell_count: 4
    cell_voltage_prefix: "sensor.redodo_2_cell_voltage_"
  cycle_count_entity: sensor.redodo_battery_cycles
  remaining_capacity_entity: sensor.redodo_battery_remaining_capacity

# 4. Inverter Controls
controls:
  charge_source_entity: select.inverter_charge_source_priority
  output_priority_entity: select.inverter_output_source_priority
  max_charge_current_entity: number.inverter_max_ac_charge_current
  max_charge_current_limit: 60
  bulk_voltage_entity: number.inverter_battery_bulk_voltage
  float_voltage_entity: number.inverter_battery_float_voltage
  equalization_entity: switch.inverter_battery_equalization

# 5. Diagnostics & Safety
safety:
  fault_active_entity: binary_sensor.inverter_fault_active
  fault_code_entity: sensor.inverter_fault_code
  warnings_active_entity: binary_sensor.inverter_warnings_active
  warning_code_entity: sensor.inverter_warning_code

# 6. Daily Energy Statistics (kWh)
daily_energy:
  load_energy_entity: sensor.inverter_load_energy_today
  grid_import_entity: sensor.inverter_grid_import_energy_today
  battery_charge_entity: sensor.inverter_battery_charge_energy_today
  battery_discharge_entity: sensor.inverter_battery_discharge_energy_today
```

---

### Example 2: Modern 48V / 51.2V Inverter (Anenji / Deye / Growatt) + Factory CAN Battery (Growatt HOPE / Pylontech)

```yaml
type: custom:aninerel-power-card
title: "Anenji 6.2kW Hybrid"
system_voltage: 48
max_power: 6200

entities:
  solar_power: sensor.anenji_pv_power
  battery_power: sensor.anenji_battery_power
  grid_power: sensor.anenji_grid_power
  load_power: sensor.anenji_load_power

battery_voltage_entity: sensor.anenji_battery_voltage
battery_current_entity: sensor.anenji_battery_current
grid_voltage_entity: sensor.anenji_grid_voltage
operating_mode_entity: sensor.anenji_work_mode
inverter_temperature_entity: sensor.anenji_heatsink_temperature

# Factory 51.2V CAN-Bus Battery (e.g. Growatt HOPE 5.0L / Pylontech US5000)
bms:
  bank_name: "Growatt HOPE 5.0L"
  soc_entity: sensor.growatt_battery_soc
  soh_entity: sensor.growatt_battery_soh
  voltage_entity: sensor.growatt_battery_voltage
  current_entity: sensor.growatt_battery_current
  temperature_entity: sensor.growatt_battery_temperature
  cycle_count_entity: sensor.growatt_battery_cycles
  remaining_capacity_entity: sensor.growatt_battery_remaining_capacity
  nominal_capacity_wh: 5120

controls:
  charge_source_entity: select.anenji_charge_priority
  output_priority_entity: select.anenji_output_priority
  max_charge_current_entity: number.anenji_max_charge_current
  max_total_charge_current_entity: number.anenji_max_total_charge_current
  back_to_grid_voltage_entity: number.anenji_back_to_grid_voltage
  cutoff_voltage_entity: number.anenji_cutoff_voltage
  buzzer_entity: switch.anenji_buzzer

daily_energy:
  solar_energy_entity: sensor.anenji_pv_energy_today
  load_energy_entity: sensor.anenji_load_energy_today
  grid_import_entity: sensor.anenji_grid_import_today
  grid_export_entity: sensor.anenji_grid_export_today
  battery_charge_entity: sensor.anenji_battery_charge_today
  battery_discharge_entity: sensor.anenji_battery_discharge_today
```

---

### Example 3: JK BMS with Active Balancing & Cell Resistance (mΩ)

```yaml
type: custom:aninerel-power-card
title: "Solar Power Station"

entities:
  solar_power: sensor.solar_pv_power
  battery_power: sensor.jk_bms_power
  grid_power: sensor.grid_meter_power
  load_power: sensor.home_load_power

bms:
  bank_name: "JK Smart BMS"
  chemistry: lifepo4
  cell_count: 16
  soc_entity: sensor.jk_bms_soc
  voltage_entity: sensor.jk_bms_total_voltage
  current_entity: sensor.jk_bms_current
  temperature_entity: sensor.jk_bms_temp_probe_1
  cell_voltage_prefix: "sensor.jk_bms_cell_voltage_"
  cell_balancing_prefix: "binary_sensor.jk_bms_cell_balancing_"
  cell_resistance_prefix: "sensor.jk_bms_cell_resistance_"
  active_balancer_entity: switch.jk_bms_active_balancer
  cell_delta_entity: sensor.jk_bms_cell_delta
```

---

## ⚙️ Configuration Reference

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | string | **Required** | Must be `custom:aninerel-power-card` |
| `title` | string | Auto | Card title (auto-detects inverter brand if omitted) |
| `subtitle` | string | Auto | Card subtitle (auto-formats nominal voltage & kW rating) |
| `icon` | string | Auto | MDI icon displayed in header box |
| `language` | string | `auto` | Language (`auto`, `ru`, `en`) |
| `system_voltage` | number / string | `auto` | System DC bus: `auto`, `12`, `24`, `36`, `48` |
| `invert_battery_power`| boolean | `false` | Flip battery power & current sign (if `+W` = discharging) |
| `invert_grid_power` | boolean | `false` | Flip grid power sign (if `+W` = export) |
| `entities.load_power` | string | **Required** | Sensor for household load power (W) |
| `entities.battery_power` | string | Optional | Sensor for battery power (W, +charge / -discharge) |
| `entities.battery_charge_power` | string | Optional | Split positive battery charge sensor (W) |
| `entities.battery_discharge_power` | string | Optional | Split positive battery discharge sensor (W) |
| `entities.grid_power` | string | Optional | Sensor for AC utility grid power (W) |
| `entities.solar_power` | string | Optional | Sensor for solar panel power (W) |
| `show_solar` | boolean | Auto | Whether to display solar branch (auto-enabled if `solar_power` set) |
| `grid_position` | string | `bottom` | Position of grid node when solar hidden: `bottom` or `top` |
| `max_power` | number | `4200` | Inverter rated power capacity (W) for scaling animation speeds |
| `use_log_flow_model` | boolean | `true` | Logarithmic scaling for smooth flow speed at both 20W and 4kW |
| `compact_mode` | boolean | `false` | Compact layout mode (smaller padding & spacing) |
| `show_header` | boolean | `true` | Show top header bar with status chips |
| `show_flow` | boolean | `true` | Show animated SVG power flow diagram |
| `show_params` | boolean | `true` | Show electrical telemetry tiles (Battery DC, Grid AC, KPI) |
| `show_bms` | boolean | `true` | Show Battery Bank & BMS cell section |
| `show_controls` | boolean | `true` | Show collapsible inverter priority, current, and voltage controls |
| `show_energy` | boolean | `true` | Show daily energy counters (kWh) |
| `show_alerts` | boolean | `true` | Show diagnostic safety banners on active warnings/faults |

### BMS Configuration (`bms`)
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `bank_name` | string | Auto | Battery bank title (e.g. `JK BMS`, `Redodo`, `Growatt HOPE`, `Pylontech`) |
| `topology` | string | `auto` | Connection topology: `auto`, `single`, `series`, `parallel` |
| `chemistry` | string | `auto` | Battery chemistry: `auto`, `lifepo4`, `li_ion`, `lto` |
| `cell_numbering` | string | `continuous` | Multi-pack numbering: `continuous` (`#1..#8`) or `per_pack` (`#1..#4`) |
| `dual_battery` | boolean | `false` | Enable multi-pack / dual battery mode |
| `soc_entity` | string | Optional | Sensor for overall battery state of charge (%) |
| `soh_entity` | string | Optional | Sensor for battery state of health (% SOH) |
| `voltage_entity` | string | Optional | Sensor for overall battery voltage (V) |
| `current_entity` | string | Optional | Sensor for battery bank current (A) |
| `cell_count` | number | `8` | Number of cells per pack (`0` for CAN-bus without cell sensors) |
| `cell_voltage_prefix` | string | Optional | Prefix for cell voltage sensors |
| `cell_balancing_prefix`| string | Optional | Prefix for binary balancing sensors |
| `cell_resistance_prefix`| string | Optional | Prefix for internal resistance sensors (mΩ) |
| `active_balancer_entity`| string | Optional | Switch or sensor for active cell balancer |
| `cell_delta_entity` | string | Optional | Sensor for cell imbalance (mV) |
| `cycle_count_entity` | string | Optional | Sensor for battery discharge cycles |
| `remaining_capacity_entity` | string | Optional | Sensor for remaining battery capacity (Ah) |
| `nominal_capacity_wh` | number | Auto | Nominal battery energy capacity (Wh) |

### Controls Configuration (`controls`)
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `charge_source_entity` | string | Optional | Select entity for charge priority (`CSO`, `SNU`, `OSO`) |
| `output_priority_entity`| string | Optional | Select entity for output source priority (`UTI`, `USB`, `SBU`, `SUB`) |
| `max_charge_current_entity` | string | Optional | Number entity for Max AC charge current (A) |
| `max_charge_current_limit` | number | Optional | Visual slider ceiling override (e.g. `60A` or `100A` instead of raw `200A`) |
| `max_total_charge_current_entity` | string | Optional | Number entity for Max total charge current (`PV + AC`) |
| `bulk_voltage_entity` | string | Optional | Number entity for Bulk/Absorption charge voltage (V) |
| `float_voltage_entity` | string | Optional | Number entity for Float charge voltage (V) |
| `back_to_grid_voltage_entity` | string | Optional | Number entity for Back-to-Grid voltage / SoC threshold |
| `cutoff_voltage_entity` | string | Optional | Number entity for Low DC cut-off voltage / SoC threshold |
| `buzzer_entity` | string | Optional | Switch entity for inverter audible alarm |
| `equalization_entity` | string | Optional | Switch entity for battery equalization mode (with safety confirm) |
| `extra_entities` | array | Optional | List of additional control entities or objects (`select`, `number`, `switch`, `button`) |

### Daily Energy Configuration (`daily_energy`)
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `solar_energy_entity` | string | Optional | Sensor for daily solar PV generation (kWh) |
| `load_energy_entity` | string | Optional | Sensor for daily home consumption (kWh) |
| `grid_import_entity` | string | Optional | Sensor for daily grid import (kWh) |
| `grid_export_entity` | string | Optional | Sensor for daily grid export (kWh) |
| `battery_charge_entity` | string | Optional | Sensor for daily battery charge (kWh) |
| `battery_discharge_entity` | string | Optional | Sensor for daily battery discharge (kWh) |
| `self_consumption_daily_entity` | string | Optional | Sensor for daily inverter self-consumption (kWh) |
| `self_consumption_monthly_entity`| string | Optional | Sensor for monthly inverter self-consumption (kWh) |

---

## 🛠️ Diagnostics & Code Reference

Built-in automated translation and decoding for all standard Voltronic / Axpert / SMG II / PowMr codes:

### Common Fault Codes (Solid Red Alert):
* **F01**: Cooling fan locked or failing
* **F02**: Inverter over-temperature (>100°C on heatsink)
* **F03**: Battery voltage exceeds high cut-off limit
* **F04**: Battery voltage dropped below low cut-off limit (deep discharge)
* **F05**: AC output short circuit or extreme surge detected
* **F06**: AC output voltage too high (>260V)
* **F07**: Overload timeout exceeded
* **F08**: High-voltage DC bus over-voltage
* **F09**: DC bus soft-start pre-charge failed
* **F51**: Power bridge transistor over-current (IGBT/MOSFET)
* **F52**: DC bus under-voltage drop
* **F53**: Inverter AC sine-wave soft-start failed
* **F55**: Hazardous DC voltage detected on AC output
* **F56**: Battery circuit is open or disconnected
* **F57**: Internal current sensor failed
* **F58**: AC output voltage too low under heavy load (<190V)

---

## 📦 Developer Guide

```bash
# Clone the repository
git clone https://github.com/meksspirt/aninerel-power-card.git
cd aninerel-power-card

# Install dependencies
npm install

# Build production bundle
npm run build
```

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
