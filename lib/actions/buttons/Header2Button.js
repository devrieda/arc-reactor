var BaseButton = require('./BaseButton');

class Header2Button extends BaseButton {
  press(active) {
    this.changeBlockTag('h3', active);
  }
}

module.exports = Header2Button;
