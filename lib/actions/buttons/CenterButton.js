var SelectionState = require('../../state/SelectionState');

class CenterButton {
  constructor(contentManager, selection) {
    this.contentManager = contentManager;
    this.selection = selection;
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
