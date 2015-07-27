var KEY_CODES = { 'u': 85 };
var BaseKey = require('./BaseKey');

class UnderlineKey extends BaseKey {
  constructor(content, selection) {
    super(content, selection);
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
  down(callback) {
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
