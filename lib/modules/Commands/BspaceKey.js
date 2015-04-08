var CombineBlocks    = require('../Manipulation/CombineBlocks');
var CombineBlockPrev = require('../Manipulation/CombineBlockPrev');

var KEY_CODES = { 'bspace': 8 };

class BspaceKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'bspace-key';
  }

  // return or ctrl+m
  matches(event) {
    return event.keyCode === KEY_CODES.bspace;
  }

  execute() {
    var guids = this.selection.guids();
    var offsets = this.selection.offsets();
    var results, prevent;

    if (window.DEBUG) { console.log('bspace', guids, offsets); }

    if (this.selection.crossBlock()) {
      results = this._combineBlocks().execute(guids, offsets);

    } else if (this.selection.begOfBlock()) {
      results = this._combineWithPrev().execute(guids);
    }

    // if we need to focus on the new block
    if (results && results.block) {
      this.selection.focusOn(results.block.get('id'), results.offset);
      prevent = true;
    }

    var content = results ? results.content : this.content;

    return {
      content: content,
      selection: this.selection,
      stopPropogation: !!results,
      preventDefault: prevent,
      emit: true
    };
  }

  _combineBlocks() {
    return new CombineBlocks(this.content);
  }

  _combineWithPrev() {
    return new CombineBlockPrev(this.content);
  }
}

module.exports = BspaceKey;
