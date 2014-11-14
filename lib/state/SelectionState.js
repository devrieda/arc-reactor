var SelectionState = {
  _state: {},

  get() {
    return this._state;
  },

  set(state) {
    this._state = state;
    this.notify();
  },

  // observer
  callbacks: [],

  register(cb) {
    this.callbacks.push(cb);
  },

  notify() {
    this.callbacks.forEach( (cb) => {
      cb(this._state);
    });
  }
};

module.exports = SelectionState;
