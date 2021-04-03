/* global AFRAME, DOT_SIZE, DOT_COLOR, WELL, STATE_COLOR */

AFRAME.registerComponent('summarize', {

  lastTime: 0,

  schema: {

  },

  init: function() {

  },

  tick: function(time) {
    if (time - this.lastTime <= 1000) return;
    const dots = document.querySelectorAll('.dot');
    let acc = {
      [WELL]: 0,
      [INFECTED]: 0,
      [CONTAGIOUS]: 0,
      [SYMPTOMATIC]: 0,
      [RECOVERED]: 0,
      [DEAD]: 0
    }
    let summary = Array.from(dots).reduce((acc, dot) => {
      acc[dot.components['dot-health'].data.state]++;
      return acc;
    }, acc)
    summary[INFECTED] = summary[INFECTED] + summary[CONTAGIOUS] + summary[SYMPTOMATIC];
    this.lastTime = time;
    const keys = Object.keys(summary);
    let buffer = keys.reduce((buffer, key) => {
      buffer += key+': '+summary[key]+'\n';
      return buffer;
    }, '')
    this.el.setAttribute('text', {value: buffer});
  },

});
