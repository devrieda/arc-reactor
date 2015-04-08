var Immutable = require('immutable');

var ContentFinder = require('../ContentFinder');
var RangeSet = require('../RangeSet');

class ToggleMarkup {
  constructor(map) {
    this.map = map;
  }

  execute(guids, offsets, options) {
    var type  = options.type;
    var value = options.value;

    var range = this._finder().findRange(guids, offsets);
    var paths = range.map( (guid) => {
      return this._finder().findPath(guid);
    });

    // single block
    if (paths.length === 1) {
      this._toggleBlockMarkup(paths[0], offsets, type, value);
      return { content: this.map };
    }

    // first
    var anchorPath = paths.shift();
    var anchor = this.map.getIn(anchorPath);
    this._toggleBlockMarkup(
      anchorPath, { anchor: offsets.anchor, focus: anchor.get('text').length },
      type, value
    );

    // last
    var focusPath = paths.pop();
    this._toggleBlockMarkup(
      focusPath, { anchor: 0, focus: offsets.focus }, type, value
    );

    // all the rest are fully selected
    paths.forEach( (path) => {
      var block = this.map.getIn(path);
      this._toggleBlockMarkup(
        path, { anchor: 0, focus: block.get('text').length }, type, value
      );
    });

    return { content: this.map };
  }

  _toggleBlockMarkup(path, offsets, type, value) {
    var { List, Map } = Immutable;
    var block = this.map.getIn(path);

    // new markup range
    var markup = Immutable.Map({ 'range': List([offsets.anchor, offsets.focus]) });
    if (value) { markup = markup.set('value', value); } // links need values

    // default markups for this block
    var markups = block.get("markups", Map());
    markups = markups.set(type, markups.get(type, List()));

    // for now "RangeSet" only works with js objects, so convert to get working
    var set = new RangeSet(markups.get(type).toJS());
    var js  = markup.toJS();
    if (set.includes(js)) {
      markups = markups.set(type, Immutable.fromJS(set.remove(js)));
    } else {
      markups = markups.set(type, Immutable.fromJS(set.add(js)));
    }
    this.map = this.map.setIn(path.concat('markups'), markups);
  }

  _finder() {
    return new ContentFinder(this.map);
  }
}

module.exports = ToggleMarkup;
