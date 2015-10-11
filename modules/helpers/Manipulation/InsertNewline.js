var ContentFinder = require('../ContentFinder');

class InsertNewline {
  constructor(content) {
    this.content = content;
  }

  execute(guids, offsets) {
    var path = this._finder().findPath(guids.anchor);
    var block = this.content.getIn(path);
    var text = block.get('text');

    var begin = text.substring(0, offsets.anchor);
    var end   = text.substring(offsets.focus);

    // need two newlines if there is no newline at the end yet
    end = end === '' ? "\n\n" : `\n${end}`;
    this.content = this.content.setIn(path.concat('text'), begin + end);

    return { content: this.content, block: block, offset: offsets.focus + 1 };
  }

  _finder() {
    return new ContentFinder(this.content);
  }
}

module.exports = InsertNewline;
