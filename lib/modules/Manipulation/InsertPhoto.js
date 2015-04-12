var ContentFinder = require('../ContentFinder');

class InsertPhoto {
  constructor(map) {
    this.map = map;
  }

  execute(guids, _offsets, options, callback) {
    var src = options.src;

    var guid = guids.anchor;
    var path  = this._finder().findPath(guid);
    var block = this.map.getIn(path);
    block = block.set('text', 'inserting image...');

    // find image size
    var img = new Image();
    img.onload = () => {
      block = block.merge({
        type: 'figure', src: src, text: '',
        width: img.width, height: img.height
      });
      var map = this.map.setIn(path, block);
      callback({ content: map, block: block, offset: 0 });
    };
    img.src = src;

    this.map = this.map.setIn(path, block);
    return { content: this.map, block: block, offset: 0 };
  }

  _finder() {
    return new ContentFinder(this.map);
  }
}

module.exports = InsertPhoto;
