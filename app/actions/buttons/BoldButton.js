var BaseButton = require('./BaseButton');

class BoldButton extends BaseButton {

  press(active) {
    var block = this.findContentBlock();
    var active = this.selection.types.indexOf("strong") != -1;

    // init markups
    block.markups = block.markups || []

    // remove from bold
    if (block.markups.bolds && active) {
      this.removeMarkup(block, "strong", this.markup());
    } else {
      this.addMarkup(block, "strong", this.markup());
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
    block.markups.bolds = block.markups.bolds || [];
    block.markups.bolds.push(markup)
    this.selection.types.push(type);
  }

  removeMarkup(block, type, markup) {
    var jsonMarkup = JSON.stringify(markup);

    var idx = 0;
    block.markups.bolds.forEach( (bold, i) => {
      if (JSON.stringify(bold) === jsonMarkup) { idx = i; }
    })
    block.markups.bolds.splice(idx, 1);

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

module.exports = BoldButton;
