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

  findRange(guids) {
    var find = (block, guids, results, found) => {
      if (block.id == guids.focus) {
        results.push(block.id);
      } else if (block.id == guids.anchor) {
        results.push(block.id);
        found = true;
      } else if (found && results.indexOf(guids.focus) == -1) {
        results.push(block.id);
      }
      return found;
    }
    var results = [];
    var found = false;

    this.content.sections.forEach( (sect) => {
      sect.blocks.forEach( (block) => {
        found = find(block, guids, results, found);
        (block.blocks || []).forEach( (subblock) => {
          found = find(subblock, guids, results, found);
        })
      });
    });
    return results;
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
