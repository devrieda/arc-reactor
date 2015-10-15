const KEY_CODES = { 'u': 85 };

class UnderlineKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'underline';
  }

  // meta+b
  matches(event) {
    if (!event.metaKey && !event.ctrlKey) { return false; }
    if (event.altKey) { return false; }

    return event.keyCode === KEY_CODES.u;
  }

  // no-op for underlines (prevent default behavior of contenteditable)
  down(callback) {
    callback({
      content: this.content,
      position: null,
      stopPropagation: true,
      preventDefault: true,
      emit: true
    });
  }

  up(callback) {
    callback({ content: this.content });
  }
}

export default UnderlineKey;
