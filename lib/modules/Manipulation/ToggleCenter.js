var ContentFinder = require('../ContentFinder');

class ToggleCenter {
  constructor(content) {
    this.content = content;
    this.finder = new ContentFinder(content);
  }

  execute(guids, offsets) {
    var range = this._findRange(guids, offsets);
    var blocks = range.map( (guid) => {
      return this._findBlock(guid);
    });

    // check how many are centered
    var notCentered = blocks.filter( (block) => {
      return !block.meta || block.meta.align !== 'center';
    });

    if (notCentered.length > 0) {
      notCentered.forEach( (block) => {
        block.meta = block.meta || {};
        block.meta.align = "center";
      });
    } else {
      blocks.forEach( (block) => {
        delete block.meta.align;
      });
    }

    return { content: this.content };
  }

  _findBlock(guid) {
    return this.finder.findBlock(guid);
  }

  _findRange(guids, offsets) {
    return this.finder.findRange(guids, offsets);
  }
}

module.exports = ToggleCenter;
