var ContentState = require('../state/ContentState');
var SelectionState = require('../state/SelectionState');

var ReturnKey = require('./keys/ReturnKey');
var BspaceKey = require('./keys/BspaceKey');
var DeleteKey = require('./keys/DeleteKey');
var OtherKey = require('./keys/OtherKey');

var BoldButton = require('./buttons/BoldButton');
var ItalicButton = require('./buttons/ItalicButton');
var CenterButton = require('./buttons/CenterButton');

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

  pressBold() {
    var button = new BoldButton(this.content, this.selection);
    return button.press();
  }

  pressItalic() {
    var button = new ItalicButton(this.content, this.selection);
    return button.press();
  }

  pressCenter() {
    var button = new CenterButton(this.content, this.selection);
    return button.press();
  }

  focusToolbar() {
    console.log('toolbar')
    return true;
  }
}

module.exports = KeyActions;
