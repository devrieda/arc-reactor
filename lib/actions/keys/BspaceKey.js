var SelectionState = require('../../state/SelectionState');

class BspaceKey {
  constructor(contentManager, selection) {
    this.contentManager = contentManager;
    this.selection = selection;
  }

  press() {
    var guids = this.selection.guids();

    if (this.selection.crossBlock()) {
      var results = this.contentManager.combineBlocks(guids);

    } else if (this.selection.begOfBlock()) {
      var results = this.contentManager.combineWithPrevious(guids);

      if (results && results.block) {
        this.selection.focusOn(previous.id, offset);
        SelectionState.set({selection: this.selection});
        return true;
      }
    }
    return false;
  }
}

module.exports = BspaceKey;
