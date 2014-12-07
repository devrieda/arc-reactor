var ContentManager = require('../../modules/ContentManager');
var SelectionState = require('../../state/SelectionState');

class ItalicButton {
  constructor(content, selection) {
    this.selection = selection;
    this.contentManager = new ContentManager(content);
  }

  press() {
    var guid   = this.selection.anchor.guid;
    var active = this.selection.hasType('em');
    var block  = this.contentManager.findBlock(guid);

    var markup = {
      "begin": this.selection.anchor.blockOffset,
      "end":   this.selection.focus.blockOffset
    }
    this.contentManager.toggleMarkup(block, 'italics', active, markup);
    this.contentManager.flush();

    this.selection[active ? "removeType" : "addType"]('em');
    SelectionState.set({selection: this.selection});

    return true;
  }
}

module.exports = ItalicButton;
