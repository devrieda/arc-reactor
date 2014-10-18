var ContentState = {
  _state: {
    content: {}
  },

  init: function(state) {
    this._state = state;
  },
  getState: function() {
    return this._state;
  },

  update: function(state) {
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

module.exports = ContentState;
