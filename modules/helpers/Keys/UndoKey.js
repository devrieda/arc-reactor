import History from '../History';

const KEY_CODES = { 'z': 90 };

class UndoKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'undo';
  }

  // meta+z
  matches(event) {
    if (!event.metaKey && !event.ctrlKey) { return false; }
    if (event.altKey || event.shiftKey) { return false; }

    return event.keyCode === KEY_CODES.z;
  }

  down(callback) {
    const { content, position } = History.getInstance().undo();

    callback({
      content: content,
      position: position,
      stopPropagation: true,
      preventDefault: true,
      skipHistory: true,
      emit: true,
    });
  }

  up(callback) {
    callback({ content: this.content });
  }
}

export default UndoKey;
