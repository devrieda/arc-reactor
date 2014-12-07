var SelectionState = require('../../state/SelectionState');

class ToolbarKey {
  constructor(contentManager, selection) {
    this.contentManager = contentManager;
    this.selection = selection;
  }

  press() {
    console.log('toolbar!')
  }
}

module.exports = ToolbarKey;
