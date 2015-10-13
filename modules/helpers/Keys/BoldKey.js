const ToggleMarkup = require('../Manipulation/ToggleMarkup');

const KEY_CODES = { 'b': 66 };

class BoldKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'bold-key';
  }

  // meta+b
  matches(event) {
    if (!event.metaKey && !event.ctrlKey) { return false; }
    if (event.altKey) { return false; }

    return event.keyCode === KEY_CODES.b;
  }

  down(callback) {
    const guids   = this.selection.guids();
    const offsets = this.selection.offsets();
    const results = this._toggleMarkup().execute(guids, offsets, { type: 'strong' });

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

export default BoldKey;
