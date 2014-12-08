var SelectionState = require('../../state/SelectionState');

class OtherKey {
  constructor(contentManager, selection) {
    this.contentManager = contentManager;
    this.selection = selection;
  }

  press() {
    var guids = this.selection.guids();
    var text = document.getElementsByName(guids.anchor)[0].textContent;

    this.contentManager.updateText(guids, text);
  }
}

module.exports = OtherKey;
