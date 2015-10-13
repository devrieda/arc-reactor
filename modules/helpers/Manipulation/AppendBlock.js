import Immutable from 'immutable';
import ContentFinder from '../ContentFinder';
import Guid from '../Guid';

class AppendBlock {
  constructor(content) {
    this.content = content;
  }

  execute(guids) {
    const guid  = guids.anchor;
    const path  = this._finder().findPath(guid);
    const block = this.content.getIn(path);
    const text  = block.get("text");
    const starts = text.substring(0, 1);
    let newBlock;

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

    return {
      content: this.content,
      position: {
        guid: newBlock.get('id'),
        offset: 0
      }
    };
  }

  _createList(guid, starts) {
    const type = starts === '1' ? 'ol' : 'ul';

    const path  = this._finder().findPath(guid);
    const block = this.content.getIn(path);

    // remove text off ul node (we'll move it to the li)
    const text = block.get("text");
    this.content = this.content.deleteIn(path.concat("text"));

    // update type to parent list
    this.content = this.content.setIn(path.concat("type"), type);

    const items = Immutable.List([
      this._newBlock('li', text.replace(/^[-*\d]\.?\s?/g, '')),
      this._newBlock('li', '')
    ]);

    this.content = this.content.setIn(path.concat("blocks"), items);
    return items.get(1);
  }

  _addListItem(guid) {
    return this._insertBlock('li', 'after', guid);
  }

  _finishList(guid) {
    const path = this._finder().findParentPath(guid);
    const parentGuid = this.content.getIn(path).get("id");

    this._removeBlock(guid);
    return this._insertBlock('p', 'after', parentGuid);
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

  _removeBlock(guid) {
    const path = this._finder().findBlocksPath(guid);
    const blocks = this.content.getIn(path);
    const index  = this._finder().findBlockPosition(guid);

    this.content = this.content.setIn(path, blocks.delete(index));
  }

  _newBlock(type, text) {
    return Immutable.Map({id: Guid.unique(), type: type, text: text});
  }

  _finder() {
    return new ContentFinder(this.content);
  }
}

export default AppendBlock;
