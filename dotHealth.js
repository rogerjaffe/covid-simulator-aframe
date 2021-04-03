/* global AFRAME, DOT_SIZE, DOT_COLOR, WELL, STATE_COLOR */

AFRAME.registerComponent('dot-health', {

  schema: {
    state: {type: 'string', default: WELL},
    isExposed: {type: 'boolean', default: false},
    isVaccinated: {type: 'boolean', default: false},
    isInfected: {type: 'boolean', default: false},
    isPatientZero: {type: 'boolean', default: false},
    // Times to event
    contagiousStart: {type: 'int', default: -1},
    contagiousEnd: {type: 'int', default: -1},
    symptomaticStart: {type: 'int', default: -1},
    symptomaticEnd: {type: 'int', default: -1},
    dieTime: {type: 'int', default: -1}
  },

  init: function() {
    this.el.setAttribute('color', WELL);
    this.el.setAttribute('aabb-collider', 'objects: .dot');
    this.el.addEventListener('hitstart', this.hitStart.bind(this));
    if (this.data.isPatientZero) {
      this.infectNotVaccinated(0);
      this.data.state = SYMPTOMATIC;
    } else {
      this.data.isVaccinated = rnPercent(PARMS.VACCINATED_PERCENT);
      this.data.isVaccinated ? this.el.setAttribute('opacity', 0.60) : null;
    }
  },

  tick: function(time) {
    if (this.isDead(this, time)) {
      this.data.state = DEAD;
    } else if (this.isContagious(this, time)) {
      this.data.state = this.isSymptomatic(this, time) ? SYMPTOMATIC : CONTAGIOUS;
    } else if (this.isInfected) {
      this.data.state = INFECTED;
    } else if (this.isRecovered(this, time)) {
      this.data.state = RECOVERED;
    }
    let color = this.el.getAttribute('color');
    if (color !== this.data.state) {
      this.el.setAttribute('color', COLORS[this.data.state])
    }
  },

  expose: function(time) {
    if (this.data.isExposed) return;
    this.data.isVaccinated ? this.infectVaccinated(time) : this.infectNotVaccinated(time);
    this.data.isExposed = true;
  },

  infectVaccinated: function(_time) {
    if (rn(0, 99) < PARMS.VACCINATED.NOT_CONTAGIOUS_PERCENT) return;
    let time = _time / 1000;
    this.data.isInfected = true;
    this.data.contagiousStart = time + rn(PARMS.VACCINATED.CONTAGIOUS_START.LOW, PARMS.VACCINATED.CONTAGIOUS_START.HIGH);
    this.data.contagiousEnd = time + this.data.contagiousStart + rn(PARMS.VACCINATED.CONTAGIOUS_LENGTH.LOW, PARMS.VACCINATED.CONTAGIOUS_LENGTH.HIGH);
    if (rn(0, 99) > PARMS.VACCINATED.NOT_SYMPTOMATIC_PERCENT) {
      this.data.symptomaticStart = time + rn(PARMS.VACCINATED.SYMPTOMATIC_START.LOW, PARMS.VACCINATED.SYMPTOMATIC_START.HIGH);
      this.data.symptomaticEnd = time + this.data.symptomaticStart + rn(PARMS.VACCINATED.SYMPTOMATIC_START.LOW, PARMS.VACCINATED.SYMPTOMATIC_START.HIGH);
    }
    if (rnPercent(PARMS.VACCINATED.MORTALITY_PERCENT)) {
      this.data.dieTime = this.data.symptomaticEnd;
    }
  },

  infectNotVaccinated: function(_time) {
    let time = _time / 1000;
    this.data.isInfected = true;
    this.data.contagiousStart = time + rn(PARMS.NOT_VACCINATED.CONTAGIOUS_START.LOW, PARMS.NOT_VACCINATED.CONTAGIOUS_START.HIGH);
    this.data.contagiousEnd = time + this.data.contagiousStart + rn(PARMS.NOT_VACCINATED.CONTAGIOUS_LENGTH.LOW, PARMS.NOT_VACCINATED.CONTAGIOUS_LENGTH.HIGH);
    if (rn(0, 99) > PARMS.NOT_VACCINATED.NOT_SYMPTOMATIC_PERCENT) {
      this.data.symptomaticStart = time + rn(PARMS.NOT_VACCINATED.SYMPTOMATIC_START.LOW, PARMS.NOT_VACCINATED.SYMPTOMATIC_START.HIGH);
      this.data.symptomaticEnd = time + this.data.symptomaticStart + rn(PARMS.NOT_VACCINATED.SYMPTOMATIC_START.LOW, PARMS.NOT_VACCINATED.SYMPTOMATIC_START.HIGH);
    }
    if (rn(0, 99) < PARMS.NOT_VACCINATED.MORTALITY_PERCENT) {
      this.data.dieTime = this.data.symptomaticEnd;
    }
  },

  isSymptomatic: function(dot, time) {
    if (dot.data.symptomaticStart === -1) return false;
    let _time = time / 1000;
    return (dot.data.symptomaticStart <= _time) && (_time <= dot.data.symptomaticEnd);
  },

  isContagious: function(dot, time) {
    if (dot.data.contagiousStart === -1) return false;
    let _time = time / 1000;
    return (dot.data.contagiousStart <= _time) && (_time <= dot.data.contagiousEnd);
  },

  isDead: function(dot, time) {
    if (dot.data.dieTime === -1) return false;
    let _time = time / 1000;
    return dot.data.dieTime < _time;
  },

  isRecovered: function(dot, time) {
    if (dot.data.contagiousEnd === -1) return false;
    let _time = time / 1000;
    return _time > dot.data.contagiousEnd;
  },

  hitStart: function(evt) {
    let thisDotIndex = evt.currentTarget.getAttribute('index');
    // let thisDot = obj.components['dot-health'];
    let objs = evt.detail.intersectedEls;  // array
    for (let i=0; i<objs.length; i++) {
      let obj = objs[i];
      let vectorIndex = obj.getAttribute('index');
      let vectorDot = obj.components['dot-health'];
      if (this.isContagious(vectorDot, this.el.sceneEl.time)) {
        this.expose(this.el.sceneEl.time);
      }
    }
  },

});
