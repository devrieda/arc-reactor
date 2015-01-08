var SelectionState = require('../../state/SelectionState');

class ReturnKey {
  constructor(manager, selection) {
    this.manager   = manager;
    this.selection = selection;
  }

  press() {
    var guids = this.selection.guids();
    var offsets = this.selection.offsets();
    var results;

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
      SelectionState.set({selection: this.selection});
    }

    return true;
  }
}

module.exports = ReturnKey;
