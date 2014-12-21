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

    this._flipReverseNodesSelection();

    this.text = this.selection.toString().trim();

    this._initTypes();
    this._initCentered();
    this._initBounds();
  }

  // selection was made in reverse, flip it
  _flipReverseNodesSelection() {
    if (!this.anchor.node || !this.focus.node) { return; }

    var relative = this.anchor.node.compareDocumentPosition(this.focus.node);
    var preceeding = relative == Node.DOCUMENT_POSITION_PRECEDING;
    var backwards = relative == 0 && this.anchor.blockOffset > this.focus.blockOffset;

    if (preceeding || backwards) {
      var anchor = this.anchor;
      var focus  = this.focus;
      this.anchor = focus;
      this.focus  = anchor;
    }
  }

  // reselect text if we've swapped out the dom underneath
  reselect() {
    if (!this.anchor || !this.focus) { return false; }

    // set the range based on selection node state
    var start = this.anchor.textNodeOffset();
    var end   = this.focus.textNodeOffset();
    if (!start.node || !end.node) { return false; }

    this._setRange(start.node, end.node, start.offset, end.offset);
    return this._initBounds();
  }

  // set selection focus on a specific block by guid
  focusOn(guid, offset) {
    this.anchor.focusOn(guid, offset || 0);
    this.focus.focusOn(guid, offset || 0);
  }

  guids() {
    return { anchor: this.anchor.guid, focus: this.focus.guid };
  }
  offsets() {
    return { anchor: this.anchor.blockOffset, focus: this.focus.blockOffset };
  }

  // find general positions of selection
  isRange() {
    return this.selection.type == "Range";
  }
  crossBlock() {
    return this.anchor.guid != this.focus.guid;
  }
  begOfBlock() {
    return this.anchor.begOfBlock();
  }
  endOfBlock() {
    return this.focus.endOfBlock();
  }

  // types
  retype() {
    return this._initTypes();
  }
  _initTypes(log) {
    var old = this.types;
    this.types = this.anchor.types();
    return JSON.stringify(old) !== JSON.stringify(this.types);
  }

  // centering
  recenter() {
    return this._initCentered()
  }
  _initCentered(log) {
    var old = this.centered || false;
    this.centered = this.anchor.isCenter();
    return old !== this.centered;
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
