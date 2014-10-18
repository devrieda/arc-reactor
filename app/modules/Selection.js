var mixInto = require('react/lib/mixInto');

var Selection = function() {
  this.selection = document.getSelection();
}

mixInto(Selection, {
  _beginNode: function() {
    var node = this.selection.anchorNode;
    return node && node.nodeType === 3 ? node.parentNode : node;
  },
  _endNode: function() {
    var node = this.selection.extentNode;
    return node && node.nodeType === 3 ? node.parentNode : node;
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

  // does this selection affect multiple blocks
  crossBlock: function() {
    var range = this.guidRange();
    return range[0] != range[1];
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

  isValid: function() {
    var node = this._beginNode()
    if (!node) { return false; }

    // the selection is within the content
    while (node.tagName && !node.getAttribute('contenteditable')) {
      node = node.parentNode;
    }
    return node !== document;
  },


  text: function() {
    return this.selection.toString().trim();
  },

  type: function() {
    return this._beginNode().tagName.toLowerCase();
  },

  isCenter: function() {
    var node = this._beginNode();
    return node.getAttribute('data-align') == "center";
  },

  bounds: function() {
    var range = this.selection.getRangeAt(0);
    return range.getBoundingClientRect();
  },

  attr: function() {
    var obj = {};
    if (this.isValid() && this.text()) {
      var bounds = this.bounds();
      obj = {
        text: this.text(),
        type: this.type(), 
        centered: this.isCenter(),
        top: bounds.top,
        left: bounds.left,
        width: bounds.width,
        height: bounds.height
      }
    }
    return obj;
  }

});


module.exports = Selection;
