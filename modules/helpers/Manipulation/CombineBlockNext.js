var ContentFinder = require('../ContentFinder');

class CombineBlockNext {
  constructor(content) {
    this.content = content;
  }

  execute(guids) {
    var guid  = guids.anchor;

    var path  = this._finder().findPath(guid);
    var block = this.content.getIn(path);
    var offset;

    var nextPath = this._finder().findNextPath(guid);
    var next;
    if (nextPath) {
      next = this.content.getIn(nextPath);
    }

    // no-op if the next is a figure
    if (next && next.get("type") === "figure") {
      return { content: this.content, block: block, offset: block.get("text").length };
    }

    // combine sections
    if (next && path[1] !== nextPath[1]) {
      var blocks1 = this.content.getIn(path.slice(0, 3));
      var blocks2 = this.content.getIn(nextPath.slice(0, 3));
      var all = blocks1.concat(blocks2);

      // set new blocks
      this.content = this.content.setIn(path.slice(0, 3), all);

      // remove other section
      this.content = this.content.deleteIn(nextPath.slice(0, 2));

      offset = block.get("text").length;
      return { content: this.content, block: block, offset: offset };

    // there is a next block in this section to combine with
    } else if (next) {
      offset = block.get("text").length;

      // set combined text
      var newText = block.get("text") + next.get("text");
      this.content = this.content.setIn(path.concat("text"), newText);

      this._removeBlock(next.get("id"));
      return { content: this.content, block: next, offset: offset };

    } else {
      return { content: this.content, block: null, offset: 0 };
    }
  }

  _removeBlock(guid) {
    var path = this._finder().findBlocksPath(guid);
    var blocks = this.content.getIn(path);
    var index  = this._finder().findBlockPosition(guid);

    this.content = this.content.setIn(path, blocks.delete(index));
  }

  _finder() {
    return new ContentFinder(this.content);
  }
}

module.exports = CombineBlockNext;
