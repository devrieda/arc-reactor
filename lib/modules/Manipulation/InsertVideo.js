var Immutable = require('immutable');

var ContentFinder = require('../ContentFinder');
var Guid = require('../Guid');

class InsertVideo {
  constructor(map) {
    this.map = map;
  }

  execute(guids, _offsets, options) {
    var src = options.src;

    var guid  = guids.anchor;
    var path  = this._finder().findPath(guid);
    var block = this.map.getIn(path);

    // https://www.youtube.com/watch?v=3RM9KcYEYXs

    var youTubeId = this._parseYouTube(src);
    if (youTubeId) {
      block = block.merge({
        type: 'figure',
        src: `https://www.youtube.com/embed/${youTubeId}`,
        text: ''
      });
    }

    this.map = this.map.setIn(path, block);
    return { content: this.map, block: block, offset: 0 };
  }

  _parseYouTube(url) {
    var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match[1] && match[1].length === 11) {
      return match[1];
    } else {
      return false;
    }
  }

  _finder() {
    return new ContentFinder(this.map);
  }
}

module.exports = InsertVideo;

// http://gdata.youtube.com/feeds/api/videos/oK6JW1prwTw?v=2&alt=jsonc
