var mixInto = require('react/lib/mixInto');

var Selection = function() {
  this.init();
}

mixInto(Selection, {
  init: function() {
    this.selection = document.getSelection();

    if (this._isValid()) {
      this.initNodes();
      this.initBounds();
      this.initMeta();
    }
  },

  initMeta: function() {
    this.text = this._text();
    this.types = this._types();
    this.centered = this._isCenter();
  },
  initNodes: function() {
    this.anchorGuid   = this._anchorGuid();
    this.focusGuid    = this._focusGuid();
    this.anchorOffset = this.selection.anchorOffset;
    this.focusOffset  = this.selection.focusOffset;
    this.anchorPosition = this._anchorPosition();
    this.focusPosition  = this._focusPosition();
  },
  initBounds: function() {
    var bounds = this._bounds();
    this.top = bounds.top;
    this.left = bounds.left;
    this.width = bounds.width;
    this.height = bounds.height;
  },


  reselect: function() {
    if (!this.anchorGuid || !this.focusGuid) { return false; }

    // set the range based on selection node state
    var range = document.createRange();
    var startNode = this._anchorTextNode();
    var endNode = this._focusTextNode();

    if (startNode && endNode) {
      range.setStart(startNode, this.anchorOffset);
      range.setEnd(endNode, this.focusOffset);
      this.selection.removeAllRanges();
      this.selection.addRange(range);
    }

    if (this._boundsChanged()) {
      this.initBounds();
      return true;
    } else {
      return false;
    }
  },
  focusOn: function(guid) {
    this.anchorGuid = guid;
    this.anchorOffset = 0;
    this.anchorPosition = 0;

    this.focusGuid  = guid;
    this.focusOffset = 0;
    this.focusPosition = 0;
  },

  // which blocks does this range begin/end at

  isRange: function() {
    return this.selection.type == "Range";
  },
  endOfBlock: function() {
    var blockNode = this._anchorNode();
    var textNode  = this.selection.anchorNode;
    var offset = this.selection.anchorOffset;

    return textNode == blockNode ||
          (textNode == blockNode.lastChild && textNode.length == offset);
  },
  begOfBlock: function() {
    var blockNode = this._anchorNode();
    var textNode  = this.selection.anchorNode;
    var offset = this.selection.anchorOffset;

    return textNode == blockNode ||
           (textNode == blockNode.firstChild && offset == 0);
  },
  crossBlock: function() {
    return this.anchorGuid != this.focusGuid;
  },

  _anchorBlock: function() {
    var node = this.selection.anchorNode;
    return node && node.nodeType === 3 ? node.parentNode : node;
  },
  _focusBlock: function() {
    var node = this.selection.focusNode;
    return node && node.nodeType === 3 ? node.parentNode : node;
  },

  _anchorPosition: function() {
    return Array.prototype.indexOf.call(
      this._anchorNode().childNodes, this.selection.anchorNode
    );
  },
  _focusPosition: function() {
    var pos = Array.prototype.indexOf.call(
      this._focusNode().childNodes, this.selection.focusNode
    );
    if (pos == -1) { pos = 0; }
    return pos;
  },

  _anchorNode: function() {
    var node = this.selection.anchorNode;
    return node && node.nodeType === 3 ? node.parentNode : node;
  },
  _focusNode: function() {
    var node = this.selection.focusNode;
    return node && node.nodeType === 3 ? node.parentNode : node;
  },
  _anchorGuid: function() {
    return this._anchorNode().getAttribute('name');
  },
  _focusGuid: function() {
    return this._focusNode().getAttribute('name');
  },

  _anchorTextNode: function() {
    return this._textNode(this.anchorGuid, this.anchorPosition);
  },
  _focusTextNode: function() {
    return this._textNode(this.focusGuid, this.focusPosition);
  },
  _textNode: function(guid, position) {
    // find anchor block node by guid
    var klass = 'ic-Editor-Block--' + guid;
    var node = document.getElementsByClassName(klass)[0];
    return node.childNodes[position];
  },


  // the selection has an anchor and is within the content
  _isValid: function() {
    var node = this._anchorNode()
    if (!node) { return false; }

    while (node.tagName && !node.getAttribute('contenteditable')) {
      node = node.parentNode;
    }
    return node !== document;
  },

  _text: function() {
    return this.selection.toString().trim();
  },

  _types: function() {
    var types = [];
    var node = this._anchorNode();

    while (!node.classList.contains("ic-Editor-Block")) {
      types.push(node.tagName.toLowerCase());
      node = node.parentNode;
    }
    types.push(node.tagName.toLowerCase());

    return types;
  },

  _isCenter: function() {
    var node = this._anchorNode();
    return node.getAttribute('data-align') == "center";
  },

  _bounds: function() {
    var range = this.selection.getRangeAt(0);
    return range.getBoundingClientRect();
  },

  _boundsChanged: function() {
    var bounds = this._bounds();
    return (bounds.top != this.top || bounds.left != this.left ||
            bounds.width != this.width || bounds.height != this.height);
  }
});

module.exports = Selection;
