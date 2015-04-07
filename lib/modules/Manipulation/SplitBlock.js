var Immutable = require('immutable');
var { Map, List } = Immutable;

var ContentFinder = require('../ContentFinder');
var Guid = require('../Guid');

class SplitBlock {
  constructor(content) {
    this.map = Immutable.fromJS(content);
    this.content = content;
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

    // TODO - REMOVE MUTATION
    anchor.text = anchor.text.substring(0, offsets.anchor);

    if (anchor.id !== focus.id) { this._removeBlock(focus.id); }

    var newBlock = this._insertBlock(type, 'after', guids.anchor, end);

    return { content: this.content, block: newBlock, offset: 0 };
  }

  _removeBlock(guid) {
    var blocks = this._findBlocks(guid);
    var index  = this._findBlockPosition(guid);

    // TODO - REMOVE MUTATION
    // 
    blocks.splice(index, 1);
  }

  _insertBlock(type, position, guid, text) {
    var blocks = this._findBlocks(guid);
    var index  = this._findBlockPosition(guid);

    var block = this._newBlock(type, text || "");
    index = position === 'after' ? index + 1 : index;

    // TODO - REMOVE MUTATION
    blocks.splice(index, 0, block);

    return block;
  }

  _findBlock(guid) {
    return this._finder().findBlock(guid);
  }

  _findBlocks(guid) {
    return this._finder().findBlocks(guid);
  }

  _findBlockPosition(guid) {
    return this._finder().findBlockPosition(guid);
  }

  _findRange(guids, offsets) {
    return this._finder().findRange(guids, offsets);
  }

  _newBlock(type, text) {
    return { "id": Guid.unique(), "type": type, "text": text };
  }

  _finder() {
    return new ContentFinder(this.content);
  }
}

module.exports = SplitBlock;
