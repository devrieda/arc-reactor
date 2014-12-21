class ItalicButton {
  constructor(manager, selection) {
    this.manager = manager;
    this.selection = selection;
  }

  press() {
    var guids = this.selection.guids();
    var active = this.selection.hasType('em');

    var markup = {
      "begin": this.selection.anchor.blockOffset,
      "end":   this.selection.focus.blockOffset
    }
    this.manager.toggleMarkup(guids, 'italics', active, markup);
  }
}

module.exports = ItalicButton;
