var Immutable = require('immutable');

var ContentFinder = require('../ContentFinder');

class ToggleCenter {
  constructor(content) {
    this.map = Immutable.fromJS(content);
  }

  execute(guids, offsets) {
    var range = this._finder().findRange(guids, offsets);

    var paths = range.map( (guid) => {
      return this._finder().findPath(guid);
    });

    // check how many are centered
    var notCentered = paths.filter( (path) => {
      return this.map.getIn(path.concat("meta", "align")) !== 'center';
    });

    if (notCentered.length > 0) {
      notCentered.forEach( (path) => {
        var meta = this.map.getIn(path.concat('meta'), Immutable.Map());
        this.map = this.map.setIn(path.concat('meta'), meta.set('align', 'center'));
      });
    } else {
      paths.forEach( (path) => {
        var meta = this.map.getIn(path.concat('meta'), Immutable.Map());
        this.map = this.map.setIn(path.concat('meta'), meta.delete('align'));
      });
    }

    return { content: this.map.toJS() };
  }

  _finder() {
    return new ContentFinder(this.map);
  }
}

module.exports = ToggleCenter;
