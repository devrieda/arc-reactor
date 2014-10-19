var mixInto = require('react/lib/mixInto');

var Guid = require('../modules/Guid');
var Selection = require('../modules/Selection');

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
    this._changeBlockTag('h2', active);
  },
  h3Selection: function(active) {
    this._changeBlockTag('h3', active);
  },
  h4Selection: function(active) {
    this._changeBlockTag('h4', active);
  },
  blockquoteSelection: function(active) {
    this._changeBlockTag('blockquote', active);
  },
  centerSelection: function(active) {
    var block = this._findBlock();
    block.meta = block.meta || {}
    if (active) {
      delete block.meta.align;
      this.selection.centered = false;
    } else {
      block.meta.align = "center";
      this.selection.centered = true;
    }
    this._flushContent();
    this._flushSelection();
  },
  _changeBlockTag: function(tagName, active) {
    var block = this._findBlock();
    block.type = active ? 'p' : tagName;
    this.selection.type = tagName;

    this._flushContent();
    this._flushSelection();
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
