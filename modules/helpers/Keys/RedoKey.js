import History from '../History';

const KEY_CODES = { 'z': 90, 'y': 89  };

class RedoKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'redo';
  }

  // meta+shift+z
  static matches(event) {
    if (!event.metaKey && !event.ctrlKey) { return false; }
    if (event.altKey) { return false; }

    return event.keyCode === KEY_CODES.y ||
      (event.keyCode === KEY_CODES.z && event.shiftKey);
  }

  down(callback) {
    const { content, position } = History.getInstance().redo();

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

export default RedoKey;
