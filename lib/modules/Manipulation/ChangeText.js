var { fromJS } = require('immutable');
var ContentFinder = require('../ContentFinder');
var MarkupParser = require('../MarkupParser');

class ChangeText {
  constructor(map) {
    this.map = map;
  }

  execute(guids, _offsets, options) {
    var path = this._finder().findPath(guids.anchor);
    var block = this.map.getIn(path);

    // rebuild the markup for the block based on the text
    var parser = new MarkupParser(options.node);
    block = block.merge({
      'text': options.text,
      'markups': fromJS(parser.markups())
    });
    this.map = this.map.setIn(path, block);

    return { content: this.map };
  }

  _finder() {
    return new ContentFinder(this.map);
  }
}

module.exports = ChangeText;
