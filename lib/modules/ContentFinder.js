var Immutable = require('immutable');

// traverses to finds references to data in the content
//
class ContentFinder {
  constructor(content) {
    this.content = content;
    this.map = Immutable.fromJS(this.content);
  }

  // find the path to the guid in our immutable data structure.
  // this will end up being something like:
  //   ['sections', 0, 'blocks', 2, 'blocks', 0]
  //
  // which can then be used to target data in the structure using getIn()
  //   var block = this.map.getIn(['sections', 0, 'blocks', 2, 'blocks', 0]);
  //   type = block.get("type");
  //
  findPath(guid) {
    var path = ["sections"];

    this.map.getIn(path).forEach( (section, i) => {
      var blocks = path.concat([i, "blocks"]);
      var blockPath = this._findBlockPath(blocks, guid);
      if (blockPath.length) { path = blocks.concat(blockPath); }
    });

    return path;
  }

  _findBlockPath(path, guid) {
    var blocks = this.map.getIn(path, []);
    if (!blocks.size) { return []; }

    var size = blocks.size;
    for (var i = 0, j = blocks.size; i < j; i++) {
      // current level
      var block = blocks.get(i);
      if (block.get("id") === guid) { return [i]; }

      // child block
      var sub = this._findBlockPath(path.concat([i, "blocks"]), guid);
      if (sub.length > 0) { return [i, "blocks"].concat(sub); }
    }
    return [];
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

  findRange(guids, offsets) {
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

    if (!this.content.sections) { return results; }

    this.content.sections.forEach( (sect) => {
      sect.blocks.forEach( (block) => {
        found = find(block, guids, results, found);
        (block.blocks || []).forEach( (subblock) => {
          found = find(subblock, guids, results, found);
        })
      });
    });

    // focus offset doesn't actually have anything selected
    if (offsets && offsets.focus == 0) { results.pop(); }

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
