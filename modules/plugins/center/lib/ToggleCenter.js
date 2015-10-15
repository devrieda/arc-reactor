import Immutable from 'immutable';
import ContentFinder from '../../../helpers/ContentFinder';

class ToggleCenter {
  constructor(content) {
    this.content = content;
  }

  execute(guids, offsets) {
    const range = this._finder().findRange(guids, offsets);

    const paths = range.map( (guid) => {
      return this._finder().findPath(guid);
    });

    // check how many are centered
    const notCentered = paths.filter( (path) => {
      return this.content.getIn(path.concat("data", "align")) !== 'center';
    });

    if (notCentered.length > 0) {
      notCentered.forEach( (path) => {
        const data = this.content.getIn(path.concat('data'), Immutable.Map());
        this.content = this.content.setIn(path.concat('data'), data.set('align', 'center'));
      });
    } else {
      paths.forEach( (path) => {
        const data = this.content.getIn(path.concat('data'), Immutable.Map());
        this.content = this.content.setIn(path.concat('data'), data.delete('align'));
      });
    }

    return { content: this.content, position: null };
  }

  _finder() {
    return new ContentFinder(this.content);
  }
}

export default ToggleCenter;
