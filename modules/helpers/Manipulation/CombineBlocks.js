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

    // combine the sections
    if (anchorPath[1] !== focusPath[1]) {
      this._combineSections(anchorPath, focusPath);
      this._removeEmptySections(anchorPath, focusPath);
    }

    return { content: this.map, block: anchor, offset: offsets.anchor };
  }

  _removeBlock(guid) {
    var path = this._finder().findBlocksPath(guid);
    if (!path) { return; }

    var blocks = this.map.getIn(path);
    var index  = this._finder().findBlockPosition(guid);

    this.map = this.map.setIn(path, blocks.delete(index));
  }

  _combineSections(anchorPath, focusPath) {
    var blocks1 = this.map.getIn(anchorPath.slice(0, 3));
    var blocks2 = this.map.getIn(focusPath.slice(0, 3));
    var all = blocks1.concat(blocks2);

    // set new blocks
    this.map = this.map.setIn(anchorPath.slice(0, 3), all);

    // remove other section
    this.map = this.map.deleteIn(focusPath.slice(0, 2));
  }

  _removeEmptySections() {
    var sections = this.map.get('sections').filter( (section) => {
      return section.get('blocks').size > 0;
    });
    this.map = this.map.set('sections', sections);
  }

  _finder() {
    return new ContentFinder(this.map);
  }
}

module.exports = CombineBlocks;
