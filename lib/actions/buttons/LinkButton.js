var ContentManager = require('../../modules/ContentManager');
var SelectionState = require('../../state/SelectionState');

class LinkButton {
  constructor(content, selection) {
    this.selection = selection;
    this.contentManager = new ContentManager(content);
  }

  press(active, value) {
    var guid   = this.selection.anchor.guid;
    var active = this.selection.hasType('a');
    var block  = this.contentManager.findBlock(guid);

    var markup = {
      "begin": this.selection.anchor.blockOffset,
      "end":   this.selection.focus.blockOffset
    }
    this.contentManager.toggleMarkup(block, 'links', active, markup);

    this.contentManager.flush();
    SelectionState.set({selection: this.selection});
  }
}

module.exports = LinkButton;
