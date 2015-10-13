const Immutable = require('immutable');

const ContentFinder = require('../ContentFinder');
const Guid = require('../Guid');

class SplitBlock {
  constructor(content) {
    this.content = content;
  }

  execute(guids, offsets) {
    const range = this._finder().findRange(guids, offsets);
    const first = range.shift();
    const last  = range.pop();

    const anchorPath = this._finder().findPath(first);
    const anchor = this.content.getIn(anchorPath);

    const focusPath  = last ? this._finder().findPath(last) : anchorPath;
    const focus  = this.content.getIn(focusPath);

    // delete the rest
    range.forEach( (guid) => { this._removeBlock(guid); });

    // we'll be creating a new node from the end text
    const end  = focus.get("text").substring(offsets.focus);
    const type = focus.get("type");

    // split and reset the anchor text
    const newText = anchor.get("text").substring(0, offsets.anchor);
    this.content = this.content.setIn(anchorPath.concat("text"), newText);

    if (anchor.get('id') !== focus.get('id')) {
      this._removeBlock(focus.get('id'));
    }
    const newBlock = this._insertBlock(type, 'after', guids.anchor, end);

    return {
      content: this.content,
      position: {
        guid: newBlock.get('id'),
        offset: 0
      }
    };
  }

  _removeBlock(guid) {
    const path = this._finder().findBlocksPath(guid);
    const blocks = this.content.getIn(path);
    const index  = this._finder().findBlockPosition(guid);

    this.content = this.content.setIn(path, blocks.delete(index));
  }

  _insertBlock(type, position, guid, text) {
    const path   = this._finder().findBlocksPath(guid);
    const blocks = this.content.getIn(path);
    let index  = this._finder().findBlockPosition(guid);

    const block = this._newBlock(type, text || "");
    index = position === 'after' ? index + 1 : index;

    this.content = this.content.setIn(path, blocks.splice(index, 0, block));
    return block;
  }

  _newBlock(type, text) {
    return Immutable.Map({id: Guid.unique(), type: type, text: text});
  }

  _finder() {
    return new ContentFinder(this.content);
  }
}

export default SplitBlock;
