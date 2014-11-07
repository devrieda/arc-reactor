var BlockNode = require('./BlockNode');

var CLASS_NAMES = {
  block: "ic-Editor-Block"
}

class SelectionNode {
  constructor(node, offset) {
    this.node    = node;
    this.offset  = offset;
    this.domNode = this._domNode();

    if (this._isValid(this.domNode)) {
      this.blockNode = this._blockNode();
      this.guid      = this.blockNode.getAttribute('name');

      var bn = new BlockNode(this.blockNode);
      this.blockOffset = bn.blockOffset(this.node, this.offset);
    }
  }

  // reconstituting selection of node from guids & offsets
  textNodeOffset() {
    if (!this.guid) { return {}; }

    var block = this._blockNodeByGuid(this.guid);
    return new BlockNode(block).nodeOffset(this.blockOffset);
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

  // find block node by the guid
  _blockNodeByGuid(guid) {
    return document.getElementsByClassName(`${CLASS_NAMES.block}--${guid}`)[0];
  }
}

module.exports = SelectionNode;
