var BaseButton = require('./BaseButton');

class LinkButton extends BaseButton {
  press(active, value) {
    this.changeInlineTag('a', active, value);
  }
}

module.exports = LinkButton;
