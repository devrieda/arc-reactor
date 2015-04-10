var Immutable = require('immutable');

var ContentFinder = require('../ContentFinder');
var Guid = require('../Guid');

class InsertPhoto {
  constructor(map) {
    this.map = map;
  }

  execute(guids, _offsets, options) {
    var src = options.src;
    var cb  = options.cb;

    var guid = guids.anchor;
    var path  = this._finder().findPath(guid);
    var block = this.map.getIn(path)
    block = block.set('text', 'inserting image...');

    // find image size
    var img = new Image();
    img.onload = (e) => {
      block = block.merge({
        type: 'figure', src: src, text: '',
        width: img.width, height: img.height
      });
      this.map = this.map.setIn(path, block);
      cb(this.map);
    }
    img.src = src;

    this.map = this.map.setIn(path, block);
    return { content: this.map, block: block, offset: 0 };
  }

  _finder() {
    return new ContentFinder(this.map);
  }
}

module.exports = InsertPhoto;
