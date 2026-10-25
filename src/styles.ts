import { CSSResultGroup } from 'lit';
import { baseStyles } from './styles/base';
import { flowStyles } from './styles/flow';
import { paramsStyles } from './styles/params';
import { bmsStyles } from './styles/bms';
import { controlsStyles } from './styles/controls';
import { energyStyles } from './styles/energy';
import { alertStyles } from './styles/alerts';
import { responsiveStyles } from './styles/responsive';

export {
  baseStyles,
  flowStyles,
  paramsStyles,
  bmsStyles,
  controlsStyles,
  energyStyles,
  alertStyles,
  responsiveStyles,
};

export const cardStyles: CSSResultGroup = [
  baseStyles,
  flowStyles,
  paramsStyles,
  bmsStyles,
  controlsStyles,
  energyStyles,
  alertStyles,
  responsiveStyles,
];

export default cardStyles;
