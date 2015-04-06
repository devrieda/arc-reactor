var ContentFinder = require('../ContentFinder');

class CombineBlockPrev {
  constructor(content) {
    this.content = content;
    this.finder = new ContentFinder(content);
  }

  execute(guids) {
    var guid  = guids.anchor;
    var block = this._findBlock(guid);
    var prev  = this._findPreviousBlock(guid);

    if (prev) {
      var offset = prev.text.length;
      prev.text = prev.text + block.text;
      this._removeBlock(block.id);
      return { content: this.content, block: prev, offset: offset };

    } else {
      return { content: this.content, block: null, offset: 0 };
    }
  }

  _removeBlock(guid) {
    var blocks = this._findBlocks(guid);
    var index  = this._findBlockPosition(guid);

    blocks.splice(index, 1);
  }

  _findBlock(guid) {
    return this.finder.findBlock(guid);
  }

  _findBlocks(guid) {
    return this.finder.findBlocks(guid);
  }

  _findPreviousBlock(guid) {
    return this.finder.findPreviousBlock(guid);
  }

  _findBlockPosition(guid) {
    return this.finder.findBlockPosition(guid);
  }
}

module.exports = CombineBlockPrev;
