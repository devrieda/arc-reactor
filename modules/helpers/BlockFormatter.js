const BlockNode = require('./BlockNode');
const RangeSet = require('./RangeSet');

const { Map, List, fromJS } = require('immutable');

const CLASS_NAME_PREFIX = "arc-Editor-Block";
const INLINE_TAGS = ['a', 'strong', 'em'];

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

    const denormalized = this.denormalizeRanges(markups);

    INLINE_TAGS.forEach( (type) => {
      this._applyMarkup(denormalized.get(type), type);
    });

    return this.node.innerHTML;
  }

  /**
   * yikes.. convert overlapping ranges to be denormalized
   *
   * turning this:
   *   "a": [{
   *     "range": [15,19], "value": "http://derekdevries.com"
   *   }],
   *   "strong": [
   *     {"range": [10,19]}
   *   ]
   *
   * into this:
   *   "a": [{
   *     "range": [15,19], "value": "http://derekdevries.com"
   *   }],
   *   "strong": [
   *     {"range": [10,15]},
   *     {"range": [15,19]}
   *   ]
   */
  denormalizeRanges(markups) {
    let results = Map();
    const fullSet = new RangeSet();

    // build list of results per inline type (em/strong)
    INLINE_TAGS.forEach( (type) => {
      const rangesList = markups.get(type);
      if (!rangesList) return;

      let typeResults = results.get(type, List());
      typeResults = this._denormalizeForType(typeResults, fullSet, rangesList);
      results = results.set(type, typeResults);
    });
    return results;
  }

  // check if each markup is in the set, this mutates the fullSet :(
  // TODO - move to a RangeSetDenormalizer object
  _denormalizeForType(typeResults, fullSet, rangesList) {
    rangesList.forEach( (rangeMap) => {
      const range = rangeMap.toJS();
      const itemSet = new RangeSet([range]);

      // overlapping items need to find intersecting ranges
      if (fullSet.overlaps(range)) {

        // find any items intersecting the full set and add as
        // a separate range
        fullSet.intersect(range).forEach( (intersectingRange) => {
          itemSet.remove(intersectingRange);
          typeResults = typeResults.push(fromJS(intersectingRange));
        });

        // add the remaining ranges (that didnt' intersect)
        itemSet.getSet().forEach( (remainingRange) => {
          typeResults = typeResults.push(fromJS(remainingRange));
          fullSet.add(remainingRange);
        });

      // add to the set & results
      } else {
        fullSet.add(range);
        typeResults = typeResults.push(rangeMap);
      }
    });

    return typeResults;
  }

  /**
   * Apply markup to the base node
   *
   */
  _applyMarkup(markups, type) {
    markups = markups || List();
    const blockNode = new BlockNode(this.node);

    markups.forEach( ( markup) => {
      const begin = blockNode.nodeOffset(markup.getIn(['range', 0]));
      const end   = blockNode.nodeOffset(markup.getIn(['range', 1]), true);
      const url   = markup.get('value');

      // split up text using selection
      const newNodes = this._formatNode(type, url, begin, end);

      // replace previous node with our new node
      const parent = begin.node.parentNode;
      parent.replaceChild(newNodes, begin.node);
    });
  }

  _formatNode(type, url, begin, end) {
    const text = begin.node.textContent;

    const before = this._buildTextNodeBefore(text, begin.offset);
    const within = this._buildTextNodeWithin(text, begin.offset, end.offset);
    const after  = this._buildTextNodeAfter(text, end.offset);

    return this._buildDocFrag(type, url, before, within, after);
  }

  _buildTextNodeBefore(text, beginOffset) {
    const beforeText = text.substring(0, beginOffset);
    return document.createTextNode(beforeText);
  }

  _buildTextNodeWithin(text, beginOffset, endOffset) {
    const withinText = text.substring(beginOffset, endOffset);
    return document.createTextNode(withinText);
  }

  _buildTextNodeAfter(text, endOffset) {
    const afterText = text.substring(endOffset);
    return document.createTextNode(afterText);
  }

  _buildDocFrag(type, url, before, within, after) {
    const format = document.createElement(type);
    format.setAttribute('class', CLASS_NAME_PREFIX + "__" + type);
    if (url) {
      format.setAttribute('href', encodeURI(url.replace(/javascript:/, '')));
    }
    format.appendChild(within);

    const docFrag = document.createDocumentFragment();
    docFrag.appendChild(before);
    docFrag.appendChild(format);
    docFrag.appendChild(after);

    return docFrag;
  }
}

module.exports = BlockFormatter;
