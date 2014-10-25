var Guid = require('../modules/Guid');
var Selection = require('../modules/Selection');

var ContentState = require('../state/ContentState');
var SelectionState = require('../state/SelectionState');

class KeyActions {
  constructor() {
    this.content   = ContentState.get();
    this.selection = SelectionState.get();

    // observe state changes
    ContentState.register( (state) => {
      this.content = state.content;
    });

    SelectionState.register( (state) => {
      this.selection = state.selection;
    });
  }

  pressButton(button, active) {
    this[button+"Selection"](active)
  }

  // key presses
  type() {
    var guid = this.selection.anchorGuid;

    // find anchor block node by guid
    var klass = `ic-Editor-Block--${guid}`
    var text = document.getElementsByClassName(klass)[0].textContent;

    var block = this._findBlock(guid);
    block.text = text;
  }

  pressReturn() {
    if (this.selection.isRange()) {
      return this._combineBlocks();

    // caret
    } else {
      var guid = this.selection.anchorGuid;

      if (this.selection.endOfBlock()) {
        var block = this._findBlock(guid)
        var text  = block.text;
        var starts = text.substring(0, 1);
        var empty = text.length == 0;

        // finish list
        if (block.type == 'li' && text === '') {
          var guid = this._findParentBlock(guid).id;
          this._removeBlock(this.selection.anchorGuid);
          this._insertBlock('p', 'after', guid);

        // add to a list
        } else if (block.type == 'li') {
          this._insertBlock('li', 'after', guid);

        // create new list
        } else if (starts == '-' || starts == '*' || starts == '1') {
          this._updateBlockToList(guid, starts == '1' ? 'ol' : 'ul');

        // normal new block
        } else {
          this._insertBlock('p', 'after', guid);
        }

      // enter at beginning of block
      } else if (this.selection.begOfBlock()) {
        this._insertBlock('p', 'before', guid);

      // split current two
      } else {
        var block = this._findBlock(guid)
        var text  = block.text;
        var offset = this.selection.anchorOffset;

        block.text = block.text.substring(0, offset);
        this._insertBlock('p', 'after', guid, text.substring(offset));
      }
    }
    return true;
  }
  pressDelete() {
    if (this.selection.crossBlock()) {
      return this._combineBlocks();

    } else if (this.selection.endOfBlock()) {
      // get text for next node
      // delete next node
      // append text to this node
      console.log('delete!!');
      return true;
    }
    return false;
  }
  pressBspace() {
    if (this.selection.crossBlock()) {
      return this._combineBlocks();

    } else if (this.selection.begOfBlock()) {
      var guid = this.selection.anchorGuid;

      // get text for this node
      // delete this node
      // append text to previous node
      var block    = this._findBlock(guid)
      var previous = this._findPreviousBlock(guid)

      if (previous) {
        var offset = previous.text.length;
        previous.text = previous.text + block.text;
        this._removeBlock(guid);
        this.selection.focusOn(previous.id, offset);
        this._flushSelection();
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  focusToolbar() {
    console.log('toolbar')
  }


  _insertBlock(type, position, guid, text) {
    var blocks = this._findBlocks(guid);
    var index  = this._findBlockPosition(guid);

    var block = this._newBlock(type, text || "");
    var index = position == 'after' ? index + 1 : index;

    blocks.splice(index, 0, block);

    // focus on new block
    if (position == 'after') {
      this.selection.focusOn(block.id);
      this._flushSelection();
    }
  }
  _updateBlockToList(guid, type) {
    var block = this._findBlock(guid);
    var text = block.text;
    delete block.text

    block.type = type;
    items = [
      this._newBlock('li', text.replace(/^[-*\d]\.?\s?/g, '')),
      this._newBlock('li', '')
    ]
    block.blocks = items;
    this.selection.focusOn(items[1].id);
    this._flushSelection();
  }
  _finishList(guid) {
    var block = this._findParentBlock(guid);
    this._insertBlock('p', 'after', block.id)
  }

  _removeBlock(guid) {
    var blocks = this._findBlocks(guid);
    var index  = this._findBlockPosition(guid);

    blocks.splice(index, 1);
  }

  _combineBlocks() {
    console.log('combine blocks');
    // - find text before anchor selection
    // - find text after focus selection
    // - combine text into first node
    // - delete 2nd node

    return false;
  }


  _findNodeText(node) {
    var children = node.childNodes;
    if (node.childNodes) {

    }
  }

  _findBlock(guid) {
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
  _findPreviousBlock(guid) {
    var blocks = this._findBlocks(guid);
    var index  = this._findBlockPosition(guid);
    return blocks[index - 1];
  }

  _findBlocks(guid) {
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
  _findParentBlock(guid) {
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

  _findBlockPosition(guid) {
    var index = null;
    this._findBlocks(guid).forEach( (block, i) => {
      if (index) { return; }
      if (block.id == guid) { index = i; }
    });
    return index;
  }

  _newSection() {
    return { "id": Guid.unique(), "blocks": [] }
  }
  _newBlock(type, text) {
    return { "id": Guid.unique(), "type": type, "text": text }
  }

  _flushContent() {
    ContentState.set({content: this.content});
  }
  _flushSelection() {
    SelectionState.set({selection: this.selection});
  }
}

module.exports = KeyActions;
