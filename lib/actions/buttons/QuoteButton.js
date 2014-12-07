var SelectionState = require('../../state/SelectionState');

class QuoteButton {
  constructor(contentManager, selection) {
    this.contentManager = contentManager;
    this.selection = selection;
  }

  press() {
    var guid  = this.selection.anchor.guid;
    var block = this.contentManager.findBlock(guid);
    var oldType = block.type;

    this.contentManager.toggleBlockTag(block, 'blockquote');
    this.contentManager.flush();

    this.selection.replaceType(oldType, block.type);
    SelectionState.set({selection: this.selection});
  }
}

module.exports = QuoteButton;
