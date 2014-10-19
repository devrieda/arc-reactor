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
    this.selection.type = block.type;

    this._flushContent();
    this._flushSelection();
  },

  // inline changes
  strongSelection: function(active) {
    this._changeInlineTag('strong', active);
  },
  emSelection: function(active) {
    this._changeInlineTag('em', active);
  },
  _changeInlineTag: function(tagName, active) {
    var block = this._findBlock();

    var markup = {
      type: tagName,
      offsetStart: this.selection.anchorOffset,
      offsetEnd: this.selection.focusOffset
    }

    if (block.inlines) {
      var jsonMarkup = JSON.stringify(markup);

      // check if we already added the markup
      var found = null;
      block.inlines.forEach(function(inline, i) {
        if (JSON.stringify(inline) === jsonMarkup) { found = i; }
      });

      // remove it
      if (found) {
        block.inlines.splice(index, 0);
        this.selection.type = block.tagName.toLowerCase();

      // add to markup
      } else {
        block.inlines.push(markup);
      }

    // no markup yet in this block
    } else {
      block.inlines = [markup];
      this.selection.type = tagName;
    }

    this._flushContent();
    this._flushSelection();
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
  }
});

module.exports = ContentActions;
