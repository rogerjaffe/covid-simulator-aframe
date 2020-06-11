/* global AFRAME, DOT_SIZE, DOT_COLOR, WELL, STATE_COLOR */

AFRAME.registerComponent('dot-infection', {

  schema: {
    current: {type: 'int', default: 0},
    infected: {type: 'int', default: -1},
    contagious: {type: 'int', default: -1},
    recovered: {type: 'int', default: -1},
    state: {type: 'int', default: WELL},
    willDie: {type: 'boolean', default: false}
  },

  init: function() {
    this.el.setAttribute('color', STATE_COLOR[WELL]);
    this.el.setAttribute('aabb-collider', 'objects: .dot');
    this.el.addEventListener('hitstart', this.hitStart);
    this.el.addEventListener('hitend', this.hitEnd);
    let vector = this.el.getAttribute('vector') === 'true';
    if (vector) {
      this.infect(0);
    }
  },

  tick: function(time, delta) {
    if (this.data.recovered <= time) {
      if (this.data.willDie) {
        this.data.state = DEAD;
      } else {
        this.data.state = RECOVERED;
      }
    } else if (this.data.contagious <= time) {
      this.data.state = CONTAGIOUS;
    } else if (this.data.infected <= time) {
      this.data.state = INFECTED;
    }
  },

  infect: function(time) {
    this.data.infected = time;
    this.data.contagious = time + RN(PARMS.CONTAGIOUS_LOW, PARMS.CONTAGIOUS_HIGH);
    this.data.recovered = this.data.contagious + RN(PARMS.RECOVERED_LOW, PARMS.RECOVERED_HIGH);
    this.data.willDie = RN(0, 100) < PARMS.DEAD;
  },

  isContagious: function() {
    return (this.data.contagious <= this.data.time) && (this.data.time <= this.data.recovered);
  },

  hitStart: function(evt) {
    let thisDot = this.components['dot-infection'];
    let objs = evt.detail.intersectedEls;  // array
    for (let i=0; i<objs.length; i++) {
      let obj = objs[i];
      let hitDot = obj.components['dot-infection'];
      console.log(hitDot.data.time.current);
    }
  },

});
