var BaseButton = require('./BaseButton');

class ItalicButton extends BaseButton {
  press(active) {
    this.changeInlineTag('em', active);
  }
}

module.exports = ItalicButton;
