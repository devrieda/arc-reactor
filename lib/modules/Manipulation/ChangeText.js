var ContentFinder = require('../ContentFinder');

class ChangeText {
  constructor(content) {
    this.content = content;
    this.finder = new ContentFinder(content);
  }

  execute(guids, _offsets, options) {
    var text = options.text;
    var block = this._findBlock(guids.anchor);
    block.text = text;

    return { content: this.content };
  }

  _findBlock(guid) {
    return this.finder.findBlock(guid);
  }
}

module.exports = ChangeText;
