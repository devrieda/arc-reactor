var Immutable = require('immutable');
var { Map, List } = Immutable;

var ContentFinder = require('../ContentFinder');

class CombineBlockNext {
  constructor(content) {
    this.map = Immutable.fromJS(content);
    this.content = content;
  }

  execute(guids) {
    var guid  = guids.anchor;
    var block = this._findBlock(guid);
    var next  = this._findNextBlock(guid);

    if (next) {
      var offset = block.text.length;
      block.text = block.text + next.text;
      this._removeBlock(next.id);
      return { content: this.content, block: next, offset: offset };

    } else {
      return { content: this.content, block: null, offset: 0 };
    }
  }

  _removeBlock(guid) {
    var blocks = this._findBlocks(guid);
    var index  = this._findBlockPosition(guid);

    // TODO - REMOVE MUTATION
    blocks.splice(index, 1);
  }

  _findBlock(guid) {
    return this._finder().findBlock(guid);
  }

  _findBlocks(guid) {
    return this._finder().findBlocks(guid);
  }

  _findNextBlock(guid) {
    return this._finder().findNextBlock(guid);
  }

  _findBlockPosition(guid) {
    return this._finder().findBlockPosition(guid);
  }

  _finder() {
    return new ContentFinder(this.content);
  }
}

module.exports = CombineBlockNext;
