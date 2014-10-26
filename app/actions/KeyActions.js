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

  boldText() {
    console.log('bold')
    return true;
  }

  italicText() {
    console.log('italic')
    return true;
  }

  centerText() {
    console.log('center')
    return true;
  }

  focusToolbar() {
    console.log('toolbar')
    return true;
  }
}

module.exports = KeyActions;
