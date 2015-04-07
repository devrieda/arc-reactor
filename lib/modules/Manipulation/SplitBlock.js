var Immutable = require('immutable');
var { Map, List } = Immutable;

var ContentFinder = require('../ContentFinder');
var Guid = require('../Guid');

class SplitBlock {
  constructor(content) {
    this.map = Immutable.fromJS(content);
  }

  execute(guids, offsets) {
    var range = this._finder().findRange(guids, offsets);
    var first = range.shift();
    var last  = range.pop();

    var anchorPath = this._finder().findPath(first);
    var anchor = this.map.getIn(anchorPath);

    var focusPath  = last ? this._finder().findPath(last) : anchorPath;
    var focus  = this.map.getIn(focusPath);

    // delete the rest
    range.forEach( (guid) => { this._removeBlock(guid); });

    // we'll be creating a new node from the end text
    var end  = focus.get("text").substring(offsets.focus);
    var type = focus.get("type");

    // split and reset the anchor text
    var newText = anchor.get("text").substring(0, offsets.anchor)
    this.map = this.map.setIn(anchorPath.concat("text"), newText);

    if (anchor.get('id') !== focus.get('id')) {
      this._removeBlock(focus.get('id'));
    }
    var newBlock = this._insertBlock(type, 'after', guids.anchor, end);

    return { content: this.map.toJS(), block: newBlock.toJS(), offset: 0 };
  }

  _removeBlock(guid) {
    var path = this._finder().findBlocksPath(guid);
    var blocks = this.map.getIn(path);
    var index  = this._finder().findBlockPosition(guid);

    this.map = this.map.setIn(path, blocks.delete(index));
  }

  _insertBlock(type, position, guid, text) {
    var path   = this._finder().findBlocksPath(guid);
    var blocks = this.map.getIn(path);
    var index  = this._finder().findBlockPosition(guid);

    var block = this._newBlock(type, text || "");
    index = position === 'after' ? index + 1 : index;

    this.map = this.map.setIn(path, blocks.splice(index, 0, block));
    return block;
  }

  _newBlock(type, text) {
    return Map({id: Guid.unique(), type: type, text: text});
  }

  _finder() {
    return new ContentFinder({}, this.map);
  }
}

module.exports = SplitBlock;
