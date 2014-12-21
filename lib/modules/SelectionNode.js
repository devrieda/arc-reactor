var BlockNode = require('./BlockNode');

var CLASS_NAMES = {
  block: "ic-Editor-Block",
  content: "ic-Editor-Content"
}

class SelectionNode {
  constructor(node, offset) {
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


  // upstream tag types
  types() {
    var types = [];
    var node = this.domNode;
    if (!this._isValid()) { return types; }

    while (!node.classList.contains(CLASS_NAMES.block)) {
      types.push(node.tagName.toLowerCase());
      node = node.parentNode;
    }
    types.push(node.tagName.toLowerCase());
    return types;
  }

  allTypes(until) {
    if (this.guid == until.guid) {
      return this.types();
    }
    var types = [];
    return types;
  }
  isCenter(until) {
    var blocks = this._siblingNodesUntil(until.guid);
    var centered = blocks.filter( (block) => {
      return block.getAttribute('data-align') == "center";
    });
    return blocks.length == centered.length;
  }

  focusOn(guid, offset) {
    this.guid = guid;
    this.blockOffset = offset;
  }

  begOfBlock() {
    return this.blockOffset == 0;
  }

  endOfBlock() {
    return this.blockOffset == this.blockNode.textContent.length;
  }

  _isValid() {
    var node = this._contentNode();
    return node && node !== document
  }

  // find content node for selection
  _contentNode() {
    var node = this.domNode;
    if (!node) { return false; }

    while (node && node.tagName && !node.classList.contains(CLASS_NAMES.content)) {
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
    while (!node.classList.contains(CLASS_NAMES.block)) {
      node = node.parentNode;
    }
    return node;
  }

  // find all sibling blocks
  _siblingNodesUntil(untilGuid) {
    if (!this.node) { return []; }

    var content = this._contentNode();
    var elts = content.getElementsByClassName(CLASS_NAMES.block);

    var nodes = [], start = false;
    for (var i = 0, j = elts.length; i < j; i++) {
      var name = elts[i].getAttribute('name');
      if (name == this.guid) { start = true; }
      if (start) {
        nodes.push(elts[i]);
      }
      if (name == untilGuid) { break; }
    }
    return nodes;
  }

  // find block node by the guid
  _blockNodeByGuid(guid) {
    return document.getElementsByName(guid)[0];
  }
}

module.exports = SelectionNode;
