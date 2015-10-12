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

  matches(event) {
    return event.keyCode === KEY_CODES.down;
  }

  down(callback) {
    if (this.selection.isFigure()) {
      this._appendBlockAfterFigure(callback);
    } else {
      callback({ content: this.content });
    }
  }

  up(callback) {
    callback({ content: this.content });
  }

  _appendBlockAfterFigure(callback) {
    var guids = this.selection.guids();
    var finder = new ContentFinder(this.content);
    var nextPath = finder.findNextPath(guids.anchor);
    var nextBlk  = nextPath && this.content.getIn(nextPath);

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
    History.getInstance().push({
      content: results.content,
      position: this.selection.position()
    });

    callback({
      content: results.content,
      position: results.position,
      stopPropagation: true,
      preventDefault: true,
      emit: true
    });
  }

  _appendBlock() {
    return new AppendBlock(this.content);
  }
}

module.exports = DownKey;
