var BaseKey = require('./BaseKey');

var AppendBlock = require('../Manipulation/AppendBlock');
var ContentFinder = require('../ContentFinder');

var KEY_CODES = { 'down': 40 };

class DownKey extends BaseKey {
  constructor(content, selection) {
    super(content, selection);
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
      callback(this.defaultResponse());
    }
  }

  up(callback) {
    callback(this.defaultResponse());
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
    this.saveHistory(results.content);

    var block  = results && results.block ? results.block.get('id') : null;
    var offset = results && results.block ? results.offset : null;

    callback({
      content: results.content,
      block: block,
      offset: offset,
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
