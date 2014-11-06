var SelectionNode = require('./SelectionNode');

// Selection is an abstraction of the Dom selection object. It composes the 
// Dom selection and caches additional info to make it simpler to interact
// with the data in respect to the block and inline markup.
class Selection {
  constructor(selection) {
    this.selection = selection;

    this.anchor = new SelectionNode(
      this.selection.anchorNode, this.selection.anchorOffset
    );
    this.focus = new SelectionNode(
      this.selection.focusNode, this.selection.focusOffset
    );

    this.text  = this.selection.toString().trim();
    this.types = this.anchor.types();
    this.centered = this.anchor.isCenter();
    this._initBounds();
  }

  // reselect text if we've swapped out the dom underneath
  reselect() {
    if (!this.anchor || !this.focus) { return false; }
    if (this.selection.type == 'Range') { return this._initBounds(); }

    // set the range based on selection node state
    var start = this.anchor.textNodeOffset();
    var end   = this.focus.textNodeOffset();
    if (!start.node || !end.node) { return; }

    // set range, swap if user selected back to front
    this._setRange(start.node, end.node, start.offset, end.offset);
    if (this.selection.getRangeAt(0).collapsed) {
      this._setRange(end.node, start.node, end.offset, start.offset);
    }
    return this._initBounds();
  }

  // set selection focus on a specific block by guid
  focusOn(guid, offset) {
    this.anchor.focusOn(guid, offset || 0)
    this.focus.focusOn(guid, offset || 0)
  }

  // find general positions of selection
  isRange() {
    return this.selection.type == "Range";
  }
  crossBlock() {
    return this.anchor.guid != this.focus.guid;
  }
  endOfBlock() {
    var blockNode = this.anchor.domNode;
    var textNode  = this.anchor.node;
    var offset    = this.anchor.offset;

    return textNode == blockNode ||
          (textNode == blockNode.lastChild && textNode.length == offset);
  }
  begOfBlock() {
    var blockNode = this.anchor.domNode;
    var textNode  = this.anchor.node;
    var offset    = this.anchor.offset;

    return textNode == blockNode ||
           (textNode == blockNode.firstChild && offset == 0);
  }

  // selection bounds
  _initBounds() {
    var old = this.bounds;
    this.bounds = this._bounds();
    return JSON.stringify(old) != JSON.stringify(this.bounds);
  }
  _bounds() {
    if (this.selection.type == "None") { return {}; }
    var range = this.selection.getRangeAt(0);
    return range.getBoundingClientRect();
  }

  // reconstituting selection of node from guids & offsets
  _setRange(startNode, endNode, startOffset, endOffset) {
    var range = document.createRange();
    range.setStart(startNode, startOffset);
    range.setEnd(endNode, endOffset);
    this.selection.removeAllRanges();
    this.selection.addRange(range);
  }
}

module.exports = Selection;
