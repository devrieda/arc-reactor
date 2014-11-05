var BaseButton = require('./BaseButton');

class BoldButton extends BaseButton {

  press() {
    var block = this.findBlock();
    var active = this.selection.types.indexOf("strong") != -1;

    // init markups
    block.markups = block.markups || []

    // remove from bold
    if (block.markups.bolds && active) {
      this.removeMarkup(block);
    } else {
      this.addMarkup(block);
    }

    this.flushContent();
    this.flushSelection();
  }

  addMarkup(block) {
    var markup = this.markup();

    block.markups.bolds = block.markups.bolds || [];
    block.markups.bolds.push(markup)
    this.selection.types.push('strong');
  }

  removeMarkup(block) {
    var markup = this.markup();
    var jsonMarkup = JSON.stringify(markup);

    var idx = 0;
    block.markups.bolds.forEach( (bold, i) => {
      if (JSON.stringify(bold) === jsonMarkup) { idx = i; }
    })
    block.markups.bolds.splice(idx, 1);

    var idx = this.selection.types.indexOf('strong');
    this.selection.types.splice(idx, 1)
  }

  markup() {
    return {
      "start": this.selection.anchorBlockOffset,
      "end":   this.selection.focusBlockOffset,
      "text":  this.selection.text
    }
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

module.exports = BoldButton;
