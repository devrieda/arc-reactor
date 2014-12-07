var ContentManager = require('../../modules/ContentManager');
var SelectionState = require('../../state/SelectionState');

class ToolbarKey {
  constructor(content, selection) {
    this.selection = selection;
    this.contentManager = new ContentManager(content);
  }

  press() {
    console.log('toolbar!')
  }
}

module.exports = ToolbarKey;
