class H2Button {
  constructor(manager, selection) {
    this.manager = manager;
    this.selection = selection;
  }

  press() {
    var guids = this.selection.guids();
    this.manager.toggleBlockType(guids, 'h3');
  }
}

module.exports = H2Button;
