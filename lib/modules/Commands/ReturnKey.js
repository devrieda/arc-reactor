var ContentManager = require('../ContentManager');

var KEY_CODES = { 'return': 13, 'm': 77 };

class ReturnKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
    this.manager   = new ContentManager(this.content);
  }

  static getName() {
    return 'return-key';
  }

  // return or ctrl+m
  matches(event) {
    return event.keyCode == KEY_CODES['return'] || 
      (event.keyCode == KEY_CODES['m'] && event.ctrlKey);
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
