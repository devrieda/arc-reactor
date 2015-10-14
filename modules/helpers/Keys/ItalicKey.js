import ToggleMarkup from '../Manipulation/ToggleMarkup';

const KEY_CODES = { 'i': 73 };

class ItalicKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'italic';
  }

  // meta+i
  matches(event) {
    if (!event.metaKey && !event.ctrlKey) { return false; }
    if (event.altKey) { return false; }

    return event.keyCode === KEY_CODES.i;
  }

  down(callback) {
    const guids   = this.selection.guids();
    const offsets = this.selection.offsets();
    const results = this._toggleMarkup().execute(guids, offsets, { type: 'em' });

    this._complete(results, callback);
  }

  up(callback) {
    callback({ content: this.content });
  }

  _complete(results, callback) {
    callback({
      content: results.content,
      position: null,
      stopPropagation: true,
      preventDefault: true,
      emit: true
    });
  }

  _toggleMarkup() {
    return new ToggleMarkup(this.content);
  }
}

export default ItalicKey;
