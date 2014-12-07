var SelectionState = require('../../state/SelectionState');

class OtherKey {
  constructor(contentManager, selection) {
    this.contentManager = contentManager;
    this.selection = selection;
  }

  press() {
    var guid = this.selection.anchor.guid;
    var block = this.contentManager.findBlock(guid);

    // set block text to existing content
    block.text = document.getElementsByName(guid)[0].textContent;
  }
}

module.exports = OtherKey;
