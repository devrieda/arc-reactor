var History = require('../History');

var CombineBlocks    = require('../Manipulation/CombineBlocks');
var CombineBlockPrev = require('../Manipulation/CombineBlockPrev');
var DeleteFigure     = require('../Manipulation/DeleteFigure');

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

  execute(callback) {
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
    var prevent;

    // if we need to focus on the new block
    if (results && results.block) {
      this.selection.focusOn(results.block.get('id'), results.offset);
      prevent = true;
    }

    var content = results ? results.content : this.content;
    this._saveHistory(content);

    callback({
      content: content,
      selection: this.selection,
      stopPropagation: !!results,
      preventDefault: prevent,
      emit: true
    });
  }

  _saveHistory(content) {
    var position = this.selection.position();
    History.getInstance().push({ content: content, position: position });
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
