var History = require('../History');
var BaseKey = require('./BaseKey');

var AppendBlock = require('../Manipulation/AppendBlock');
var ContentFinder = require('../ContentFinder');

var KEY_CODES = { 'down': 40 };

class DownKey extends BaseKey {
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

  down(callback) {
    var guids   = this.selection.guids();
    var offsets = this.selection.offsets();

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
    this.focusResults(results);

    this.saveHistory(results.content);

    callback({
      content: results.content,
      selection: this.selection,
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
