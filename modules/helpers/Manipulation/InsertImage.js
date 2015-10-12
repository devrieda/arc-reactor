var ContentFinder = require('../ContentFinder');

class InsertImage {
  constructor(content) {
    this.content = content;
  }

  execute(guids, _offsets, options, callback) {
    var src = options.src;

    var guid = guids.anchor;
    var path  = this._finder().findPath(guid);
    var block = this.content.getIn(path);
    block = block.set('text', 'inserting image...');

    this.loadImage(path, src, callback);

    this.content = this.content.setIn(path, block);
    return {
      content: this.content,
      guid: block.get('id'),
      offset: 0
    };
  }

  // need to fetch the image to get the dimensions
  loadImage(path, src, callback) {
    var block = this.content.getIn(path);

    var img = new Image();
    img.onload = () => {
      block = block.merge({
        type: 'image',
        text: '',
        meta: {
          src: src,
          width: img.width,
          height: img.height
        }
      });
      var content = this.content.setIn(path, block);
      callback({
        content: content,
        guid: block.get('id'),
        offset: 0
      });
    };
    img.src = src;
  }

  _finder() {
    return new ContentFinder(this.content);
  }
}

module.exports = InsertImage;
