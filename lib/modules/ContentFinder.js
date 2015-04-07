var Immutable = require('immutable');

// traverses to finds references to data in the content
//
class ContentFinder {
  constructor(content, map) {
    this.content = content;
    this.map = map || Immutable.fromJS(this.content);
  }


  // ---------- IMMUTABLE FINDERS

  /**
   * find the path to the block in our immutable data structure
   * this will end up being something like:
   *   ['sections', 0, 'blocks', 2]
   *
   * which can then be used to target data in the structure using getIn()
   *   var block = this.map.getIn(['sections', 0, 'blocks', 2]);
   *   type = block.get("type");
   */
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

  /**
   * path to the collection of blocks that guid is found in
   * this will end up being something like:
   *   ['sections', 0, 'blocks']
   *
   * which can then be used to target data in the structure using getIn()
   *   var blocks = this.map.getIn(['sections', 0, 'blocks']);
   *   var neewBlocks = blocks.push(newBlock);
   */
  findBlocksPath(guid) {
    return this.findPath(guid).slice(0, -1);
  }

  /**
   * path to the block previous to the given guid in the immutable set
   */
  findPrevPath(guid) {
    var path = this.findPath(guid);
    var last = path[path.length - 1];

    path[path.length - 1] = last > 0 ? last - 1 : undefined;
    return path;
  }

  /**
   * path to the next previous to the given guid in the immutable set
   */
  findNextPath(guid) {
    var path = this.findPath(guid);
    path[path.length - 1]++;
    return path;
  }

  /**
   * path to the parent block for sub-blocks (list items)
   */
  findParentPath(guid) {
    return this.findPath(guid).slice(0, -2);
  }


  /**
   * find a range of block ids by a guid range. returns a list of
   * guids that are covered by the range
   *
   * {
   *   sections: [
   *     {
   *       blocks: [
   *         { id: "9ef1" },
   *         { id: "f9ba" },
   *         { id: "a001" },
   *         { id: "c2d4" }
   *       ]
   *     }
   *   ]
   * }
   *
   * findRange({anchor: "9ef1, guid: "a001}, {anchor: 0, guid: 2});
   *
   * => ["9ef1", "f9ba", "a001"]
   *
   */
  findRange(guids, offsets) {
    var find = (block, guids, results, found) => {
      if (block.get('id') === guids.focus) {
        results.push(block.get('id'));
      } else if (block.get('id') === guids.anchor) {
        results.push(block.get('id'));
        found = true;
      } else if (found && results.indexOf(guids.focus) === -1) {
        results.push(block.get('id'));
      }
      return found;
    };
    var results = [];
    var found = false;

    var sections = this.map.get('sections');
    if (!sections) { return results; }

    sections.forEach( (sect) => {
      sect.get('blocks').forEach( (block) => {
        found = find(block, guids, results, found);
        block.get('blocks', []).forEach( (subblock) => {
          found = find(subblock, guids, results, found);
        });
      });
    });

    // focus offset doesn't actually have anything selected
    if (offsets && offsets.focus === 0) { results.pop(); }

    return results;
  }

  /**
   * find the position that the block is at in the collection
   *
   * {
   *   sections: [
   *     {
   *       blocks: [
   *         { id: "9ef1" },
   *         { id: "f9ba" }
   *       ]
   *     }
   *   ]
   * }
   *
   * findBlockPosition('f9ba');
   *
   * => 1
   */
  findBlockPosition(guid) {
    var path = this.findPath(guid);
    return path[path.length-1];
  }


  // ---------- MUTABLE FINDERS

  /**
   * find reference to a block within the content by guid
   *
   * { sections: [{ blocks: [{ id: "9ef1"}]}, {}] }
   *
   * findBlock("9ef1")
   *
   * => { id: "9ef1" }
   */
  findBlock(guid) {
    var block = {};
    this.content.sections.forEach( (sect) => {
      sect.blocks.forEach( (b) => {
        if (guid === b.id) { block = b; }

        (b.blocks || []).forEach( (subblock) => {
          if (guid === subblock.id) { block = subblock; }
        });
      });
    });
    return block;
  }

  /**
   * find reference to parent block array for a given guid
   *
   * { sections: [{ blocks: [{ id: "9ef1"}]}, {}] }
   *
   * findBlocks("9ef1");
   *
   * => [{ id: "9ef1" }]
   */
  findBlocks(guid) {
    var blocks = null;
    this.content.sections.forEach( (sect) => {
      if (blocks) { return; }
      sect.blocks.forEach( (block) => {
        if (blocks) { return; }
        if (block.id === guid) { blocks = sect.blocks; }

        (block.blocks || []).forEach( (b) => {
          if (blocks) { return; }
          if (b.id === guid) { blocks = block.blocks; }
        });
      });
    });
    return blocks;
  }

  /**
   * find reference to the previous block in a collection of blocks by guid
   *
   * {
   *   sections: [
   *     {
   *       blocks: [
   *         { id: "9ef1" },
   *         { id: "f9ba" },
   *       ]
   *     }
   *   ]
   * }
   *
   * findPreviousBlock('f9ba');
   *
   * => { id: 9ef1 }
   */
  findPreviousBlock(guid) {
    var blocks = this.findBlocks(guid);
    var index  = this.findBlockPosition(guid);
    return blocks[index - 1];
  }

  /**
   * find reference to the next block in a collection of blocks by guid
   *
   * {
   *   sections: [
   *     {
   *       blocks: [
   *         { id: "9ef1" },
   *         { id: "f9ba" },
   *       ]
   *     }
   *   ]
   * }
   *
   * findPreviousBlock('9ef1');
   *
   * => { id: "f9ba" }
   */
  findNextBlock(guid) {
    var blocks = this.findBlocks(guid);
    var index  = this.findBlockPosition(guid);
    return blocks[index + 1];
  }

  /**
   * find reference to a list item's parent block
   *
   * {
   *   sections: [
   *     {
   *       blocks: [
   *         {
   *           id: "9ef1",
   *           blocks: [
   *             { id: "f9ba" }
   *           ]
   *         },
   *       ]
   *     }
   *   ]
   * }
   *
   * findPreviousBlock('f9ba');
   *
   * => { id: "9ef1" }
   */
  findParentBlock(guid) {
    var block = {};
    this.content.sections.forEach( (sect) => {
      sect.blocks.forEach( (b) => {
        (b.blocks || []).forEach( (subblock) => {
          if (guid === subblock.id) { block = b; }
        });
      });
    });
    return block;
  }

}

module.exports = ContentFinder;
