var BaseButton = require('./BaseButton');

class Header3Button extends BaseButton {
  press(active) {
    this.changeBlockTag('h4', active);
  }
}

module.exports = Header3Button;
