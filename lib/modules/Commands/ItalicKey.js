var ContentManager = require('../ContentManager');

var KEY_CODES = { 'i': 73 };

class ItalicKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;

    // temp until modules/Manipulation is done
    this.manager = new ContentManager(this.content);
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

  execute() {
    var guids   = this.selection.guids();
    var offsets = this.selection.offsets();
    var results = this.manager.toggleMarkup(guids, offsets, 'em');

    if (window.DEBUG) { console.log('italic', guids, offsets); }

    return {
      content: results.content,
      selection: this.selection,
      stopPropogation: true,
      preventDefault: true,
      emit: true
    };
  }
}

module.exports = ItalicKey;
