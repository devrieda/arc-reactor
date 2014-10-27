var BaseButton = require('./BaseButton');

class Header1Button extends BaseButton {
  press(active) {
    this.changeBlockTag('h2', active);
  }
}

module.exports = Header1Button;
