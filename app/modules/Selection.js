// Selection is an abstraction of the Dom selection object. It composes the 
// Dom selection and caches additional info to make it simpler to interact
// with the data in respect to the block and inline markup.
//
// selection
//   anchorGuid: "1d6f"
//   focusGuid: "1d6f"
//
//   anchorOffset: 2
//   focusOffset: 10
//
//   anchorBlockOffset: 10
//   focusBlockOffset: 20
//
class Selection {
  constructor(selection) {
    this.selection = selection;

    if (this._isValid()) {
      this._initNodes();
      this._initBounds();
      this._initMeta();
    }
  }

  // reselect text if we've swapped out the dom underneath
  reselect() {
    if (!this.anchorGuid || !this.focusGuid) { return false; }
    if (this.selection.type == 'Range') { return this._initBounds(); }

    // set the range based on selection node state
    var startNode = this._anchorTextNode();
    var endNode   = this._focusTextNode();
    var startOffset = this.anchorBlockOffset;
    var endOffset   = this.focusBlockOffset;

    if (!startNode || !endNode) { return; }

    // set range, swap if user selected back to front
    this._setRange(startNode, endNode, startOffset, endOffset);
    if (this.selection.getRangeAt(0).collapsed) {
      this._setRange(endNode, startNode, endOffset, startOffset);
    }
    return this._initBounds();
  }
  _setRange(startNode, endNode, startOffset, endOffset) {
    var range = document.createRange();
    range.setStart(startNode, startOffset);
    range.setEnd(endNode, endOffset);
    this.selection.removeAllRanges();
    this.selection.addRange(range);
  }

  // set selection focus on a specific block by guid
  focusOn(guid, offset) {
    this.anchorGuid = guid;
    this.focusGuid  = guid;

    this.anchorOffset = offset || 0;
    this.focusOffset  = offset || 0;
  }


  // find general positions of selection
  isRange() {
    return this.selection.type == "Range";
  }
  endOfBlock() {
    var blockNode = this._anchorNode();
    var textNode  = this.selection.anchorNode;
    var offset = this.selection.anchorOffset;

    return textNode == blockNode ||
          (textNode == blockNode.lastChild && textNode.length == offset);
  }
  begOfBlock() {
    var blockNode = this._anchorNode();
    var textNode  = this.selection.anchorNode;
    var offset = this.selection.anchorOffset;

    return textNode == blockNode ||
           (textNode == blockNode.firstChild && offset == 0);
  }
  crossBlock() {
    return this.anchorGuid != this.focusGuid;
  }


  // cache the node offsets, but also the total offset within the block text
  _initNodes() {
    this.anchorOffset = this.selection.anchorOffset;
    this.focusOffset  = this.selection.focusOffset;
    this.anchorGuid   = this._anchorBlock().getAttribute('name');
    this.focusGuid    = this._focusBlock().getAttribute('name');
    this.anchorBlockOffset = this._anchorBlockOffset();
    this.focusBlockOffset  = this._focusBlockOffset();
  }
  _anchorBlockOffset() {
    return this._nodeOffset(
      this._anchorBlock(),
      this.selection.anchorNode,
      this.selection.anchorOffset
    );
  }
  _focusBlockOffset() {
    return this._nodeOffset(
      this._focusBlock(),
      this.selection.focusNode,
      this.selection.focusOffset
    );
  }
  _nodeOffset(block, node, offset) {
    var nodes = this._textNodes(block);
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
    var children = node.childNodes;

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

  // find parent block nodes
  _anchorBlock() {
    var node = this._anchorNode();
    while (!node.classList.contains("ic-Editor-Block")) {
      node = node.parentNode;
    }
    return node;
  }
  _focusBlock() {
    var node = this._focusNode();
    while (!node.classList.contains("ic-Editor-Block")) {
      node = node.parentNode;
    }
    return node;
  }
  // closest non-text node
  _anchorNode() {
    var node = this.selection.anchorNode;
    return node && node.nodeType === 3 ? node.parentNode : node;
  }
  _focusNode() {
    var node = this.selection.focusNode;
    return node && node.nodeType === 3 ? node.parentNode : node;
  }

  // selection bounds
  _initBounds() {
    var old = this.bounds;
    this.bounds = this._bounds();
    return JSON.stringify(old) != JSON.stringify(this.bounds);
  }
  _bounds() {
    var range = this.selection.getRangeAt(0);
    return range.getBoundingClientRect();
  }

  // reconstituting selection of node from attributes
  _anchorTextNode() {
    var block = this._blockNode(this.anchorGuid);
    return this._findChild(block, this.anchorOffset)
  }
  _focusTextNode() {
    var block = this._blockNode(this.focusGuid);
    return this._findChild(block, this.focusOffset)
  }
  _blockNode(guid) {
    return document.getElementsByClassName(`ic-Editor-Block--${guid}`)[0];
  }
  _findChild(block, offset, pos) {
    var pos = pos || 0;
    var children = block.childNodes;

    for (var i = 0, j = children.length; i < j; i++) {
      var child = children[i];
      if (child.nodeType == Node.TEXT_NODE) {
        pos += child.length;
        if (offset < pos) { return child; }
      } else {
        return this._findChild(child, offset, pos);
      }
    }
  }

  // initializers
  _initMeta() {
    this.text = this._text();
    this.types = this._types();
    this.centered = this._isCenter();
  }
  _text() {
    return this.selection.toString().trim();
  }
  _types() {
    var types = [];
    var node = this._anchorNode();

    while (!node.classList.contains("ic-Editor-Block")) {
      types.push(node.tagName.toLowerCase());
      node = node.parentNode;
    }
    types.push(node.tagName.toLowerCase());

    return types;
  }
  _isCenter() {
    var node = this._anchorNode();
    return node.getAttribute('data-align') == "center";
  }

  // the selection has an anchor and is within the content
  _isValid() {
    var node = this._anchorNode()
    if (!node) { return false; }

    while (node.tagName && !node.getAttribute('contenteditable')) {
      node = node.parentNode;
    }
    return node !== document;
  }
}

module.exports = Selection;
