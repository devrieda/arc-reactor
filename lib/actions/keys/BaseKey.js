var ContentState = require('../../state/ContentState');
var SelectionState = require('../../state/SelectionState');

var keys = {
  ReturnKey:  require('./ReturnKey'),
  BspaceKey:  require('./BspaceKey'),
  DeleteKey:  require('./DeleteKey'),
  OtherKey:   require('./OtherKey'),
  ToolbarKey: require('./ToolbarKey'),

  BoldKey:    require('../buttons/BoldButton'),
  ItalicKey:  require('../buttons/ItalicButton'),
  CenterKey:  require('../buttons/CenterButton')
}

class BaseKey {
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

module.exports = BaseKey;
