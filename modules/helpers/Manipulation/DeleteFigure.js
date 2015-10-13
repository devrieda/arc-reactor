import Immutable from 'immutable';
import ContentFinder from '../ContentFinder';
import Guid from '../Guid';

class DeleteFigure {
  constructor(content) {
    this.content = content;
  }

  execute(guids) {
    const guid  = guids.anchor;
    const path  = this._finder().findPath(guid);

    // clear out all the attributes, but keep the id
    const block = Immutable.Map(this._newBlock('p', ''));
    return {
      content: this.content.setIn(path, block),
      position: {
        guid: block.get('id'),
        offset: 0
      }
    };
  }

  _newBlock(type, text) {
    return Immutable.Map({id: Guid.unique(), type: type, text: text});
  }

  _finder() {
    return new ContentFinder(this.content);
  }
}

export default DeleteFigure;
