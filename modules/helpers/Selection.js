const SelectionNode = require('./SelectionNode');

// Selection is an abstraction of the Dom selection object. It composes the 
// Dom selection and caches additional info to make it simpler to interact
// with the data in respect to the block and inline markup.
class Selection {
  constructor(selection, target) {
    this.selection = selection;
    this.target    = target;

    this._initFromSelection();
  }

  _initFromSelection() {
    const { anchorNode, anchorOffset, focusNode, focusOffset } = this.selection;

    this.anchor = new SelectionNode(anchorNode, anchorOffset, this.target);
    this.focus = new SelectionNode(focusNode, focusOffset, this.target);

    this._flipReverseNodesSelection();

    this.text = this.selection.toString();
    this.selType = this.selection.isCollapsed ? 'Caret' : 'Range';

    this._initBounds();
  }

  // selection was made in reverse, flip it
  _flipReverseNodesSelection() {
    if (!this.anchor.node || !this.focus.node) { return; }

    const relative = this.anchor.node.compareDocumentPosition(this.focus.node);
    const preceeding = relative === Node.DOCUMENT_POSITION_PRECEDING;
    const backwards = relative === 0 && this.anchor.blockOffset > this.focus.blockOffset;

    if (preceeding || backwards) {
      const anchor = this.anchor;
      const focus  = this.focus;
      this.anchor = focus;
      this.focus  = anchor;
    }
  }

  reset() {
    this._initFromSelection();
    return this;
  }

  // reselect text if we've swapped out the dom underneath
  reselect() {
    if (!this.anchor || !this.focus) { return false; }

    // don't reselect ranges that are selected via the keyboard
    const tempAnchor = this.selection.anchorNode;
    const isText = tempAnchor && tempAnchor.nodeType === Node.TEXT_NODE;
    if (!this.selection.isCollapsed && isText) { return false; }

    // set the range based on selection node state
    const start = this.anchor.textNodeOffset();
    const end   = this.focus.textNodeOffset();
    if (!start.node || !end.node) { return false; }

    // ignore reselects if nothing has changed
    if (!this._rangeHasChanged(start, end)) { return false; }

    this._setRange(start.node, end.node, start.offset, end.offset);
    return this._initBounds();
  }
  rebound() {
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
  position() {
    return { guid: this.anchor.guid, offset: this.anchor.blockOffset };
  }

  // find general positions of selection
  isRange() {
    return this.selType === 'Range';
  }
  crossBlock() {
    return this.anchor.guid !== this.focus.guid;
  }
  begOfBlock() {
    return this.anchor.begOfBlock();
  }
  endOfBlock() {
    return this.focus.endOfBlock();
  }

  showMenuButtons() {
    return this.text && !this.anchor.isFigure() && !this.anchor.isCaption();
  }
  isFigure() {
    return this.anchor.isFigure();
  }
  isCaption() {
    return this.anchor.isCaption();
  }

  // selection bounds
  _initBounds() {
    const old = this.bounds;
    this.bounds = this._bounds();
    if (!old) return true;

    return old.height !== this.bounds.height ||
           old.width  !== this.bounds.width ||
           old.top    !== this.bounds.top ||
           old.right  !== this.bounds.right ||
           old.left   !== this.bounds.left ||
           old.bottom !== this.bounds.bottom;
  }

  _bounds() {
    if (!this.selection.anchorNode) { return {}; }
    const range = this.selection.getRangeAt(0);
    let rect  = range.getBoundingClientRect();

    // ie doubles these for some reason... i'm sure there is a better way
    // than sniffing to do this, but let's get ie just working first m'kay
    if (this._isIE()) {
      rect = {
        height: rect.height / 2.0,
        width: rect.width / 2.0,
        top: rect.top / 2.0,
        right: rect.right / 2.0,
        left: rect.left / 2.0,
        bottom: rect.bottom / 2.0
      };
    }
    return rect;
  }

  _isIE(v) {
    return RegExp('msie' + (!isNaN(v)?('\\s'+v):''), 'i').test(navigator.userAgent);
  }

  _rangeHasChanged(start, end) {
    const { anchorNode, focusNode, anchorOffset, focusOffset } = this.selection;
    return anchorNode !== start.node ||
           focusNode !== end.node ||
           anchorOffset !== start.offset ||
           focusOffset !== end.offset;
  }

  // reconstituting selection of node from guids & offsets
  _setRange(startNode, endNode, startOffset, endOffset) {
    const range = document.createRange();
    range.setStart(startNode, startOffset);
    range.setEnd(endNode, endOffset);
    this.selection.removeAllRanges();
    this.selection.addRange(range);
  }
}

module.exports = Selection;
