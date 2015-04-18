var BaseKey = require('./BaseKey');

var ToggleMarkup = require('../Manipulation/ToggleMarkup');

var KEY_CODES = { 'i': 73 };

class ItalicKey extends BaseKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'italic-key';
  }

  // meta+i
  matches(event) {
    if (!event.metaKey && !event.ctrlKey) { return false; }
    if (event.altKey) { return false; }

    return event.keyCode === KEY_CODES.i;
  }

  down(callback) {
    var guids   = this.selection.guids();
    var offsets = this.selection.offsets();
    var results = this._toggleMarkup().execute(guids, offsets, { type: 'em' });

    this._complete(results, callback);
  }

  _complete(results, callback) {
    this.saveHistory(results.content);

    callback({
      content: results.content,
      selection: this.selection,
      stopPropagation: true,
      preventDefault: true,
      emit: true
    });
  }

  _toggleMarkup() {
    return new ToggleMarkup(this.content);
  }
}

module.exports = ItalicKey;
