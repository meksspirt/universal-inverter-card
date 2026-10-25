# 🔋⚡ Універсальна картка інвертора для Home Assistant (Universal Inverter Card)

**[🇬🇧 English](README.md)** | **[🇺🇦 Українська версія](README.uk.md)**

[![GitHub Release](https://img.shields.io/github/v/release/meksspirt/universal-inverter-card?style=flat-square&color=orange)](https://github.com/meksspirt/universal-inverter-card/releases)
[![HACS Custom](https://img.shields.io/badge/HACS-Custom-orange.svg?style=flat-square)](https://hacs.xyz)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg?style=flat-square)](https://www.home-assistant.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![Встановити у ваш Home Assistant через HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=meksspirt&repository=universal-inverter-card&category=Dashboard)

Ультимативна кастомна картка Lovelace для всіх гібридних сонячних та автономних інверторів (**Aninerel**, **Anenji**, **Voltronic Axpert**, **EASUN SMG**, **PowMr**, **Growatt**, **Deye**, **Sunsynk**, **MUST**, **Victron MultiPlus**, **SRNE**, **LuxPower**, **Huawei**, **Sofar**) та акумуляторних збірок / BMS (**LiFePO4**, **Li-Ion**, **LTO**, **JK BMS**, **Daly**, **Redodo**, **JBD**, **Seplos**, **Pylontech**, **Growatt HOPE**, **Pace**, **Felicity**).

Створена з нуля на базі **Lit 3** та **TypeScript**, повністю автономна (100% локальна робота, без зовнішніх CDN), з апаратним GPU-прискоренням анімацій, адаптована як для широких екранів ПК (**Panel / Sections Mode**), так і для смартфонів, та повністю сумісна з **HACS**.

> 💡 **Зворотна сумісність**: Якщо ви раніше використовували `type: custom:aninerel-power-card`, вона продовжує працювати як вбудований псевдонім (аліас) без потреби змінювати наявний дашборд.

---

## ✨ Ключові можливості

### 1. ⚡ Анімована схема потоків енергії
* **Векторні SVG-трубопроводи з GPU-прискоренням**: Ультраплавна анімація потоків струму з динамічним неоновим підсвічуванням, товщиною ліній та швидкістю частинок, пропорційною реальній потужності у ватах.
* **Логарифмічна модель швидкості**: Реалістично відображає як мікроструми підтримки заряду (~10 Вт), так і пікові пускові навантаження (понад 6 кВт) без хаотичного мерехтіння.
* **Розумне автоперемикання сонячних панелей**: Якщо сонячні панелі відсутні, гілка PV непомітно згортається (`show_solar: false`), а вузол міської мережі автоматично переміщується зверху або знизу за вашим вибором.
* **Радіальні кругові шкали SOC та навантаження**: Висококонтрастні кругові індикатори заряду АКБ з адаптивними кольорами та прогнозом часу роботи (годин до повного заряду або розряду).

### 2. 📊 Універсальна DC-шина та електрична телеметрія
* **Автовизначення системної напруги**: Автоматично розпізнає конфігурацію батареї **12В**, **24В**, **36В** або **48В/51.2В**, масштабуючи порогові напруги, криві розрахунку заряду та діапазони шкал.
* **Універсальна підтримка AC-мережі**: Нативна сумісність як з мережами **220В–240В** (Україна/Європа), так і **110В–127В** (Америка/Японія) з автовиявленням блекаутів, просідань та перенапруги.
* **Гнучкі конвенції сенсорів**: Підтримує комбіновані двонаправлені сенсори потужності (+заряд / -розряд), роздільні сенсори (`battery_charge_power` та `battery_discharge_power`), а також інверсію знака (`invert_battery_power`, `invert_grid_power`).
* **Вбудовані мікрографіки (Sparklines)**: Автономні векторні графіки історії напруги за останні 24 години без навантаження на систему.

### 3. 🔋 Універсальний моніторинг BMS та акумуляторів
* **Від 1 до N збірок АКБ**: Підтримує поодинокі акумулятори, послідовні збірки (наприклад, 2× 12В для системи 24В) або паралельні банки (2× 24В, 2× 48В тощо).
* **Будь-яка хімія та кількість комірок**: Повна підтримка `LiFePO4` (3.2В), `Li-Ion / NMC` (3.7В) та `LTO` (2.3В) на `4S`, `8S`, `12S`, `15S`, `16S` та `24S`.
* **Активне балансування та внутрішній опір**: Відображення іконки `⚡` біля комірок, які балансуються в реальному часі, та показ внутрішнього опору (`мОм`) кожної комірки.
* **Заводські CAN-Bus акумулятори**: Коректна робота з фірмовими батареями (**Growatt HOPE 5.0L**, **Pylontech US3000C/US5000**, **Deye**, **Dyness**), які транслюють загальний `SOC %`, `SOH %`, напругу та цикли без окремих сенсорів по комірках.

### 4. 🎛️ Інтерактивне керування інвертором
* **Адаптивні перемикачі пріоритетів**: Зручні пігулки-кнопки пріоритетів виходу (**UTI / USB / SBU / SUB**) та заряду (**CSO / SNU / OSO**) зі зрозумілими підказками.
* **Покращений повзунок струму**: Активна смуга наповнення, кнопки точного підстроювання `[-]` / `[+]`, чіпи швидкого вибору (`2A`, `10A`, `15A`, `20A`, `30A`, `50A`, `100A`) та програмне обмеження стелі (замість сирих 200А з Modbus).
* **Прецизійні степпери напруг**: Зміна напруг Bulk, Float, Back-to-Grid та Cut-off з автоматичним зчитуванням меж `min`, `max`, `step` безпосередньо з атрибутів Home Assistant.
* **Захист від випадкового вирівнювання LiFePO4**: Перемикач режиму десульфатації/вирівнювання захищений діалогом підтвердження у два кроки, щоб запобігти пошкодженню літієвих батарей.
* **Підключення довільних сутностей**: Легке додавання власних перемикачів (зумер), селекторів, кнопок або чисел на панель керування.

### 5. 🛡️ Комплексна безпека, діагностика та декодування Modbus
* **Повна база знань**: Вбудований довідник українською мовою для всіх кодів аварій **F01–F82** та попереджень **W01–W73** на основі документації Voltronic / Axpert / SMG II / PowMr.
* **Декодер бітових масок Modbus**: Автоматично розшифровує багатобітові регістри (105, 108, 109) у зрозумілі текстові попередження.

### 6. 📈 Добовий баланс енергії та реальний ККД у реальному часі
* **Реальний ККД перетворення (`ККД %` та теплові втрати `Вт`)**: Порівнює потужність шини DC з AC-виходом та власним споживанням у реальному часі, показуючи фактичний ККД інвертора (наприклад, `88.4%`) і скільки ват перетворюється на тепло (`115 Вт`).
* **Пропорційні смуги енергії**: Кольорові смуги для споживання будинку, генерації PV, імпорту/експорту мережі, заряду/розряду АКБ та власних потреб інвертора за добу.

### 7. 🧠 Розумний розрахунок часу роботи за законом Пейкерта (Smart Runtime Predictor)
* **Згладжування стрибків (EMA Rolling Window)**: Фільтрує короткочасні пускові сплески (холодильники, чайники, насоси), зберігаючи стабільний прогноз залишку часу.
* **Врахування закону Пейкерта та порогу відсічки**: Коригує доступну ємність залежно від сили розрядного струму (C-rate) та запасу напруги до точки відсічки інвертора (`cutoff_voltage`), усуваючи оманливі цифри при великому навантаженні.
* **Залежність точності та порадник навантаження**: Показує спокійні години, коли розряд `> 5 год` (`~6.5 год`), години + хвилини при `1–5 год` (`2г 15хв`), та перемикається на точний секундний таймер до порогу відсічки (`⚠️ 42 хв до 24.0В`) разом із **Порадником скидання навантаження** (`💡 −200 Вт навантаження додасть +25 хв`), коли залишається `< 1 год`.

### 8. 📦 Чорна скринька подій та компактний режим плитки
* **Чорна скринька («Black-Box Logger»)**: Фіксує короткочасні нічні помилки інвертора (навіть якщо вони зникають через 2 секунди), пікові сплески навантаження, критичні просідання АКБ та відключення/відновлення мережі зі збереженням точного часу.
* **Компактний режим плитки (`compact_mode: true`)**: Згортає картку до акуратного віджета 2×2 (Схема потоків + SOC + Час роботи + Док швидких кнопок), а детальні графіки, комірки BMS, керування та журнал Чорної скриньки відкриваються у зручному модальному вікні.
* **Авто-прив'язка пристроїв в 1 клік**: Оберіть знайдений інвертор та BMS у візуальному редакторі — картка самостійно підключить усі 30+ сенсорів за 1 секунду.

---

## 🚀 Встановлення

### Варіант 1: Через HACS (Рекомендовано)

[![Встановити у ваш Home Assistant через HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=meksspirt&repository=universal-inverter-card&category=Dashboard)

1. Натисніть кнопку **Open in Home Assistant** вище — у вашому браузері одразу відкриється готовий діалог встановлення репозиторію через HACS.
2. Або додайте вручну через Home Assistant:
   - Перейдіть у **HACS** → натисніть три крапки у правому верхньому куті → **Custom repositories** (*Користувацькі репозиторії*).
   - Вставте адресу репозиторію: `https://github.com/meksspirt/universal-inverter-card`
   - Оберіть категорію **Dashboard** (або **Lovelace**).
   - Натисніть **Додати**, знайдіть **Universal Inverter Card** та натисніть **Завантажити**.
3. Оновіть кеш браузера (Ctrl + F5 або Cmd + Shift + R).

### Варіант 2: Ручне встановлення
1. Завантажте файл `universal-inverter-card.js` з розділу [Останній реліз (Latest Release)](https://github.com/meksspirt/universal-inverter-card/releases/latest).
2. Скопіюйте файл у теку вашого Home Assistant: `/config/www/universal-inverter-card.js`.
3. У Home Assistant відкрийте **Налаштування** → **Панелі приладів (Dashboards)** → три крапки → **Ресурси**.
4. Додайте новий ресурс:
   - **URL**: `/local/universal-inverter-card.js?v=1.4.1`
   - **Тип ресурсу**: `JavaScript Module`
5. Перезавантажте сторінку у браузері.

---

## 📋 Приклади налаштування (YAML)

### Приклад 1: Режим резервного ДБЖ (Без сонця, 2× 12В LiFePO4 послідовно = 24В)

```yaml
type: custom:universal-inverter-card
title: "Домашній ДБЖ"
show_solar: false
grid_position: bottom

# 1. Сенсори потужності (Вт)
entities:
  battery_power: sensor.inverter_battery_power
  grid_power: sensor.inverter_grid_power
  load_power: sensor.inverter_load_power

# 2. Електрична телеметрія інвертора
battery_voltage_entity: sensor.inverter_battery_voltage
battery_current_entity: sensor.inverter_battery_current
grid_voltage_entity: sensor.inverter_grid_voltage
operating_mode_entity: sensor.inverter_operating_mode
charging_active_entity: binary_sensor.inverter_charging_active
inverter_temperature_entity: sensor.inverter_temperature
self_consumption_power_entity: sensor.inverter_self_consumption

# 3. Конфігурація BMS (2× 12В послідовно = 24В)
bms:
  topology: series
  dual_battery: true
  battery_1:
    name: "Акумулятор #1 (12V)"
    soc_entity: sensor.redodo_1_soc
    voltage_entity: sensor.redodo_1_voltage
    temperature_entity: sensor.redodo_1_temp
    cell_count: 4
    cell_voltage_prefix: "sensor.redodo_1_cell_voltage_"
  battery_2:
    name: "Акумулятор #2 (12V)"
    soc_entity: sensor.redodo_2_soc
    voltage_entity: sensor.redodo_2_voltage
    temperature_entity: sensor.redodo_2_temp
    cell_count: 4
    cell_voltage_prefix: "sensor.redodo_2_cell_voltage_"
  cycle_count_entity: sensor.redodo_battery_cycles
  remaining_capacity_entity: sensor.redodo_battery_remaining_capacity

# 4. Керування інвертором
controls:
  charge_source_entity: select.inverter_charge_source_priority
  output_priority_entity: select.inverter_output_source_priority
  max_charge_current_entity: number.inverter_max_ac_charge_current
  max_charge_current_limit: 60
  bulk_voltage_entity: number.inverter_battery_bulk_voltage
  float_voltage_entity: number.inverter_battery_float_voltage
  equalization_entity: switch.inverter_battery_equalization

# 5. Діагностика та безпека
safety:
  fault_active_entity: binary_sensor.inverter_fault_active
  fault_code_entity: sensor.inverter_fault_code
  warnings_active_entity: binary_sensor.inverter_warnings_active
  warning_code_entity: sensor.inverter_warning_code

# 6. Статистика добової енергії (кВт⋅год)
daily_energy:
  load_energy_entity: sensor.inverter_load_energy_today
  grid_import_entity: sensor.inverter_grid_import_energy_today
  battery_charge_entity: sensor.inverter_battery_charge_energy_today
  battery_discharge_entity: sensor.inverter_battery_discharge_energy_today
```

---

### Приклад 2: Гібридний інвертор 48В / 51.2В (Anenji / Deye / Growatt) + Заводська CAN-батарея (Growatt HOPE / Pylontech)

```yaml
type: custom:universal-inverter-card
title: "Гібридна станція Anenji 6.2 кВт"
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

# Заводська батарея 51.2В CAN-Bus (Growatt HOPE 5.0L / Pylontech US5000)
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

### Приклад 3: JK BMS з активним балансуванням та опором комірок (мОм)

```yaml
type: custom:universal-inverter-card
title: "Сонячна електростанція"

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

## ⚙️ Довідник параметрів конфігурації

| Параметр | Тип | За замовчуванням | Опис |
| :--- | :--- | :--- | :--- |
| `type` | string | **Обов'язковий** | `custom:universal-inverter-card` (або `custom:aninerel-power-card`) |
| `title` | string | Авто | Заголовок картки (автоматично визначає модель інвертора, якщо не вказано) |
| `subtitle` | string | Авто | Підзаголовок (автоматично формує напругу та потужність кВт) |
| `icon` | string | Авто | MDI-іконка у лівому верхньому блоці |
| `language` | string | `auto` | Мова інтерфейсу (`auto`, `uk`, `ru`, `en`) |
| `system_voltage` | number / string | `auto` | Напруга DC-шини: `auto`, `12`, `24`, `36`, `48` |
| `invert_battery_power`| boolean | `false` | Інвертувати знак потужності АКБ (якщо `+Вт` = розряд) |
| `invert_grid_power` | boolean | `false` | Інвертувати знак потужності мережі (якщо `+Вт` = експорт) |
| `entities.load_power` | string | **Обов'язковий** | Сенсор навантаження споживачів оселі (Вт) |
| `entities.battery_power` | string | Опціонально | Сенсор потужності АКБ (Вт, +заряд / -розряд) |
| `entities.battery_charge_power` | string | Опціонально | Окремий сенсор позитивного заряду АКБ (Вт) |
| `entities.battery_discharge_power` | string | Опціонально | Окремий сенсор позитивного розряду АКБ (Вт) |
| `entities.grid_power` | string | Опціонально | Сенсор споживання/віддачі міської мережі (Вт) |
| `entities.solar_power` | string | Опціонально | Сенсор потужності генерації сонячних панелей (Вт) |
| `show_solar` | boolean | Авто | Відображати сонячну гілку (автоматично, якщо вказано `solar_power`) |
| `grid_position` | string | `bottom` | Позиція мережі, коли сонце приховано: `bottom` або `top` |
| `max_power` | number | `4200` | Номінальна потужність інвертора (Вт) для масштабування швидкості потоків |
| `use_log_flow_model` | boolean | `true` | Логарифмічне масштабування швидкості анімації (плавність при 20 Вт і 4 кВт) |
| `compact_mode` | boolean | `false` | Компактний режим плитки (згортає картку у віджет 2×2 з модальним вікном) |
| `show_header` | boolean | `true` | Відображати верхню панель заголовка зі статусом |
| `show_flow` | boolean | `true` | Відображати анімовану діаграму потоків потужності |
| `show_params` | boolean | `true` | Відображати плитку електричних параметрів (АКБ, мережа, ККД) |
| `show_bms` | boolean | `true` | Відображати секцію батарейного банку та комірок BMS |
| `show_controls` | boolean | `true` | Відображати панель керування інвертором (пріоритети, струм, напруги) |
| `show_energy` | boolean | `true` | Відображати лічильники добової енергії (кВт⋅год) |
| `show_alerts` | boolean | `true` | Відображати діагностичні банери помилок та попереджень |
| `show_blackbox` | boolean | `true` | Відображати блок «Чорної скриньки» з піковими навантаженнями та історією аварій |

### Параметри BMS (`bms`)
| Параметр | Тип | За замовчуванням | Опис |
| :--- | :--- | :--- | :--- |
| `bank_name` | string | Авто | Назва акумулятора (наприклад, `JK BMS`, `Redodo`, `Growatt HOPE`, `Pylontech`) |
| `topology` | string | `auto` | Схема підключення: `auto`, `single`, `series`, `parallel` |
| `chemistry` | string | `auto` | Хімія акумулятора: `auto`, `lifepo4`, `li_ion`, `lto` |
| `cell_numbering` | string | `continuous` | Нумерація комірок у збірках: `continuous` (`#1..#8`) або `per_pack` (`#1..#4`) |
| `dual_battery` | boolean | `false` | Увімкнути режим кількох акумуляторів / 2× АКБ |
| `soc_entity` | string | Опціонально | Сенсор загального заряду АКБ (%) |
| `soh_entity` | string | Опціонально | Сенсор здоров'я АКБ (% SOH) |
| `voltage_entity` | string | Опціонально | Сенсор загальної напруги батареї (В) |
| `current_entity` | string | Опціонально | Сенсор струму акумулятора (А) |
| `cell_count` | number | `8` | Кількість комірок у паку (`0` для CAN-акумуляторів без сенсорів комірок) |
| `cell_voltage_prefix` | string | Опціонально | Префікс імен сенсорів напруг комірок |
| `cell_balancing_prefix`| string | Опціонально | Префікс бінарних сенсорів активного балансування |
| `cell_resistance_prefix`| string | Опціонально | Префікс сенсорів внутрішнього опору комірок (мОм) |
| `active_balancer_entity`| string | Опціонально | Перемикач активного балансира BMS |
| `cell_delta_entity` | string | Опціонально | Сенсор різниці напруг комірок (розбаланс, мВ) |
| `cycle_count_entity` | string | Опціонально | Сенсор кількості циклів розряду |
| `remaining_capacity_entity` | string | Опціонально | Сенсор залишкової ємності (А⋅год) |
| `nominal_capacity_wh` | number | Авто | Номінальна енергоємність батареї (Вт⋅год) |

### Параметри керування (`controls`)
| Параметр | Тип | За замовчуванням | Опис |
| :--- | :--- | :--- | :--- |
| `charge_source_entity` | string | Опціонально | Сенсор-селектор пріоритету заряду (`CSO`, `SNU`, `OSO`) |
| `output_priority_entity`| string | Опціонально | Сенсор-селектор пріоритету виходу (`UTI`, `USB`, `SBU`, `SUB`) |
| `max_charge_current_entity` | string | Опціонально | Сенсор-число макс. струму заряду від мережі (А) |
| `max_charge_current_limit` | number | Опціонально | Програмна стеля повзунка (наприклад, `60A` або `100A` замість 200А з Modbus) |
| `max_total_charge_current_entity` | string | Опціонально | Сенсор загального струму заряду (`PV + Мережа`) |
| `bulk_voltage_entity` | string | Опціонально | Сенсор напруги основного заряду Bulk/Absorption (В) |
| `float_voltage_entity` | string | Опціонально | Сенсор напруги підтримки Float (В) |
| `back_to_grid_voltage_entity` | string | Опціонально | Сенсор порогу повернення до мережі (В або % SOC) |
| `cutoff_voltage_entity` | string | Опціонально | Сенсор напруги захисного відключення інвертора (Cut-off) |
| `buzzer_entity` | string | Опціонально | Перемикач звукового сигналу інвертора (зумер) |
| `equalization_entity` | string | Опціонально | Перемикач вирівнювання напруги АКБ (із захистом підтвердження) |
| `extra_entities` | array | Опціонально | Список додаткових сутностей на панель керування |

### Параметри лічильників енергії (`daily_energy`)
| Параметр | Тип | За замовчуванням | Опис |
| :--- | :--- | :--- | :--- |
| `solar_energy_entity` | string | Опціонально | Генерація сонячних панелей за добу (кВт⋅год) |
| `load_energy_entity` | string | Опціонально | Споживання будинку за добу (кВт⋅год) |
| `grid_import_entity` | string | Опціонально | Імпорт із міської мережі за добу (кВт⋅год) |
| `grid_export_entity` | string | Опціонально | Експорт у міську мережу за добу (кВт⋅год) |
| `battery_charge_entity` | string | Опціонально | Заряджено в АКБ за добу (кВт⋅год) |
| `battery_discharge_entity` | string | Опціонально | Розряджено з АКБ за добу (кВт⋅год) |
| `self_consumption_daily_entity` | string | Опціонально | Власне споживання інвертора за добу (кВт⋅год) |
| `self_consumption_monthly_entity`| string | Опціонально | Власне споживання інвертора за місяць (кВт⋅год) |

---

## 🛠️ Довідник аварійних кодів (F01–F82)

Вбудований український переклад та технічна розшифровка для всіх типових кодів Voltronic / Axpert / SMG II / PowMr:

### Поширені коди аварій (Червоний статус):
* **F01**: Вентилятор охолодження заблокований або несправний
* **F02**: Перегрів інвертора (температура радіатора >100°C)
* **F03**: Напруга акумулятора перевищила верхню захисну межу
* **F04**: Напруга акумулятора впала нижче критичної межі відсічки (глибокий розряд)
* **F05**: Коротке замикання на виході AC або критичний пусковий струм
* **F06**: Напруга на виході AC занадто висока (>260 В)
* **F07**: Перевантаження інвертора за потужністю триває довше ліміту часу
* **F08**: Перенапруга внутрішньої високовольтної шини DC
* **F09**: Помилка м'якого старту (soft-start) шини DC
* **F51**: Перевантаження силових транзисторів інвертора за струмом (IGBT/MOSFET)
* **F52**: Просідання напруги шини DC під навантаженням
* **F53**: Збій м'якого запуску вихідної синусоїди AC
* **F55**: Небезпечна постійна напруга DC зафіксована на виході AC
* **F56**: Ланцюг акумулятора розірвано або відключено
* **F57**: Збій внутрішнього датчика струму інвертора
* **F58**: Напруга на виході AC занадто низька під великим навантаженням (<190 В)

---

## 📦 Інструкція для розробників

```bash
# Клонувати репозиторій
git clone https://github.com/meksspirt/universal-inverter-card.git
cd universal-inverter-card

# Встановити залежності
npm install

# Збірка продакшн-бандлу
npm run build
```

---

## 📄 Ліцензія

Цей проєкт є відкритим програмним забезпеченням під ліцензією [MIT License](LICENSE).
