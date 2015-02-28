var EditorStore = require('../../stores/EditorStore');

class BspaceKey {
  constructor(manager, selection) {
    this.manager   = manager;
    this.selection = selection;
  }

  press() {
    var guids = this.selection.guids();
    var offsets = this.selection.offsets();
    var results;

    if (this.selection.crossBlock()) {
      results = this.manager.combineBlocks(guids, offsets);

    } else if (this.selection.begOfBlock()) {
      results = this.manager.combineBlockWithPrevious(guids);
    }

    // if we need to focus on the new block
    if (results && results.block) {
      this.selection.focusOn(results.block.id, results.offset);
      EditorStore.set({selection: this.selection});
      return true;
    }

    return false;
  }
}

module.exports = BspaceKey;
