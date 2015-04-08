var ContentFinder = require('../ContentFinder');

class CombineBlocks {
  constructor(map) {
    this.map = map;
  }

  execute(guids, offsets) {
    var range = this._finder().findRange(guids, offsets);
    var first = range.shift();
    var last  = range.pop();

    var anchorPath = this._finder().findPath(first);
    var anchor = this.map.getIn(anchorPath);

    var focusPath  = last ? this._finder().findPath(last) : anchorPath;
    var focus  = this.map.getIn(focusPath);

    // delete the rest
    range.forEach( (guid) => { this._removeBlock(guid); });

    var anchorText = anchor.get("text");
    var focusText  = focus.get("text");
    var combinedText = anchorText.substring(0, offsets.anchor) +
                       focusText.substring(offsets.focus);
    this.map = this.map.setIn(anchorPath.concat("text"), combinedText);

    if (anchor.get('id') !== focus.get('id')) {
      this._removeBlock(focus.get('id'));
    }

    return { content: this.map, block: anchor, offset: offsets.anchor };
  }

  _removeBlock(guid) {
    var path = this._finder().findBlocksPath(guid);
    var blocks = this.map.getIn(path);
    var index  = this._finder().findBlockPosition(guid);

    this.map = this.map.setIn(path, blocks.delete(index));
  }

  _finder() {
    return new ContentFinder(this.map);
  }
}

module.exports = CombineBlocks;
