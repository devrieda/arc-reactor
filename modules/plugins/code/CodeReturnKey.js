import InsertNewline from './lib/InsertNewline';

const KEY_CODES = { 'return': 13, 'm': 77 };

class CodeReturnKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'code-return';
  }

  // return or ctrl+m
  matches(event) {
    return event.keyCode === KEY_CODES.return ||
      (event.keyCode === KEY_CODES.m && event.ctrlKey);
  }

  down(callback) {
    const guids = this.selection.guids();
    const offsets = this.selection.offsets();

    // is this a photo/video link
    const node = document.getElementsByName(guids.anchor)[0];
    const type = node.tagName.toLowerCase();

    // code
    if (!this.selection.isRange() && type === 'pre') {
      const results = this._insertNewline().execute(guids, offsets);
      callback({
        content: results.content,
        position: results.position,
        stopPropagation: true,
        preventDefault: true,
        emit: true,
      });

    } else {
      callback({ content: this.content });
    }
  }

  up(callback) {
    callback({ content: this.content });
  }

  _insertNewline() {
    return new InsertNewline(this.content);
  }
}

export default CodeReturnKey;
