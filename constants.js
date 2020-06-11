const N = 100;
const TWO_PI = Math.PI * 2;
const DOT_SIZE = 0.1;
const GRID_SIZE = 10;
const DOT_SPEED = 0.5;
const BORDER = 5;

const PARMS = {
  CONTAGIOUS_LOW: 2,
  CONTAGIOUS_HIGH: 14,
  RECOVERED_LOW: 5,
  RECOVERED_HIGH: 15,
  DEAD: 2                   // percent
}

const WELL = 0;
const INFECTED = 1;
const CONTAGIOUS = 2;
const RECOVERED = 4;
const DEAD = 5;

const STATE_COLOR = {
  [WELL]:         '#00FF00',
  [INFECTED]:     '#FFFFFF',
  [CONTAGIOUS]:   '#FFFFFF',
  [RECOVERED]:    '#FFFFFF',
};

const RN = (low, high) => Math.random() * (high-low) + low;
