class QuoteButton {
  constructor(manager, selection) {
    this.manager = manager;
    this.selection = selection;
  }

  press() {
    var guids   = this.selection.guids();
    var offsets = this.selection.offsets();
    this.manager.toggleBlockType(guids, offsets, 'blockquote');
  }
}

module.exports = QuoteButton;
