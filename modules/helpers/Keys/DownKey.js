const AppendBlock = require('../Manipulation/AppendBlock');
const ContentFinder = require('../ContentFinder');

const KEY_CODES = { 'down': 40 };

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
    const guids = this.selection.guids();
    const finder = new ContentFinder(this.content);
    const nextPath = finder.findNextPath(guids.anchor);
    const nextBlk  = nextPath && this.content.getIn(nextPath);

    // only append if there isn't a next block
    let results;
    if (nextBlk) {
      results = { content: this.content, block: nextBlk, offset: 0 };
    } else {
      results = this._appendBlock().execute(guids);
    }

    this._complete(results, callback);
  }

  _complete(results, callback) {
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
