var ContentState = require('../state/ContentState');

// Manages making changes to the content
//
class ContentManager {
  constructor(content) {
    this.content = content;
  }

  findBlock(guid) {
    var block = {};
    this.content.sections.forEach( (sect) => {
      sect.blocks.forEach( (b) => {
        if (guid == b.id) { block = b; }
      });
    });
    return block;
  }

  toggleCenter(guid) {
    var block = this.findBlock(guid);
    block.meta = block.meta || {}

    if (block.meta.align == "center") {
      delete block.meta.align;
    } else {
      block.meta.align = "center";
    }
  }

  toggleBlockTag(block, tagName) {
    var type = block.type;
    block.type = type == tagName ? 'p' : tagName;
  }

  toggleMarkup(block, type, active, markup) {
    block.markups = block.markups || {}

    // remove from italics
    if (block.markups[type] && active) {
      this._removeMarkup(block, type, markup);
    } else {
      this._addMarkup(block, type, markup);
    }
  }

  _addMarkup(block, type, markup) {
    block.markups[type] = block.markups[type] || [];
    block.markups[type].push(markup);
  }

  _removeMarkup(block, type, markup) {
    var jsonMarkup = JSON.stringify(markup);

    var idx = 0;
    block.markups[type].forEach( (link, i) => {
      if (JSON.stringify(link) === jsonMarkup) { idx = i; }
    })
    block.markups[type].splice(idx, 1);
  }

  flush() {
    ContentState.set({content: this.content});
  }
}

module.exports = ContentManager;
