var ContentFinder = require('../ContentFinder');

class CombineBlockPrev {
  constructor(content) {
    this.content = content;
  }

  execute(guids) {
    var guid  = guids.anchor;

    var path  = this._finder().findPath(guid);
    var block = this.content.getIn(path);

    var prevPath = this._finder().findPrevPath(guid);
    var prev;
    if (prevPath) {
      prev = this.content.getIn(prevPath);
    }

    // no-op if the previous is a figure
    if (prev && prev.get("type") === "figure") {
      return {
        content: this.content,
        guid: block.get('id'),
        offset: 0
      };
    }

    // combine sections
    if (prev && path[1] !== prevPath[1]) {
      var blocks1 = this.content.getIn(prevPath.slice(0, 3));
      var blocks2 = this.content.getIn(path.slice(0, 3));
      var all = blocks1.concat(blocks2);

      // set new blocks
      this.content = this.content.setIn(prevPath.slice(0, 3), all);

      // remove other section
      this.content = this.content.deleteIn(path.slice(0, 2));

      return {
        content: this.content,
        guid: block.get('id'),
        offset: 0
      };

    // there is a prev block in this section to combine with
    } else if (prev) {
      var text = prev.get("text") || "";
      var offset = text.length;

      // set combined text
      var newText = prev.get("text") + block.get("text");
      this.content = this.content.setIn(prevPath.concat("text"), newText);

      this._removeBlock(block.get('id'));
      return {
        content: this.content,
        guid: prev.get('id'),
        offset: offset
      };

    } else {
      return { content: this.content, guid: null, offset: null };
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

module.exports = CombineBlockPrev;
