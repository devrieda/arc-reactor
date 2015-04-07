var Immutable = require('immutable');
var { Map, List } = Immutable;

var ContentFinder = require('../ContentFinder');

class ToggleBlockType {
  constructor(content) {
    this.map = Immutable.fromJS(content);
    this.content = content;
    this.finder = new ContentFinder(content);
  }

  execute(guids, offsets, options) {
    var tagName = options.type;
    var range = this._findRange(guids, offsets);
    var blocks = range.map( (guid) => {
      return this._findBlock(guid);
    });

    var notOfType = blocks.filter( (block) => {
      return block.type !== tagName;
    });

    if (notOfType.length > 0) {
      var type = notOfType[0].type;
      this._changeBlockTypes(notOfType, tagName);
      return { content: this.content, oldType: type, newType: tagName };

    } else {
      this._changeBlockTypes(blocks, 'p');
      return { content: this.content, oldType: tagName, newType: 'p' };
    }
  }

  _changeBlockTypes(blocks, type) {
    // TODO - REMOVE MUTATION
    blocks.forEach( (block) => { block.type = type; });
  }

  _findBlock(guid) {
    return this._finder().findBlock(guid);
  }

  _findRange(guids, offsets) {
    return this._finder().findRange(guids, offsets);
  }

  _finder() {
    return new ContentFinder(this.content);
  }
}

module.exports = ToggleBlockType;
