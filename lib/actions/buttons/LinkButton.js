class LinkButton {
  constructor(manager, selection) {
    this.manager = manager;
    this.selection = selection;
  }

  press(value) {
    var guids   = this.selection.guids();
    var offsets = this.selection.offsets();

    this.manager.toggleMarkup(guids, offsets, 'links', value);
  }
}

module.exports = LinkButton;
