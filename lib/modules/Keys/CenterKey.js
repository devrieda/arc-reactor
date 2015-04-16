var History = require('../History');
var BaseKey = require('./BaseKey');

var ToggleCenter = require('../Manipulation/ToggleCenter');

var KEY_CODES = { 'e': 69 };

class CenterKey extends BaseKey {
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

  down(callback) {
    var guids   = this.selection.guids();
    var offsets = this.selection.offsets();
    var results = this._toggleCenter().execute(guids, offsets);

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

  _toggleCenter() {
    return new ToggleCenter(this.content);
  }
}

module.exports = CenterKey;
