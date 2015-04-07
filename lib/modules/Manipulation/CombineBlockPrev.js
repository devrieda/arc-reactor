var Immutable = require('immutable');

var ContentFinder = require('../ContentFinder');

class CombineBlockPrev {
  constructor(content) {
    this.map = Immutable.fromJS(content);
  }

  execute(guids) {
    var guid  = guids.anchor;

    var path  = this._finder().findPath(guid);
    var block = this.map.getIn(path);

    var prevPath = this._finder().findPrevPath(guid);
    var prev     = this.map.getIn(prevPath);

    if (prev) {
      var offset = prev.get("text").length;

      // set combined text
      var newText = prev.get("text") + block.get("text");
      this.map = this.map.setIn(prevPath.concat("text"), newText);

      this._removeBlock(block.get('id'));
      return { content: this.map.toJS(), block: prev.toJS(), offset: offset };

    } else {
      return { content: this.map.toJS(), block: null, offset: 0 };
    }
  }

  _removeBlock(guid) {
    var path = this._finder().findBlocksPath(guid);
    var blocks = this.map.getIn(path);
    var index  = this._finder().findBlockPosition(guid);

    this.map = this.map.setIn(path, blocks.delete(index));
  }

  _finder() {
    return new ContentFinder({}, this.map);
  }
}

module.exports = CombineBlockPrev;
