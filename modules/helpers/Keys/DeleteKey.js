var CombineBlocks    = require('../Manipulation/CombineBlocks');
var CombineBlockNext = require('../Manipulation/CombineBlockNext');
var DeleteFigure     = require('../Manipulation/DeleteFigure');

var KEY_CODES = { 'delete': 46 };

class DeleteKey {
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

  up(callback) {
    callback({ content: this.content });
  }

  _complete(results, callback) {
    var content = results ? results.content : this.content;
    var position = results ? results.position : null;

    callback({
      content: content,
      position: position,
      stopPropagation: true,
      preventDefault: !!position,
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
