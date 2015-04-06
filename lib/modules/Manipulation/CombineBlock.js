var ContentFinder = require('../ContentFinder');

class CombineBlock {
  constructor(content) {
    this.content = content;
    this.finder = new ContentFinder(content);
  }

  execute(guids, offsets) {
    var range = this._findRange(guids);
    var first = range.shift();
    var last  = range.pop();

    var anchor = this._findBlock(first);
    var focus  = last ? this._findBlock(last) : anchor;

    // delete the rest
    range.forEach( (guid) => { this._removeBlock(guid); });

    anchor.text = anchor.text.substring(0, offsets.anchor) +
                  focus.text.substring(offsets.focus);
    if (anchor.id !== focus.id) { this._removeBlock(focus.id); }

    return { content: this.content, block: anchor, offset: offsets.anchor };
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

  _findRange(guids, offsets) {
    return this.finder.findRange(guids, offsets);
  }

  _findBlockPosition(guid) {
    return this.finder.findBlockPosition(guid);
  }
}

module.exports = CombineBlock;