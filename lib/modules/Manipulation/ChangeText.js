var Immutable = require('immutable');
var { Map, List } = Immutable;

var ContentFinder = require('../ContentFinder');

class ChangeText {
  constructor(content) {
    this.map = Immutable.fromJS(content);
    this.finder = new ContentFinder({}, this.map);
  }

  execute(guids, _offsets, options) {
    // find path to the text we want to change
    var path = this.finder.findPath(guids.anchor);
    path.push('text');

    this.map = this.map.setIn(path, options.text);

    return { content: this.map.toJS() };
  }
}

module.exports = ChangeText;
