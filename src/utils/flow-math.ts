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

export interface ConduitTrack {
  id: string;
  d: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface FlowLayout {
  viewBoxHeight: number;
  aspectRatio: string;
  tracks: string[];
  conduits: ConduitTrack[];
  nodes: {
    solar?: NodePosition;
    inverter: NodePosition;
    battery: NodePosition;
    home: NodePosition;
    grid: NodePosition;
  };
}

/**
 * Computes node coordinates, conduit lines with port endpoints, and viewBox dimensions
 * based on whether solar generation is enabled and the desired grid position.
 * Every node's (x, y) is the exact geometric center of its badge/hub.
 */
export function getFlowLayout(
  hasSolar = false,
  gridPosition: 'bottom' | 'top' = 'bottom'
): FlowLayout {
  if (hasSolar) {
    const conduits: ConduitTrack[] = [
      { id: 'solar', d: 'M 250 116 L 250 134', x1: 250, y1: 116, x2: 250, y2: 134 },
      { id: 'battery', d: 'M 115 182 L 187 182', x1: 115, y1: 182, x2: 187, y2: 182 },
      { id: 'home', d: 'M 313 182 L 388 182', x1: 313, y1: 182, x2: 388, y2: 182 },
      { id: 'grid', d: 'M 250 230 L 250 267', x1: 250, y1: 230, x2: 250, y2: 267 },
    ];
    return {
      viewBoxHeight: 375,
      aspectRatio: '500 / 375',
      tracks: conduits.map((c) => c.d),
      conduits,
      nodes: {
        solar: { x: 250, y: 44, radius: 34 },
        inverter: { x: 250, y: 182, radius: 46 },
        battery: { x: 74, y: 182, radius: 39 },
        home: { x: 426, y: 182, radius: 36 },
        grid: { x: 250, y: 304, radius: 35 },
      },
    };
  }

  if (gridPosition === 'top') {
    const conduits: ConduitTrack[] = [
      { id: 'grid', d: 'M 250 128 L 250 156', x1: 250, y1: 128, x2: 250, y2: 156 },
      { id: 'battery', d: 'M 115 204 L 187 204', x1: 115, y1: 204, x2: 187, y2: 204 },
      { id: 'home', d: 'M 313 204 L 388 204', x1: 313, y1: 204, x2: 388, y2: 204 },
    ];
    return {
      viewBoxHeight: 300,
      aspectRatio: '500 / 300',
      tracks: conduits.map((c) => c.d),
      conduits,
      nodes: {
        grid: { x: 250, y: 48, radius: 35 },
        inverter: { x: 250, y: 204, radius: 46 },
        battery: { x: 74, y: 204, radius: 39 },
        home: { x: 426, y: 204, radius: 36 },
      },
    };
  }

  // Default when no solar: Grid is at bottom, zero text-wire overlap
  const conduits: ConduitTrack[] = [
    { id: 'battery', d: 'M 115 84 L 187 84', x1: 115, y1: 84, x2: 187, y2: 84 },
    { id: 'home', d: 'M 313 84 L 388 84', x1: 313, y1: 84, x2: 388, y2: 84 },
    { id: 'grid', d: 'M 250 131 L 250 179', x1: 250, y1: 131, x2: 250, y2: 179 },
  ];
  return {
    viewBoxHeight: 305,
    aspectRatio: '500 / 305',
    tracks: conduits.map((c) => c.d),
    conduits,
    nodes: {
      battery: { x: 74, y: 84, radius: 39 },
      inverter: { x: 250, y: 84, radius: 46 },
      home: { x: 426, y: 84, radius: 36 },
      grid: { x: 250, y: 216, radius: 35 },
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
        d: 'M 250 116 L 250 134',
        watts: solarP,
        color: solarColor,
        reversed: false,
      });
    }
  }

  // Determine line coordinates based on layout
  let batD = 'M 115 182 L 187 182';
  let homeD = 'M 313 182 L 388 182';
  let gridD = 'M 250 230 L 250 267';
  let gridImportReversed = true;

  if (!hasSolar) {
    if (gridPosition === 'top') {
      batD = 'M 115 204 L 187 204';
      homeD = 'M 313 204 L 388 204';
      gridD = 'M 250 128 L 250 156';
      // From Grid (top) down to Inverter: normal direction is import, reversed is export
      gridImportReversed = false;
    } else {
      // Bottom grid
      batD = 'M 115 84 L 187 84';
      homeD = 'M 313 84 L 388 84';
      gridD = 'M 250 131 L 250 179';
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
