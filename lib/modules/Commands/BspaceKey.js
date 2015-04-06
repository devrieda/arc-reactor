var ContentManager = require('../ContentManager');

var KEY_CODES = { 'bspace': 8 };

class BspaceKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;

    // temp until modules/Manipulation is done
    this.manager = new ContentManager(this.content);
  }

  static getName() {
    return 'bspace-key';
  }

  // return or ctrl+m
  matches(event) {
    return event.keyCode === KEY_CODES.bspace;
  }

  execute() {
    var guids = this.selection.guids();
    var offsets = this.selection.offsets();
    var results, prevent;

    if (window.DEBUG) { console.log('bspace', guids, offsets); }

    if (this.selection.crossBlock()) {
      results = this.manager.combineBlocks(guids, offsets);

    } else if (this.selection.begOfBlock()) {
      results = this.manager.combineBlockWithPrevious(guids);
    }

    // if we need to focus on the new block
    if (results && results.block) {
      this.selection.focusOn(results.block.id, results.offset);
      prevent = true;
    }

    var content = results ? results.content : this.content;

    return {
      content: content,
      selection: this.selection,
      stopPropogation: true,
      preventDefault: prevent,
      emit: true
    };
  }
}

module.exports = BspaceKey;
