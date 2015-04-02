var ContentManager = require('../ContentManager');

var KEY_CODES = { 'delete': 46 };

class DeleteKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
    this.manager   = new ContentManager(this.content);
  }

  static getName() {
    return 'delete-key';
  }

  matches(event) {
    return event.keyCode === KEY_CODES['delete'];
  }

  execute() {
    var guids = this.selection.guids();
    var offsets = this.selection.offsets();
    var results;

    if (this.selection.crossBlock()) {
      results = this.manager.combineBlocks(guids, offsets);

    } else if (this.selection.endOfBlock()) {
      results = this.manager.combineBlockWithNext(guids);
    }

    // if we need to focus on the new block
    if (results && results.block) {
      this.selection.focusOn(results.block.id, results.offset);
    }

    return {
      content: this.content,
      selection: this.selection
    };
  }
}

module.exports = DeleteKey;
