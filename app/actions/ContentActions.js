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
  },
  h3Selection: function(active) {
    var block = this._findBlock();
    block.type = active ? 'p' : 'h3';
  },
  h4Selection: function(active) {
    var block = this._findBlock();
    block.type = active ? 'p' : 'h4';
  },
  centerSelection: function() {
    console.log('center')
  },
  blockquoteSelection: function() {
    console.log('quote')
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

  _findBlock: function() {
    var guid = this._getSelection().beginGuid();
    var content = this._getContent();

    var selected = {};
    content.sections.forEach(function(sect) {
      sect.blocks.forEach(function(block) {
        if (guid == block.id) { selected = block; }
      });
    });
    return selected;
  }
});

module.exports = ContentActions;
