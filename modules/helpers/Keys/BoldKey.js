var BaseKey = require('./BaseKey');

var ToggleMarkup = require('../Manipulation/ToggleMarkup');

var KEY_CODES = { 'b': 66 };

class BoldKey extends BaseKey {
  constructor(content, selection) {
    super(content, selection);
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

  down(callback) {
    var guids   = this.selection.guids();
    var offsets = this.selection.offsets();
    var results = this._toggleMarkup().execute(guids, offsets, { type: 'strong' });

    this._complete(results, callback);
  }

  _complete(results, callback) {
    this.saveHistory(results.content);

    callback({
      content: results.content,
      block: null,
      offset: null,
      stopPropagation: true,
      preventDefault: true,
      emit: true
    });
  }

  _toggleMarkup() {
    return new ToggleMarkup(this.content);
  }
}

module.exports = BoldKey;
