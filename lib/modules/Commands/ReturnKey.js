var AppendBlock      = require('../Manipulation/AppendBlock');
var PrependBlock     = require('../Manipulation/PrependBlock');
var SplitBlock       = require('../Manipulation/SplitBlock');

var KEY_CODES = { 'return': 13, 'm': 77 };

class ReturnKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'return-key';
  }

  // return or ctrl+m
  matches(event) {
    return event.keyCode === KEY_CODES.return ||
      (event.keyCode === KEY_CODES.m && event.ctrlKey);
  }

  execute() {
    var guids = this.selection.guids();
    var offsets = this.selection.offsets();
    var results;

    if (window.DEBUG) { console.log('return', guids, offsets); }

    // range
    if (this.selection.isRange()) {
      results = this._splitBlock().execute(guids, offsets);

    // caret
    } else if (this.selection.endOfBlock()) {
      results = this._appendBlock().execute(guids);

    // enter at beginning of block
    } else if (this.selection.begOfBlock()) {
      results = this._prependBlock().execute(guids);

    // split current two
    } else {
      results = this._splitBlock().execute(guids, offsets);
    }

    // if we need to focus on the new block
    if (results && results.block) {
      this.selection.focusOn(results.block.id, results.offset);
    }

    var content = results ? results.content : this.content;

    return {
      content: content,
      selection: this.selection,
      stopPropogation: true,
      preventDefault: true,
      emit: true
    };
  }

  _splitBlock() {
    return new SplitBlock(this.content);
  }

  _appendBlock() {
    return new AppendBlock(this.content);
  }

  _prependBlock() {
    return new PrependBlock(this.content);
  }
}

module.exports = ReturnKey;
