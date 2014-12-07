var SelectionState = require('../../state/SelectionState');

class Header2Button {
  constructor(contentManager, selection) {
    this.contentManager = contentManager;
    this.selection = selection;
  }

  press() {
    var guid  = this.selection.anchor.guid;
    var block = this.contentManager.findBlock(guid);
    var fromType = block.type;

    this.contentManager.toggleBlockTag(block, 'h3');
    this.contentManager.flush();

    this.selection.replaceType(fromType, block.type);
    SelectionState.set({selection: this.selection});
  }
}

module.exports = Header2Button;
