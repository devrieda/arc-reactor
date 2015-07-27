var assign = require("react/lib/Object.assign");
var pick   = require("lodash.pick");

var _listeners = [];
var _state = {};
var _changed = [];

var EditorStore = {
  set(state, emit) {
    emit = emit !== false;
    _state = assign(_state, state);
    _changed = Object.keys(state);
    if (emit) { this.emit(); }
  },

  get() {
    return _state;
  },

  getChanged() {
    return pick(_state, _changed);
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

  emit() {
    _listeners.forEach((onChange) => onChange(this));
  }
};

module.exports = EditorStore;
