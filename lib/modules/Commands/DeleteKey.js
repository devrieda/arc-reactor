var ContentManager = require('../ContentManager');

var KEY_CODES = { 'delete': 46 };

class DeleteKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;

    // temp until modules/Manipulation is done
    this.manager = new ContentManager(this.content);
  }

  static getName() {
    return 'delete-key';
  }

  matches(event) {
    return event.keyCode === KEY_CODES.delete;
  }

  execute() {
    var guids = this.selection.guids();
    var offsets = this.selection.offsets();
    var results, prevent;

    if (window.DEBUG) { console.log('delete', guids, offsets); }

    if (this.selection.crossBlock()) {
      results = this.manager.combineBlocks(guids, offsets);

    } else if (this.selection.endOfBlock()) {
      results = this.manager.combineBlockWithNext(guids);
    }

    // if we need to focus on the new block
    if (results && results.block) {
      this.selection.focusOn(results.block.id, results.offset);
      prevent = true;
    }

    var content = results ? results.content : this.content;

    return {
      content: results.content,
      selection: this.selection,
      stopPropogation: true,
      preventDefault: prevent,
      emit: true
    };
  }
}

module.exports = DeleteKey;
