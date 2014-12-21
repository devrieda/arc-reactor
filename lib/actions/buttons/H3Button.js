class H3Button {
  constructor(manager, selection) {
    this.manager = manager;
    this.selection = selection;
  }

  press() {
    var guids = this.selection.guids();
    this.manager.toggleBlockType(guids, 'h4');
  }
}

module.exports = H3Button;
