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

  execute() {
    var guids   = this.selection.guids();
    var offsets = this.selection.offsets();
    var results = this._toggleCenter().execute(guids, offsets);

    if (window.DEBUG) { console.log('center', guids, offsets); }

    // track content state and where cursor is
    History.getInstance().push({
      content: results.content,
      position: this.selection.position()
    });

    return {
      content: results.content,
      selection: this.selection,
      stopPropogation: true,
      preventDefault: true,
      emit: true
    };
  }

  _toggleCenter() {
    return new ToggleCenter(this.content);
  }
}

module.exports = CenterKey;
