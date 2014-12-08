var SelectionState = require('../../state/SelectionState');

class CenterButton {
  constructor(manager, selection) {
    this.manager = manager;
    this.selection = selection;
  }

  press() {
    var guids = this.selection.guids();

    this.manager.toggleCenter(guids);
    this.manager.flush();

    this.selection.centered = !this.selection.centered;
    SelectionState.set({selection: this.selection});

    return true;
  }
}

module.exports = CenterButton;
