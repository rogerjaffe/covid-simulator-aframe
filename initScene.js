/* global AFRAME */

AFRAME.registerComponent('init-scene', {

  init: function () {
    this.createDots(N);
  },

  createDots: function (n) {
    let board = document.querySelector('#board');
    for (let idx = 0; idx < n; idx++) {
      let sphere = document.createElement('a-sphere');
      sphere.setAttribute('index', idx+'');
      sphere.setAttribute('dot-movement', '');
      sphere.setAttribute('dot-health', 'isPatientZero: '+(idx === 0 ? 'true' : 'false'));
      sphere.setAttribute('class', 'dot');
      sphere.setAttribute('radius', DOT_SIZE);
      board.appendChild(sphere);
    }
  }
})
