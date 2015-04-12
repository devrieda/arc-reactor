var Immutable = require('immutable');

class MarkupParser {
  constructor(node) {
    this.node = node;
  }

  // find the markups
  markups() {
    var markups = {};
    var textLen = 0;
    this._findNodeLengths(this.node, markups, textLen);
    return markups;
  }

  // recursively find node lengths
  _findNodeLengths(node, markups, textLen) {
    var children = node.childNodes;

    for (var i = 0, j = children.length; i < j; i++) {
      var child = children[i];

      // add to list
      if (child.nodeType === Node.ELEMENT_NODE) {
        var tag = child.tagName.toLowerCase();
        var len = child.textContent.length;

        // build the selection range
        var range = {'range': [textLen, textLen + len]};
        if (tag === 'a') { range.value = child.getAttribute('href'); }

        // add to the list
        markups[tag] = markups[tag] || [];
        markups[tag].push(range)

        this._findNodeLengths(child, markups, textLen);
      }

      textLen += child.textContent.length;
    }
  }
}

module.exports = MarkupParser;
