var mixInto = require('react/lib/mixInto');

var Guid = require('../modules/Guid');

var ContentState = require('../state/ContentState');
var SelectionState = require('../state/SelectionState');

var ContentActions = function() {
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

mixInto(ContentActions, {
  pressButton: function(button, active, value) {
    this[button+"Selection"](active, value)
  },

  // key presses
  pressEnter: function() {
    console.log('enter')
  }, 
  pressDelete: function() {
    console.log('delete')
  },
  pressBspace: function() {
    console.log('bspace')
  },

  // accessibility
  focusToolbar: function() {
    console.log('toolbar')
  },

  // block changes
  h2Selection: function(active) {
    var block = this._findBlock();
    block.type = active ? 'p' : 'h2';

    this._flushContent();
  },
  h3Selection: function(active) {
    var block = this._findBlock();
    block.type = active ? 'p' : 'h3';

    this._flushContent();
  },
  h4Selection: function(active) {
    var block = this._findBlock();
    block.type = active ? 'p' : 'h4';

    this._flushContent();
  },
  centerSelection: function(active) {
    var block = this._findBlock();
    block.meta = block.meta || {}
    if (active) {
      delete block.meta.align;
    } else {
      block.meta.align = "center";
    }
    this._flushContent();
  },
  blockquoteSelection: function(active) {
    var block = this._findBlock();
    block.type = active ? 'p' : 'blockquote';

    this._flushContent();
  },

  // inline changes
  strongSelection: function() {
    console.log('bold')
  },
  emSelection: function() {
    console.log('italic')
  },
  aSelection: function(active, value) {
    console.log('link: ' + value)
  },

  _flushContent: function() {
    ContentState.set({content: this.content});
  },
  _flushSelection: function() {
    SelectionState.set({selection: this.selection});
  },

  _findBlock: function() {
    var guid = this.selection.beginGuid();

    var block = {};
    this.content.sections.forEach(function(sect) {
      sect.blocks.forEach(function(b) {
        if (guid == b.id) { block = b; }
      });
    });
    return block;
  }
});

module.exports = ContentActions;
