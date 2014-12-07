var SelectionState = require('../../state/SelectionState');

class BoldButton {
  constructor(contentManager, selection) {
    this.contentManager = contentManager;
    this.selection = selection;
  }

  press() {
    var guid   = this.selection.anchor.guid;
    var active = this.selection.hasType('strong');

    var markup = {
      "begin": this.selection.anchor.blockOffset,
      "end":   this.selection.focus.blockOffset
    }
    this.contentManager.toggleMarkup(guid, 'bolds', active, markup);
    this.contentManager.flush();

    this.selection[active ? "removeType" : "addType"]('strong');
    SelectionState.set({selection: this.selection});

    return true;
  }
}

module.exports = BoldButton;
