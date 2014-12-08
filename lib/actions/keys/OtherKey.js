var SelectionState = require('../../state/SelectionState');

class OtherKey {
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

    } else {
      var text = document.getElementsByName(guids.anchor)[0].textContent;
      this.manager.updateText(guids, text);
    }

    // if we need to focus on the new block
    if (results && results.block) {
      this.selection.focusOn(results.block.id, results.offset);
      SelectionState.set({selection: this.selection});
      this.manager.flush();
      return true;
    }

    return false;
  }
}

module.exports = OtherKey;
