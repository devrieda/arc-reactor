var ContentManager = require('../../modules/ContentManager');
var SelectionState = require('../../state/SelectionState');

class OtherKey {
  constructor(content, selection) {
    this.selection = selection;
    this.contentManager = new ContentManager(content);
  }

  press() {
    var guid = this.selection.anchor.guid;
    var block = this.contentManager.findBlock(guid);

    // set block text to existing content
    block.text = document.getElementsByName(guid)[0].textContent;
  }
}

module.exports = OtherKey;
