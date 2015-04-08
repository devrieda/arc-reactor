var History = require('../History');

var KEY_CODES = { 'z': 90, 'y': 89  };

class RedoKey {
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
    if (event.altKey) { return false; }

    return event.keyCode === KEY_CODES.y ||
      (event.keyCode === KEY_CODES.z && event.shiftKey);
  }

  // no-op for underlines
  execute() {
    if (window.DEBUG) { console.log('redo'); }

    var { content, position } = History.getInstance().redo();
    this.selection.focusOn(position.guid, position.offset);

    return {
      content: content,
      selection: this.selection,
      stopPropogation: true,
      preventDefault: true,
      emit: true
    };
  }
}

module.exports = RedoKey;
