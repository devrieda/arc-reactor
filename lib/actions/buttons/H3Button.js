var ContentManager = require('../../modules/ContentManager');
var SelectionState = require('../../state/SelectionState');

class Header3Button {
  constructor(content, selection) {
    this.selection = selection;
    this.contentManager = new ContentManager(content);
  }

  press(active) {
    var guid  = this.selection.anchor.guid;
    var block = this.contentManager.findBlock(guid);
    var fromType = block.type;

    this.contentManager.toggleBlockTag(block, 'h4');
    this.contentManager.flush();

    this.selection.replaceType(fromType, block.type);
    SelectionState.set({selection: this.selection});
  }
}

module.exports = Header3Button;
