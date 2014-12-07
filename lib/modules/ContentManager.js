var Guid = require('../modules/Guid');
var ContentState = require('../state/ContentState');

// Manages making changes to the content
//
class ContentManager {
  constructor(content) {
    this.content = content;
  }


  // finding blocks

  findBlock(guid) {
    var block = {};
    this.content.sections.forEach( (sect) => {
      sect.blocks.forEach( (b) => {
        if (guid == b.id) { block = b; }

        (b.blocks || []).forEach( (subblock) => {
          if (guid == subblock.id) { block = subblock; }
        });
      });
    });
    return block;
  }
  findBlocks(guid) {
    var blocks = null;
    this.content.sections.forEach( (sect) => {
      if (blocks) { return; }
      sect.blocks.forEach( (block) => {
        if (blocks) { return; }
        if (block.id == guid) { blocks = sect.blocks; }

        (block.blocks || []).forEach( (b) => {
          if (blocks) { return; }
          if (b.id == guid) { blocks = block.blocks; }
        });
      });
    });
    return blocks;
  }
  findPreviousBlock(guid) {
    var blocks = this.findBlocks(guid);
    var index  = this.findBlockPosition(guid);
    return blocks[index - 1];
  }
  findParentBlock(guid) {
    var block = {};
    this.content.sections.forEach( (sect) => {
      sect.blocks.forEach( (b) => {
        (b.blocks || []).forEach( (subblock) => {
          if (guid == subblock.id) { block = b; }
        });
      });
    });
    return block;
  }
  findBlockPosition(guid) {
    var index = null;
    this.findBlocks(guid).forEach( (block, i) => {
      if (index) { return; }
      if (block.id == guid) { index = i; }
    });
    return index;
  }


  // add / remove / combine blocks

  appendBlock(guid) {
    var block = this.findBlock(guid);
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
    return newBlock;
  }
  prependBlock(guid) {
    return this._insertBlock('p', 'before', guid);
  }
  removeBlock(guid) {
    var blocks = this.findBlocks(guid);
    var index  = this.findBlockPosition(guid);

    blocks.splice(index, 1);
  }
  splitBlock(guid, offset) {
    var block = this.findBlock(guid);
    var text  = block.text;

    block.text = text.substring(0, offset);
    return this._insertBlock('p', 'after', guid, text.substring(offset));
  }
  combineBlocks(anchorGuid, focusGuid) {
    console.log('combine blocks');
    // - find text before anchor selection
    // - find text after focus selection
    // - combine text into first node
    // - delete 2nd node

    return false;
  }

  _addListItem(guid) {
    return this._insertBlock('li', 'after', guid);
  }
  _createList(guid, starts) {
    var type = starts == '1' ? 'ol' : 'ul';

    var block = this.findBlock(guid);
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
    var parentGuid = this.findParentBlock(guid).id;
    this.removeBlock(guid);
    return this._insertBlock('p', 'after', parentGuid);
  }
  _insertBlock(type, position, guid, text) {
    var blocks = this.findBlocks(guid);
    var index  = this.findBlockPosition(guid);

    var block = this._newBlock(type, text || "");
    var index = position == 'after' ? index + 1 : index;

    blocks.splice(index, 0, block);

    return block;
  }
  _newBlock(type, text) {
    return { "id": Guid.unique(), "type": type, "text": text }
  }


  // modifying block type / markup

  toggleCenter(guid) {
    var block = this.findBlock(guid);
    block.meta = block.meta || {}

    if (block.meta.align == "center") {
      delete block.meta.align;
    } else {
      block.meta.align = "center";
    }
  }

  toggleBlockType(guid, tagName) {
    var block = this.findBlock(guid);
    var type = block.type;
    block.type = type == tagName ? 'p' : tagName;

    return {oldType: type, newType: block.type};
  }

  toggleMarkup(guid, type, active, markup) {
    var block = this.findBlock(guid);
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
