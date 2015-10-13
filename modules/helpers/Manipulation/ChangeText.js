const { fromJS } = require('immutable');
const ContentFinder = require('../ContentFinder');
const MarkupParser = require('../MarkupParser');

class ChangeText {
  constructor(content) {
    this.content = content;
  }

  execute(guids, _offsets, options) {
    const path = this._finder().findPath(guids.anchor);
    const block = this.content.getIn(path);

    // rebuild the markup for the block based on the text
    const parser = new MarkupParser(options.node);
    const newBlock = block.merge({
      'text': options.text,
      'markups': fromJS(parser.markups())
    });
    this.content = this.content.setIn(path, newBlock);

    return {
      content: this.content,
      position: null
    };
  }

  _finder() {
    return new ContentFinder(this.content);
  }
}

export default ChangeText;
