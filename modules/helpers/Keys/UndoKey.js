var History = require('../History');
var BaseKey = require('./BaseKey');

var KEY_CODES = { 'z': 90 };

class UndoKey extends BaseKey {
  constructor(content, selection) {
    super(content, selection);
  }

  static getName() {
    return 'undo-key';
  }

  // meta+z
  matches(event) {
    if (!event.metaKey && !event.ctrlKey) { return false; }
    if (event.altKey || event.shiftKey) { return false; }

    return event.keyCode === KEY_CODES.z;
  }

  down(callback) {
    var { content, position } = History.getInstance().undo();

    callback({
      content: content,
      position: position,
      stopPropagation: true,
      preventDefault: true,
      emit: true
    });
  }
}

module.exports = UndoKey;
