# 🔋⚡ Aninerel Power Card for Home Assistant

[![GitHub Release](https://img.shields.io/github/v/release/ziffmafiya/aninerel-power-card?style=flat-square&color=orange)](https://github.com/ziffmafiya/aninerel-power-card/releases)
[![HACS Custom](https://img.shields.io/badge/HACS-Custom-orange.svg?style=flat-square)](https://hacs.xyz)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg?style=flat-square)](https://www.home-assistant.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

The ultimate Lovelace custom card for hybrid solar & off-grid inverters (**Aninerel ANL-4200T-24L-W-Pro**, **Voltronic Axpert**, **EASUN SMG II**, **PowMr**, **MUST**) and lithium iron phosphate battery banks (**Redodo LiFePO4**, **JK BMS**, **JBD**, **Daly**).

Built from the ground up with **Lit 3** and **TypeScript**, completely standalone (100% local, no external CDN dependencies), GPU-accelerated, responsive for both desktop **Panel Mode** and mobile devices, and fully compatible with **HACS**.

---

## ✨ Key Features

### 1. ⚡ Animated Power Flow Diagram
* **GPU-Accelerated SVG Pipelines**: Smooth vector animations powered by hardware acceleration (`will-change: stroke-dashoffset`).
* **Logarithmic Speed Model**: Accurately visualizes both low trickle charge currents (~10 W) and peak surge power (4.2+ kW) without chaotic animation speeds.
* **Dynamic Direction & Thickness**: Automatic bi-directional flow reversal (Charge ↔ Discharge, Grid Import ↔ Export) with power-proportional line width.
* **Radial Battery SOC Gauge**: High-contrast circular charge percentage gauge with adaptive green/amber/red color thresholds.
* **Smart Solar Toggle**: Easily hide the solar branch (`show_solar: false`) for pure UPS / grid-battery setups. The grid node automatically shifts to the top or bottom as preferred.

### 2. 📊 Interactive Header & Electrical Telemetry
* **Live Status Chips**: Operating mode indicator (**Battery**, **Mains/Line**, **Bypass**), power unit heatsink temperature (°C), and charger active flag (`CHG`).
* **Real-time Voltage & Current**: DC battery voltage & current (`26.8V / +15A`), AC utility grid voltage with automatic sag/surge detection.
* **Embedded Sparklines**: Lightweight, zero-dependency micro-charts showing 24-hour battery and grid voltage trends with intelligent noise suppression.
* **Daily Self-Sufficiency KPI**: Radial arc gauge displaying the percentage of household consumption covered by battery and solar generation.

### 3. 🔋 Redodo LiFePO4 BMS Monitoring
* **Dual 12V Series Mode (2× 12V = 24V)**: Built-in support for series-connected 12V batteries with midpoint drift calculation, pack voltage delta in mV, and balancing alerts.
* **Single Pack Mode (4S, 8S, 16S)**: Direct monitoring of 24V/48V battery banks.
* **Per-Cell Bar Graph**: Individual voltage bars for all cells with instant **MAX** and **MIN** cell highlighting.
* **Cell Imbalance Warning (Δ mV)**: Color-coded delta badge alerting you to cell imbalance.
* **Health Metrics**: Real-time BMS probe temperatures, cycle counter, and remaining capacity in Amp-hours (Ah).

### 4. 🎛️ Interactive Inverter Controls
* **Collapsible Control Panel**: Expandable accordion to save dashboard space.
* **Priority Selectors**: One-click switching for Output Source Priority (**SUB / SBU / USB**) and Charge Source Priority (**Solar First / Solar & Utility / Only Solar**).
* **Grid Charge Current Slider**: Quick adjustment for maximum AC charging current (from 2 A to 30 A).
* **Voltage Threshold Steppers**: Fine-tune **Bulk** and **Float** charging voltages in 0.1V increments.
* **LiFePO4 Equalization Safety Guard**: Equalization switch includes a safety confirmation dialog to prevent accidental activation and damaging lithium cells.

### 5. 🛡️ Comprehensive Safety, Diagnostics & Modbus Decoding
* **Complete Knowledge Base**: Built-in reference for **F01–F82** fault codes and **W01–W73** warning codes based on official Voltronic / Axpert / SMG II / PowMr documentation.
* **Modbus Bitmask Decoder**: Automatically decomposes multi-bit register masks (registers 105, 108, 109) into human-readable component warnings (e.g. Code 68 = W04 Low Battery + W64 PV Low Voltage).
* **Smart PV Warning Filter**: When running without solar panels (`show_solar: false`), normal 0V MPPT status warnings (W64 / W15) are suppressed so false alarm banners are avoided, while any battery or system warnings remain fully active!
* **Home Assistant Text Integration**: Automatically reads companion text sensors (`sensor.*_warning_details`, `sensor.*_fault_details`) and includes the verbatim inverter status in alerts.

### 6. 📈 Daily Energy Statistics
* Proportional color-coded horizontal bars for daily Home Consumption, Grid Import, Battery Charge, and Battery Discharge in kWh.

### 7. 🎨 Visual GUI Editor & Full YAML Support
* Native Lovelace UI editor with categorized entity selectors, intuitive toggles, and live previews.

---

## 🚀 Installation

### Option 1: Via HACS (Recommended)
1. Open **HACS** in your Home Assistant sidebar.
2. Go to **Frontend** → Click the three dots in the top right corner → **Custom repositories**.
3. Paste the repository URL: `https://github.com/ziffmafiya/aninerel-power-card`
4. Set category to **Dashboard** (or **Lovelace**).
5. Click **Add**, find **Aninerel Power Card**, and click **Download**.
6. Refresh your browser cache (Ctrl + F5 or Cmd + Shift + R).

### Option 2: Manual Installation
1. Download `aninerel-power-card.js` from the [Latest Release](https://github.com/ziffmafiya/aninerel-power-card/releases/latest).
2. Copy the file to your Home Assistant directory: `/config/www/aninerel-power-card.js`.
3. In Home Assistant, navigate to **Settings** → **Dashboards** → click the three dots → **Resources**.
4. Add a new resource:
   - **URL**: `/local/aninerel-power-card.js?v=1.1.0`
   - **Resource Type**: `JavaScript Module`
5. Hard-refresh your browser.

---

## 📋 Configuration Examples

### Example 1: UPS Backup Mode (No Solar, 2× 12V LiFePO4 in Series = 24V)

```yaml
type: custom:aninerel-power-card
title: "Aninerel ANL 4200T"
subtitle: "24V 4.2kW Home Backup UPS"
show_solar: false
grid_position: bottom

# 1. Power Entities (W)
entities:
  battery_power: sensor.aninerel_anl_4200t_24l_w_pro_battery_power
  grid_power: sensor.aninerel_anl_4200t_24l_w_pro_grid_power
  load_power: sensor.aninerel_anl_4200t_24l_w_pro_load_power

# 2. Inverter Telemetry
battery_voltage_entity: sensor.aninerel_anl_4200t_24l_w_pro_battery_voltage
battery_current_entity: sensor.aninerel_anl_4200t_24l_w_pro_battery_current
grid_voltage_entity: sensor.aninerel_anl_4200t_24l_w_pro_grid_voltage
operating_mode_entity: sensor.aninerel_anl_4200t_24l_w_pro_operating_mode
charging_active_entity: binary_sensor.aninerel_anl_4200t_24l_w_pro_charging_active
inverter_temperature_entity: sensor.aninerel_anl_4200t_24l_w_pro_inverter_temperature

# 3. Dual Battery BMS Configuration (2x 12V Series)
bms:
  dual_battery: true
  battery_1:
    name: "Battery #1 (12V)"
    soc_entity: sensor.redodo_1_state_of_charge
    voltage_entity: sensor.redodo_1_total_voltage
    temperature_entity: sensor.redodo_1_temperature
    cell_count: 4
    cell_voltage_prefix: "sensor.redodo_1_cell_voltage_"
  battery_2:
    name: "Battery #2 (12V)"
    soc_entity: sensor.redodo_2_state_of_charge
    voltage_entity: sensor.redodo_2_total_voltage
    temperature_entity: sensor.redodo_2_temperature
    cell_count: 4
    cell_voltage_prefix: "sensor.redodo_2_cell_voltage_"
  cycle_count_entity: sensor.redodo_battery_discharge_cycles
  remaining_capacity_entity: sensor.redodo_battery_remaining_capacity

# 4. Inverter Controls
controls:
  charge_source_entity: select.aninerel_anl_4200t_24l_w_pro_charge_source_priority
  output_priority_entity: select.aninerel_anl_4200t_24l_w_pro_output_source_priority
  max_charge_current_entity: number.aninerel_anl_4200t_24l_w_pro_max_ac_charge_current
  bulk_voltage_entity: number.aninerel_anl_4200t_24l_w_pro_battery_bulk_voltage
  float_voltage_entity: number.aninerel_anl_4200t_24l_w_pro_battery_float_voltage
  equalization_entity: switch.aninerel_anl_4200t_24l_w_pro_battery_equalization

# 5. Diagnostics & Safety
safety:
  fault_active_entity: binary_sensor.aninerel_anl_4200t_24l_w_pro_fault_active
  fault_code_entity: sensor.aninerel_anl_4200t_24l_w_pro_fault_code
  warnings_active_entity: binary_sensor.aninerel_anl_4200t_24l_w_pro_warnings_active
  warning_code_entity: sensor.aninerel_anl_4200t_24l_w_pro_warning_code
  warning_details_entity: sensor.aninerel_anl_4200t_24l_w_pro_warning_details

# 6. Daily Energy Statistics (kWh)
daily_energy:
  load_energy_entity: sensor.aninerel_anl_4200t_24l_w_pro_estimated_load_energy_today
  grid_import_entity: sensor.aninerel_anl_4200t_24l_w_pro_estimated_grid_import_energy_today
  battery_charge_entity: sensor.aninerel_anl_4200t_24l_w_pro_estimated_battery_charge_energy_today
  battery_discharge_entity: sensor.aninerel_anl_4200t_24l_w_pro_estimated_battery_discharge_energy_today
```

---

### Example 2: Full Hybrid Solar System (PV + Grid + Single 24V 8S Battery)

```yaml
type: custom:aninerel-power-card
title: "Solar Power Station"
show_solar: true

entities:
  solar_power: sensor.aninerel_anl_4200t_24l_w_pro_pv_power
  battery_power: sensor.aninerel_anl_4200t_24l_w_pro_battery_power
  grid_power: sensor.aninerel_anl_4200t_24l_w_pro_grid_power
  load_power: sensor.aninerel_anl_4200t_24l_w_pro_load_power

battery_voltage_entity: sensor.aninerel_anl_4200t_24l_w_pro_battery_voltage
battery_current_entity: sensor.aninerel_anl_4200t_24l_w_pro_battery_current
grid_voltage_entity: sensor.aninerel_anl_4200t_24l_w_pro_grid_voltage
operating_mode_entity: sensor.aninerel_anl_4200t_24l_w_pro_operating_mode
inverter_temperature_entity: sensor.aninerel_anl_4200t_24l_w_pro_inverter_temperature

bms:
  soc_entity: sensor.redodo_battery_state_of_charge
  voltage_entity: sensor.redodo_battery_total_voltage
  temperature_entity: sensor.redodo_battery_temperature_probe_1
  cell_count: 8
  cell_voltage_prefix: "sensor.redodo_battery_cell_voltage_"
  cell_delta_entity: sensor.redodo_battery_cell_delta
```

---

## ⚙️ Configuration Reference

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | string | **Required** | Must be `custom:aninerel-power-card` |
| `title` | string | `Aninerel ANL 4200T` | Header main title text |
| `subtitle` | string | `Hybrid 24V 4.2kW Inverter` | Header subtitle text |
| `icon` | string | Auto | MDI icon displayed in header box |
| `entities.load_power` | string | **Required** | Sensor for household load power (W) |
| `entities.battery_power` | string | Optional | Sensor for battery power (W, +charge / -discharge) |
| `entities.grid_power` | string | Optional | Sensor for AC utility grid power (W) |
| `entities.solar_power` | string | Optional | Sensor for solar panel power (W) |
| `show_solar` | boolean | `false` | Whether to display the solar branch in the diagram |
| `grid_position` | string | `bottom` | Position of the grid node when solar is hidden: `bottom` or `top` |
| `max_power` | number | `4200` | Inverter rated power capacity (W) for scaling animation speeds |
| `use_log_flow_model` | boolean | `true` | Use logarithmic scaling for smooth flow speed at both 20W and 4kW |
| `show_header` | boolean | `true` | Show top header bar with model name and status chips |
| `show_flow` | boolean | `true` | Show animated SVG power flow diagram |
| `show_params` | boolean | `true` | Show electrical telemetry tiles (Battery DC, Grid AC, Autarky KPI) |
| `show_bms` | boolean | `true` | Show LiFePO4 BMS individual cell voltage section |
| `show_controls` | boolean | `true` | Show collapsible inverter priority, current, and voltage controls |
| `show_energy` | boolean | `true` | Show daily energy counters (kWh) |
| `show_alerts` | boolean | `true` | Show diagnostic safety banners on active warnings/faults |

### BMS Configuration (`bms`)
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `dual_battery` | boolean | `false` | Enable dual 12V battery series mode (2x 12V packs in series = 24V) |
| `battery_1` | object | Optional | Configuration block for Pack #1 (`name`, `soc_entity`, `voltage_entity`, `temperature_entity`, `cell_count`, `cell_voltage_prefix`) |
| `battery_2` | object | Optional | Configuration block for Pack #2 (`name`, `soc_entity`, `voltage_entity`, `temperature_entity`, `cell_count`, `cell_voltage_prefix`) |
| `soc_entity` | string | Optional | Sensor for overall battery state of charge (%) |
| `voltage_entity` | string | Optional | Sensor for overall battery voltage (V) |
| `cell_count` | number | `8` | Number of cells in a single pack |
| `cell_voltage_prefix` | string | Optional | Prefix for cell voltage sensors (e.g. `sensor.bms_cell_voltage_`) |
| `cell_delta_entity` | string | Optional | Sensor for cell imbalance (mV) |
| `cycle_count_entity` | string | Optional | Sensor for battery charge/discharge cycles |
| `remaining_capacity_entity` | string | Optional | Sensor for remaining battery capacity (Ah) |

---

## 🛠️ Diagnostics & Code Reference

The card includes automated translation and decoding for all standard Voltronic / Axpert / SMG II / PowMr codes:

### Common Fault Codes (Solid Red Alert):
- **F01**: Cooling fan locked or failing
- **F02**: Inverter over-temperature (>100°C on heatsink)
- **F03**: Battery voltage exceeds high cut-off limit
- **F04**: Battery voltage dropped below low cut-off limit (deep discharge)
- **F05**: AC output short circuit or extreme surge detected
- **F06**: AC output voltage too high (>260V)
- **F07**: Overload timeout exceeded
- **F08**: High-voltage DC bus over-voltage
- **F09**: DC bus soft-start pre-charge failed
- **F51**: Power bridge transistor over-current (IGBT/MOSFET)
- **F52**: DC bus under-voltage drop
- **F53**: Inverter AC sine-wave soft-start failed
- **F55**: Hazardous DC voltage detected on AC output
- **F56**: Battery circuit is open or disconnected
- **F57**: Internal current sensor (Hall sensor) failed
- **F58**: AC output voltage too low under heavy load (<190V)

### Common Warning Codes (Amber Alert):
- **W01**: Fan slowed down or dust accumulated (Bit 0 = 1)
- **W02**: Inverter heatsink temperature elevated (Bit 1 = 2)
- **W04**: Battery low voltage warning (Bit 2 = 4)
- **W07**: Overload warning near 4.2 kW limit (Bit 4 = 16)
- **W08**: Battery open circuit / not detected (Bit 3 = 8)
- **W10**: Inverter power derating due to heat
- **W15 / W64**: PV Low Voltage — Solar array voltage below MPPT start threshold (Bit 6 = 64)
- **W20**: BMS communication timeout over CAN/RS485
- **W61 / W62**: Battery discharge / charge over-current
- **W63 / W65**: Battery over-temperature / under-temperature (<0°C)

---

## 📦 Developer Guide

```bash
# Clone the repository
git clone https://github.com/ziffmafiya/aninerel-power-card.git
cd aninerel-power-card

# Install dependencies
npm install

# Build production bundle
npm run build

# Watch mode for development
npm run watch
```

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
