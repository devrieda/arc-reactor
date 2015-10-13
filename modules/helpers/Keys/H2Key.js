const ToggleBlockType = require('../Manipulation/ToggleBlockType');

const KEY_CODES = { '2': 50 };

class H2Key {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'h2-key';
  }

  // meta+alt+2
  matches(event) {
    if (!event.metaKey && !event.ctrlKey) { return false; }
    if (!event.altKey) { return false; }

    return event.keyCode === KEY_CODES['2'];
  }

  down(callback) {
    const guids   = this.selection.guids();
    const offsets = this.selection.offsets();
    const results = this._toggleBlockType().execute(guids, offsets, { type: 'h3' });

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

  _toggleBlockType() {
    return new ToggleBlockType(this.content);
  }
}

export default H2Key;
