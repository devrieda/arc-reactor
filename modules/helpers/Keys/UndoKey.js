var History = require('../History');

var KEY_CODES = { 'z': 90 };

class UndoKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
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

  up(callback) {
    callback({ content: this.content });
  }
}

module.exports = UndoKey;
