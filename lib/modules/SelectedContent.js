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
    var guidRange = this._guidRange();
    if (guidRange.length == 0) { return false; }

    var filtered = guidRange.filter( (guid) => {
      var block = this.finder.findBlock(guid);
      return block.meta && block.meta.align == "center";
    });

    return filtered.length == guidRange.length;
  }
  isHeader() {
    return this.hasType('h2') || this.hasType('h3') || this.hasType('h4');
  }
  hasType(type) {
    if (MARKUP.inline.indexOf(type) == -1) {
      return this._hasBlockType(type);
    } else {
      return this._hasInlineType(type);
    }
  }

  // make sure every block in the range has this type
  _hasBlockType(type) {
    var guidRange = this._guidRange();
    if (guidRange.length == 0) { return false; }

    var filtered = guidRange.filter( (guid) => {
      var block = this.finder.findBlock(guid);
      return block.type == type;
    })
    return guidRange.length == filtered.length;
  }

  // inline markup is a bit tricker
  _hasInlineType(type) {
    var guidRange = this._guidRange();
    var offsets = this._offsets();
    if (guidRange.length == 0) { return false; }

    var blocks = guidRange.map( (guid) => {
      return this.finder.findBlock(guid);
    });

    // every block needs to have markup of 'type' eg: strong
    var ranges = this._rangesForBlocks(blocks, type);
    if (ranges.length < guidRange.length) { return false; }

    // single block
    if (blocks.length == 1) {
      var matching = ranges[0].filter( (range) => {
        return range.begin <= offsets.anchor && range.end >= offsets.focus;
      });
      return matching.length > 0;

    // across multiple
    } else {
      var anchor = blocks.shift();
      var focus  = blocks.pop();
      if (!this._hasMarkup(anchor, type, offsets.anchor, anchor.text.length) ||
          !this._hasMarkup(focus, type, 0, offsets.focus)) {
        return false;
      }
      if (!this._markupForAll(blocks, type)) { return false; }
      return true;
    }
  }
  _rangesForBlocks(blocks, type) {
    var ranges = [];
    blocks.forEach( (block) => {
      if (block.markups && block.markups[type]) {
        ranges.push(block.markups[type]);
      }
    });
    return ranges;
  }
  // all inner blocks in a set have to be marked up in full
  _markupForAll(blocks, type) {
    for (var i = 0, j = blocks.length; i < j; i++) {
      var block = blocks[i];
      var range = block.markups[type][0];
      if (range.begin > 0 || range.end < block.text.length) { return false; }
    }
    return true;
  }
  // check if offsets are found in a markup range
  _hasMarkup(block, type, from, to) {
    var markups = block.markups[type];
    for (var i = 0, j = markups.length; i < j; i++) {
      var range = markups[i];
      if (from >= range.begin && to <= range.end) { return true; }
    }
    return false;
  }

  _guidRange() {
    var guids   = this.selection.guids();
    var offsets = this.selection.offsets();
    return this.finder.findRange(guids, offsets);
  }
  _offsets() {
    return this.selection.offsets();
  }
}

module.exports = SelectedContent;
