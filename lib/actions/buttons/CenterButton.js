class CenterButton {
  constructor(manager, selection) {
    this.manager = manager;
    this.selection = selection;
  }

  press() {
    var guids = this.selection.guids();
    this.manager.toggleCenter(guids);
  }
}

module.exports = CenterButton;
