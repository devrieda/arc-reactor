var SelectionState = require('../../state/SelectionState');

class Header2Button {
  constructor(contentManager, selection) {
    this.contentManager = contentManager;
    this.selection = selection;
  }

  press() {
    var guid = this.selection.anchor.guid;
    var types = this.contentManager.toggleBlockType(guid, 'h3');
    this.contentManager.flush();

    this.selection.replaceType(types.oldType, types.newType);
    SelectionState.set({selection: this.selection});
  }
}

module.exports = Header2Button;
