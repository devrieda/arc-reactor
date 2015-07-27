var Immutable = require('immutable');

var ContentFinder = require('../ContentFinder');
var Guid = require('../Guid');

class PrependBlock {
  constructor(map) {
    this.map = map;
  }

  execute(guids) {
    var guid = guids.anchor;

    var path  = this._finder().findPath(guid);
    var block = this.map.getIn(path);

    this._insertBlock('p', 'before', guid);
    return { content: this.map, block: block, offset: 0 };
  }

  _insertBlock(type, position, guid, text) {
    var path   = this._finder().findBlocksPath(guid);
    var blocks = this.map.getIn(path);
    var index  = this._finder().findBlockPosition(guid);

    var block = this._newBlock(type, text || "");
    index = position === 'after' ? index + 1 : index;

    this.map = this.map.setIn(path, blocks.splice(index, 0, block));
    return block;
  }

  _newBlock(type, text) {
    return Immutable.Map({id: Guid.unique(), type: type, text: text});
  }

  _finder() {
    return new ContentFinder(this.map);
  }
}

module.exports = PrependBlock;
