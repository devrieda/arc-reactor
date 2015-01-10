var BlockNode = require('./BlockNode');

var CLASS_NAMES = {
  bold:   "ic-Editor-Block__strong",
  italic: "ic-Editor-Block__em",
  link:   "ic-Editor-Block__a"
}

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
    if (Object.keys(markups || {}).length == 0) {
      return this.node.textContent;
    }

    this._applyMarkup(markups.a,      'a',      CLASS_NAMES.link);
    this._applyMarkup(markups.strong, 'strong', CLASS_NAMES.bold);
    this._applyMarkup(markups.em,     'em',     CLASS_NAMES.italic);

    return this.node.innerHTML;
  }

  _applyMarkup(markups, type, klass) {
    var markups = markups || [];
    var blockNode = new BlockNode(this.node);

    markups.forEach( (markup) => {
      var begin = blockNode.nodeOffset(markup.range[0]);
      var end   = blockNode.nodeOffset(markup.range[1], true);
      var url   = markup.value;

      if (begin.node == end.node) {
        // split up text using selection
        var newNodes = this._formatNode(url, type, klass, begin, end);

        // replace previous node with our new node
        var parent = begin.node.parentNode;
        parent.replaceChild(newNodes, begin.node);

      } else {
        console.log('no worky');
        // it spans multiple nodes.... we'll figure that out later
      }
    })
  }

  _formatNode(url, type, klass, begin, end) {
    var text = begin.node.textContent;

    // our formatting markup node
    var format = document.createElement(type);
    format.setAttribute('class', klass);
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
