var mixInto = require('react/lib/mixInto');

var Selection = function(selection) {
  this.selection = selection;
}

mixInto(Selection, {
  getStartNode: function() {
    var node = this.selection.anchorNode;
    return node && node.nodeType === 3 ? node.parentNode : node;
  },
  getFinishNode: function() {
    var node = this.selection.extentNode;
    return node && node.nodeType === 3 ? node.parentNode : node;
  },

  getNames: function() {
    var start  = this.getStartNode();
    var finish = this.getFinishNode();
  },

  text: function() {
    return this.selection.toString().trim();
  },

  type: function() {
    return this.getStartNode().tagName.toLowerCase();
  },

  isCenter: function() {
    var node = this.getStartNode();
    return node.getAttribute('data-align') == "center";
  },

  isRange: function() {
    return this.selection.type == "Range";
  },

  bounds: function() {
    var range = this.selection.getRangeAt(0);
    return range.getBoundingClientRect();
  },

  isValid: function() {
    var node = this.getStartNode()
    if (!node) { return false; }

    // the selection is within the content
    while (node.tagName && !node.getAttribute('contenteditable')) {
      node = node.parentNode;
    }
    return node !== document;
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
