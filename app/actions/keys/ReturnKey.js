var BaseKey = require('./BaseKey');

class ReturnKey extends BaseKey {
  press() {
    if (this.selection.isRange()) {
      return this.combineBlocks();

    // caret
    } else {
      var guid = this.selection.anchorGuid;

      if (this.selection.endOfBlock()) {
        var block = this.findBlock(guid)
        var text  = block.text;
        var starts = text.substring(0, 1);
        var empty = text.length == 0;

        // finish list
        if (block.type == 'li' && text === '') {
          var guid = this.findParentBlock(guid).id;
          this.removeBlock(this.selection.anchorGuid);
          this.insertBlock('p', 'after', guid);

        // add to a list
        } else if (block.type == 'li') {
          this.insertBlock('li', 'after', guid);

        // create new list
        } else if (starts == '-' || starts == '*' || starts == '1') {
          this.updateBlockToList(guid, starts == '1' ? 'ol' : 'ul');

        // normal new block
        } else {
          this.insertBlock('p', 'after', guid);
        }

      // enter at beginning of block
      } else if (this.selection.begOfBlock()) {
        this.insertBlock('p', 'before', guid);

      // split current two
      } else {
        var block = this.findBlock(guid)
        var text  = block.text;
        var offset = this.selection.anchorOffset;

        block.text = block.text.substring(0, offset);
        this.insertBlock('p', 'after', guid, text.substring(offset));
      }
    }
    return true;
  }
}

module.exports = ReturnKey;
