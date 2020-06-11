/* global AFRAME, DOT_SIZE, DOT_COLOR, WELL, STATE_COLOR */

AFRAME.registerComponent('dot-movement', {

  schema: {
    direction: {type: 'float', default: 0.0},
  },

  init: function() {
    this.data.direction = Math.random() * TWO_PI;
    let position = {
      x: Math.random() * GRID_SIZE - (GRID_SIZE/2),
      y: Math.random() * GRID_SIZE - (GRID_SIZE/2),
      z: 0
    };
    this.el.setAttribute('position', position);
    this.el.setAttribute('radius', DOT_SIZE);
  },

  checkBounce: function(position) {
    let newDirection = null;
    if (position.x < -BORDER) newDirection = this.wallBounce(-Math.PI/2, Math.PI/2);
    if (position.x >  BORDER) newDirection = this.wallBounce(Math.PI/2, 3*Math.PI/2);
    if (position.y < -BORDER) newDirection = this.wallBounce(0, Math.PI);
    if (position.y >  BORDER) newDirection = this.wallBounce(Math.PI, 2*Math.PI);
    if (newDirection !== null) {
      this.data.direction = newDirection;
    }
  },

  tick: function(time, delta) {
    let step = DOT_SPEED * delta / 1000;
    let position = this.el.getAttribute('position');
    position.x = position.x + Math.cos(this.data.direction) * step;
    position.y = position.y + Math.sin(this.data.direction) * step;
    this.checkBounce(position);
    this.el.setAttribute('position', position);
  },

  wallBounce: function(low, high) {
    return Math.random() * (high - low) + low;
  },

  createDots: function(n) {
    let board = document.querySelector('#board');
    for (let i=0; i<n; i++) {
      let circle = document.createElement('a-circle');
      circle.setAttribute('init-dot', "");
      board.appendChild(circle);
    }
  }
});
