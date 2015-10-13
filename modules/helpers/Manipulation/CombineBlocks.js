const ContentFinder = require('../ContentFinder');

class CombineBlocks {
  constructor(content) {
    this.content = content;
  }

  execute(guids, offsets) {
    const range = this._finder().findRange(guids, offsets);
    const first = range.shift();
    const last  = range.pop();

    const anchorPath = this._finder().findPath(first);
    const anchor = this.content.getIn(anchorPath);

    const focusPath  = last ? this._finder().findPath(last) : anchorPath;
    const focus  = this.content.getIn(focusPath);

    // delete the rest
    range.forEach( (guid) => { this._removeBlock(guid); });

    const anchorText = anchor.get("text");
    const focusText  = focus.get("text");
    const combinedText = anchorText.substring(0, offsets.anchor) +
                       focusText.substring(offsets.focus);
    this.content = this.content.setIn(anchorPath.concat("text"), combinedText);

    if (anchor.get('id') !== focus.get('id')) {
      this._removeBlock(focus.get('id'));
    }

    // combine the sections
    if (anchorPath[1] !== focusPath[1]) {
      this._combineSections(anchorPath, focusPath);
      this._removeEmptySections(anchorPath, focusPath);
    }

    return {
      content: this.content,
      position: {
        guid: anchor.get('id'),
        offset: offsets.anchor
      }
    };
  }

  _removeBlock(guid) {
    const path = this._finder().findBlocksPath(guid);
    if (!path) { return; }

    const blocks = this.content.getIn(path);
    const index  = this._finder().findBlockPosition(guid);

    this.content = this.content.setIn(path, blocks.delete(index));
  }

  _combineSections(anchorPath, focusPath) {
    const blocks1 = this.content.getIn(anchorPath.slice(0, 3));
    const blocks2 = this.content.getIn(focusPath.slice(0, 3));
    const all = blocks1.concat(blocks2);

    // set new blocks
    this.content = this.content.setIn(anchorPath.slice(0, 3), all);

    // remove other section
    this.content = this.content.deleteIn(focusPath.slice(0, 2));
  }

  _removeEmptySections() {
    const sections = this.content.get('sections').filter( (section) => {
      return section.get('blocks').size > 0;
    });
    this.content = this.content.set('sections', sections);
  }

  _finder() {
    return new ContentFinder(this.content);
  }
}

export default CombineBlocks;
