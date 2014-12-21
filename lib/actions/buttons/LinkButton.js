class LinkButton {
  constructor(manager, selection) {
    this.manager = manager;
    this.selection = selection;
  }

  press(value) {
    var guids = this.selection.guids();
    var active = this.selection.hasType('a');

    var markup = {
      "begin": this.selection.anchor.blockOffset,
      "end":   this.selection.focus.blockOffset
    }
    this.manager.toggleMarkup(guids, 'links', active, markup);
  }
}

module.exports = LinkButton;
