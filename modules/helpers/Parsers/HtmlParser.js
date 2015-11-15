import Guid from '../Guid';

const INTERNAL_CLASS = 'arc-Editor';

const INLINE_TAGS = [
  'b', 'big', 'i', 'small', 'tt', 'abbr', 'acronym', 'cite', 'code',
  'dfn', 'em', 'kbd', 'strong', 'samp', 'var', 'a', 'bdo', 'br', 'img',
  'map', 'object', 'q', 'script', 'span', 'sub', 'sup', 'button',
  'input', 'label, select, textarea'
];
const BLOCK_TAGS = [
  'address', 'article', 'aside', 'blockquote', 'canvas', 'dd', 'div',
  'dl', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2',
  'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'main', 'nav', 'noscript',
  'ol', 'output', 'p', 'pre', 'section', 'table', 'tfoot', 'ul', 'video'
];

const HtmlParser = {
  matches(text) {
    return text.toLowerCase().indexOf("<meta") !== -1;
  },

  parse(pasted, callback) {
    return callback([]);

    // TODO - implement html parse
    this._parseHtml(pasted, callback);
  },

  // html
  _parseHtml(pasted, callback) {
    const node = document.createElement('div');
    node.innerHTML = pasted;
    const results = this._parseNode(node);

    if (pasted.indexOf(INTERNAL_CLASS) === -1) {
      // TODO - hoist headers so that things look nice
    }
    callback(results);
  },

  _parseNode(node) {
    const childNodes = node.childNodes;
    let results = [];

    // all sub-nodes
    for (let i = 0, j = childNodes.length; i < j; i++) {
      const child = childNodes[i];
      const tag = child.tagName.toLowerCase();

      // skip if not a valid element
      if (child.nodeType !== Node.ELEMENT_NODE) { continue; }
      if (BLOCK_TAGS.concat(INLINE_TAGS).indexOf(tag) === -1) { continue; }

      let block = { type: tag, text: child.textContent };

      // if child is block, add to children
      if (BLOCK_TAGS.indexOf(tag) !== -1) {
      } else {
      }

      results.push(block);
    }
    return results;
  },
};

export default HtmlParser;
