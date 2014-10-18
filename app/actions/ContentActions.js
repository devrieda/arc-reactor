var ContentState = require('../modules/ContentState');
var Selection    = require('../modules/Selection');

var ContentActions = {
  pressButton: function(button, active) {
    this[button+"Selection"](active)
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
    ContentState.notify();
  },
  h3Selection: function(active) {
    var block = this._findBlock();
    block.type = active ? 'p' : 'h3';
    ContentState.notify();
  },
  h4Selection: function(active) {
    var block = this._findBlock();
    block.type = active ? 'p' : 'h4';
    ContentState.notify();
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
  aSelection: function() {
    console.log('link')
  }, 

  _getContent: function() {
    var state = ContentState.getState();
    return state.content;
  },
  _updateContent: function(content) {
    ContentState.update(content)
  },
  _getSelection: function() {
    return new Selection();
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
};

module.exports = ContentActions;
