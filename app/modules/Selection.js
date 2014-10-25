class Selection {
  constructor() {
    this.selection = document.getSelection();

    if (this._isValid()) {
      this._initNodes();
      this._initBounds();
      this._initMeta();
    }
  }

  reselect() {
    if (!this.anchorGuid || !this.focusGuid) { return false; }

    // do we need to reselect?
    if (this.selection.type == 'Range') { return this._boundsChanged(); }

    // set the range based on selection node state
    var range = document.createRange();
    var startNode = this._anchorTextNode();
    var endNode = this._focusTextNode();

    range.setStart(startNode, this.anchorOffset);
    range.setEnd(endNode, this.focusOffset);
    this.selection.removeAllRanges();
    this.selection.addRange(range);

    return this._boundsChanged();
  }

  focusOn(guid, offset) {
    this.anchorGuid = guid;
    this.anchorOffset = offset || 0;
    this.anchorPosition = 0;

    this.focusGuid  = guid;
    this.focusOffset = offset || 0;
    this.focusPosition = 0;
  }

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
    this.anchorPosition = this._anchorPosition();
    this.focusPosition  = this._focusPosition();
  }
  _anchorGuid() {
    return this._anchorNode().getAttribute('name');
  }
  _focusGuid() {
    return this._focusNode().getAttribute('name');
  }
  _anchorPosition() {
    return Array.prototype.indexOf.call(
      this._anchorNode().childNodes, this.selection.anchorNode
    );
  }
  _focusPosition() {
    var pos = Array.prototype.indexOf.call(
      this._focusNode().childNodes, this.selection.focusNode
    );
    if (pos == -1) { pos = 0; }
    return pos;
  }

  _initBounds() {
    var bounds = this._bounds();
    this.top = bounds.top;
    this.left = bounds.left;
    this.width = bounds.width;
    this.height = bounds.height;
  }
  _bounds() {
    var range = this.selection.getRangeAt(0);
    return range.getBoundingClientRect();
  }
  _boundsChanged() {
    var bounds = this._bounds();
    var changed = (bounds.top != this.top || bounds.left != this.left ||
                   bounds.width != this.width || bounds.height != this.height);
    if (changed) {
      this._initBounds();
      return true;
    } else {
      return false;
    }
  }

  _anchorNode() {
    var node = this.selection.anchorNode;
    return node && node.nodeType === 3 ? node.parentNode : node;
  }
  _focusNode() {
    var node = this.selection.focusNode;
    return node && node.nodeType === 3 ? node.parentNode : node;
  }

  _anchorTextNode() {
    return this._textNode(this.anchorGuid, this.anchorPosition);
  }
  _focusTextNode() {
    return this._textNode(this.focusGuid, this.focusPosition);
  }
  _textNode(guid, position) {
    if (position == -1) position = 0;

    return this._blockNode(guid).childNodes[position];
  }
  _blockNode(guid) {
    var klass = 'ic-Editor-Block--' + guid;
    return document.getElementsByClassName(klass)[0];
  }
}

module.exports = Selection;
