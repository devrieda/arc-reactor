import ContentFinder from '../ContentFinder';

class CombineBlockNext {
  constructor(content) {
    this.content = content;
  }

  execute(guids) {
    const guid  = guids.anchor;

    const path  = this._finder().findPath(guid);
    const block = this.content.getIn(path);
    let offset;

    const nextPath = this._finder().findNextPath(guid);
    let next;
    if (nextPath) {
      next = this.content.getIn(nextPath);
    }

    // no-op if the next is a figure
    if (next && next.get("type") === "figure") {
      return {
        content: this.content,
        position: {
          guid: block.get('id'),
          offset: block.get("text").length
        }
      };
    }

    // combine sections
    if (next && path[1] !== nextPath[1]) {
      const blocks1 = this.content.getIn(path.slice(0, 3));
      const blocks2 = this.content.getIn(nextPath.slice(0, 3));
      const all = blocks1.concat(blocks2);

      // set new blocks
      this.content = this.content.setIn(path.slice(0, 3), all);

      // remove other section
      this.content = this.content.deleteIn(nextPath.slice(0, 2));

      return {
        content: this.content,
        position: {
          guid: block.get('id'),
          offset: block.get("text").length
        }
      };

    // there is a next block in this section to combine with
    } else if (next) {
      offset = block.get("text").length;

      // set combined text
      const newText = block.get("text") + next.get("text");
      this.content = this.content.setIn(path.concat("text"), newText);

      this._removeBlock(next.get("id"));

      return {
        content: this.content,
        position: {
          guid: block.get('id'),
          offset: offset
        }
      };

    } else {
      return {
        content: this.content,
        position: null
      };
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

export default CombineBlockNext;
