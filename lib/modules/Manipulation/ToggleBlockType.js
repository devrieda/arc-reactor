var Immutable = require('immutable');
var { Map, List } = Immutable;

var ContentFinder = require('../ContentFinder');

class ToggleBlockType {
  constructor(content) {
    this.map = Immutable.fromJS(content);
  }

  execute(guids, offsets, options) {
    var tagName = options.type;
    var range = this._findRange(guids, offsets);

    var paths = range.map( (guid) => {
      return this._finder().findPath(guid);
    });

    // find list of blocks that don't match our type
    var notOfType = paths.filter( (path) => {
      var block = this.map.getIn(path);
      return block.get("type") !== tagName;
    });

    // some blocks don't match, switch them
    if (notOfType.length > 0) {
      var type = this.map.getIn(notOfType[0].concat("type"));
      this._changeBlockTypes(notOfType, tagName);
      return { content: this.map.toJS(), oldType: type, newType: tagName };

    // all blocks already match, so switch them back to a paragraph
    } else {
      this._changeBlockTypes(paths, 'p');
      return { content: this.map.toJS(), oldType: tagName, newType: 'p' };
    }
  }

  _changeBlockTypes(paths, type) {
    paths.forEach( (path) => {
      this.map = this.map.setIn(path.concat("type"), type);
    });
  }

  _findBlock(guid) {
    return this._finder().findBlock(guid);
  }

  _findRange(guids, offsets) {
    return this._finder().findRange(guids, offsets);
  }

  _finder() {
    return new ContentFinder({}, this.map);
  }
}

module.exports = ToggleBlockType;
