var SelectionState = require('../../state/SelectionState');

class QuoteButton {
  constructor(contentManager, selection) {
    this.contentManager = contentManager;
    this.selection = selection;
  }

  press() {
    var guid = this.selection.anchor.guid;
    var types = this.contentManager.toggleBlockType(guid, 'blockquote');
    this.contentManager.flush();

    this.selection.replaceType(types.oldType, types.newType);
    SelectionState.set({selection: this.selection});
  }
}

module.exports = QuoteButton;
