const ContentFinder = require('../ContentFinder');

class CombineBlockPrev {
  constructor(content) {
    this.content = content;
  }

  execute(guids) {
    const guid  = guids.anchor;

    const path  = this._finder().findPath(guid);
    const block = this.content.getIn(path);

    const prevPath = this._finder().findPrevPath(guid);
    let prev;
    if (prevPath) {
      prev = this.content.getIn(prevPath);
    }

    // no-op if the previous is a figure
    if (prev && prev.get("type") === "figure") {
      return {
        content: this.content,
        position: {
          guid: block.get('id'),
          offset: 0
        }
      };
    }

    // combine sections
    if (prev && path[1] !== prevPath[1]) {
      const blocks1 = this.content.getIn(prevPath.slice(0, 3));
      const blocks2 = this.content.getIn(path.slice(0, 3));
      const all = blocks1.concat(blocks2);

      // set new blocks
      this.content = this.content.setIn(prevPath.slice(0, 3), all);

      // remove other section
      this.content = this.content.deleteIn(path.slice(0, 2));

      return {
        content: this.content,
        position: {
          guid: block.get('id'),
          offset: 0
        }
      };

    // there is a prev block in this section to combine with
    } else if (prev) {
      const text = prev.get("text") || "";
      const offset = text.length;

      // set combined text
      const newText = prev.get("text") + block.get("text");
      this.content = this.content.setIn(prevPath.concat("text"), newText);

      this._removeBlock(block.get('id'));
      return {
        content: this.content,
        position: {
          guid: prev.get('id'),
          offset: offset
        }
      };

    } else {
      return { content: this.content, position: null };
    }
  }

  _removeBlock(guid) {
    const path = this._finder().findBlocksPath(guid);
    const blocks = this.content.getIn(path);
    const index  = this._finder().findBlockPosition(guid);

    this.content = this.content.setIn(path, blocks.delete(index));
  }

  _finder() {
    return new ContentFinder(this.content);
  }
}

export default CombineBlockPrev;
