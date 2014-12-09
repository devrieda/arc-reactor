// traverses to finds references to data in the content
//
class ContentFinder {
  constructor(content) {
    this.content = content;
  }

  findBlock(guid) {
    var block = {};
    this.content.sections.forEach( (sect) => {
      sect.blocks.forEach( (b) => {
        if (guid == b.id) { block = b; }

        (b.blocks || []).forEach( (subblock) => {
          if (guid == subblock.id) { block = subblock; }
        });
      });
    });
    return block;
  }

  findBlocks(guid) {
    var blocks = null;
    this.content.sections.forEach( (sect) => {
      if (blocks) { return; }
      sect.blocks.forEach( (block) => {
        if (blocks) { return; }
        if (block.id == guid) { blocks = sect.blocks; }

        (block.blocks || []).forEach( (b) => {
          if (blocks) { return; }
          if (b.id == guid) { blocks = block.blocks; }
        });
      });
    });
    return blocks;
  }

  findPreviousBlock(guid) {
    var blocks = this.findBlocks(guid);
    var index  = this.findBlockPosition(guid);
    return blocks[index - 1];
  }

  findNextBlock(guid) {
    var blocks = this.findBlocks(guid);
    var index  = this.findBlockPosition(guid);
    return blocks[index + 1];
  }

  findParentBlock(guid) {
    var block = {};
    this.content.sections.forEach( (sect) => {
      sect.blocks.forEach( (b) => {
        (b.blocks || []).forEach( (subblock) => {
          if (guid == subblock.id) { block = b; }
        });
      });
    });
    return block;
  }

  findBlockPosition(guid) {
    var index = null;
    this.findBlocks(guid).forEach( (block, i) => {
      if (index) { return; }
      if (block.id == guid) { index = i; }
    });
    return index;
  }
}

module.exports = ContentFinder;
