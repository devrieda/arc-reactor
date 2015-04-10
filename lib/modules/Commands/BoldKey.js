var History = require('../History');

var ToggleMarkup = require('../Manipulation/ToggleMarkup');

var KEY_CODES = { 'b': 66 };

class BoldKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'bold-key';
  }

  // meta+b
  matches(event) {
    if (!event.metaKey && !event.ctrlKey) { return false; }
    if (event.altKey) { return false; }

    return event.keyCode === KEY_CODES.b;
  }

  execute(callback) {
    var guids   = this.selection.guids();
    var offsets = this.selection.offsets();

    if (window.DEBUG) { console.log('bold', guids, offsets); }

    var results = this._toggleMarkup().execute(guids, offsets, { type: 'strong' });

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

  _toggleMarkup() {
    return new ToggleMarkup(this.content);
  }
}

module.exports = BoldKey;
