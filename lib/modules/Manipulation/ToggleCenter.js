var Immutable = require('immutable');
var { Map, List } = Immutable;

var ContentFinder = require('../ContentFinder');

class ToggleCenter {
  constructor(content) {
    this.map = Immutable.fromJS(content);
    this.content = content;
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
        // TODO - REMOVE MUTATION
        block.meta = block.meta || {};
        block.meta.align = "center";
      });
    } else {
      blocks.forEach( (block) => {
        // TODO - REMOVE MUTATION
        delete block.meta.align;
      });
    }

    return { content: this.content };
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

module.exports = ToggleCenter;
