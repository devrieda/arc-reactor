var ContentFinder = require('../ContentFinder');
var Guid = require('../Guid');

class AppendBlock {
  constructor(content) {
    this.content = content;
    this.finder = new ContentFinder(content);
  }

  execute(guids) {
    var guid  = guids.anchor;
    var block = this._findBlock(guid);
    var text  = block.text;
    var starts = text.substring(0, 1);
    var newBlock;

    // finish list
    if (block.type === 'li' && text === '') {
      newBlock = this._finishList(guid);

    // add to a list
    } else if (block.type === 'li') {
      newBlock = this._addListItem(guid);

    // create new list
    } else if (['-', '*', '1'].indexOf(starts) !== -1) {
      newBlock = this._createList(guid, starts);

    // normal new block
    } else {
      newBlock = this._insertBlock('p', 'after', guid);
    }
    return { content: this.content, block: newBlock, offset: 0 };
  }

  _createList(guid, starts) {
    var type = starts === '1' ? 'ol' : 'ul';

    var block = this._findBlock(guid);
    var text = block.text;
    delete block.text;

    block.type = type;
    var items = [
      this._newBlock('li', text.replace(/^[-*\d]\.?\s?/g, '')),
      this._newBlock('li', '')
    ];
    block.blocks = items;
    return items[1];
  }

  _addListItem(guid) {
    return this._insertBlock('li', 'after', guid);
  }

  _finishList(guid) {
    var parentGuid = this._findParentBlock(guid).id;
    this._removeBlock(guid);
    return this._insertBlock('p', 'after', parentGuid);
  }

  _insertBlock(type, position, guid, text) {
    var blocks = this._findBlocks(guid);
    var index  = this._findBlockPosition(guid);

    var block = this._newBlock(type, text || "");
    index = position === 'after' ? index + 1 : index;

    blocks.splice(index, 0, block);

    return block;
  }

  _findBlock(guid) {
    return this.finder.findBlock(guid);
  }

  _findBlocks(guid) {
    return this.finder.findBlocks(guid);
  }

  _findParentBlock(guid) {
    return this.finder.findParentBlock(guid);
  }

  _findBlockPosition(guid) {
    return this.finder.findBlockPosition(guid);
  }

  _newBlock(type, text) {
    return { "id": Guid.unique(), "type": type, "text": text };
  }
}

module.exports = AppendBlock;
