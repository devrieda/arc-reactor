import InsertImage from './lib/InsertImage';

const KEY_CODES = { 'return': 13, 'm': 77 };

class ImageReturnKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'image-return';
  }

  // return or ctrl+m
  matches(event) {
    return event.keyCode === KEY_CODES.return ||
      (event.keyCode === KEY_CODES.m && event.ctrlKey);
  }

  down(callback) {
    const guids = this.selection.guids();
    const offsets = this.selection.offsets();

    const node = document.getElementsByName(guids.anchor)[0];
    const text = node && node.textContent;

    // do we match image extensions in the text?
    if (!this.selection.isRange() && text.match(/^http.+(gif|png|jpe?g)$/)) {
      const cb = (results) => {
        this._complete(results, callback, false);
      };
      const command = new InsertImage(this.content)
      const results = command.execute(guids, offsets, { src: text }, cb);
      this._complete(results, callback, true);

    } else {
      callback({ content: this.content });
    }
  }

  up(callback) {
    callback({ content: this.content });
  }

  _complete(results, callback, prevent) {
    callback({
      content: results.content,
      position: results.position,
      stopPropagation: true,
      preventDefault: prevent,
      emit: true
    });
  }
}

export default ImageReturnKey;
