var Guid = require('../../modules/Guid');

var ContentState = require('../../state/ContentState');
var SelectionState = require('../../state/SelectionState');

class BaseButton {
  constructor(content, selection) {
    this.content = content;
    this.selection = selection;
  }

  static types() {
    return [
      {type: 'strong',     action: 'Bold',   icon: 'fa-bold',         text: 'Bold'},
      {type: 'em',         action: 'Italic', icon: 'fa-italic',       text: 'Italic'},
      {type: 'h2',         action: 'H1',     icon: null,              text: 'H1'},
      {type: 'h3',         action: 'H2',     icon: null,              text: 'H2'},
      {type: 'h4',         action: 'H3',     icon: null,              text: 'H3'},
      {type: 'center',     action: 'Center', icon: 'fa-align-center', text: 'Center'},
      {type: 'blockquote', action: 'Quote',  icon: 'fa-quote-left',   text: 'Quote'},
      {type: 'a',          action: 'Link',   icon: 'fa-link',         text: 'Link'}
    ]
  }

  changeBlockTag(tagName, active) {
    var block = this.findBlock();
    var prevType = block.type;
    block.type = active ? 'p' : tagName;

    // update selection types
    var idx = this.selection.types.indexOf(prevType);
    this.selection.types.splice(idx, 1)
    this.selection.types.push(block.type);

    this.flushContent();
    this.flushSelection();
  }

  changeInlineTag(tagName, active) {
    var block = this.findBlock();

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

    this.flushContent();
    this.flushSelection();
  }

  flushContent() {
    ContentState.set({content: this.content});
  }
  flushSelection() {
    SelectionState.set({selection: this.selection});
  }

  findBlock() {
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

module.exports = BaseButton;