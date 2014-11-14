var Guid = require('../../modules/Guid');
var ContentState = require('../../state/ContentState');
var SelectionState = require('../../state/SelectionState');

class BaseKey {
  constructor(content, selection) {
    this.content = content;
    this.selection = selection;
  }

  press() {
    // implemented in subclass
  }

  insertBlock(type, position, guid, text) {
    var blocks = this.findBlocks(guid);
    var index  = this.findBlockPosition(guid);

    var block = this.newBlock(type, text || "");
    var index = position == 'after' ? index + 1 : index;

    blocks.splice(index, 0, block);

    // focus on new block
    if (position == 'after') {
      this.selection.focusOn(block.id);
      this.flushSelection();
    }
  }
  updateBlockToList(guid, type) {
    var block = this.findBlock(guid);
    var text = block.text;
    delete block.text

    block.type = type;
    var items = [
      this.newBlock('li', text.replace(/^[-*\d]\.?\s?/g, '')),
      this.newBlock('li', '')
    ]
    block.blocks = items;
    this.selection.focusOn(items[1].id);
    this.flushSelection();
  }
  finishList(guid) {
    var block = this.findParentBlock(guid);
    this.insertBlock('p', 'after', block.id)
  }

  removeBlock(guid) {
    var blocks = this.findBlocks(guid);
    var index  = this.findBlockPosition(guid);

    blocks.splice(index, 1);
  }

  combineBlocks() {
    console.log('combine blocks');
    // - find text before anchor selection
    // - find text after focus selection
    // - combine text into first node
    // - delete 2nd node

    return false;
  }

  findNodeText(node) {
    var children = node.childNodes;
    if (node.childNodes) {

    }
  }

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
  findPreviousBlock(guid) {
    var blocks = this.findBlocks(guid);
    var index  = this.findBlockPosition(guid);
    return blocks[index - 1];
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

  newSection() {
    return { "id": Guid.unique(), "blocks": [] }
  }
  newBlock(type, text) {
    return { "id": Guid.unique(), "type": type, "text": text }
  }

  flushContent() {
    ContentState.set({content: this.content});
  }
  flushSelection() {
    SelectionState.set({selection: this.selection});
  }
}

module.exports = BaseKey;
