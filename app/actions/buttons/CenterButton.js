var BaseButton = require('./BaseButton');

class CenterButton extends BaseButton {
  press(active) {
    var block = this.findBlock();
    block.meta = block.meta || {}

    if (active) {
      delete block.meta.align;
      this.selection.centered = false;
    } else {
      block.meta.align = "center";
      this.selection.centered = true;
    }

    this.flushContent();
    this.flushSelection();
  }
}

module.exports = CenterButton;
