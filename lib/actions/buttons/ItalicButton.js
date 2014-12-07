var SelectionState = require('../../state/SelectionState');

class ItalicButton {
  constructor(contentManager, selection) {
    this.contentManager = contentManager;
    this.selection = selection;
  }

  press() {
    var guid   = this.selection.anchor.guid;
    var active = this.selection.hasType('em');

    var markup = {
      "begin": this.selection.anchor.blockOffset,
      "end":   this.selection.focus.blockOffset
    }
    this.contentManager.toggleMarkup(guid, 'italics', active, markup);
    this.contentManager.flush();

    this.selection[active ? "removeType" : "addType"]('em');
    SelectionState.set({selection: this.selection});

    return true;
  }
}

module.exports = ItalicButton;
