var BaseButton = require('./BaseButton');

class QuoteButton extends BaseButton {
  press(active) {
    this.changeBlockTag('blockquote', active);
  }
}

module.exports = QuoteButton;
