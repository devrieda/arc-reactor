var Immutable = require('immutable');
var { Map, List } = Immutable;

var ContentFinder = require('../ContentFinder');

class CombineBlocks {
  constructor(content) {
    this.map = Immutable.fromJS(content);
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

    // TODO - REMOVE MUTATION
    anchor.text = anchor.text.substring(0, offsets.anchor) +
                  focus.text.substring(offsets.focus);
    if (anchor.id !== focus.id) { this._removeBlock(focus.id); }

    return { content: this.content, block: anchor, offset: offsets.anchor };
  }

  _removeBlock(guid) {
    var blocks = this._findBlocks(guid);
    var index  = this._findBlockPosition(guid);

    // TODO - REMOVE MUTATION
    blocks.splice(index, 1);
  }

  _findBlock(guid) {
    return this._finder().findBlock(guid);
  }

  _findBlocks(guid) {
    return this._finder().findBlocks(guid);
  }

  _findRange(guids, offsets) {
    return this._finder().findRange(guids, offsets);
  }

  _findBlockPosition(guid) {
    return this._finder().findBlockPosition(guid);
  }

  _finder() {
    return new ContentFinder(this.content);
  }
}

module.exports = CombineBlocks;
