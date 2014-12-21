class BoldButton {
  constructor(manager, selection) {
    this.manager = manager;
    this.selection = selection;
  }

  press() {
    var guids  = this.selection.guids();
    var active = this.selection.hasType('strong');

    var markup = {
      "begin": this.selection.anchor.blockOffset,
      "end":   this.selection.focus.blockOffset
    }
    this.manager.toggleMarkup(guids, 'bolds', active, markup);
  }
}

module.exports = BoldButton;
