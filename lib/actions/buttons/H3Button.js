var SelectionState = require('../../state/SelectionState');

class Header3Button {
  constructor(contentManager, selection) {
    this.contentManager = contentManager;
    this.selection = selection;
  }

  press() {
    var guids = this.selection.guids();
    var types = this.contentManager.toggleBlockType(guids, 'h4');
    this.contentManager.flush();

    this.selection.replaceType(types.oldType, types.newType);
    SelectionState.set({selection: this.selection});
  }
}

module.exports = Header3Button;
