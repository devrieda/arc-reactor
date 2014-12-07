var ContentManager = require('../../modules/ContentManager');
var SelectionState = require('../../state/SelectionState');

class QuoteButton {
  constructor(content, selection) {
    this.selection = selection;
    this.contentManager = new ContentManager(content);
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
