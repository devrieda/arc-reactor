var BaseButton = require('./BaseButton');

class BoldButton extends BaseButton {
  press(active) {
    this.changeInlineTag('strong', active);
  }
}

module.exports = BoldButton;
