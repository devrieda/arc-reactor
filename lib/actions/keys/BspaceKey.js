var ContentManager = require('../../modules/ContentManager');
var SelectionState = require('../../state/SelectionState');

class BspaceKey {
  constructor(content, selection) {
    this.selection = selection;
    this.contentManager = new ContentManager(content);
  }

  press() {
    if (this.selection.crossBlock()) {
      return this.contentManager.combineBlocks();

    } else if (this.selection.begOfBlock()) {
      var guid = this.selection.anchor.guid;

      // get text for this node
      // delete this node
      // append text to previous node
      var block = this.contentManager.findBlock(guid);
      var previous = this.contentManager.findPreviousBlock(guid)

      if (previous) {
        var offset = previous.text.length;
        previous.text = previous.text + block.text;
        this.contentManager.removeBlock(guid);

        this.selection.focusOn(previous.id, offset);
        SelectionState.set({selection: this.selection});
        return true;

      } else {
        return false;
      }
    }
    return false;
  }
}

module.exports = BspaceKey;
