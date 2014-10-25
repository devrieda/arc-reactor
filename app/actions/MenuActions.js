var Guid = require('../modules/Guid');
var Selection = require('../modules/Selection');

var ContentState = require('../state/ContentState');
var SelectionState = require('../state/SelectionState');

class MenuActions {
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
    this[`${button}Selection`](active)
  }

  // block changes
  h2Selection(active) {
    this._changeBlockTag('h2', active);
  }
  h3Selection(active) {
    this._changeBlockTag('h3', active);
  }
  h4Selection(active) {
    this._changeBlockTag('h4', active);
  }
  blockquoteSelection(active) {
    this._changeBlockTag('blockquote', active);
  }
  centerSelection(active) {
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
  }
  _changeBlockTag(tagName, active) {
    var block = this._findBlock();
    var prevType = block.type;
    block.type = active ? 'p' : tagName;

    // update selection types
    var idx = this.selection.types.indexOf(prevType);
    this.selection.types.splice(idx, 1)
    this.selection.types.push(block.type);

    this._flushContent();
    this._flushSelection();
  }

  // inline changes
  strongSelection(active) {
    this._changeInlineTag('strong', active);
  }
  emSelection(active) {
    this._changeInlineTag('em', active);
  }
  aSelection(active) {
    this._changeInlineTag('em', active);
  }
  _changeInlineTag(tagName, active) {
    var block = this._findBlock();

    var markup = {
      type: tagName,
      offsetStart: this.selection.anchorOffset,
      offsetEnd: this.selection.focusOffset,
      text: this.selection.text
    }

    if (block.inlines) {
      var jsonMarkup = JSON.stringify(markup);

      // check if we already added the markup
      var index = null;
      block.inlines.forEach( (inline, i) => {
        if (JSON.stringify(inline) === jsonMarkup) { index = i; }
      });

      // remove it
      if (index !== null) {
        block.inlines.splice(index, 1);
        var idx = this.selection.types.indexOf(tagName);
        this.selection.types.splice(idx, 1)

      // add to markup
      } else {
        block.inlines.push(markup);
        this.selection.types.push(tagName);
      }

    // no markup yet in this block
    } else {
      block.inlines = [markup];
      this.selection.types.push(tagName);
    }

    this._flushContent();
    this._flushSelection();
  }

  // links
  createLink(active, value) {
    this._changeInlineTag('a', active, value);
  }

  _flushContent() {
    ContentState.set({content: this.content});
  }
  _flushSelection() {
    SelectionState.set({selection: this.selection});
  }

  _findBlock() {
    var guid = this.selection.anchorGuid;

    var block = {};
    this.content.sections.forEach( (sect) => {
      sect.blocks.forEach( (b) => {
        if (guid == b.id) { block = b; }
      });
    });
    return block;
  } 
}

module.exports = MenuActions;
