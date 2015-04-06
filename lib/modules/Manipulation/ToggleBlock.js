var ContentFinder = require('../ContentFinder');

class ToggleBlock {
  constructor(content) {
    this.content = content;
    this.finder = new ContentFinder(content);
  }

  execute(guids, offsets, options) {
    var tagName = options.tagName;
    var range = this._findRange(guids, offsets);
    var blocks = range.map( (guid) => {
      return this._findBlock(guid);
    });

    var notOfType = blocks.filter( (block) => {
      return block.type !== tagName;
    });

    if (notOfType.length > 0) {
      var type = notOfType[0].type;
      notOfType.forEach( (block) => { block.type = tagName; });
      return { content: this.content, oldType: type, newType: tagName };

    } else {
      blocks.forEach( (block) => { block.type = 'p'; });
      return { content: this.content, oldType: tagName, newType: 'p' };
    }
  }

  _findBlock(guid) {
    return this.finder.findBlock(guid);
  }

  _findRange(guids, offsets) {
    return this.finder.findRange(guids, offsets);
  }
}

module.exports = ToggleBlock;
