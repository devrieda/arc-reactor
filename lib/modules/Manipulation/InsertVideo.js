var Immutable = require('immutable');

var ContentFinder = require('../ContentFinder');
var Guid = require('../Guid');

class InsertVideo {
  constructor(map) {
    this.map = map;
  }

  execute(guids) {
    var guid = guids.anchor;

    var path  = this._finder().findPath(guid);
    var block = this.map.getIn(path);

    console.log('inserting video')

    return { content: this.map, block: block, offset: 0 };
  }

  _finder() {
    return new ContentFinder(this.map);
  }
}

module.exports = InsertVideo;

// http://gdata.youtube.com/feeds/api/videos/oK6JW1prwTw?v=2&alt=jsonc
