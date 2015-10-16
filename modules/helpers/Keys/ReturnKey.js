import AppendBlock   from '../Manipulation/AppendBlock';
import PrependBlock  from '../Manipulation/PrependBlock';
import SplitBlock    from '../Manipulation/SplitBlock';

const KEY_CODES = { 'return': 13, 'm': 77 };

class ReturnKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'return';
  }

  // return or ctrl+m
  static matches(event) {
    return event.keyCode === KEY_CODES.return ||
      (event.keyCode === KEY_CODES.m && event.ctrlKey);
  }

  down(callback) {
    const guids = this.selection.guids();
    const offsets = this.selection.offsets();
    let results;

    // range
    if (this.selection.isRange()) {
      results = this._splitBlock().execute(guids, offsets);

    // caret
    } else if (this.selection.endOfBlock()) {
      results = this._appendBlock().execute(guids);

    // enter at beginning of block
    } else if (this.selection.begOfBlock()) {
      results = this._prependBlock().execute(guids);

    // split current two
    } else {
      results = this._splitBlock().execute(guids, offsets);
    }

    this._complete(results, callback, true);
  }

  up(callback) {
    callback({ content: this.content });
  }

  _complete(results, callback, prevent) {
    const content = results ? results.content : this.content;
    const position = results ? results.position : null;

    callback({
      content: content,
      position: position,
      stopPropagation: true,
      preventDefault: prevent,
      emit: true
    });
  }

  _splitBlock() {
    return new SplitBlock(this.content);
  }

  _appendBlock() {
    return new AppendBlock(this.content);
  }

  _prependBlock() {
    return new PrependBlock(this.content);
  }
}

export default ReturnKey;
