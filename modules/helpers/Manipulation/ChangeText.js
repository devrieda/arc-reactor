var { fromJS } = require('immutable');
var ContentFinder = require('../ContentFinder');
var MarkupParser = require('../MarkupParser');

class ChangeText {
  constructor(content) {
    this.content = content;
  }

  execute(guids, _offsets, options) {
    var path = this._finder().findPath(guids.anchor);
    var block = this.content.getIn(path);

    // rebuild the markup for the block based on the text
    var parser = new MarkupParser(options.node);
    block = block.merge({
      'text': options.text,
      'markups': fromJS(parser.markups())
    });
    this.content = this.content.setIn(path, block);

    return { content: this.content };
  }

  _finder() {
    return new ContentFinder(this.content);
  }
}

module.exports = ChangeText;
