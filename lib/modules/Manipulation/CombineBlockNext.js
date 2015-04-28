var ContentFinder = require('../ContentFinder');

class CombineBlockNext {
  constructor(map) {
    this.map = map;
  }

  execute(guids) {
    var guid  = guids.anchor;

    var path  = this._finder().findPath(guid);
    var block = this.map.getIn(path);
    var offset;

    var nextPath = this._finder().findNextPath(guid);
    var next;
    if (nextPath) {
      next = this.map.getIn(nextPath);
    }

    // combine sections
    if (next && path[1] !== nextPath[1]) {
      var blocks1 = this.map.getIn(path.slice(0, 3));
      var blocks2 = this.map.getIn(nextPath.slice(0, 3));
      var all = blocks1.concat(blocks2);

      // set new blocks
      this.map = this.map.setIn(path.slice(0, 3), all);

      // remove other section
      this.map = this.map.deleteIn(nextPath.slice(0, 2));

      offset = block.get("text").length;
      return { content: this.map, block: block, offset: offset };

    // there is a next block in this section to combine with
    } else if (next) {
      offset = block.get("text").length;

      // set combined text
      var newText = block.get("text") + next.get("text");
      this.map = this.map.setIn(path.concat("text"), newText);

      this._removeBlock(next.get("id"));
      return { content: this.map, block: next, offset: offset };

    } else {
      return { content: this.map, block: null, offset: 0 };
    }
  }

  _removeBlock(guid) {
    var path = this._finder().findBlocksPath(guid);
    var blocks = this.map.getIn(path);
    var index  = this._finder().findBlockPosition(guid);

    this.map = this.map.setIn(path, blocks.delete(index));
  }

  _finder() {
    return new ContentFinder(this.map);
  }
}

module.exports = CombineBlockNext;
