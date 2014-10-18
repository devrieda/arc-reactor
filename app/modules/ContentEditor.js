var mixInto = require('react/lib/mixInto');
var Guid = require('../modules/Guid');
var Selection = require('../modules/Selection');

var ContentEditor = function(content) {
  this.content   = content;
  this.selection = new Selection;
}

mixInto(ContentEditor, {

  // return value of press events determine if we preventDefault
  pressReturn: function() {
    if (!this.selection.isValid()) { return; }

    if (this.selection.isRange()) {
      // - find text before selection in beg
      // - find text after selection in end
      // - combine text into first node
      // - delete 2nd node

    } else {
      var guids = this.selection.guidRange();
      this.insertBlock('before', guids[0]);

      // if (this.selection.endOfBlock()) {
      //   this.insertBlock('after', guids[0]);

      // } else if (this.selection.begOfBlock()) {
      //   this.insertBlock('before', guids[0]);

      // } else {
      //   var text = '';
      //   this.insertBlock('before', guids[0], text);
      // }
    }
    return true;
  },

  pressDelete: function() {
    if (!this.selection.isValid()) { return; }

    if (this.selection.crossBlock()) {
      console.log('cross block range')

    } else {
      var guids = this.selection.guidRange();

      if (this.selection.begOfBlock()) {
        this.removeBlock(guids[0]);
      }
    }
    return false;
  },

  pressBspace: function() {
    if (!this.selection.isValid()) { return; }
    return false;
  },

  findBlockPosition: function(guid) {
    var blocks = null;
    var index  = null;
    this.content.sections.forEach(function(sect) {
      if (index) { return; }
      sect.blocks.forEach(function(block, i) {
        if (block.id == guid) {
          blocks = sect.blocks;
          index  = i;
        }
      });
    });
    if (!blocks || !index) { return {}; }

    return { blocks: blocks, index: index };
  },

  insertBlock: function(position, guid, text) {
    var blockPosition = this.findBlockPosition(guid);
    var blocks = blockPosition.blocks;
    var index  = blockPosition.index;
    if (!blocks || !index) { return; }

    var block = this.newBlock(text || "");
    var index = position == 'after' ? index + 1 : index;

    blocks.splice(index, 0, block);
  },

  removeBlock: function(guid) {
    var blockPosition = this.findBlockPosition(guid);
    var blocks = blockPosition.blocks;
    var index  = blockPosition.index;
    if (!blocks || !index) { return; }

    blocks.splice(index, 0);
  },


  newSection: function() {
    return { "id": Guid.unique(), "blocks": [] }
  },
  newBlock: function(text) {
    return { "id": Guid.unique(), "type": "p", "text": text }
  },

  getContent: function() {
    return this.content;
  }
});

module.exports = ContentEditor;
