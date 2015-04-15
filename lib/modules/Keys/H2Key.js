var History = require('../History');

var ToggleBlockType = require('../Manipulation/ToggleBlockType');

var KEY_CODES = { '2': 50 };

class H2Key {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'h2-key';
  }

  // meta+e
  matches(event) {
    if (!event.metaKey && !event.ctrlKey) { return false; }
    if (!event.altKey) { return false; }

    return event.keyCode === KEY_CODES['2'];
  }

  execute(callback) {
    var guids   = this.selection.guids();
    var offsets = this.selection.offsets();

    if (window.DEBUG) { console.log('h2', guids, offsets); }

    var results = this._toggleBlockType().execute(guids, offsets, { type: 'h3' });

    this._complete(results, callback);
  }

  _complete(results, callback) {
    this._saveHistory(results.content);

    callback({
      content: results.content,
      selection: this.selection,
      stopPropagation: true,
      preventDefault: true,
      emit: true
    });
  }

  _saveHistory(content) {
    var position = this.selection.position();
    History.getInstance().push({ content: content, position: position });
  }

  _toggleBlockType() {
    return new ToggleBlockType(this.content);
  }
}

module.exports = H2Key;