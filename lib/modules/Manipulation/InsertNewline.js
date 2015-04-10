var ContentFinder = require('../ContentFinder');

class InsertNewline {
  constructor(map) {
    this.map = map;
  }

  execute(guids, offsets) {
    var path = this._finder().findPath(guids.anchor);
    var block = this.map.getIn(path);
    var text = block.get('text');

    var begin = text.substring(0, offsets.anchor);
    var end   = text.substring(offsets.focus);

    this.map = this.map.setIn(path.concat('text'), begin + "\n" + end);

    return { content: this.map, block: block, offset: offsets.focus + 1 };
  }

  _finder() {
    return new ContentFinder(this.map);
  }
}

module.exports = InsertNewline;
