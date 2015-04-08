var ContentFinder = require('../ContentFinder');

class ChangeText {
  constructor(map) {
    this.map = map;
  }

  execute(guids, _offsets, options) {
    var path = this._finder().findPath(guids.anchor);
    this.map = this.map.setIn(path.concat('text'), options.text);

    return { content: this.map };
  }

  _finder() {
    return new ContentFinder(this.map);
  }
}

module.exports = ChangeText;
