const N = 100;
const TWO_PI = Math.PI * 2;
const DOT_SIZE = 0.1;
const GRID_SIZE = 10;
const DOT_SPEED = 0.5;
const BORDER = 5;

const PARMS = {
  VACCINATED_PERCENT: 25,                  // Percent of the population with immunity (prior infection, vaccine)

  VACCINATED: {
    NOT_CONTAGIOUS_PERCENT: 25,
    NOT_SYMPTOMATIC_PERCENT: 70,
    MORTALITY_PERCENT: 0,
    CONTAGIOUS_START: {LOW: 2, HIGH: 4},
    CONTAGIOUS_LENGTH: {LOW: 1, HIGH: 4},
    SYMPTOMATIC_START: {LOW: 1, HIGH: 3},
    SYMPTOMATIC_LENGTH: {LOW: 1, HIGH: 3},
  },
  NOT_VACCINATED: {
    NOT_SYMPTOMATIC_PERCENT: 30,
    MORTALITY_PERCENT: 2,
    CONTAGIOUS_START: {LOW: 2, HIGH: 14},
    CONTAGIOUS_LENGTH: {LOW: 5, HIGH: 20},
    SYMPTOMATIC_START: {LOW: 5, HIGH: 10},
    SYMPTOMATIC_LENGTH: {LOW: 5, HIGH: 15},
  }
}

const COLORS = {
  WELL: '#2DFEFE',
  INFECTED: '#FFFD37',
  CONTAGIOUS: '#FD9926',
  SYMPTOMATIC: '#FC0D1B',
  RECOVERED: '#2AFC2E',
  DEAD: '#000000'
}

const WELL =        'WELL';
const INFECTED =    'INFECTED';
const CONTAGIOUS =  'CONTAGIOUS';
const SYMPTOMATIC = 'SYMPTOMATIC';
const RECOVERED =   'RECOVERED';
const DEAD =        'DEAD';
