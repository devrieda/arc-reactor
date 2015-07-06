var BlockNode = require('./BlockNode');
var RangeSet = require('./RangeSet');
var { Map, List, fromJS } = require('immutable');

var CLASS_NAME_PREFIX = "ic-Editor-Block";
var INLINE_TAGS = ['a', 'strong', 'em'];

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

    var denormalized = this.denormalizeRanges(markups);

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
    var results = Map();
    var fullSet = new RangeSet();

    INLINE_TAGS.forEach( (type) => {
      var rangesList = markups.get(type);
      if (!rangesList) return;

      // start building list of results per inline type (em/strong)
      var typeResults = results.get(type, List());

      // check if each markup is in the set
      rangesList.forEach( (rangeMap) => {
        var range = rangeMap.toJS();
        var itemSet = new RangeSet([range]);

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

      results = results.set(type, typeResults);
    });

    return results;
  }

  /**
   * Apply markup to the base node
   *
   */
  _applyMarkup(markups, type) {
    markups = markups || List();
    var blockNode = new BlockNode(this.node);

    markups.forEach( ( markup) => {
      var begin = blockNode.nodeOffset(markup.getIn(['range', 0]));
      var end   = blockNode.nodeOffset(markup.getIn(['range', 1]), true);
      var url   = markup.get('value');

      if (begin.node !== end.node) {
        console.log("WTF, this should never happen");
      }

      // split up text using selection
      var newNodes = this._formatNode(url, type, begin, end);

      // replace previous node with our new node
      var parent = begin.node.parentNode;
      parent.replaceChild(newNodes, begin.node);
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
