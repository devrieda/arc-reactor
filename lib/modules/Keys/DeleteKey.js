var BaseKey = require('./BaseKey');

var CombineBlocks    = require('../Manipulation/CombineBlocks');
var CombineBlockNext = require('../Manipulation/CombineBlockNext');
var DeleteFigure     = require('../Manipulation/DeleteFigure');

var KEY_CODES = { 'delete': 46 };

class DeleteKey extends BaseKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'delete-key';
  }

  matches(event) {
    return event.keyCode === KEY_CODES.delete;
  }

  down(callback) {
    var guids = this.selection.guids();
    var offsets = this.selection.offsets();
    var results;

    if (this.selection.isFigure() && !this.selection.isCaption()) {
      results = this._deleteFigure().execute(guids);

    } else if (this.selection.crossBlock()) {
      results = this._combineBlocks().execute(guids, offsets);

    } else if (this.selection.endOfBlock()) {
      results = this._combineBlockNext().execute(guids);
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
      stopPropagation: true,
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

  _combineBlockNext() {
    return new CombineBlockNext(this.content);
  }
}

module.exports = DeleteKey;
