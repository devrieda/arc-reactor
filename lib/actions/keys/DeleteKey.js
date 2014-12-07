var ContentManager = require('../../modules/ContentManager');
var SelectionState = require('../../state/SelectionState');

class DeleteKey {
  constructor(content, selection) {
    this.selection = selection;
    this.contentManager = new ContentManager(content);
  }

  press() {
    var block = this.contentManager.findBlock(guid);

    if (this.selection.crossBlock()) {
      return this.contentManager.combineBlocks();

    } else if (this.selection.endOfBlock()) {
      // get text for next node
      // delete next node
      // append text to this node
      console.log('delete!!');
      return true;
    }
    return false;
  }
}

module.exports = DeleteKey;
