var BaseKey = require('./BaseKey');

class BspaceKey extends BaseKey {
  press() {
    if (this.selection.crossBlock()) {
      return this.combineBlocks();

    } else if (this.selection.begOfBlock()) {
      var guid = this.selection.anchorGuid;

      // get text for this node
      // delete this node
      // append text to previous node
      var block    = this.findBlock(guid)
      var previous = this.findPreviousBlock(guid)

      if (previous) {
        var offset = previous.text.length;
        previous.text = previous.text + block.text;
        this.removeBlock(guid);
        this.selection.focusOn(previous.id, offset);
        this.flushSelection();
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
}

module.exports = BspaceKey;
