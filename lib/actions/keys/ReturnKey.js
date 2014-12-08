var SelectionState = require('../../state/SelectionState');

class ReturnKey {
  constructor(contentManager, selection) {
    this.contentManager = contentManager;
    this.selection = selection;
  }

  press() {
    var guids = this.selection.guids();
    var results;

    // range
    if (this.selection.isRange()) {
      results = this.contentManager.combineBlocks(guids);

    // caret
    } else {
      if (this.selection.endOfBlock()) {
        results = this.contentManager.appendBlock(guids);

      // enter at beginning of block
      } else if (this.selection.begOfBlock()) {
        results = this.contentManager.prependBlock(guids);

      // split current two
      } else {
        var offset = this.selection.anchor.blockOffset;
        results = this.contentManager.splitBlock(guids, offset);
      }
    }

    // if we need to focus on the new block
    if (results && results.block) {
      this.selection.focusOn(results.block.id, results.offset);
      SelectionState.set({selection: this.selection});
    }

    this.contentManager.flush();

    return true;
  }


}

module.exports = ReturnKey;
