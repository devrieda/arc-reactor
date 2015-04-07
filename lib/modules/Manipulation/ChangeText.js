var Immutable = require('immutable');

var ContentFinder = require('../ContentFinder');

class ChangeText {
  constructor(content) {
    this.map = Immutable.fromJS(content);
  }

  execute(guids, _offsets, options) {
    var path = this._finder().findPath(guids.anchor);
    this.map = this.map.setIn(path.concat('text'), options.text);

    return { content: this.map.toJS() };
  }

  _finder() {
    return new ContentFinder(this.map);
  }
}

module.exports = ChangeText;
