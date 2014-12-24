var ContentFinder = require('./ContentFinder');

// Helps determine attributes of content contained in a selection
var MARKUP = {
  block: ['h2', 'h3', 'h4', 'blockquote', 'p'],
  inline: ['strong', 'em', 'a'],
}

class SelectedContent {
  constructor(selection, content) {
    this.selection = selection;
    this.content = content;
    this.finder = new ContentFinder(this.content);
  }

  isCentered() {
    var range = this._range();

    var filtered = range.filter( (guid) => {
      var block = this.finder.findBlock(guid);
      return block.meta && block.meta.align == "center";
    });

    return filtered.length == range.length;
  }
  isHeader() {
    return this.hasType('h2') || this.hasType('h3') || this.hasType('h4');
  }
  hasType(type) {
    // block
    if (MARKUP.inline.indexOf(type) == -1) {
      return this._hasBlockType(type);

    // inline
    } else {
      return this._hasInlineType(type);
    }
  }

  _hasInlineType(type) {
    var range = this._range();
    if (range.length == 0) { return false; }

    var offsets = this._offsets();

    // first matches

    // last matches

    // everything in between matches

    return false;
  }

  // make sure every block in the range has this type
  _hasBlockType(type) {
    var range = this._range();
    if (range.length == 0) { return false; }

    var filtered = range.filter( (guid) => {
      var block = this.finder.findBlock(guid);
      return block.type == type;
    })
    return range.length == filtered.length;
  }

  _range() {
    var guids = this.selection.guids();
    return this.finder.findRange(guids);
  }
  _offsets() {
    return this.selection.offsets();
  }
}

module.exports = SelectedContent;
