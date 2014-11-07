// A wrapper around a dom node to give us some helpful methods for building
// and finding various dom info around a selection
class BlockNode {
  constructor(blockNode) {
    this.node = blockNode;
  }

  // get flattened list of all text nodes
  textNodes() {
    return this._textNodes(this.node);
  }

  // find the node and offset given the blockOffset
  nodeOffset(blockOffset) {
    var nodes = this.textNodes();

    for (var i = 0, j = nodes.length; i < j; i++) {
      var len = nodes[i].length;
      if (blockOffset - len <= 0) {
        return {'node': nodes[i], 'offset': blockOffset };
      } else {
        blockOffset -= len;
      }
    }

    // no text node found, default to the first node
    if (this.node.firstChild) {
      return {'node': this.node.firstChild, 'offset': 0};
    }
    return {};
  }

  // find the total offset for the parent block
  blockOffset(node, offset) {
    var nodes = this.textNodes();

    var total = 0;
    for (var i = 0, j = nodes.length; i < j; i++) {
      if (nodes[i] == node) {
        total += offset;
        break;
      } else {
        total += nodes[i].length;
      }
    }
    return total;
  }

  _textNodes(node, textNodes) {
    var textNodes = textNodes || [];
    var children = node ? node.childNodes : [];

    for (var i = 0, j = children.length; i < j; i++) {
      var child = children[i];
      if (child.nodeType == Node.TEXT_NODE) {
        textNodes.push(child);
      } else {
        this._textNodes(child, textNodes);
      }
    }
    return textNodes;
  }
}

module.exports = BlockNode;
