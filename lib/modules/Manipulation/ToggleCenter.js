var Immutable = require('immutable');

var ContentFinder = require('../ContentFinder');

class ToggleCenter {
  constructor(map) {
    this.map = map;
  }

  execute(guids, offsets) {
    var range = this._finder().findRange(guids, offsets);

    var paths = range.map( (guid) => {
      return this._finder().findPath(guid);
    });

    // check how many are centered
    var notCentered = paths.filter( (path) => {
      return this.map.getIn(path.concat("data", "align")) !== 'center';
    });

    if (notCentered.length > 0) {
      notCentered.forEach( (path) => {
        var data = this.map.getIn(path.concat('data'), Immutable.Map());
        this.map = this.map.setIn(path.concat('data'), data.set('align', 'center'));
      });
    } else {
      paths.forEach( (path) => {
        var data = this.map.getIn(path.concat('data'), Immutable.Map());
        this.map = this.map.setIn(path.concat('data'), data.delete('align'));
      });
    }

    return { content: this.map };
  }

  _finder() {
    return new ContentFinder(this.map);
  }
}

module.exports = ToggleCenter;
