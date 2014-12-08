var SelectionState = require('../../state/SelectionState');

class ItalicButton {
  constructor(manager, selection) {
    this.manager = manager;
    this.selection = selection;
  }

  press() {
    var guids = this.selection.guids();
    var active = this.selection.hasType('em');

    var markup = {
      "begin": this.selection.anchor.blockOffset,
      "end":   this.selection.focus.blockOffset
    }
    this.manager.toggleMarkup(guids, 'italics', active, markup);
    this.manager.flush();

    this.selection[active ? "removeType" : "addType"]('em');
    SelectionState.set({selection: this.selection});

    return true;
  }
}

module.exports = ItalicButton;
