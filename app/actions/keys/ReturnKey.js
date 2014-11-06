var BaseKey = require('./BaseKey');

class ReturnKey extends BaseKey {
  press() {
    if (this.selection.isRange()) {
      return this.combineBlocks();

    // caret
    } else {
      var guid = this.selection.anchor.guid;

      if (this.selection.endOfBlock()) {

        var block = this.findBlock(guid)
        var text  = block.text;
        var starts = text.substring(0, 1);
        var empty = text.length == 0;

        // finish list
        if (block.type == 'li' && text === '') {
          this._finishList(guid);

        // add to a list
        } else if (block.type == 'li') {
          this._addListItem(guid);

        // create new list
        } else if (starts == '-' || starts == '*' || starts == '1') {
          this._createList(guid, starts);

        // normal new block
        } else {
          this.insertBlock('p', 'after', guid);
        }

      // enter at beginning of block
      } else if (this.selection.begOfBlock()) {
        this.insertBlock('p', 'before', guid);

      // split current two
      } else {
        this._splitBlock(guid);
      }
    }
    return true;
  }

  _addListItem(guid) {
    this.insertBlock('li', 'after', guid);
  }

  _createList(guid, starts) {
    var type = starts == '1' ? 'ol' : 'ul';
    this.updateBlockToList(guid, type);
  }

  _finishList(guid) {
    var guid = this.findParentBlock(guid).id;
    this.removeBlock(this.selection.anchor.guid);
    this.insertBlock('p', 'after', guid);
  }

  _splitBlock(guid) {
    var block = this.findBlock(guid)
    var text  = block.text;
    var offset = this.selection.anchor.offset;

    block.text = block.text.substring(0, offset);
    this.insertBlock('p', 'after', guid, text.substring(offset));
  }
}

module.exports = ReturnKey;
