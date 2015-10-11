var ContentFinder = require('../ContentFinder');
var Guid = require('../Guid');

var { Map } = require('immutable');

class ToggleBlockType {
  constructor(content) {
    this.content = content;
  }

  execute(guids, offsets, options) {
    var tagName = options.type;
    var range = this._finder().findRange(guids, offsets);

    var paths = range.map( (guid) => {
      return this._finder().findPath(guid);
    });

    // find list of blocks that don't match our type
    var notOfType = paths.filter( (path) => {
      var block = this.content.getIn(path);
      return block.get("type") !== tagName;
    });

    // some blocks don't match, switch them
    if (notOfType.length > 0) {
      var type = this.content.getIn(notOfType[0].concat("type"));
      this._changeBlockTypes(range, tagName);
      return { content: this.content, oldType: type, newType: tagName };

    // all blocks already match, so switch them back to a paragraph
    } else {
      this._changeBlockTypes(range, 'p');
      return { content: this.content, oldType: tagName, newType: 'p' };
    }
  }

  /**
   * Convert items to a different block element
   */
  _changeBlockTypes(guids, type) {
    guids.forEach( (guid) => {
      var path = this._finder().findPath(guid);
      var oldType = this.content.getIn(path.concat("type"));
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
    var blocksPath = path.slice(0, -3);
    var parentPath = path.slice(0, -2);
    var position   = path[path.length-1];
    var parentPos  = path[path.length-3];
    var parent     = this.content.getIn(parentPath);
    var listItems  = parent.get("blocks");

    var before = listItems.slice(0, position);
    var item   = listItems.slice(position, position+1).get(0);
    var after  = listItems.slice(position+1);

    // reassign preceeding elements to list
    if (before.size > 0) {
      this.content = this.content.setIn(parentPath, parent.set("blocks", before));
      parentPos++;
    } else {
      var beforeBlocks = this.content.getIn(blocksPath).delete(parentPos);
      this.content = this.content.setIn(blocksPath, beforeBlocks);
    }

    // create an element with new type
    var typeBlock = item.set("type", type);
    var typeBlocks = this.content.getIn(blocksPath).splice(parentPos, 0, typeBlock);
    parentPos++;
    this.content = this.content.setIn(blocksPath, typeBlocks);

    // append new list with remaining items
    if (after.size > 0) {
      var afterBlock = Map({id: Guid.unique(), type: "ul", blocks: after});
      var afterBlocks = this.content.getIn(blocksPath).splice(parentPos, 0, afterBlock);
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
