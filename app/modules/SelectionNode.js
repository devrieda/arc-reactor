var DomNode = require('./DomNode');

var CLASS_NAMES = {
  block: "ic-Editor-Block"
}

class SelectionNode {
  constructor(node, offset) {
    this.node   = node;
    this.offset = offset;
    this._initNodes();
  }

  // reconstituting selection of node from guids & offsets
  textNodeOffset() {
    if (!this.guid) { return {}; }
    var block = this._blockByGuid(this.guid);
    return this._findNodeOffset(block, this.blockOffset);
  }

  // upstream tag types
  types() {
    var types = [];
    var node = this.domNode;
    if (!node) { return types; }

    while (!node.classList.contains(CLASS_NAMES.block)) {
      types.push(node.tagName.toLowerCase());
      node = node.parentNode;
    }
    types.push(node.tagName.toLowerCase());

    return types;
  }

  isCenter() {
    var node = this.domNode;
    if (!node) { return false; }
    return node.getAttribute('data-align') == "center";
  }

  focusOn(guid, offset) {
    this.guid = guid;
    this.blockOffset = offset;
  }

  _initNodes() {
    var domNode = this._domNode();
    if (!this._isValid(domNode)) { return; }

    this.domNode     = domNode;
    this.blockNode   = this._blockNode();
    this.guid        = this.blockNode.getAttribute('name');
    this.blockOffset = this._blockOffset(this.blockNode, this.node, this.offset);
  }

  _isValid(node) {
    if (!node) { return false; }

    while (node.tagName && !node.getAttribute('contenteditable')) {
      node = node.parentNode;
    }
    return node !== document;
  }

  // closest non-text node
  _domNode() {
    var node = this.node;
    return node && node.nodeType === 3 ? node.parentNode : node;
  }

  // find parent block nodes
  _blockNode() {
    var node = this._domNode();
    while (!node.classList.contains(CLASS_NAMES.block)) {
      node = node.parentNode;
    }
    return node;
  }

  _blockByGuid(guid) {
    return document.getElementsByClassName(`${CLASS_NAMES.block}--${guid}`)[0];
  }

  _findNodeOffset(block, offset) {
    var nodes = new DomNode(block).textNodes();

    for (var i = 0, j = nodes.length; i < j; i++) {
      var len = nodes[i].length;
      if (offset - len <= 0) {
        return {'node': nodes[i], 'offset': offset };
      } else {
        offset -= len;
      }
    }

    // no text node found, default to the first node
    return block.firstChild ? {'node': block.firstChild, 'offset': 0} : {};
  }

  // find the total offset for the parent block
  _blockOffset(block, node, offset) {
    var nodes = new DomNode(block).textNodes();

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

}

module.exports = SelectionNode;
