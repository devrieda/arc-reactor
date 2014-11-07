// A wrapper around a dom node to give us some helpful methods for building
// and finding various dom info around a selection
class DomNode {
  constructor(node) {
    this.node = node;
  }

  // get flattened list of all text nodes
  textNodes() {
    return this._textNodes(this.node);
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

module.exports = DomNode;
