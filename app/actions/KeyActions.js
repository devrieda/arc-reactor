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
  pressReturn: function() {
    if (this.selection.isRange()) {
      // - find text before selection in beg
      // - find text after selection in end
      // - combine text into first node
      // - delete 2nd node

    } else {
      var anchor = this.selection.anchorGuid;
      this.insertBlock('before', anchor);

      // if (this.selection.endOfBlock()) {
      //   this.insertBlock('after', guids[0]);

      // } else if (this.selection.begOfBlock()) {
      //   this.insertBlock('before', guids[0]);

      // } else {
      //   var text = '';
      //   this.insertBlock('before', guids[0], text);
      // }
    }
    return true;
  }, 
  pressDelete: function() {
    if (this.selection.crossBlock()) {
      console.log('cross block range')

    } else {
      var guids = this.selection.guidRange();

      if (this.selection.begOfBlock()) {
        this.removeBlock(guids[0]);
      }
    }
    return false;
  },
  pressBspace: function() {
    return false;
  },

  // accessibility
  focusToolbar: function() {
    console.log('toolbar')
  },

  // links
  createLink: function(active, value) {
    this._changeInlineTag('a', active, value);
  },

  _flushContent: function() {
    ContentState.set({content: this.content});
  },
  _flushSelection: function() {
    SelectionState.set({selection: this.selection});
  },

  _findBlock: function() {
    var guid = this.selection.anchorGuid;

    var block = {};
    this.content.sections.forEach(function(sect) {
      sect.blocks.forEach(function(b) {
        if (guid == b.id) { block = b; }
      });
    });
    return block;
  }, 

  _insertBlock: function(position, guid, text) {
    var blockPosition = this.findBlockPosition(guid);
    var blocks = blockPosition.blocks;
    var index  = blockPosition.index;
    if (!blocks || !index) { return; }

    var block = this.newBlock(text || "");
    var index = position == 'after' ? index + 1 : index;

    blocks.splice(index, 0, block);
  },

  _removeBlock: function(guid) {
    var blockPosition = this.findBlockPosition(guid);
    var blocks = blockPosition.blocks;
    var index  = blockPosition.index;
    if (!blocks || !index) { return; }

    blocks.splice(index, 0);
  },
  _findBlockPosition: function(guid) {
    var blocks = null;
    var index  = null;
    this.content.sections.forEach(function(sect) {
      if (index) { return; }
      sect.blocks.forEach(function(block, i) {
        if (block.id == guid) {
          blocks = sect.blocks;
          index  = i;
        }
      });
    });
    if (!blocks || !index) { return {}; }

    return { blocks: blocks, index: index };
  },
  _newSection: function() {
    return { "id": Guid.unique(), "blocks": [] }
  },
  _newBlock: function(text) {
    return { "id": Guid.unique(), "type": "p", "text": text }
  }
});

module.exports = KeyActions;

