var BaseKey = require('./BaseKey');

var KEY_CODES = { 'up': 38 };

class UpKey extends BaseKey {
  constructor(content, selection) {
    super(content, selection);
  }

  static getName() {
    return 'up-key';
  }

  matches(event) {
    return event.keyCode === KEY_CODES.up;
  }

  down(callback) {
    callback(this.defaultResponse());
  }

  up(callback) {
    callback(this.defaultResponse());
  }
}

module.exports = UpKey;
