var SelectionState = require('../../state/SelectionState');

class LinkButton {
  constructor(contentManager, selection) {
    this.contentManager = contentManager;
    this.selection = selection;
  }

  press(value) {
    var guids = this.selection.guids();
    var active = this.selection.hasType('a');

    var markup = {
      "begin": this.selection.anchor.blockOffset,
      "end":   this.selection.focus.blockOffset
    }
    this.contentManager.toggleMarkup(guids, 'links', active, markup);
    this.contentManager.flush();

    this.selection[active ? "removeType" : "addType"]('a');
    SelectionState.set({selection: this.selection});
  }
}

module.exports = LinkButton;
