var SelectionState = require('../../state/SelectionState');

class QuoteButton {
  constructor(manager, selection) {
    this.manager = manager;
    this.selection = selection;
  }

  press() {
    var guids = this.selection.guids();
    var types = this.manager.toggleBlockType(guids, 'blockquote');
    this.manager.flush();

    this.selection.replaceType(types.oldType, types.newType);
    SelectionState.set({selection: this.selection});
  }
}

module.exports = QuoteButton;
