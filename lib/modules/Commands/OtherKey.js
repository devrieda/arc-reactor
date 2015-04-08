var History = require('../History');

var ChangeText = require('../Manipulation/ChangeText');

var KEY_CODES = {
  'shift': 16, 'ctrl': 17, 'alt': 18, 'meta': 91,
  'left': 37, 'up': 38, 'right': 39, 'down': 40
};

class OtherKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'other-key';
  }

  // catch-all for all content keys
  matches(event) {
    var ignores = Object.keys(KEY_CODES).map(key => KEY_CODES[key]);
    return ignores.indexOf(event.keyCode) === -1;
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
    var result = this._changeText().execute(guids, {}, { text: text });
    var content = result.content;
    // }

    // if we need to focus on the new block
    // if (results && results.block) {
    //   this.selection.focusOn(results.block.get('id'), results.offset);
    //   prevent = true;
    // }

    // track content state and where cursor is
    History.getInstance().push({
      content: content,
      position: this.selection.position()
    });

    return {
      content: content,
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
