import Immutable from 'immutable';
import ContentFinder from '../ContentFinder';

class InsertBlocks {
  constructor(content) {
    this.content = content;
  }

  execute(guids, offsets, options) {
    const guid = guids.anchor;
    const path  = this._finder().findPath(guid);
    let block = this.content.getIn(path);

    // append all the new blocks
    options.blocks.forEach( (attrs) => {
      const newBlock = Immutable.fromJS(attrs);
      block = this._insertBlock(block, newBlock);
    });

    // remove the original block
    const origBlock = this.content.getIn(path);
    this._removeBlock(origBlock.get('id'));

    let last = options.blocks[options.blocks.length-1];
    if (!last.text && last.blocks) {
      last = last.blocks[last.blocks.length-1];
    }

    return {
      content: this.content,
      position: {
        guid: last.id,
        offset: last.text.length
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

  _insertBlock(block, newBlock) {
    const path   = this._finder().findBlocksPath(block.get('id'));
    const blocks = this.content.getIn(path);
    const index  = this._finder().findBlockPosition(block.get('id')) + 1;

    this.content = this.content.setIn(path, blocks.splice(index, 0, newBlock));
    return newBlock;
  }

  _finder() {
    return new ContentFinder(this.content);
  }
}

export default InsertBlocks;
