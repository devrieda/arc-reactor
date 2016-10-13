import ContentFinder from './ContentFinder';

// Helps determine attributes of content contained in a selection
//
// TODO - this kinda sucks for extensibility. We probably want to gather these
//        from the installed commands
const MARKUP = {
  block: ['h2', 'h3', 'h4', 'blockquote', 'p'],
  inline: ['strong', 'em', 'a'],
};

class SelectedContent {
  constructor(selection, map) {
    this.selection = selection;
    this.map = map;
  }

  /**
   * does the entire selection match the given type
   *
   * isActive('h1');
   *
   * while for a selection to be active for most values is if
   * _every_ element in the selection is of the same type, for
   * things like links, we want to do if _any_ item has the same type
   *
   * isActive('a', true);
   *
   * => true
   */
  isActive(type, hasValue) {
    if (type === 'center') {
      return this.isCentered();
    } else {
      return this.hasType(type, hasValue);
    }
  }

  /**
   * Is the selected content centered
   *
   * isCentered();
   *
   * => true
   */
  isCentered() {
    const guidRange = this._getGuidRange();
    if (guidRange.length === 0) { return false; }

    const filtered = guidRange.filter( (guid) => {
      const path = this._finder().findPath(guid);
      return this.map.getIn(path.concat('data', 'align')) === 'center';
    });

    return filtered.length === guidRange.length;
  }

  /**
   * Is the selected content a header tag?
   *
   * isHeader();
   *
   * => true
   */
  isHeader() {
    return this.hasType('h2') || this.hasType('h3') || this.hasType('h4');
  }

  /**
   * does the selected content match a given type
   *
   * hasType('blockquote');
   *
   * => true
   */
  hasType(type, hasValue) {
    if (MARKUP.inline.indexOf(type) === -1) {
      return this._hasBlockType(type);
    } else {
      return this._hasInlineType(type, hasValue);
    }
  }

  /**
   * Does every block in the selected range have this type
   */
  _hasBlockType(type) {
    const guidRange = this._getGuidRange();
    if (guidRange.length === 0) { return false; }

    const filtered = guidRange.filter( (guid) => {
      const path = this._finder().findPath(guid);
      return this.map.getIn(path.concat('type')) === type;
    });
    return guidRange.length === filtered.length;
  }

  /**
   *
   */
  _hasInlineType(type, hasValue)  {
    const guidRange = this._getGuidRange();
    if (guidRange.length === 0) { return false; }

    // path to each guid in immutable data
    const paths = guidRange.map( (guid) => {
      return this._finder().findPath(guid);
    });

    const blockMarkupRanges = this._getMarkupRangesForBlocks(paths, type);

    // every block needs to have markup of 'type' eg: strong
    if (blockMarkupRanges.length < guidRange.length) { return false; }

    const offsets = this._getOffsets();

    // single block
    if (paths.length === 1) {
      const matching = blockMarkupRanges[0].filter( (range) => {
        const begin = range.getIn(['range', 0]);
        const end   = range.getIn(['range', 1]);

        // check for any overlap if this is an anchor
        if (hasValue) {
          return end > offsets.anchor && begin < offsets.focus;
        } else {
          return begin <= offsets.anchor && end >= offsets.focus;
        }
      });
      return matching.size > 0;

    // across multiple
    } else {
      const anchorPath = paths.shift();
      const anchor     = this.map.getIn(anchorPath);
      const focusPath  = paths.pop();

      if (!this._hasMarkup(anchorPath, type, offsets.anchor, anchor.get('text').length) ||
          !this._hasMarkup(focusPath, type, 0, offsets.focus)) {
        return false;
      }

      if (!this._markupForAll(paths, type)) { return false; }
      return true;
    }
  }

  _getMarkupRangesForBlocks(paths, type) {
    let ranges = [];
    paths.forEach( (path) => {
      const block = this.map.getIn(path);
      const markup = block.getIn(['markups', type]);
      if (markup && markup.size > 0) { ranges.push(markup); }
    });
    return ranges;
  }

  _markupForAny(paths, type) {
    for (let i = 0, j = paths.length; i < j; i++) {
      const block = this.map.getIn(paths[i]);
      const range = block.getIn(['markups', type, 0]);

      if (range.getIn(['range', 0]) > 0 ||
          range.getIn(['range', 1]) < block.get('text').length) {
        return false;
      }
    }
    return true;
  }

  // all inner blocks in a set have to be marked up in full
  _markupForAll(paths, type) {
    for (let i = 0, j = paths.length; i < j; i++) {
      const block = this.map.getIn(paths[i]);
      const range = block.getIn(['markups', type, 0]);

      if (range.getIn(['range', 0]) > 0 ||
          range.getIn(['range', 1]) < block.get('text').length) {
        return false;
      }
    }
    return true;
  }

  // check if offsets are found in a markup range
  _hasMarkup(path, type, from, to) {
    const markups = this.map.getIn(path.concat('markups', type));

    for (let i = 0, j = markups.size; i < j; i++) {
      const range = markups.get(i);
      if (from >= range.getIn(['range', 0]) &&
            to <= range.getIn(['range', 1])) {
        return true;
      }
    }
    return false;
  }

  // find the range of guids for selection
  // eg. ["fea0", "002e", "ce30"]
  _getGuidRange() {
    const guids   = this.selection.guids();
    const offsets = this.selection.offsets();
    return this._finder().findRange(guids, offsets);
  }

  _getOffsets() {
    return this.selection.offsets();
  }

  _finder() {
    return new ContentFinder(this.map);
  }
}

export default SelectedContent;
