var History = require('../History');

var ToggleCenter = require('../Manipulation/ToggleCenter');

var KEY_CODES = { 'e': 69 };

class CenterKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'center-key';
  }

  // meta+e
  matches(event) {
    if (!event.metaKey && !event.ctrlKey) { return false; }
    if (event.altKey) { return false; }

    return event.keyCode === KEY_CODES.e;
  }

  execute(callback) {
    var guids   = this.selection.guids();
    var offsets = this.selection.offsets();

    if (window.DEBUG) { console.log('center', guids, offsets); }

    var results = this._toggleCenter().execute(guids, offsets);

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

  _toggleCenter() {
    return new ToggleCenter(this.content);
  }
}

module.exports = CenterKey;
