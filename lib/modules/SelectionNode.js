var BlockNode = require('./BlockNode');

class SelectionNode {
  constructor(node, offset, target) {
    this.target = target;

    if (this.isFigure() && !this.isCaption()) {
      this._initNode(target, 0);
    } else {
      this._initNode(node, offset);
    }
  }

  _initNode(node, offset) {
    this.node    = node;
    this.offset  = offset;
    this.domNode = this._domNode();

    if (this._isValid()) {
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
    // todo - this should only pass 'true' for anchor node
    return new BlockNode(block).nodeOffset(this.blockOffset, true);
  }

  focusOn(guid, offset) {
    this.guid = guid;
    this.blockOffset = offset;
  }

  begOfBlock() {
    return this.blockOffset === 0;
  }

  endOfBlock() {
    return this.blockOffset === this.blockNode.textContent.length;
  }

  isCaption() {
    var node = this.target;
    if (!node) { return false; }
    while (node && node.dataset && !node.dataset.caption && !node.dataset.top) {
      node = node.parentNode;
    }
    return node.dataset && node.dataset.caption;
  }

  isFigure() {
    var node = this.target;
    if (!node || !node.dataset) { return false; }

    while (node && node.dataset && !node.dataset.block && !node.dataset.top) {
      node = node.parentNode;
    }
    return node.dataset && node.dataset.figure;
  }

  _isValid() {
    var node = this._contentNode();
    return node && node !== document;
  }

  // find content node for selection
  _contentNode() {
    var node = this.domNode;
    if (!node) { return false; }

    while (node && node.tagName && !node.dataset.top) {
      node = node.parentNode;
    }
    return node;
  }

  // closest non-text node
  _domNode() {
    var node = this.node;
    return node && node.nodeType === 3 ? node.parentNode : node;
  }

  // find parent block nodes
  _blockNode() {
    var node = this._domNode();
    while (!node.dataset.block) {
      node = node.parentNode;
    }
    return node;
  }

  // find block node by the guid
  _blockNodeByGuid(guid) {
    return document.getElementsByName(guid)[0];
  }
}

module.exports = SelectionNode;
