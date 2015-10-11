var BaseKey = require('./BaseKey');

var ToggleBlockType = require('../Manipulation/ToggleBlockType');

var KEY_CODES = { '3': 51 };

class H3Key extends BaseKey {
  constructor(content, selection) {
    super(content, selection);
  }

  static getName() {
    return 'h3-key';
  }

  // meta+alt+3
  matches(event) {
    if (!event.metaKey && !event.ctrlKey) { return false; }
    if (!event.altKey) { return false; }

    return event.keyCode === KEY_CODES['3'];
  }

  down(callback) {
    var guids   = this.selection.guids();
    var offsets = this.selection.offsets();
    var results = this._toggleBlockType().execute(guids, offsets, { type: 'h4' });

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

  _toggleBlockType() {
    return new ToggleBlockType(this.content);
  }
}

module.exports = H3Key;
