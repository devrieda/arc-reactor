var ContentManager = require('../ContentManager');

class ReturnKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
    this.manager   = new ContentManager(this.content);
  }

  static getName() {
    return 'return-key';
  }

  matches(event) {
    return false;
  }

  execute() {
    // range
    if (this.selection.isRange()) {
      results = this.manager.splitBlock(guids, offsets);

    // caret
    } else if (this.selection.endOfBlock()) {
      results = this.manager.appendBlock(guids);

    // enter at beginning of block
    } else if (this.selection.begOfBlock()) {
      results = this.manager.prependBlock(guids);

    // split current two
    } else {
      results = this.manager.splitBlock(guids, offsets);
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

module.exports = ReturnKey;
