var Immutable = require('immutable');

var ContentFinder = require('../ContentFinder');
var Guid = require('../Guid');

class DeleteFigure {
  constructor(map) {
    this.map = map;
  }

  execute(guids) {
    var guid  = guids.anchor;
    var path  = this._finder().findPath(guid);
    var block = this.map.getIn(path);

    // clear out all the attributes, but keep the id
    block = Immutable.Map(this._newBlock('p', ''));
    return { content: this.map.setIn(path, block), block: block, offset: 0 };
  }

  _removeBlock(guid) {
    var path = this._finder().findBlocksPath(guid);
    var blocks = this.map.getIn(path);
    var index  = this._finder().findBlockPosition(guid);

    this.map = this.map.setIn(path, blocks.delete(index));
  }

  _newBlock(type, text) {
    return Immutable.Map({id: Guid.unique(), type: type, text: text});
  }

  _finder() {
    return new ContentFinder(this.map);
  }
}

module.exports = DeleteFigure;
