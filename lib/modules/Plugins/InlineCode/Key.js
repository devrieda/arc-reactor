var ToggleBlockType = require('../../Manipulation/ToggleBlockType');

var KEY_CODES = { '6': 54 };

class Key {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'code-key';
  }

  // alt+meta+6
  matches(event) {
    if (!event.metaKey && !event.ctrlKey) { return false; }
    return event.altKey && event.keyCode === KEY_CODES['6'];
  }

  down(callback) {
    var guids   = this.selection.guids();
    var offsets = this.selection.offsets();

    var toggle  = ToggleBlockType(this.content);
    var results = toggle.execute(guids, offsets, { type: 'pre' });

    this._saveHistory(results.content, this.selection.position());
    this._respond(callback, results.content, true, true, true);
  }

  up(callback) {
    this._respond(callback);
  }

  _saveHistory(content, position) {
    History.getInstance().push({ content, position });
  }

  _respond(callback, content, selection, stop, prevent, emit) {
    callback({
      content: content || this.content,
      selection: selection || this.selection,
      stopPropagation: stop || false,
      preventDefault: prevent || false,
      emit: emit || false,
    });
  }
}

module.exports = Key;
