var ContentManager = require('../../modules/ContentManager');
var SelectionState = require('../../state/SelectionState');

class CenterButton {
  constructor(content, selection) {
    this.selection = selection;
    this.contentManager = new ContentManager(content);
  }

  press() {
    var guid = this.selection.anchor.guid;

    this.contentManager.toggleCenter(guid);
    this.contentManager.flush();

    this.selection.centered = !this.selection.centered;
    SelectionState.set({selection: this.selection});

    return true;
  }
}

module.exports = CenterButton;
