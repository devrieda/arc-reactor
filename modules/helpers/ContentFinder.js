// traverses to finds references to data in the content
//
// expects an Immutable Map
//
class ContentFinder {
  constructor(map) {
    this.map = map;
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

    if (path.length === 1) { return null; }
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
    var path = this.findPath(guid);
    if (!path) { return null; }
    return path.slice(0, -1);
  }

  /**
   * path to the block previous to the given guid in the immutable set
   */
  findPrevPath(guid) {
    var path = this.findPath(guid);
    var last = path[path.length - 1];
    var blocks;

    // there are previous blocks in this section
    if (last > 0) {
      path[path.length - 1]--;

    // parent block with previous elements
    } else if (path.length === 5 && path[3] > 0) {
      path.pop();
      path.pop();
      path[path.length - 1]--;

    // last block from the previous section
    } else if (path[1] > 0) {
      blocks = this.map.getIn(['sections', path[1]-1, 'blocks']);
      path = ['sections', path[1]-1, 'blocks', blocks.size - 1];

      // get last sub-block if there is any
      var block = this.map.getIn(path);
      if (block.get('blocks')) {
        path.push('blocks', block.get('blocks').size - 1);
      }

    // no previous blocks
    } else {
      blocks = this.map.getIn(['sections', path[1]-1, 'blocks']);
      path = null;
    }

    // if the previous has sub-blocks, find the last
    if (path) {
      var subBlocks = this.map.getIn(path.concat('blocks'));
      if (subBlocks) {
        path.push('blocks', subBlocks.size - 1);
      }
    }
    return path;
  }

  /**
   * path to the next previous to the given guid in the immutable set
   */
  findNextPath(guid) {
    var path = this.findPath(guid);
    path[path.length - 1]++;

    // check for the first block in the next section
    if (!this.map.getIn(path)) {
      path = ['sections', path[1]+1, 'blocks', 0];
    }

    // no more blocks
    if (!this.map.getIn(path)) {
      path = null;
    }
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
    var singleBlock = guids && guids.anchor === guids.focus;
    if (offsets && !singleBlock && offsets.focus === 0) { results.pop(); }

    // remove last element if it's an orphan UL
    var last = results[results.length-1];
    if (last) {
      var type = this.map.getIn(this.findPath(last).concat("type"));
      if (type === 'ul') { results.pop(); }
    }
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
}

module.exports = ContentFinder;