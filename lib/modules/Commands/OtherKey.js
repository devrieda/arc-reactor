var ChangeText = require('../Manipulation/ChangeText');

class OtherKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'other-key';
  }

  // catch-all for all other keys
  matches() {
    return true;
  }

  execute() {
    var guids = this.selection.guids();
    var offsets = this.selection.offsets();
    // var results, prevent;

    if (window.DEBUG) { console.log('other key', guids, offsets); }

    // if (this.selection.crossBlock()) {
    //   results = this.manager.combineBlocks(guids, offsets);

    // } else {
    var node = document.getElementsByName(guids.anchor)[0];
    var text = node && node.textContent;
    this._changeText().execute(guids, {}, { text: text });
    // }

    // if we need to focus on the new block
    // if (results && results.block) {
    //   this.selection.focusOn(results.block.id, results.offset);
    //   prevent = true;
    // }

    return {
      content: this.content,
      selection: this.selection,
      stopPropogation: false,
      preventDefault: false,
      emit: false
    };
  }

  _changeText() {
    return new ChangeText(this.content);
  }
}

module.exports = OtherKey;
