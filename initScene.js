/* global AFRAME, R, DOT_SIZE, DOT_COLOR, WELL, STATE_COLOR, WELL */

AFRAME.registerComponent('init-scene', {

  init: function() {
    this.createDots(N);
  },

  createDots: function(n) {
    let board = document.querySelector('#board');
    for (let idx=0; idx<n; idx++) {
      let circle = document.createElement('a-circle');
      circle.setAttribute('dot-movement', '');
      circle.setAttribute('dot-infection', '');
      circle.setAttribute('class', 'dot');
      circle.setAttribute('vector', idx === 0 ? 'true' : 'false');
      board.appendChild(circle);
    };
  }
});
