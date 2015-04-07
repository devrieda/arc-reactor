var Immutable = require('immutable');
var { Map, List } = Immutable;

var ContentFinder = require('../ContentFinder');
var Guid = require('../Guid');

class PrependBlock {
  constructor(content) {
    this.map = Immutable.fromJS(content);
    this.content = content;
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

    // TODO - REMOVE MUTATION
    blocks.splice(index, 0, block);

    return block;
  }

  _findBlock(guid) {
    return this._finder().findBlock(guid);
  }

  _findBlocks(guid) {
    return this._finder().findBlocks(guid);
  }

  _findBlockPosition(guid) {
    return this._finder().findBlockPosition(guid);
  }

  _newBlock(type, text) {
    return { "id": Guid.unique(), "type": type, "text": text };
  }

  _finder() {
    return new ContentFinder(this.content);
  }
}

module.exports = PrependBlock;
