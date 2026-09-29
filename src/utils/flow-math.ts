import { FlowPath, ColorConfig } from '../types';
import { DEFAULT_COLORS } from '../const';

export interface NodePosition {
  x: number;
  y: number;
  radius: number;
}

// Legacy fixed coordinates for backward compatibility
export const NODE_POSITIONS = {
  solar: { x: 250, y: 44, radius: 34 },
  inverter: { x: 250, y: 175, radius: 32 },
  battery: { x: 74, y: 175, radius: 40 },
  home: { x: 426, y: 175, radius: 36 },
  grid: { x: 250, y: 308, radius: 34 },
};

export interface FlowLayout {
  viewBoxHeight: number;
  aspectRatio: string;
  tracks: string[];
  nodes: {
    solar?: NodePosition;
    inverter: NodePosition;
    battery: NodePosition;
    home: NodePosition;
    grid: NodePosition;
  };
}

/**
 * Computes node coordinates, track lines, and viewBox dimensions based on whether
 * solar generation is enabled and the desired grid position.
 */
export function getFlowLayout(
  hasSolar = false,
  gridPosition: 'bottom' | 'top' = 'bottom'
): FlowLayout {
  if (hasSolar) {
    return {
      viewBoxHeight: 360,
      aspectRatio: '500 / 360',
      tracks: [
        'M 250 82 L 250 140',   // Solar -> Inverter
        'M 116 175 L 216 175', // Battery <-> Inverter
        'M 284 175 L 388 175', // Inverter -> Home
        'M 250 210 L 250 274', // Grid <-> Inverter
      ],
      nodes: {
        solar: { x: 250, y: 44, radius: 34 },
        inverter: { x: 250, y: 175, radius: 32 },
        battery: { x: 74, y: 175, radius: 40 },
        home: { x: 426, y: 175, radius: 36 },
        grid: { x: 250, y: 308, radius: 34 },
      },
    };
  }

  if (gridPosition === 'top') {
    return {
      viewBoxHeight: 290,
      aspectRatio: '500 / 290',
      tracks: [
        'M 250 115 L 250 163', // Grid <-> Inverter
        'M 116 195 L 216 195', // Battery <-> Inverter
        'M 284 195 L 388 195', // Inverter -> Home
      ],
      nodes: {
        grid: { x: 250, y: 65, radius: 34 },
        inverter: { x: 250, y: 195, radius: 32 },
        battery: { x: 74, y: 195, radius: 40 },
        home: { x: 426, y: 195, radius: 36 },
      },
    };
  }

  // Default when no solar: Grid is at bottom, compact balanced layout
  return {
    viewBoxHeight: 290,
    aspectRatio: '500 / 290',
    tracks: [
      'M 116 90 L 216 90',   // Battery <-> Inverter
      'M 284 90 L 388 90',   // Inverter -> Home
      'M 250 145 L 250 191', // Grid <-> Inverter
    ],
    nodes: {
      battery: { x: 74, y: 90, radius: 40 },
      inverter: { x: 250, y: 90, radius: 32 },
      home: { x: 426, y: 90, radius: 36 },
      grid: { x: 250, y: 225, radius: 34 },
    },
  };
}

/**
 * Calculates flow animation duration in seconds using either logarithmic or linear interpolation.
 * Higher wattage results in shorter duration (faster motion).
 */
export function calcFlowDuration(
  watts: number,
  maxPower = 4200,
  minRate = 0.75,
  maxRate = 5.0,
  useLog = true
): number {
  const absWatts = Math.abs(watts);
  if (absWatts < 5) return 0; // Below deadband threshold

  const clampedWatts = Math.min(absWatts, maxPower);

  let ratio: number;
  if (useLog) {
    ratio = Math.log10(clampedWatts + 1) / Math.log10(maxPower + 1);
  } else {
    ratio = clampedWatts / maxPower;
  }

  const duration = maxRate - ratio * (maxRate - minRate);
  return Math.max(minRate, Math.min(maxRate, Number(duration.toFixed(2))));
}

