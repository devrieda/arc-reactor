var BaseButton = require('./BaseButton');

class LinkButton extends BaseButton {

  press(active, value) {
    var block = this.findContentBlock();
    var active = this.selection.types.indexOf("a") != -1;

    // init markups
    block.markups = block.markups || []

    // remove from links 
    if (block.markups.links && active) {
      this.removeMarkup(block, "strong", this.markup());
    } else {
      this.addMarkup(block, "strong", this.markup());
    }

    this.flushContent();
    this.flushSelection();
  }

  markup() {
    return {
      "start": this.selection.anchor.blockOffset,
      "end":   this.selection.focus.blockOffset,
      "text":  this.selection.text
    }
  }

  addMarkup(block, type, markup) {
    block.markups.links = block.markups.links || [];
    block.markups.links.push(markup)
    this.selection.types.push(type);
  }

  removeMarkup(block, type, markup) {
    var jsonMarkup = JSON.stringify(markup);

    var idx = 0;
    block.markups.links.forEach( (link, i) => {
      if (JSON.stringify(link) === jsonMarkup) { idx = i; }
    })
    block.markups.links.splice(idx, 1);

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

module.exports = LinkButton;
