var Immutable = require('immutable');
var { List } = Immutable;

var ContentFinder = require('../ContentFinder');
var Guid = require('../Guid');

class AppendBlock {
  constructor(content) {
    this.map = Immutable.fromJS(content);
  }

  execute(guids) {
    var guid  = guids.anchor;
    var path  = this._finder().findPath(guid);
    var block = this.map.getIn(path);
    var text  = block.get("text");
    var starts = text.substring(0, 1);
    var newBlock;

    // finish list
    if (block.get("type") === 'li' && text === '') {
      newBlock = this._finishList(guid);

    // add to a list
    } else if (block.get("type") === 'li') {
      newBlock = this._addListItem(guid);

    // create new list
    } else if (['-', '*', '1'].indexOf(starts) !== -1) {
      newBlock = this._createList(guid, starts);

    // normal new block
    } else {
      newBlock = this._insertBlock('p', 'after', guid);
    }

    return { content: this.map.toJS(), block: newBlock.toJS(), offset: 0 };
  }

  _createList(guid, starts) {
    var type = starts === '1' ? 'ol' : 'ul';

    var path  = this._finder().findPath(guid);
    var block = this.map.getIn(path);

    // remove text off ul node (we'll move it to the li)
    var text = block.get("text");
    this.map = this.map.deleteIn(path.concat("text"));

    // update type to parent list
    this.map = this.map.setIn(path.concat("type"), type);

    var items = List([
      this._newBlock('li', text.replace(/^[-*\d]\.?\s?/g, '')),
      this._newBlock('li', '')
    ]);

    this.map = this.map.setIn(path.concat("blocks"), items);
    return items.get(1);
  }

  _addListItem(guid) {
    return this._insertBlock('li', 'after', guid);
  }

  _finishList(guid) {
    var path = this._finder().findParentPath(guid);
    var parentGuid = this.map.getIn(path).get("id");

    this._removeBlock(guid);
    return this._insertBlock('p', 'after', parentGuid);
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

  _removeBlock(guid) {
    var path = this._finder().findBlocksPath(guid);
    var blocks = this.map.getIn(path);
    var index  = this._finder().findBlockPosition(guid);

    this.map = this.map.setIn(path, blocks.delete(index));
  }

  _newBlock(type, text) {
    return Immutable.Map({id: Guid.unique(), type: type, text: text});
  }

  _finder() {
    return new ContentFinder({}, this.map);
  }
}

module.exports = AppendBlock;
