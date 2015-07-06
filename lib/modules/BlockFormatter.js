var BlockNode = require('./BlockNode');
var Immutable = require('immutable');

var CLASS_NAME_PREFIX = "ic-Editor-Block";

// Formats text with inline markup based on the markup begin/end indices. We
// always next inline markups in the following order: a, strong, em. This
// should always be consistent.
//
// <a href="#">
//   <strong>
//     <em>some text</em>
//   </strong>
// </a>
//
class BlockFormatter {
  // escape markup & create dom node from text to manipulate
  constructor(text) {
    this.node = document.createElement('div');
    this.node.appendChild(document.createTextNode(text));
  }

  applyMarkup(markups) {
    if (markups.size === 0) { return this.node.textContent; }

    this._applyMarkup(this.node, markups.get('a'), 'a');
    this._applyMarkup(this.node, markups.get('strong'), 'strong');
    this._applyMarkup(this.node, markups.get('em'), 'em');

    return this.node.innerHTML;
  }

  _applyMarkup(node, markups, type) {
    markups = markups || Immutable.List();
    var blockNode = new BlockNode(node);

    markups.forEach( ( markup) => {
      var begin = blockNode.nodeOffset(markup.getIn(['range', 0]));
      var end   = blockNode.nodeOffset(markup.getIn(['range', 1]), true);


      var url   = markup.get('value');

      if (begin.node === end.node) {
        // split up text using selection
        var newNodes = this._formatNode(url, type, begin, end);

        // replace previous node with our new node
        var parent = begin.node.parentNode;
        parent.replaceChild(newNodes, begin.node);

      } else {
        console.log('nested formatting no worky');
      }
    });
  }

  _formatNode(url, type, begin, end) {
    var text = begin.node.textContent;

    // our formatting markup node
    var format = document.createElement(type);
    format.setAttribute('class', CLASS_NAME_PREFIX + "__" + type);
    if (url) {
      format.setAttribute('href', url);
    }

    // text nodes
    var beforeText = text.substring(0, begin.offset);
    var before = document.createTextNode(beforeText);

    var withinText = text.substring(begin.offset, end.offset);
    var within = document.createTextNode(withinText);
    format.appendChild(within);

    var afterText = text.substring(end.offset);
    var after = document.createTextNode(afterText);

    // docfrag is good for performance
    var docfrag = document.createDocumentFragment();
    docfrag.appendChild(before);
    docfrag.appendChild(format);
    docfrag.appendChild(after);

    return docfrag;
  }

}

module.exports = BlockFormatter;
