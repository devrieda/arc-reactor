class QuoteButton {
  constructor(manager, selection) {
    this.manager = manager;
    this.selection = selection;
  }

  press() {
    var guids = this.selection.guids();
    this.manager.toggleBlockType(guids, 'blockquote');
  }
}

module.exports = QuoteButton;
