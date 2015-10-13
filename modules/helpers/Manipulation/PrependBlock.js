const Immutable = require('immutable');

const ContentFinder = require('../ContentFinder');
const Guid = require('../Guid');

class PrependBlock {
  constructor(content) {
    this.content = content;
  }

  execute(guids) {
    const guid = guids.anchor;

    const path  = this._finder().findPath(guid);
    const block = this.content.getIn(path);

    this._insertBlock('p', 'before', guid);
    return {
      content: this.content,
      position: {
        guid: block.get('id'),
        offset: 0
      }
    };
  }

  _insertBlock(type, position, guid, text) {
    const path   = this._finder().findBlocksPath(guid);
    const blocks = this.content.getIn(path);
    let index  = this._finder().findBlockPosition(guid);

    const block = this._newBlock(type, text || "");
    index = position === 'after' ? index + 1 : index;

    this.content = this.content.setIn(path, blocks.splice(index, 0, block));
    return block;
  }

  _newBlock(type, text) {
    return Immutable.Map({id: Guid.unique(), type: type, text: text});
  }

  _finder() {
    return new ContentFinder(this.content);
  }
}

export default PrependBlock;
