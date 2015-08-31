var expect = require('expect');
var assert = require('assert');

var Selection = require('../Selection');

describe('Selection', () => {
  var div, p1, p2, thisIs, strong, em, some, text, andMore;

  // this is some text
  // <p>this is <strong><em>some</em></strong> text</p>
  // <p>and more</p>
  function createNode() {
    div = document.createElement('div');
    div.setAttribute('class', 'arc-Editor-Content');
    div.setAttribute('data-top', 'true');

    p1 = document.createElement('p');
    p1.setAttribute('class', 'arc-Editor-Block arc-Editor-Block--0101');
    p1.setAttribute('name',  '0101');
    p1.setAttribute('data-align', 'center');
    p1.setAttribute('data-block', 'true');

    p2 = document.createElement('p');
    p2.setAttribute('class', 'arc-Editor-Block arc-Editor-Block--0102');
    p2.setAttribute('name',  '0102');
    p2.setAttribute('data-block',  'true');

    thisIs = document.createTextNode('this is ');
    strong = document.createElement('strong');
    em     = document.createElement('em');
    some   = document.createTextNode('some');
    text   = document.createTextNode(' text');
    andMore = document.createTextNode('and more');

    em.appendChild(some);
    strong.appendChild(em);

    p1.appendChild(thisIs);
    p1.appendChild(strong);
    p1.appendChild(text);
    p2.appendChild(andMore);

    div.appendChild(p1);
    div.appendChild(p2);

    document.body.innerHTML = '';
    document.body.appendChild(div);

    return div;
  }
  function createSelection(startNode, endNode, startOffset, endOffset) {
    var range = document.createRange();
    range.setStart(startNode, startOffset);
    range.setEnd(endNode, endOffset);

    var selection = document.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    return selection;
  }

  describe('.new', () => {

    it('sets text from doc selection', () => {
      createNode();
      var sel = createSelection(some, some, 0, 4);

      var selection = new Selection(sel);
      expect(selection.text).toBe('some');
    });
  });

  describe('#reselect', () => {

    it('doesnt reselect if there is no anchor or focus', () => {
      createNode();
      var sel = createSelection(some, some, 0, 4);
      var selection = new Selection(sel);

      selection.anchor = false;
      assert(!selection.reselect());
    });

    it('doesnt reselect if there is a selection range', () => {
      createNode();
      var sel = createSelection(some, some, 0, 4);
      var selection = new Selection(sel);

      assert(!selection.reselect());
    });

    it('doesnt reselect if no start or end is found', () => {
      createNode();
      var sel = createSelection(some, some, 0, 0);
      var selection = new Selection(sel);
      selection.anchor.guid = 'foo';

      assert(!selection.reselect());
    });

    it('doesnt reselect range for collapsed text nodes', () => {
      createNode();
      var sel = createSelection(thisIs, thisIs, 0, 0);
      var selection = new Selection(sel);
      selection.selType = 'Range';

      selection.anchor.focusOn('0101', 9);
      selection.focus.focusOn('0101', 9);
      assert(!selection.reselect());
    });

    it('doesnt reselect range if range hasnt changed', () => {
      createNode();
      var sel = createSelection(thisIs, thisIs, 0, 4);
      var selection = new Selection(sel);
      selection.selType = 'Caret';

      selection.anchor.focusOn('0101', 0);
      selection.focus.focusOn('0101', 4);
      assert(!selection.reselect());
    });

    it('reselects range for range text nodes', () => {
      createNode();
      var sel = createSelection(thisIs, thisIs, 0, 0);
      var selection = new Selection(sel);
      selection.selType = 'Range';

      selection.anchor.focusOn('0101', 4);
      selection.focus.focusOn('0101', 9);
      assert(selection.reselect());
    });

    it('reinitializes bounds after selection', () => {
      createNode();
      var sel = createSelection(thisIs, thisIs, 0, 0);
      var selection = new Selection(sel);
      selection.selType = 'Range';

      var boundsBefore = selection.bounds;

      selection.anchor.focusOn('0101', 9);
      selection.focus.focusOn('0101', 12);
      selection.reselect();

      var boundsAfter = selection.bounds;

      expect(boundsBefore.height).toNotBe(boundsAfter.height);
      expect(boundsBefore.width).toNotBe(boundsAfter.width);
      expect(boundsBefore.left).toNotBe(boundsAfter.left);
      expect(boundsBefore.right).toNotBe(boundsAfter.right);
    });
  });


  describe('#focusOn', () => {

    it('focuses on given guid and offset', () => {
      createNode();
      var sel = createSelection(thisIs, thisIs, 0, 0);
      var selection = new Selection(sel);

      var anchorCallback = sinon.spy();
      var focusCallback  = sinon.spy();
      selection.anchor.focusOn = anchorCallback;
      selection.focus.focusOn  = focusCallback;

      selection.focusOn('0101', 0);

      assert(anchorCallback.called);
      assert(focusCallback.called);
    });
  });


  describe('#guids', () => {

    it('finds anchor and focus guids', () => {
      var sel = createSelection(thisIs, andMore, 0, 0);
      var selection = new Selection(sel);

      var guids = selection.guids();
      expect(guids.anchor).toBe('0101');
      expect(guids.focus).toBe('0102');
    });
  });


  describe('#offsets', () => {

    it('finds anchor and focus block offsets', () => {
      var sel = createSelection(thisIs, andMore, 1, 2);
      var selection = new Selection(sel);

      var offsets = selection.offsets();
      expect(offsets.anchor).toBe(1);
      expect(offsets.focus).toBe(2);
    });
  });

  describe('#position', () => {
    it('gives the anchor guid and offset', () => {
      createNode();
      var sel = createSelection(thisIs, andMore, 0, 0);
      var selection = new Selection(sel);

      var position = selection.position();
      expect(position.guid).toBe('0101');
      expect(position.offset).toBe(0);
    });
  });


  describe('#isRange', () => {

    it('finds if the doc selection was a range', () => {
      createNode();
      var sel = createSelection(thisIs, thisIs, 0, 0);
      var selection = new Selection(sel);

      assert(!selection.isRange());

      sel = createSelection(thisIs, thisIs, 0, 8);
      selection = new Selection(sel);

      assert(selection.isRange());
    });
  });


  describe('#crossBlock', () => {

    it('finds if the selection crosses multiple blocks', () => {
      createNode();
      var sel = createSelection(thisIs, thisIs, 0, 0);
      var selection = new Selection(sel);

      assert(!selection.crossBlock());

      sel = createSelection(thisIs, andMore, 0, 0);
      selection = new Selection(sel);

      assert(selection.crossBlock());
    });
  });

  describe('#begOfBlock', () => {

    it('finds if the cursor is at the beginning of a block', () => {
      createNode();
      var sel = createSelection(thisIs, thisIs, 0, 0);
      var selection = new Selection(sel);

      var anchorCallback = sinon.spy();
      selection.anchor.begOfBlock = anchorCallback;

      selection.begOfBlock();

      assert(anchorCallback.called);
    });
  });

  describe('#endOfBlock', () => {

    it('finds if the cursor is at the end of a block', () => {
      createNode();
      var sel = createSelection(thisIs, thisIs, 0, 0);
      var selection = new Selection(sel);

      var focusCallback = sinon.spy();
      selection.focus.endOfBlock = focusCallback;

      selection.endOfBlock();

      assert(focusCallback.called);
    });
  });
});
