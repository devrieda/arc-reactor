class H1Button {
  constructor(manager, selection) {
    this.manager = manager;
    this.selection = selection;
  }

  press() {
    var guids = this.selection.guids();
    this.manager.toggleBlockType(guids, 'h2');
  }
}

module.exports = H1Button;
