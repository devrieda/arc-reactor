var ContentState = require('../state/ContentState');
var SelectionState = require('../state/SelectionState');

var ReturnKey = require('./keys/ReturnKey');
var BspaceKey = require('./keys/BspaceKey');
var DeleteKey = require('./keys/DeleteKey');
var OtherKey = require('./keys/OtherKey');

class KeyActions {
  constructor() {
    this.content   = ContentState.get();
    this.selection = SelectionState.get();

    // observe state changes
    ContentState.register( (state) => { this.content = state.content; });
    SelectionState.register( (state) => { this.selection = state.selection; });
  }

  pressButton(button, active) {
    this[button+"Selection"](active)
  }

  // key presses
  type() {
    var key = new OtherKey(this.content, this.selection);
    return key.press();
  }
  pressReturn() {
    var key = new ReturnKey(this.content, this.selection);
    return key.press();
  }
  pressDelete() {
    var key = new DeleteKey(this.content, this.selection);
    return key.press();
  }
  pressBspace() {
    var key = new BspaceKey(this.content, this.selection);
    return key.press();
  }

  focusToolbar() {
    console.log('toolbar')
  }
}

module.exports = KeyActions;
