var ContentFinder = require('../ContentFinder');
var Guid = require('../Guid');
var { Map } = require('immutable');

class ToggleBlockType {
  constructor(map) {
    this.map = map;
  }

  execute(guids, offsets, options) {
    var tagName = options.type;
    var range = this._finder().findRange(guids, offsets);

    var paths = range.map( (guid) => {
      return this._finder().findPath(guid);
    });

    // find list of blocks that don't match our type
    var notOfType = paths.filter( (path) => {
      var block = this.map.getIn(path);
      return block.get("type") !== tagName;
    });

    // some blocks don't match, switch them
    if (notOfType.length > 0) {
      var type = this.map.getIn(notOfType[0].concat("type"));
      if (type === 'li') {
        this._switchListItems(notOfType, tagName);
      } else {
        this._changeBlockTypes(notOfType, tagName);
      }
      return { content: this.map, oldType: type, newType: tagName };

    // all blocks already match, so switch them back to a paragraph
    } else {
      this._changeBlockTypes(paths, 'p');
      return { content: this.map, oldType: tagName, newType: 'p' };
    }
  }

  /**
   * Convert an item in a list to a different block element
   * If we select the middle LI, it will split the list:
   *
   * ul         ul
   *   li         li
   *  <li>  =>  h3
   *   li       ul
   *              li
   */
  _switchListItems(paths, type) {
    paths.forEach( (path) => {
      var oldType = this.map.getIn(path.concat("type"));
      if (oldType === 'li') {
        var blocksPath = path.slice(0, -3);
        var parentPath = path.slice(0, -2);
        var position   = path[path.length-1];
        var parentPos  = path[path.length-3];
        var parent     = this.map.getIn(parentPath);
        var listItems  = parent.get("blocks");

        var before = listItems.slice(0, position);
        var item   = listItems.slice(position, position+1).get(0);
        var after  = listItems.slice(position+1);

        // reassign preceeding elements to list
        this.map = this.map.setIn(parentPath, parent.set("blocks", before));

        // create an element with new type
        var typeBlock = item.set("type", type);
        var typeBlocks = this.map.getIn(blocksPath).splice(parentPos+1, 0, typeBlock);
        this.map = this.map.setIn(blocksPath, typeBlocks);

        // append new list with remaining items
        var afterBlock = Map({id: Guid.unique(), type: "ul", blocks: after});
        var afterBlocks = this.map.getIn(blocksPath).splice(parentPos+2, 0, afterBlock);
        this.map = this.map.setIn(blocksPath, afterBlocks);

      } else {
        this.map = this.map.setIn(path.concat("type"), type);
      }
    });
  }

  _changeBlockTypes(paths, type) {
    paths.forEach( (path) => {
      this.map = this.map.setIn(path.concat("type"), type);
    });
  }

  _finder() {
    return new ContentFinder(this.map);
  }
}

module.exports = ToggleBlockType;