/**
 * Calculates dynamic stroke width for flow lines (2.5px to 5.5px) based on power.
 */
export function calcStrokeWidth(watts: number, maxPower = 4200): number {
  const minWidth = 2.8;
  const maxWidth = 5.5;
  const ratio = Math.min(Math.abs(watts) / maxPower, 1);
  return Number((minWidth + ratio * (maxWidth - minWidth)).toFixed(1));
}

/**
 * Generates all active flow paths between nodes and central inverter hub with precise non-overlapping clearance.
 */
export function calculateFlowPaths(
  solarWatts: number,
  batteryWatts: number,
  gridWatts: number,
  loadWatts: number,
  colors?: ColorConfig,
  hasSolar = false,
  gridPosition: 'bottom' | 'top' = 'bottom'
): FlowPath[] {
  const paths: FlowPath[] = [];
  const activeThreshold = 5; // Watts

  const solarColor = colors?.solar || DEFAULT_COLORS.solar;
  const batteryChargeColor = colors?.battery_charge || DEFAULT_COLORS.battery_charge;
  const batteryDischargeColor = colors?.battery_discharge || DEFAULT_COLORS.battery_discharge;
  const gridImportColor = colors?.grid_import || DEFAULT_COLORS.grid_import;
  const gridExportColor = colors?.grid_export || DEFAULT_COLORS.grid_export;
  const homeColor = colors?.home || DEFAULT_COLORS.home;

  // 1. Solar -> Inverter (only if solar is active and present)
  if (hasSolar) {
    const solarP = Math.max(0, solarWatts);
    if (solarP >= activeThreshold) {
      paths.push({
        id: 'flow-solar-inverter',
        d: 'M 250 82 L 250 140',
        watts: solarP,
        color: solarColor,
        reversed: false,
      });
    }
  }

  // Determine line coordinates based on layout
  let batD = 'M 116 175 L 216 175';
  let homeD = 'M 284 175 L 388 175';
  let gridD = 'M 250 210 L 250 274';
  let gridImportReversed = true;

  if (!hasSolar) {
    if (gridPosition === 'top') {
      batD = 'M 116 195 L 216 195';
      homeD = 'M 284 195 L 388 195';
      gridD = 'M 250 115 L 250 163';
      // From Grid (top) down to Inverter: normal direction is import, reversed is export
      gridImportReversed = false;
    } else {
      // Bottom grid
      batD = 'M 116 90 L 216 90';
      homeD = 'M 284 90 L 388 90';
      gridD = 'M 250 145 L 250 191';
      // From Grid (bottom) up to Inverter: reversed direction is import, normal is export
      gridImportReversed = true;
    }
  }

  // 2. Inverter -> Home
  const loadP = Math.max(0, loadWatts);
  if (loadP >= activeThreshold) {
    paths.push({
      id: 'flow-inverter-home',
      d: homeD,
      watts: loadP,
      color: homeColor,
      reversed: false,
    });
  }

  // 3. Battery <-> Inverter
  const absBatP = Math.abs(batteryWatts);
  if (absBatP >= activeThreshold) {
    const isCharging = batteryWatts > 0;
    paths.push({
      id: 'flow-battery-inverter',
      d: batD,
      watts: absBatP,
      color: isCharging ? batteryChargeColor : batteryDischargeColor,
      reversed: isCharging,
    });
  }

  // 4. Grid <-> Inverter
  const absGridP = Math.abs(gridWatts);
  if (absGridP >= activeThreshold) {
    const isImport = gridWatts > 0;
    paths.push({
      id: 'flow-grid-inverter',
      d: gridD,
      watts: absGridP,
      color: isImport ? gridImportColor : gridExportColor,
      reversed: isImport ? gridImportReversed : !gridImportReversed,
    });
  }

  return paths;
}
