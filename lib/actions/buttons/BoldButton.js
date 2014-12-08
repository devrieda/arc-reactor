var SelectionState = require('../../state/SelectionState');

class BoldButton {
  constructor(manager, selection) {
    this.manager = manager;
    this.selection = selection;
  }

  press() {
    var guids  = this.selection.guids();
    var active = this.selection.hasType('strong');

    var markup = {
      "begin": this.selection.anchor.blockOffset,
      "end":   this.selection.focus.blockOffset
    }
    this.manager.toggleMarkup(guids, 'bolds', active, markup);
    this.manager.flush();

    this.selection[active ? "removeType" : "addType"]('strong');
    SelectionState.set({selection: this.selection});

    return true;
  }
}

module.exports = BoldButton;
