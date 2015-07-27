var BaseKey = require('./BaseKey');

var ToggleBlockType = require('../Manipulation/ToggleBlockType');

var KEY_CODES = { '1': 49 };

class H1Key extends BaseKey {
  constructor(content, selection) {
    super(content, selection);
  }

  static getName() {
    return 'h1-key';
  }

  // meta+alt+1
  matches(event) {
    if (!event.metaKey && !event.ctrlKey) { return false; }
    if (!event.altKey) { return false; }

    return event.keyCode === KEY_CODES['1'];
  }

  down(callback) {
    var guids   = this.selection.guids();
    var offsets = this.selection.offsets();
    var results = this._toggleBlockType().execute(guids, offsets, { type: 'h2' });

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

  _toggleBlockType() {
    return new ToggleBlockType(this.content);
  }
}

module.exports = H1Key;
