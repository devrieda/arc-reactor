var History = require('../History');
var BaseKey = require('./BaseKey');

var KEY_CODES = { 'z': 90 };

class UndoKey extends BaseKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'undo-key';
  }

  // meta+b
  matches(event) {
    if (!event.metaKey && !event.ctrlKey) { return false; }
    if (event.altKey || event.shiftKey) { return false; }

    return event.keyCode === KEY_CODES.z;
  }

  down(callback) {
    if (window.DEBUG) { console.log('undo'); }

    var { content, position } = History.getInstance().undo();
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

module.exports = UndoKey;
