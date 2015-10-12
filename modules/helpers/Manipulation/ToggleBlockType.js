const ContentFinder = require('../ContentFinder');
const Guid = require('../Guid');

const { Map } = require('immutable');

class ToggleBlockType {
  constructor(content) {
    this.content = content;
  }

  execute(guids, offsets, options) {
    const tagName = options.type;
    const range = this._finder().findRange(guids, offsets);

    const paths = range.map( (guid) => {
      return this._finder().findPath(guid);
    });

    // find list of blocks that don't match our type
    const notOfType = paths.filter( (path) => {
      const block = this.content.getIn(path);
      return block.get("type") !== tagName;
    });

    // some blocks don't match, switch them
    if (notOfType.length > 0) {
      this._changeBlockTypes(range, tagName);
      return { content: this.content, position: null };

    // all blocks already match, so switch them back to a paragraph
    } else {
      this._changeBlockTypes(range, 'p');
      return { content: this.content, position: null };
    }
  }

  /**
   * Convert items to a different block element
   */
  _changeBlockTypes(guids, type) {
    guids.forEach( (guid) => {
      const path = this._finder().findPath(guid);
      const oldType = this.content.getIn(path.concat("type"));
      if (oldType === 'li') {
        this._changeListType(path, type);
      } else {
        this._changeBlockType(path, type);
      }
    });
  }

  /**
   * Switching list items requires splititng up the list
   *
   * ul         ul
   *   li         li
   *  <li>  =>  h3
   *   li       ul
   *              li
   */
  _changeListType(path, type) {
    const blocksPath = path.slice(0, -3);
    const parentPath = path.slice(0, -2);
    const position   = path[path.length-1];
    let parentPos    = path[path.length-3];
    const parent     = this.content.getIn(parentPath);
    const listItems  = parent.get("blocks");

    const before = listItems.slice(0, position);
    const item   = listItems.slice(position, position+1).get(0);
    const after  = listItems.slice(position+1);

    // reassign preceeding elements to list
    if (before.size > 0) {
      this.content = this.content.setIn(parentPath, parent.set("blocks", before));
      parentPos++;
    } else {
      const beforeBlocks = this.content.getIn(blocksPath).delete(parentPos);
      this.content = this.content.setIn(blocksPath, beforeBlocks);
    }

    // create an element with new type
    const typeBlock = item.set("type", type);
    const typeBlocks = this.content.getIn(blocksPath).splice(parentPos, 0, typeBlock);
    parentPos++;
    this.content = this.content.setIn(blocksPath, typeBlocks);

    // append new list with remaining items
    if (after.size > 0) {
      const afterBlock = Map({id: Guid.unique(), type: "ul", blocks: after});
      const afterBlocks = this.content.getIn(blocksPath).splice(parentPos, 0, afterBlock);
      this.content = this.content.setIn(blocksPath, afterBlocks);
    }
  }

  _changeBlockType(path, type) {
    this.content = this.content.setIn(path.concat("type"), type);
  }

  _finder() {
    return new ContentFinder(this.content);
  }
}

module.exports = ToggleBlockType;
