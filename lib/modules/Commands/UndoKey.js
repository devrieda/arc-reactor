var KEY_CODES = { 'z': 90 };

class UndoKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'undo-key';
  }

  // meta+b
  matches(event) {
    if (!event.metaKey && !event.ctrlKey) { return false; }
    if (event.altKey || event.shiftKey) { return false; }

    return event.keyCode === KEY_CODES.z;
  }

  // no-op for underlines
  execute() {
    if (window.DEBUG) { console.log('undo'); }

    return {
      content: this.content,
      selection: this.selection,
      stopPropogation: true,
      preventDefault: true,
      emit: true
    };
  }
}

module.exports = UndoKey;
