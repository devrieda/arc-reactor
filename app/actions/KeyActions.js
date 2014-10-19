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

  focusToolbar: function() {
    console.log('toolbar')
  },


  _insertBlock: function(position, guid, text) {
    var section = this._findBlockSection(guid);
    var index   = this._findBlockPosition(guid);
    if (!section || !index) { return; }

    var block = this._newBlock(text || "");
    var index = position == 'after' ? index + 1 : index;

    section.blocks.splice(index, 0, block);
  },

  _removeBlock: function(guid) {
    var blockPosition = this.findBlockPosition(guid);
    var blocks = blockPosition.blocks;
    var index  = blockPosition.index;
    if (!blocks || !index) { return; }

    blocks.splice(index, 0);
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

