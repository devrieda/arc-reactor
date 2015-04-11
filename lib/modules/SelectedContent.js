var ContentFinder = require('./ContentFinder');

// Helps determine attributes of content contained in a selection
//
// TODO - this kinda sucks for extensibility. We probably want to gather these
//        from the installed commands
var MARKUP = {
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
   * certain things like links, we want to do if _any_ item
   * has the same type
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
    var guidRange = this._guidRange();
    if (guidRange.length === 0) { return false; }

    var filtered = guidRange.filter( (guid) => {
      var path = this._finder().findPath(guid);
      return this.map.getIn(path.concat('meta', 'align')) === 'center';
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

  // make sure every block in the range has this type
  _hasBlockType(type) {
    var guidRange = this._guidRange();
    if (guidRange.length === 0) { return false; }

    var filtered = guidRange.filter( (guid) => {
      var path = this._finder().findPath(guid);
      return this.map.getIn(path.concat('type')) === type;
    });
    return guidRange.length === filtered.length;
  }

  // inline markup is a bit tricker
  _hasInlineType(type, hasValue)  {
    var guidRange = this._guidRange();
    var offsets = this._offsets();
    if (guidRange.length === 0) { return false; }

    var paths = guidRange.map( (guid) => {
      return this._finder().findPath(guid);
    });

    var ranges = this._rangesForBlocks(paths, type);

    // one block needs to have markup of 'type' with value eg: a
    if (hasValue && ranges.length > 0) { return true; }

    // every block needs to have markup of 'type' eg: strong
    if (ranges.length < guidRange.length) { return false; }

    // single block
    if (paths.length === 1) {
      var matching = ranges[0].filter( (range) => {
        return range.getIn(['range', 0]) <= offsets.anchor &&
               range.getIn(['range', 1]) >= offsets.focus;
      });
      return matching.size > 0;

    // across multiple
    } else {
      var anchorPath = paths.shift();
      var anchor     = this.map.getIn(anchorPath);
      var focusPath  = paths.pop();

      if (!this._hasMarkup(anchorPath, type, offsets.anchor, anchor.get('text').length) ||
          !this._hasMarkup(focusPath, type, 0, offsets.focus)) {
        return false;
      }

      if (!this._markupForAll(paths, type)) { return false; }
      return true;
    }
  }

  _rangesForBlocks(paths, type) {
    var ranges = [];
    paths.forEach( (path) => {
      var block = this.map.getIn(path);
      var markup = block.getIn(['markups', type]);
      if (markup && markup.size > 0) { ranges.push(markup); }
    });
    return ranges;
  }

  // all inner blocks in a set have to be marked up in full
  _markupForAll(paths, type) {
    for (var i = 0, j = paths.length; i < j; i++) {
      var block = this.map.getIn(paths[i]);
      var range = block.getIn(['markups', type, 0]);

      if (range.getIn(['range', 0]) > 0 ||
          range.getIn(['range', 1]) < block.get('text').length) {
        return false;
      }
    }
    return true;
  }

  // check if offsets are found in a markup range
  _hasMarkup(path, type, from, to) {
    var markups = this.map.getIn(path.concat('markups', type));

    for (var i = 0, j = markups.size; i < j; i++) {
      var range = markups.get(i);
      if (from >= range.getIn(['range', 0]) &&
            to <= range.getIn(['range', 1])) {
        return true;
      }
    }
    return false;
  }

  _guidRange() {
    var guids   = this.selection.guids();
    var offsets = this.selection.offsets();
    return this._finder().findRange(guids, offsets);
  }

  _offsets() {
    return this.selection.offsets();
  }

  _finder() {
    return new ContentFinder(this.map);
  }
}

module.exports = SelectedContent;
