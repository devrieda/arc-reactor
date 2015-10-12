const CombineBlocks    = require('../Manipulation/CombineBlocks');
const CombineBlockPrev = require('../Manipulation/CombineBlockPrev');
const ToggleBlockType  = require('../Manipulation/ToggleBlockType');
const DeleteFigure     = require('../Manipulation/DeleteFigure');

const KEY_CODES = { 'bspace': 8 };

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

  down(callback) {
    const guids = this.selection.guids();
    const offsets = this.selection.offsets();
    let results;

    // is this a list item
    const node = document.getElementsByName(guids.anchor)[0];
    const type = node.tagName.toLowerCase();

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

  up(callback) {
    callback({ content: this.content });
  }

  _complete(results, callback) {
    const content = results ? results.content : this.content;
    const position = results ? results.position : null;

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
