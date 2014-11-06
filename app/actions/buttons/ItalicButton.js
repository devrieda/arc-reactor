var BaseButton = require('./BaseButton');

class ItalicButton extends BaseButton {

  press(active) {
    var block = this.findContentBlock();
    var active = this.selection.types.indexOf("em") != -1;

    // init markups
    block.markups = block.markups || []

    // remove from italics 
    if (block.markups.italics && active) {
      this.removeMarkup(block, "em", this.markup());
    } else {
      this.addMarkup(block, "em", this.markup());
    }

    this.flushContent();
    this.flushSelection();
    return true;
  }

  markup() {
    return {
      "start": this.selection.anchor.blockOffset,
      "end":   this.selection.focus.blockOffset,
      "text":  this.selection.text
    }
  }

  addMarkup(block, type, markup) {
    block.markups.italics = block.markups.italics || [];
    block.markups.italics.push(markup)
    this.selection.types.push(type);
  }

  removeMarkup(block, type, markup) {
    var jsonMarkup = JSON.stringify(markup);

    var idx = 0;
    block.markups.italics.forEach( (italic, i) => {
      if (JSON.stringify(italic) === jsonMarkup) { idx = i; }
    })
    block.markups.italics.splice(idx, 1);

    var idx = this.selection.types.indexOf(type);
    this.selection.types.splice(idx, 1)
  }


  findContentBlock() {
    var guid = this.selection.anchor.guid;

    var block = {};
    this.content.sections.forEach( (sect) => {
      sect.blocks.forEach( (b) => {
        if (guid == b.id) { block = b; }
      });
    });
    return block;
  }
}

module.exports = ItalicButton;
