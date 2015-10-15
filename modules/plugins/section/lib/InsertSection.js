import Immutable from 'immutable';
import ContentFinder from '../../../helpers/ContentFinder';
import Guid from '../../../helpers/Guid';

class InsertSection {
  constructor(content) {
    this.content = content;
  }

  execute(guids) {
    const guid = guids.anchor;

    // full path and base block
    const path = this._finder().findPath(guid);
    const block = this.content.getIn(path);

    // all sections
    const sectsPath = path.slice(0, 1);

    // all blocks
    const blocksPath = path.slice(0, 3);
    const blocks = this.content.getIn(blocksPath);
    const blockIndex = this._finder().findBlockPosition(guid);

    // split up the blocks & make sure top section has at least one block
    let blocks1 = blocks.splice(blockIndex);
    if (blocks1.size === 0) {
      blocks1 = blocks1.push(this._newBlock());
    }
    // swap out the blocks of the top section
    this.content = this.content.setIn(blocksPath, blocks1);

    // create new section to append
    const blocks2 = blocks.splice(0, blockIndex);
    const newSection = this._newSection(blocks2);

    const sections = this.content.getIn(sectsPath);
    const sectIndex = path[1];
    this.content = this.content.setIn(sectsPath, sections.splice(sectIndex+1, 0, newSection));

    return {
      content: this.content,
      position: {
        guid: block.get('id'),
        offset: 0
      }
    };
  }

  _newSection(blocks) {
    return Immutable.Map({id: Guid.unique(), blocks: blocks});
  }

  _newBlock() {
    return Immutable.Map({id: Guid.unique(), type: 'p', text: ''});
  }

  _finder() {
    return new ContentFinder(this.content);
  }
}

export default InsertSection;
