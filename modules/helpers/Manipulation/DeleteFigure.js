var Immutable = require('immutable');

var ContentFinder = require('../ContentFinder');
var Guid = require('../Guid');

class DeleteFigure {
  constructor(content) {
    this.content = content;
  }

  execute(guids) {
    var guid  = guids.anchor;
    var path  = this._finder().findPath(guid);
    var block = this.content.getIn(path);

    // clear out all the attributes, but keep the id
    block = Immutable.Map(this._newBlock('p', ''));
    return {
      content: this.content.setIn(path, block),
      guid: block.get('id'),
      offset: 0
    };
  }

  _removeBlock(guid) {
    var path = this._finder().findBlocksPath(guid);
    var blocks = this.content.getIn(path);
    var index  = this._finder().findBlockPosition(guid);

    this.content = this.content.setIn(path, blocks.delete(index));
  }

  _newBlock(type, text) {
    return Immutable.Map({id: Guid.unique(), type: type, text: text});
  }

  _finder() {
    return new ContentFinder(this.content);
  }
}

module.exports = DeleteFigure;
