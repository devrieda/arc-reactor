const ContentFinder = require('../ContentFinder');

class InsertImage {
  constructor(content) {
    this.content = content;
  }

  execute(guids, _offsets, options, callback) {
    const src = options.src;

    const guid = guids.anchor;
    const path  = this._finder().findPath(guid);
    const block = this.content.getIn(path);
    const newBlock = block.set('text', 'inserting image...');

    this.loadImage(path, src, callback);

    this.content = this.content.setIn(path, newBlock);
    return {
      content: this.content,
      position: {
        guid: newBlock.get('id'),
        offset: 0
      }
    };
  }

  // need to fetch the image to get the dimensions
  loadImage(path, src, callback) {
    const block = this.content.getIn(path);

    const img = new Image();
    img.onload = () => {
      const newBlock = block.merge({
        type: 'image',
        text: '',
        meta: {
          src: src,
          width: img.width,
          height: img.height
        }
      });
      const content = this.content.setIn(path, newBlock);
      callback({
        content: content,
        position: {
          guid: newBlock.get('id'),
          offset: 0
        }
      });
    };
    img.src = src;
  }

  _finder() {
    return new ContentFinder(this.content);
  }
}

module.exports = InsertImage;
