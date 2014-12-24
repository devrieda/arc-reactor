class ItalicButton {
  constructor(manager, selection) {
    this.manager = manager;
    this.selection = selection;
  }

  press() {
    var guids   = this.selection.guids();
    var offsets = this.selection.offsets();

    this.manager.toggleMarkup(guids, offsets, 'em');
  }
}

module.exports = ItalicButton;
