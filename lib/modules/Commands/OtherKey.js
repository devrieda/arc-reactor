var ContentManager = require('../ContentManager');

class OtherKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;

    // temp until modules/Manipulation is done
    this.manager = new ContentManager(this.content);
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
    // var text = document.getElementsByName(guids.anchor)[0].textContent;
    // this.manager.updateText(guids, text);
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
}

module.exports = OtherKey;
