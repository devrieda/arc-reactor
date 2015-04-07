var Immutable = require('immutable');
var { Map, List } = Immutable;

var ContentFinder = require('../ContentFinder');

class CombineBlockNext {
  constructor(content) {
    this.map = Immutable.fromJS(content);
  }

  execute(guids) {
    var guid  = guids.anchor;

    var path  = this._finder().findPath(guid);
    var block = this.map.getIn(path);

    var nextPath = this._finder().findNextPath(guid);
    var next     = this.map.getIn(nextPath);

    if (next) {
      var offset = block.get("text").length;

      // set combined text
      var newText = block.get("text") + next.get("text");
      this.map = this.map.setIn(path.concat("text"), newText);

      this._removeBlock(next.get("id"));
      return { content: this.map.toJS(), block: next, offset: offset };

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

module.exports = CombineBlockNext;
