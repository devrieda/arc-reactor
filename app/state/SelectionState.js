var SelectionState = {
  _state: {},

  getState: function() {
    return this._state;
  },

  setState: function(state) {
    this._state = state;
    this.notify();
  },

  // observer
  callbacks: [],

  register: function(cb) {
    this.callbacks.push(cb);
  },

  notify: function() {
    this.callbacks.forEach(function(cb) { cb(this); })
  }
};

module.exports = SelectionState;

