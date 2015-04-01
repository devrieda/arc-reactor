class CenterKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'center-key';
  }

  matches(event) {
    return false;
  }

  execute() {
    return {
      content: this.content,
      selection: this.selection
    };
  }
}

module.exports = CenterKey;
