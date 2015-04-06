var ContentFinder = require('../ContentFinder');
var Guid = require('../Guid');

class SplitBlock {
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

    var end  = focus.text.substring(offsets.focus);
    var type = focus.type;
    anchor.text = anchor.text.substring(0, offsets.anchor);

    if (anchor.id !== focus.id) { this._removeBlock(focus.id); }

    var newBlock = this._insertBlock(type, 'after', guids.anchor, end);

    return { content: this.content, block: newBlock, offset: 0 };
  }

  _removeBlock(guid) {
    var blocks = this._findBlocks(guid);
    var index  = this._findBlockPosition(guid);

    blocks.splice(index, 1);
  }

  _insertBlock(type, position, guid, text) {
    var blocks = this._findBlocks(guid);
    var index  = this._findBlockPosition(guid);

    var block = this._newBlock(type, text || "");
    index = position === 'after' ? index + 1 : index;

    blocks.splice(index, 0, block);

    return block;
  }

  _findBlock(guid) {
    return this.finder.findBlock(guid);
  }

  _findBlocks(guid) {
    return this.finder.findBlocks(guid);
  }

  _findBlockPosition(guid) {
    return this.finder.findBlockPosition(guid);
  }

  _findRange(guids, offsets) {
    return this.finder.findRange(guids, offsets);
  }

  _newBlock(type, text) {
    return { "id": Guid.unique(), "type": type, "text": text };
  }
}

module.exports = SplitBlock;
