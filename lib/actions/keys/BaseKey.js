var EditorStore = require('../../stores/EditorStore');
var ContentManager = require('../../modules/ContentManager');

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
  press(content, selection, type) {
    var manager = new ContentManager(content);
    var key = new keys[type+ 'Key'](manager, selection);
    var result = key.press();

    if (result) {
      EditorStore.set({content: content});
    }
    return result;
  }
}

module.exports = BaseKey;
