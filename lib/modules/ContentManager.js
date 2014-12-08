var Guid = require('./Guid');
var ContentFinder = require('./ContentFinder');
var ContentState = require('../state/ContentState');

// Manages making changes to the content
//
class ContentManager {
  constructor(content) {
    this.content = content;
    this.finder = new ContentFinder(content);
  }

  // add / remove / combine blocks

  appendBlock(guids) {
    var guid  = guids.anchor;
    var block = this.finder.findBlock(guid);
    var text  = block.text;
    var starts = text.substring(0, 1);
    var newBlock;

    // finish list
    if (block.type == 'li' && text === '') {
      newBlock = this._finishList(guid);

    // add to a list
    } else if (block.type == 'li') {
      newBlock = this._addListItem(guid);

    // create new list
    } else if (['-', '*', '1'].indexOf(starts) != -1) {
      newBlock = this._createList(guid, starts);

    // normal new block
    } else {
      newBlock = this._insertBlock('p', 'after', guid);
    }
    return { block: newBlock, offset: 0 };
  }
  prependBlock(guids) {
    var guid = guids.anchor;
    var newBlock = this._insertBlock('p', 'before', guid);
    return { block: newBlock, offset: 0 };
  }
  splitBlock(guids, offset) {
    var guid  = guids.anchor;
    var block = this.finder.findBlock(guid);
    var text  = block.text;

    block.text = text.substring(0, offset);
    var newBlock = this._insertBlock('p', 'after', guid, text.substring(offset));
    return { block: newBlock, offset: 0 };
  }
  combineBlocks(guids) {
    console.log('combine blocks');
    // - find text before anchor selection
    // - find text after focus selection
    // - combine text into first node
    // - delete 2nd node

    return { block: null, offset: 0 };
  }
  combineBlockWithPrevious(guids) {
    var guid = guids.anchor;
    var block = this.finder.findBlock(guid);
    var previous = this.finder.findPreviousBlock(guid);

    // get text for this node
    // append text to previous node
    // delete this node
    if (previous) {
      var offset = previous.text.length;
      previous.text = previous.text + block.text;
      this._removeBlock(guid);
      return { block: previous, offset: offset };

    } else {
      return { block: null, offset: 0 };
    }
  }
  combineBlockWithNext(guids) {
    // get text for next node
    // delete next node
    // append text to this node
  }

  _addListItem(guid) {
    return this._insertBlock('li', 'after', guid);
  }
  _createList(guid, starts) {
    var type = starts == '1' ? 'ol' : 'ul';

    var block = this.finder.findBlock(guid);
    var text = block.text;
    delete block.text

    block.type = type;
    var items = [
      this._newBlock('li', text.replace(/^[-*\d]\.?\s?/g, '')),
      this._newBlock('li', '')
    ]
    block.blocks = items;
    return items[1];
  }
  _finishList(guid) {
    var parentGuid = this.finder.findParentBlock(guid);
    this._removeBlock(guid);
    return this._insertBlock('p', 'after', parentGuid);
  }
  _removeBlock(guid) {
    var blocks = this.finder.findBlocks(guid);
    var index  = this.finder.findBlockPosition(guid);

    blocks.splice(index, 1);
  }
  _insertBlock(type, position, guid, text) {
    var blocks = this.finder.findBlocks(guid);
    var index  = this.finder.findBlockPosition(guid);

    var block = this._newBlock(type, text || "");
    var index = position == 'after' ? index + 1 : index;

    blocks.splice(index, 0, block);

    return block;
  }
  _newBlock(type, text) {
    return { "id": Guid.unique(), "type": type, "text": text }
  }


  // text

  updateText(guids, text) {
    var block = this.finder.findBlock(guid);
    block.text = text;
  }

  // modifying block type / markup

  toggleCenter(guids) {
    var guid  = guids.anchor;
    var block = this.finder.findBlock(guid);
    block.meta = block.meta || {}

    if (block.meta.align == "center") {
      delete block.meta.align;
    } else {
      block.meta.align = "center";
    }
  }

  toggleBlockType(guids, tagName) {
    var guid  = guids.anchor;
    var block = this.finder.findBlock(guid);
    var type = block.type;
    block.type = type == tagName ? 'p' : tagName;

    return {oldType: type, newType: block.type};
  }

  toggleMarkup(guids, type, active, markup) {
    var guid  = guids.anchor;
    var block = this.finder.findBlock(guid);
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

  _newSection() {
    return { "id": Guid.unique(), "blocks": [] }
  }

  flush() {
    ContentState.set({content: this.content});
  }
}

module.exports = ContentManager;
