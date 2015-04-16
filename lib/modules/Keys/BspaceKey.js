var History = require('../History');
var BaseKey = require('./BaseKey');

var CombineBlocks    = require('../Manipulation/CombineBlocks');
var CombineBlockPrev = require('../Manipulation/CombineBlockPrev');
var DeleteFigure     = require('../Manipulation/DeleteFigure');

var KEY_CODES = { 'bspace': 8 };

class BspaceKey extends BaseKey {
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

  down(callback) {
    var guids = this.selection.guids();
    var offsets = this.selection.offsets();
    var results;

    if (window.DEBUG) { console.log('bspace', guids, offsets); }

    if (this.selection.isFigure() && !this.selection.isCaption()) {
      results = this._deleteFigure().execute(guids);

    } else if (this.selection.crossBlock()) {
      results = this._combineBlocks().execute(guids, offsets);

    } else if (this.selection.begOfBlock() && !this.selection.isRange()) {
      results = this._combineWithPrev().execute(guids);
    }

    this._complete(results, callback);
  }

  _complete(results, callback) {
    this.focusResults(results);

    var content = results ? results.content : this.content;
    this.saveHistory(content);

    callback({
      content: content,
      selection: this.selection,
      stopPropagation: !!results,
      preventDefault: results && results.block,
      emit: true
    });
  }

  _deleteFigure() {
    return new DeleteFigure(this.content);
  }

  _combineBlocks() {
    return new CombineBlocks(this.content);
  }

  _combineWithPrev() {
    return new CombineBlockPrev(this.content);
  }
}

module.exports = BspaceKey;
