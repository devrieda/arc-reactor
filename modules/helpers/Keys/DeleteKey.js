import CombineBlocks    from '../Manipulation/CombineBlocks';
import CombineBlockNext from '../Manipulation/CombineBlockNext';

const KEY_CODES = { 'delete': 46 };

class DeleteKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'delete';
  }

  static matches(event) {
    return event.keyCode === KEY_CODES.delete;
  }

  down(callback) {
    const guids = this.selection.guids();
    const offsets = this.selection.offsets();
    let results;

    if (this.selection.crossBlock()) {
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
    const content = results ? results.content : this.content;
    const position = results ? results.position : null;

    callback({
      content: content,
      position: position,
      stopPropagation: true,
      preventDefault: !!position,
      emit: true
    });
  }

  _combineBlocks() {
    return new CombineBlocks(this.content);
  }

  _combineBlockNext() {
    return new CombineBlockNext(this.content);
  }
}

export default DeleteKey;
