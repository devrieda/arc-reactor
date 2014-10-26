var BaseKey = require('./BaseKey');

class DeleteKey extends BaseKey {
  press() {
    if (this.selection.crossBlock()) {
      return this.combineBlocks();

    } else if (this.selection.endOfBlock()) {
      // get text for next node
      // delete next node
      // append text to this node
      console.log('delete!!');
      return true;
    }
    return false;
  }
}

module.exports = DeleteKey;
