import CombineBlocks    from '../Manipulation/CombineBlocks';
import CombineBlockPrev from '../Manipulation/CombineBlockPrev';

const KEY_CODES = { 'bspace': 8 };

class BspaceKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'bspace';
  }

  // return or ctrl+m
  static matches(event) {
    return event.keyCode === KEY_CODES.bspace;
  }

  down(callback) {
    const guids = this.selection.guids();
    const offsets = this.selection.offsets();
    let results;

    // combine the blocks selected
    if (this.selection.crossBlock()) {
      results = this._combineBlocks().execute(guids, offsets);

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

  _combineBlocks() {
    return new CombineBlocks(this.content);
  }

  _combineWithPrev() {
    return new CombineBlockPrev(this.content);
  }
}

export default BspaceKey;
