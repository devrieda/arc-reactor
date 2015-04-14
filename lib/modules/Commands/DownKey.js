var History = require('../History');

var AppendBlock = require('../Manipulation/AppendBlock');
var ContentFinder = require('../ContentFinder');

var KEY_CODES = { 'down': 40 };

class DownKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'down-key';
  }

  // meta+e
  matches(event) {
    var isFigure = this.selection.isFigure();
    return isFigure && event.keyCode === KEY_CODES.down;
  }

  execute(callback) {
    var guids   = this.selection.guids();
    var offsets = this.selection.offsets();

    if (window.DEBUG) { console.log('down', guids, offsets); }

    var finder = new ContentFinder(this.content);
    var nextPath = finder.findNextPath(guids.anchor);
    var nextBlk  = this.content.getIn(nextPath);

    // only append if there isn't a next block
    var results;
    if (nextBlk) {
      results = { content: this.content, block: nextBlk, offset: 0 };
    } else {
      results = this._appendBlock().execute(guids);
    }

    this._complete(results, callback);
  }

  _complete(results, callback) {
    // if we need to focus on the new block
    if (results && results.block) {
      this.selection.focusOn(results.block.get('id'), results.offset);
    }

    this._saveHistory(results.content);

    callback({
      content: results.content,
      selection: this.selection,
      stopPropagation: true,
      preventDefault: true,
      emit: true
    });
  }

  _saveHistory(content) {
    var position = this.selection.position();
    History.getInstance().push({ content: content, position: position });
  }

  _appendBlock() {
    return new AppendBlock(this.content);
  }
}

module.exports = DownKey;
