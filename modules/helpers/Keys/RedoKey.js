var History = require('../History');
var BaseKey = require('./BaseKey');

var KEY_CODES = { 'z': 90, 'y': 89  };

class RedoKey extends BaseKey {
  constructor(content, selection) {
    super(content, selection);
  }

  static getName() {
    return 'undo-key';
  }

  // meta+b
  matches(event) {
    if (!event.metaKey && !event.ctrlKey) { return false; }
    if (event.altKey) { return false; }

    return event.keyCode === KEY_CODES.y ||
      (event.keyCode === KEY_CODES.z && event.shiftKey);
  }

  down(callback) {
    var { content, position } = History.getInstance().redo();
    this.selection.focusOn(position.guid, position.offset);

    callback({
      content: content,
      selection: this.selection,
      stopPropagation: true,
      preventDefault: true,
      emit: true
    });
  }
}

module.exports = RedoKey;
