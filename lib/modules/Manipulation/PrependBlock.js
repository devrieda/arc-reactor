var ContentFinder = require('../ContentFinder');
var Guid = require('../Guid');

class PrependBlock {
  constructor(content) {
    this.content = content;
    this.finder = new ContentFinder(content);
  }

  execute(guids) {
    var guid = guids.anchor;
    var block = this._findBlock(guid);
    this._insertBlock('p', 'before', guid);
    return { content: this.content, block: block, offset: 0 };
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

  _findBlockPosition(guid) {
    return this.finder.findBlockPosition(guid);
  }

  _newBlock(type, text) {
    return { "id": Guid.unique(), "type": type, "text": text };
  }
}

module.exports = PrependBlock;
