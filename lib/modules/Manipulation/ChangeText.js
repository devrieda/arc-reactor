var Immutable = require('immutable');

var ContentFinder = require('../ContentFinder');

class ChangeText {
  constructor(content) {
    this.map = Immutable.fromJS(content);
  }

  execute(guids, _offsets, options) {
    // find path to the text we want to change
    var path = this._finder().findPath(guids.anchor);
    path.push('text');

    this.map = this.map.setIn(path, options.text);

    return { content: this.map.toJS() };
  }

  _finder() {
    return new ContentFinder(this.map);
  }
}

module.exports = ChangeText;
