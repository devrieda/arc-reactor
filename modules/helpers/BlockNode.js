// A wrapper around a dom node to give us some helpful methods for building
// and finding various dom info around a selection
class BlockNode {
  constructor(node) {
    this.node = node;
  }

  // get flattened list of all text nodes
  textNodes() {
    return this._textNodes(this.node);
  }

  // find the node and offset given the blockOffset
  nodeOffset(blockOffset, isFocusOffset) {
    isFocusOffset = isFocusOffset || false;
    const nodes = this.textNodes();

    for (let i = 0, j = nodes.length; i < j; i++) {
      const len = nodes[i].length;
      const nodeOffset = isFocusOffset ? blockOffset-len-1 : blockOffset-len;
      if (nodeOffset < 0) {
        return {'node': nodes[i], 'offset': blockOffset };
      } else {
        blockOffset -= len;
      }
    }

    // no text node found, default to the first node
    if (this.node && this.node.firstChild) {
      return {'node': this.node.firstChild, 'offset': 0};
    }
    return {};
  }

  // find the total offset for the parent block
  blockOffset(node, offset) {
    if (node.nodeType === Node.ELEMENT_NODE && offset === 0) { return offset; }

    const nodes = this.textNodes();

    let total = 0;
    for (let i = 0, j = nodes.length; i < j; i++) {
      if (nodes[i] === node) {
        total += offset;
        break;
      } else {
        total += nodes[i].length;
      }
    }
    return total;
  }

  _textNodes(node, textNodes) {
    textNodes = textNodes || [];
    const children = node ? node.childNodes : [];

    for (let i = 0, j = children.length; i < j; i++) {
      const child = children[i];
      if (child.nodeType === Node.TEXT_NODE) {
        textNodes.push(child);
      } else {
        this._textNodes(child, textNodes);
      }
    }
    return textNodes;
  }
}

export default BlockNode;
