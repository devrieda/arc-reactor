var BaseKey = require('./BaseKey');

var CombineBlocks    = require('../Manipulation/CombineBlocks');
var CombineBlockPrev = require('../Manipulation/CombineBlockPrev');
var ToggleBlockType  = require('../Manipulation/ToggleBlockType');
var DeleteFigure     = require('../Manipulation/DeleteFigure');

var KEY_CODES = { 'bspace': 8 };

class BspaceKey extends BaseKey {
  constructor(content, selection) {
    super(content, selection);
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

    // is this a list item
    var node = document.getElementsByName(guids.anchor)[0];
    var type = node.tagName.toLowerCase();

    if (this.selection.isFigure() && !this.selection.isCaption()) {
      results = this._deleteFigure().execute(guids);

    // combine the blocks selected
    } else if (this.selection.crossBlock()) {
      results = this._combineBlocks().execute(guids, offsets);

    // beginning of a list item converts to a paragraph
    } else if (this.selection.begOfBlock() && type === 'li') {
      results = this._toggleBlockType().execute(guids, offsets, { type: 'li' });

    // at beginning of block - combine with previous
    } else if (this.selection.begOfBlock() && !this.selection.isRange()) {
      results = this._combineWithPrev().execute(guids);
    }

    this._complete(results, callback);
  }

  _complete(results, callback) {
    var content = results ? results.content : this.content;
    this.saveHistory(content);

    let position = null;
    if (results && results.guid) {
      position = { guid: results.guid, offset: results.offset };
    }

    callback({
      content: content,
      position: position,
      stopPropagation: !!results,
      preventDefault: !!results,
      emit: true
    });
  }

  _deleteFigure() {
    return new DeleteFigure(this.content);
  }

  _toggleBlockType() {
    return new ToggleBlockType(this.content);
  }

  _combineBlocks() {
    return new CombineBlocks(this.content);
  }

  _combineWithPrev() {
    return new CombineBlockPrev(this.content);
  }
}

module.exports = BspaceKey;
