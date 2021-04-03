/* global AFRAME, DOT_SIZE, DOT_COLOR, WELL, STATE_COLOR */

AFRAME.registerComponent('dot-movement', {

  schema: {
    direction: {type: 'float', default: 0.0},
  },

  init: function() {
    this.data.direction = Math.random() * TWO_PI;
    let pos = this.el.getAttribute('position');
    let position = {
      x: Math.random() * GRID_SIZE - (GRID_SIZE/2),
      y: Math.random() * GRID_SIZE - (GRID_SIZE/2),
      z: pos.z
    };
    this.el.setAttribute('position', position);
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
    const state = this.el.components['dot-health'].data.state;
    if (state === 'DEAD') return;
    let step = DOT_SPEED * delta / 1000;
    let position = this.el.getAttribute('position');
    position.x = position.x + Math.cos(this.data.direction) * step;
    position.y = position.y + Math.sin(this.data.direction) * step;
    this.checkBounce(position);
    this.el.setAttribute('position', position);
  },

  wallBounce: function(low, high) {
    return Math.random() * (high - low) + low;
  }

});
