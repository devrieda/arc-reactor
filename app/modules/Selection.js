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
class Selection {
  constructor(selection) {
    this.selection = selection;

    if (this._isValid()) {
      this._initNodes();
      this._initBounds();
      this._initMeta();
    }
  }

  reselect() {
    if (!this.anchorGuid || !this.focusGuid) { return false; }

    // do we need to reselect?
    if (this.selection.type == 'Range') { return this._initBounds(); }

    // set the range based on selection node state
    var startNode = this._anchorTextNode();
    var endNode   = this._focusTextNode();
    var startOffset = this.anchorOffset;
    var endOffset   = this.focusOffset;

    this._setRange(startNode, endNode, startOffset, endOffset);

    // user selected from back to front
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

  focusOn(guid, offset) {
    this.anchorGuid = guid;
    this.focusGuid  = guid;

    this.anchorOffset = offset || 0;
    this.focusOffset  = offset || 0;
  }


  // find position of selection
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


  // the selection has an anchor and is within the content
  _isValid() {
    var node = this._anchorNode()
    if (!node) { return false; }

    while (node.tagName && !node.getAttribute('contenteditable')) {
      node = node.parentNode;
    }
    return node !== document;
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


  _initNodes() {
    this.anchorGuid   = this._anchorGuid();
    this.focusGuid    = this._focusGuid();
    this.anchorOffset = this.selection.anchorOffset;
    this.focusOffset  = this.selection.focusOffset;
  }
  _anchorGuid() {
    return this._anchorBlock().getAttribute('name');
  }
  _focusGuid() {
    return this._focusBlock().getAttribute('name');
  }
  _anchorOffset() {
    var anchor = this.selection.anchorNode;
  }
  _focusOffset() {
    var focus = this.selection.focusNode;
  }


  // go up all the way to the block
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
  // get the node (either inline or block)
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


  // get the text
  _anchorTextNode() {
    return this._textNode(this.anchorGuid, this.anchorOffset);
  }
  _focusTextNode() {
    return this._textNode(this.focusGuid, this.focusOffset);
  }
  _textNode(guid, offset) {
    var block = document.getElementsByClassName(`ic-Editor-Block--${guid}`)[0];
    return this._findChild(block, offset)
  }
  _findChild(block, offset, pos) {
    var pos = pos || 0;
    var children = block.childNodes;

    for (var i = 0, j = children.length; i < j; i++) {
      var node = children[i];
      if (node.nodeType == Node.TEXT_NODE) {
        pos += node.length;
        if (offset < pos) { return node; }
      } else {
        return this._findChild(node, offset, pos);
      }
    }
  }
}

module.exports = Selection;
