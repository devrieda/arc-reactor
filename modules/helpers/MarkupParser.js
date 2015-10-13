class MarkupParser {
  constructor(node) {
    this.node = node;
  }

  // find the markups
  markups() {
    let markups = {};
    let textLen = 0;
    this._findNodeLengths(this.node, markups, textLen);
    return markups;
  }

  // recursively find node lengths
  _findNodeLengths(node, markups, textLen) {
    const children = node.childNodes;

    for (let i = 0, j = children.length; i < j; i++) {
      const child = children[i];

      // add to list
      if (child.nodeType === Node.ELEMENT_NODE) {
        const tag = child.tagName.toLowerCase();
        const len = child.textContent.length;

        // build the selection range
        let range = {'range': [textLen, textLen + len]};
        if (tag === 'a') { range.value = child.getAttribute('href'); }

        // add to the list
        markups[tag] = markups[tag] || [];
        markups[tag].push(range);

        this._findNodeLengths(child, markups, textLen);
      }

      textLen += child.textContent.length;
    }
  }
}

export default MarkupParser;
