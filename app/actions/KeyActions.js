var mixInto = require('react/lib/mixInto');

var Guid = require('../modules/Guid');
var Selection = require('../modules/Selection');

var ContentState = require('../state/ContentState');
var SelectionState = require('../state/SelectionState');

var KeyActions = function() {
  this.content   = ContentState.get();
  this.selection = SelectionState.get();

  // observe state changes
  ContentState.register(function(state) {
    this.content = state.content;
  }.bind(this));

  SelectionState.register(function(state) {
    this.selection = state.selection;
  }.bind(this));
}

mixInto(KeyActions, {
  pressButton: function(button, active) {
    this[button+"Selection"](active)
  },

  // key presses
  type: function() {
    var guid = this.selection.anchorGuid;

    // find anchor block node by guid
    var klass = 'ic-Editor-Block--' + guid;
    var text = document.getElementsByClassName(klass)[0].textContent;

    var block = this._findBlock(guid);
    block.text = text;
  },

  pressReturn: function() {
    if (this.selection.isRange()) {
      return this._combineBlocks();

    // caret
    } else {
      var guid = this.selection.anchorGuid;

      if (this.selection.endOfBlock()) {
        this._insertBlock('after', guid);

      } else if (this.selection.begOfBlock()) {
        this._insertBlock('before', guid);

      } else {
        var text = '';
        this._insertBlock('before', guids[0], text);
      }
    }
    return true;
  }, 
  pressDelete: function() {
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
  },
  pressBspace: function() {
    if (this.selection.crossBlock()) {
      return this._combineBlocks();

    } else if (this.selection.begOfBlock()) {
      var guid = this.selection.anchorGuid;

      // get text for this node
      // delete this node
      // append text to previous node
      var previous = this._previousNode(guid)
      this._removeBlock(this.selection.anchorGuid);
      return true;
    }
    return false;
  },

  focusToolbar: function() {
    console.log('toolbar')
  },


  _insertBlock: function(position, guid, text) {
    var section = this._findBlockSection(guid);
    var index   = this._findBlockPosition(guid);

    var block = this._newBlock(text || "");
    var index = position == 'after' ? index + 1 : index;

    section.blocks.splice(index, 0, block);

    // focus on new block
    this.selection.focusOn(block.id);
    this._flushSelection();
  },

  _removeBlock: function(guid) {
    var section = this._findBlockSection(guid);
    var index   = this._findBlockPosition(guid);

    section.blocks.splice(index, 1);
  },

  _combineBlocks: function() {
    console.log('combine blocks');
    // - find text before anchor selection
    // - find text after focus selection
    // - combine text into first node
    // - delete 2nd node

    return false;
  },


  _findNodeText: function(node) {
    var children = node.childNodes;
    if (node.childNodes) {

    }
  },

  _findBlock: function(guid) {
    var block = {};
    this.content.sections.forEach(function(sect) {
      sect.blocks.forEach(function(b) {
        if (guid == b.id) { block = b; }
      });
    });
    return block;
  },

  _findBlockSection: function(guid) {
    var section = null;
    this.content.sections.forEach(function(sect) {
      if (section) { return; }
      sect.blocks.forEach(function(block) {
        if (section) { return; }
        if (block.id == guid) { section = sect; }
      });
    });
    return section;
  },

  _findBlockPosition: function(guid) {
    var index = null;
    this._findBlockSection(guid).blocks.forEach(function(block, i) {
      if (index) { return; }
      if (block.id == guid) { index = i; }
    });
    return index;
  },

  _newSection: function() {
    return { "id": Guid.unique(), "blocks": [] }
  },
  _newBlock: function(text) {
    return { "id": Guid.unique(), "type": "p", "text": text }
  },

  _flushContent: function() {
    ContentState.set({content: this.content});
  },
  _flushSelection: function() {
    SelectionState.set({selection: this.selection});
  }
});

module.exports = KeyActions;

