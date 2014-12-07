var ContentState = require('../state/ContentState');
var SelectionState = require('../state/SelectionState');

// TODO - move this to BaseKey (just like BaseButton)
var keys = {
  ReturnKey: require('./keys/ReturnKey'),
  BspaceKey: require('./keys/BspaceKey'),
  DeleteKey: require('./keys/DeleteKey'),
  OtherKey:  require('./keys/OtherKey'),

  BoldKey:   require('./buttons/BoldButton'),
  ItalicKey: require('./buttons/ItalicButton'),
  CenterKey: require('./buttons/CenterButton')
}

class KeyActions {
  constructor() {
    this.content   = ContentState.get();
    this.selection = SelectionState.get();

    // observe state changes
    ContentState.register( (state) => { this.content = state.content; });
    SelectionState.register( (state) => { this.selection = state.selection; });
  }

  press(type) {
    var key = new keys[type+ 'Key'](this.content, this.selection);
    return key.press();
  }
}

module.exports = KeyActions;
