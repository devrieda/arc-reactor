var ContentFinder = require('../ContentFinder');

class InsertYoutube {
  constructor(content) {
    this.content = content;
  }

  execute(guids, _offsets, options) {
    var src = options.src;

    var guid  = guids.anchor;
    var path  = this._finder().findPath(guid);
    var block = this.content.getIn(path);

    var youTubeId = this._parseYouTube(src);
    if (youTubeId) {
      block = block.merge({
        type: 'youtube',
        text: '',
        meta: {
          src: `https://www.youtube.com/embed/${youTubeId}`,
        }
      });
    }

    this.content = this.content.setIn(path, block);
    return { content: this.content, block: block, offset: 0 };
  }

  // Will match these formats:
  //
  // http://www.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index
  // http://www.youtube.com/user/IngridMichaelsonVEVO#p/a/u/1/QdK8U-VIH_o
  // http://www.youtube.com/v/0zM3nApSvMg?fs=1&amp;hl=en_US&amp;rel=0
  // http://www.youtube.com/watch?v=0zM3nApSvMg#t=0m10s
  // http://www.youtube.com/embed/0zM3nApSvMg?rel=0
  // http://www.youtube.com/watch?v=0zM3nApSvMg
  // http://youtu.be/0zM3nApSvMg
  //
  _parseYouTube(url) {
    var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[1] && match[1].length === 11) {
      return match[1];
    } else {
      return false;
    }
  }

  _finder() {
    return new ContentFinder(this.content);
  }
}

module.exports = InsertYoutube;
