var ContentFinder = require('../ContentFinder');
var RangeSet = require('../RangeSet');

class ToggleMarkup {
  constructor(content) {
    this.content = content;
    this.finder = new ContentFinder(content);
  }

  execute(guids, offsets, options) {
    var type  = options.type;
    var value = options.value;

    var range = this._findRange(guids, offsets);
    var blocks = range.map( (guid) => {
      return this._findBlock(guid);
    });

    // single block
    if (blocks.length === 1) {
      return this._toggleBlockMarkup(blocks[0], offsets, type, value);
    }

    // first
    var anchor = blocks.shift();
    this._toggleBlockMarkup(
      anchor, { anchor: offsets.anchor, focus: anchor.text.length },
      type, value
    );

    // last
    var focus = blocks.pop();
    this._toggleBlockMarkup(
      focus, { anchor: 0, focus: offsets.focus }, type, value
    );

    // all the rest are fully selected
    blocks.forEach( (block) => {
      this._toggleBlockMarkup(
        block, { anchor: 0, focus: block.text.length }, type, value
      );
    });

    return { content: this.content };
  }

  _toggleBlockMarkup(block, offsets, type, value) {
    var markup = { "range": [offsets.anchor, offsets.focus] };
    if (value) { markup.value = value; }

    block.markups = block.markups || {};
    block.markups[type] = block.markups[type] || [];

    var set = new RangeSet(block.markups[type]);
    if (set.includes(markup)) {
      block.markups[type] = set.remove(markup);
    } else {
      block.markups[type] = set.add(markup);
    }

    return { content: this.content };
  }

  _findBlock(guid) {
    return this.finder.findBlock(guid);
  }

  _findRange(guids, offsets) {
    return this.finder.findRange(guids, offsets);
  }
}

module.exports = ToggleMarkup;
