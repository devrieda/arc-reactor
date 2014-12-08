var SelectionState = require('../../state/SelectionState');

class H2Button {
  constructor(manager, selection) {
    this.manager = manager;
    this.selection = selection;
  }

  press() {
    var guids = this.selection.guids();
    var types = this.manager.toggleBlockType(guids, 'h3');
    this.manager.flush();

    this.selection.replaceType(types.oldType, types.newType);
    SelectionState.set({selection: this.selection});
  }
}

module.exports = H2Button;
