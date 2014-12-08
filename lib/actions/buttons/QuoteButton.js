var SelectionState = require('../../state/SelectionState');

class QuoteButton {
  constructor(contentManager, selection) {
    this.contentManager = contentManager;
    this.selection = selection;
  }

  press() {
    var guids = this.selection.guids();
    var types = this.contentManager.toggleBlockType(guids, 'blockquote');
    this.contentManager.flush();

    this.selection.replaceType(types.oldType, types.newType);
    SelectionState.set({selection: this.selection});
  }
}

module.exports = QuoteButton;
