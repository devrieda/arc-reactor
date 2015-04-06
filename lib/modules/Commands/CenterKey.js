var ContentManager = require('../ContentManager');

var KEY_CODES = { 'e': 69 };

class CenterKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;

    // temp until modules/Manipulation is done
    this.manager = new ContentManager(this.content);
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
    var results = this.manager.toggleCenter(guids, offsets);

    if (window.DEBUG) { console.log('center', guids, offsets); }

    return {
      content: results.content,
      selection: this.selection,
      stopPropogation: true,
      preventDefault: true,
      emit: true
    };
  }
}

module.exports = CenterKey;
