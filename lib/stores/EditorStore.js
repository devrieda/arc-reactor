var assign = require("react/lib/Object.assign");

var _listeners = [];
var _state = {};

var EditorStore = {
  set(state, notify) {
    notify = notify !== false;
    _state = assign(_state, state);
    if (notify) { this.notify(); }
  },

  get() {
    return _state;
  },

  addChangeListener(onChange) {
    _listeners.push(onChange);
  },

  removeChangeListener(onChange) {
    var index = _listeners.indexOf(onChange);

    if (index > -1) {
      _listeners.splice(index, 1);
    }
  },

  notify() {
    _listeners.forEach((onChange) => onChange(this));
  }
};

module.exports = EditorStore;
