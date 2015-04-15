var KEY_CODES = { 'u': 85 };

class UnderlineKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'underline-key';
  }

  // meta+b
  matches(event) {
    if (!event.metaKey && !event.ctrlKey) { return false; }
    if (event.altKey) { return false; }

    return event.keyCode === KEY_CODES.u;
  }

  // no-op for underlines
  execute(callback) {
    if (window.DEBUG) { console.log('underline'); }

    callback({
      content: this.content,
      selection: this.selection,
      stopPropagation: true,
      preventDefault: true,
      emit: true
    });
  }
}

module.exports = UnderlineKey;