var mixInto = require('react/lib/mixInto');

var Selection = function() {
  this.init();
}

mixInto(Selection, {
  init: function() {
    this.selection = document.getSelection();

    if (this._isValid() && this._text()) {
      this.initNodes();
      this.initBounds();
      this.initMeta();
    }
    console.log(this)
  },

  initMeta: function() {
    this.text = this._text();
    this.type = this._type();
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

  // which blocks does this range begin/end at

  guidRange: function() {
    return [this.anchorGuid(), this.focusGuid()];
  },

  isRange: function() {
    return this.selection.type == "Range";
  },
  endOfBlock: function() {
    var blockNode = this._anchorNode();
    var textNode  = this.selection.anchorNode;
    var offset = this.selection.anchorOffset;
    return textNode == blockNode.lastChild && textNode.length == offset;
  },
  begOfBlock: function() {
    var blockNode = this._anchorNode();
    var textNode  = this.selection.anchorNode;
    var offset = this.selection.anchorOffset;
    return textNode == blockNode.firstChild && offset == 0;
  },
  crossBlock: function() {
    var range = this.guidRange();
    return range[0] != range[1];
  },
  select: function() {
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
    return Array.prototype.indexOf.call(
      this._focusNode().childNodes, this.selection.focusNode
    );
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

  _isValid: function() {
    var node = this._anchorNode()
    if (!node) { return false; }

    // the selection is within the content
    while (node.tagName && !node.getAttribute('contenteditable')) {
      node = node.parentNode;
    }
    return node !== document;
  },

  _text: function() {
    return this.selection.toString().trim();
  },

  _type: function() {
    return this._anchorNode().tagName.toLowerCase();
  },

  _isCenter: function() {
    var node = this._anchorNode();
    return node.getAttribute('data-align') == "center";
  },

  _bounds: function() {
    var range = this.selection.getRangeAt(0);
    return range.getBoundingClientRect();
  }
});

module.exports = Selection;
