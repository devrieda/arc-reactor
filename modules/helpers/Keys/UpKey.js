const KEY_CODES = { 'up': 38 };

class UpKey {
  constructor(content, selection) {
    this.content   = content;
    this.selection = selection;
  }

  static getName() {
    return 'up';
  }

  static matches(event) {
    return event.keyCode === KEY_CODES.up;
  }

  down(callback) {
    callback({ content: this.content });
  }

  up(callback) {
    callback({ content: this.content });
  }
}

export default UpKey;
