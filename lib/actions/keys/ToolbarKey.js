var EditorStore = require('../../stores/EditorStore');

class ToolbarKey {
  constructor(manager, selection) {
    this.manager   = manager;
    this.selection = selection;
  }

  press() {
    console.log('toolbar!')
  }
}

module.exports = ToolbarKey;
