var mixInto = require('react/lib/mixInto');

var Selection = function() {
  this.init();
}

mixInto(Selection, {
  init: function() {
    this.selection = document.getSelection();

    if (this._isValid() && this._text()) {
      var bounds = this._bounds();

      this.anchorGuid   = this.beginGuid();
      this.extentGuid   = this.endGuid();
      this.anchorOffset = this.selection.anchorOffset;
      this.extentOffset = this.selection.extentOffset;
      this.anchorPosition = this.beginPosition();
      this.extentPosition = this.endPosition();

      this.text = this._text();
      this.type = this._type();
      this.centered = this._isCenter();
      this.top = bounds.top;
      this.left = bounds.left;
      this.width = bounds.width;
      this.height = bounds.height;
    }
  },

  // which blocks does this range begin/end at
  beginGuid: function() {
    return this._beginNode().getAttribute('name');
  },
  endGuid: function() {
    return this._endNode().getAttribute('name');
  },
  guidRange: function() {
    return [this.beginGuid(), this.endGuid()];
  },

  beginPosition: function() {
    return Array.prototype.indexOf.call(
      this._beginNode().childNodes, this.selection.anchorNode
    );
  },
  endPosition: function() {
    return Array.prototype.indexOf.call(
      this._endNode().childNodes, this.selection.extentNode
    );
  },

  isRange: function() {
    return this.selection.type == "Range";
  },
  endOfBlock: function() {
    var blockNode = this._beginNode();
    var textNode  = this.selection.anchorNode;
    var offset = this.selection.anchorOffset;
    return textNode == blockNode.lastChild && textNode.length == offset;
  },
  begOfBlock: function() {
    var blockNode = this._beginNode();
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

  _beginNode: function() {
    var node = this.selection.anchorNode;
    return node && node.nodeType === 3 ? node.parentNode : node;
  },
  _endNode: function() {
    var node = this.selection.extentNode;
    return node && node.nodeType === 3 ? node.parentNode : node;
  },

  _isValid: function() {
    var node = this._beginNode()
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
    return this._beginNode().tagName.toLowerCase();
  },

  _isCenter: function() {
    var node = this._beginNode();
    return node.getAttribute('data-align') == "center";
  },

  _bounds: function() {
    var range = this.selection.getRangeAt(0);
    return range.getBoundingClientRect();
  }
});

module.exports = Selection;
