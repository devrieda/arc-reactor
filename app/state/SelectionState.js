var SelectionState = {
  _state: {},

  get: function() {
    return this._state;
  },

  set: function(state) {
    this._state = state;
    this.notify();
  },

  // observer
  callbacks: [],

  register: function(cb) {
    this.callbacks.push(cb);
  },

  notify: function() {
    this.callbacks.forEach(function(cb) {
      cb(this._state);
    }.bind(this));
  }
};

module.exports = SelectionState;
