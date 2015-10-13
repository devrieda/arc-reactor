const ContentFinder = require('../ContentFinder');

class InsertNewline {
  constructor(content) {
    this.content = content;
  }

  execute(guids, offsets) {
    const path = this._finder().findPath(guids.anchor);
    const block = this.content.getIn(path);
    const text = block.get('text');

    const begin = text.substring(0, offsets.anchor);
    let end   = text.substring(offsets.focus);

    // need two newlines if there is no newline at the end yet
    end = end === '' ? "\n\n" : `\n${end}`;
    this.content = this.content.setIn(path.concat('text'), begin + end);

    return {
      content: this.content,
      position: {
        guid: block.get('id'),
        offset: offsets.focus + 1
      }
    };
  }

  _finder() {
    return new ContentFinder(this.content);
  }
}

export default InsertNewline;
