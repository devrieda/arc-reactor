var Selection = function(selection) {
  this.selection = selection;
}

Selection.prototype.getStartNode = function() {
  var node = this.selection.anchorNode;
  return node && node.nodeType === 3 ? node.parentNode : node;
}

Selection.prototype.text = function() {
  return this.selection.toString().trim();
}

Selection.prototype.type = function() {
  return this.getStartNode().tagName.toLowerCase();
}

Selection.prototype.bounds = function() {
  var range = this.selection.getRangeAt(0);
  return range.getBoundingClientRect();
}

Selection.prototype.isValid = function() {
  var node = this.getStartNode()
  if (!node) { return false; }

  while (node.tagName && !node.getAttribute('contenteditable')) {
    node = node.parentNode;
  }
  return node !== document;
}

Selection.prototype.attr = function() {
  var obj = {};

  if (this.isValid() && this.text()) {
    var bounds = this.bounds();
    obj = {
      text: this.text(),
      type: this.type(), 
      top: bounds.top,
      left: bounds.left,
      width: bounds.width,
      height: bounds.height
    }
  }
  return obj;
}

module.exports = Selection;
