var SelectionState = require('../../state/SelectionState');

class ReturnKey {
  constructor(contentManager, selection) {
    this.contentManager = contentManager;
    this.selection = selection;
  }

  press() {
    var block;

    if (this.selection.isRange()) {
      var anchor = this.selection.anchor.guid;
      var focus  = this.selection.focus.guid;
      this.contentManager.combineBlocks(anchor, focus);

    // caret
    } else {
      var guid = this.selection.anchor.guid;

      if (this.selection.endOfBlock()) {
        block = this.contentManager.appendBlock(guid);

      // enter at beginning of block
      } else if (this.selection.begOfBlock()) {
        this.contentManager.prependBlock(guid);

      // split current two
      } else {
        var offset = this.selection.anchor.blockOffset;
        block = this.contentManager.splitBlock(guid, offset);

      }
    }

    // if we need to focus on the new block
    if (block) {
      this.selection.focusOn(block.id);
      SelectionState.set({selection: this.selection});
    }

    this.contentManager.flush();

    return true;
  }


}

module.exports = ReturnKey;
