import ToggleBlockType from '../../helpers/Manipulation/ToggleBlockType';

const KEY_CODES = { '6': 54 };

class CodeKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'code-key';
  }

  // alt+meta+6
  static matches(event) {
    if (!event.metaKey && !event.ctrlKey) { return false; }
    return !!event.altKey && event.keyCode === KEY_CODES['6'];
  }

  down(callback) {
    const guids   = this.selection.guids();
    const offsets = this.selection.offsets();
    const results = this._toggleBlockType().execute(guids, offsets, { type: 'pre' });

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

export default CodeKey;
