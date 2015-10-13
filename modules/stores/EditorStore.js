const assign = require("react/lib/Object.assign");
const pick   = require("lodash.pick");

let _listeners = [];
let _state = {};
let _changed = [];

const EditorStore = {
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
    const index = _listeners.indexOf(onChange);

    if (index > -1) {
      _listeners.splice(index, 1);
    }
  },

  emit() {
    _listeners.forEach((onChange) => onChange(this));
  }
};

export default EditorStore;
