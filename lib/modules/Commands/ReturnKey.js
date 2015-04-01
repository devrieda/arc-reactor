class ReturnKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'return-key';
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

module.exports = ReturnKey;