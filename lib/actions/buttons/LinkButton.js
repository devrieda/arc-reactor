var SelectionState = require('../../state/SelectionState');

class LinkButton {
  constructor(contentManager, selection) {
    this.contentManager = contentManager;
    this.selection = selection;
  }

  press(value) {
    var guid   = this.selection.anchor.guid;
    var active = this.selection.hasType('a');
    var block  = this.contentManager.findBlock(guid);

    var markup = {
      "begin": this.selection.anchor.blockOffset,
      "end":   this.selection.focus.blockOffset
    }
    this.contentManager.toggleMarkup(block, 'links', active, markup);
    this.contentManager.flush();

    this.selection[active ? "removeType" : "addType"]('a');
    SelectionState.set({selection: this.selection});
  }
}

module.exports = LinkButton;
