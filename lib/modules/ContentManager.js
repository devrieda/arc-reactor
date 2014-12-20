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
  splitBlock(guids, offsets) {
    var range = this.finder.findRange(guids);
    var first = range.shift();
    var last  = range.pop();

    var anchor = this.finder.findBlock(first);
    var focus  = last ? this.finder.findBlock(last) : anchor;

    // delete the rest
    range.forEach( (guid) => { this._removeBlock(guid); });

    var end  = focus.text.substring(offsets.focus);
    var type = focus.type;
    anchor.text = anchor.text.substring(0, offsets.anchor);

    if (anchor.id != focus.id) { this._removeBlock(focus.id); }

    var newBlock = this._insertBlock(type, 'after', guids.anchor, end);
    return { block: newBlock, offset: 0 };
  }
  combineBlocks(guids, offsets) {
    var range = this.finder.findRange(guids);
    var first = range.shift();
    var last  = range.pop();

    var anchor = this.finder.findBlock(first);
    var focus  = last ? this.finder.findBlock(last) : anchor;

    // delete the rest
    range.forEach( (guid) => { this._removeBlock(guid); });

    anchor.text = anchor.text.substring(0, offsets.anchor) +
                  focus.text.substring(offsets.focus);
    if (anchor.id != focus.id) { this._removeBlock(focus.id); }

    return { block: anchor, offset: offsets.anchor };
  }
  combineBlockWithPrevious(guids) {
    var guid  = guids.anchor;
    var block = this.finder.findBlock(guid);
    var prev  = this.finder.findPreviousBlock(guid);

    if (prev) {
      var offset = prev.text.length;
      prev.text = prev.text + block.text;
      this._removeBlock(block.id);
      return { block: prev, offset: offset };

    } else {
      return { block: null, offset: 0 };
    }
  }
  combineBlockWithNext(guids) {
    var guid  = guids.anchor;
    var block = this.finder.findBlock(guid);
    var next  = this.finder.findNextBlock(guid);

    if (next) {
      var offset = block.text.length;
      block.text = block.text + next.text;
      this._removeBlock(next.id);
      return { block: next, offset: offset };

    } else {
      return { block: null, offset: 0 };
    }
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
    var parentGuid = this.finder.findParentBlock(guid).id;
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
    var block = this.finder.findBlock(guids.anchor);
    block.text = text;
  }

  // modifying block type / markup

  toggleCenter(guids) {
    var range = this.finder.findRange(guids)
    var blocks = range.map( (guid) => {
      return this.finder.findBlock(guid);
    });

    // check how many are centered
    var notCentered = blocks.filter( (block) => {
      return !block.meta || block.meta.align != 'center';
    })

    if (notCentered.length > 0) {
      notCentered.forEach( (block) => {
        block.meta = block.meta || {}
        block.meta.align = "center";
      });
    } else {
      blocks.forEach( (block) => {
        delete block.meta.align;
      });
    }
  }

  toggleBlockType(guids, tagName) {
    var range = this.finder.findRange(guids)
    var blocks = range.map( (guid) => {
      return this.finder.findBlock(guid);
    });

    var notOfType = blocks.filter( (block) => {
      return block.type != tagName;
    })

    if (notOfType.length > 0) {
      var type = notOfType[0].type;
      notOfType.forEach( (block) => { block.type = tagName; });
      return { oldType: type, newType: tagName };

    } else {
      blocks.forEach( (block) => { block.type = 'p'; });
      return { oldType: tagName, newType: 'p' };
    }
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
    });
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
