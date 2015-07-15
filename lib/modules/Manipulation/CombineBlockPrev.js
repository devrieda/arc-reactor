var ContentFinder = require('../ContentFinder');

class CombineBlockPrev {
  constructor(map) {
    this.map = map;
  }

  execute(guids) {
    var guid  = guids.anchor;

    var path  = this._finder().findPath(guid);
    var block = this.map.getIn(path);

    var prevPath = this._finder().findPrevPath(guid);
    var prev;
    if (prevPath) {
      prev = this.map.getIn(prevPath);
    }

    // no-op if the previous is a figure
    if (prev && prev.get("type") === "figure") {
      return { content: this.map, block: block, offset: 0 };
    }

    // combine sections
    if (prev && path[1] !== prevPath[1]) {
      var blocks1 = this.map.getIn(prevPath.slice(0, 3));
      var blocks2 = this.map.getIn(path.slice(0, 3));
      var all = blocks1.concat(blocks2);

      // set new blocks
      this.map = this.map.setIn(prevPath.slice(0, 3), all);

      // remove other section
      this.map = this.map.deleteIn(path.slice(0, 2));

      var offset = block.get("text").length;
      return { content: this.map, block: block, offset: 0 };

    // there is a prev block in this section to combine with
    } else if (prev) {
      var offset = prev.get("text").length;

      // set combined text
      var newText = prev.get("text") + block.get("text");
      this.map = this.map.setIn(prevPath.concat("text"), newText);

      this._removeBlock(block.get('id'));
      return { content: this.map, block: prev, offset: offset };

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

module.exports = CombineBlockPrev;
