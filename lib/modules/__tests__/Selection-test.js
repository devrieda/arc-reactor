var expect = require('expect');
var assert = require('assert');

var Selection = require('../Selection');

describe('Selection', () => {
  // this is some text
  // <p>this is <strong><em>some</em></strong> text</p>
  // <p>and more</p>
  function createNode() {
    this.div = document.createElement('div');
    this.div.setAttribute('class', 'ic-Editor-Content');
    this.div.setAttribute('data-top', 'true');

    this.p1 = document.createElement('p');
    this.p1.setAttribute('class', 'ic-Editor-Block ic-Editor-Block--0101');
    this.p1.setAttribute('name',  '0101');
    this.p1.setAttribute('data-align', 'center');
    this.p1.setAttribute('data-block', 'true');

    this.p2 = document.createElement('p');
    this.p2.setAttribute('class', 'ic-Editor-Block ic-Editor-Block--0102');
    this.p2.setAttribute('name',  '0102');
    this.p2.setAttribute('data-block',  'true');

    this.thisIs = document.createTextNode('this is ');
    this.strong = document.createElement('strong');
    this.em     = document.createElement('em');
    this.some   = document.createTextNode('some');
    this.text   = document.createTextNode(' text');
    this.andMore = document.createTextNode('and more');

    this.em.appendChild(this.some);
    this.strong.appendChild(this.em);

    this.p1.appendChild(this.thisIs);
    this.p1.appendChild(this.strong);
    this.p1.appendChild(this.text);
    this.p2.appendChild(this.andMore);

    this.div.appendChild(this.p1);
    this.div.appendChild(this.p2);

    document.body.innerHTML = '';
    document.body.appendChild(this.div);

    return this.div;
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
      createNode.apply(this);
      var sel = createSelection(this.some, this.some, 0, 4);

      var selection = new Selection(sel);
      expect(selection.text).toBe('some');
    });
  });

  describe('#reselect', () => {

    it('doesnt reselect if there is no anchor or focus', () => {
      createNode.apply(this);
      var sel = createSelection(this.some, this.some, 0, 4);
      var selection = new Selection(sel);

      selection.anchor = false;
      assert(!selection.reselect());
    });

    it('doesnt reselect if there is a selection range', () => {
      createNode.apply(this);
      var sel = createSelection(this.some, this.some, 0, 4);
      var selection = new Selection(sel);

      assert(!selection.reselect());
    });

    it('doesnt reselect if no start or end is found', () => {
      createNode.apply(this);
      var sel = createSelection(this.some, this.some, 0, 0);
      var selection = new Selection(sel);
      selection.anchor.guid = 'foo';

      assert(!selection.reselect());
    });

    it('doesnt reselect range for text nodes', () => {
      createNode.apply(this);
      var sel = createSelection(this.thisIs, this.thisIs, 0, 0);
      var selection = new Selection(sel);
      selection.selType = 'Range';

      selection.anchor.focusOn('0101', 9);
      selection.focus.focusOn('0101', 12);
      assert(!selection.reselect());
    });

    it('reinitializes bounds after selection', () => {
      createNode.apply(this);
      var sel = createSelection(this.thisIs, this.thisIs, 0, 0);
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
      createNode.apply(this);
      var sel = createSelection(this.thisIs, this.thisIs, 0, 0);
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
      var sel = createSelection(this.thisIs, this.andMore, 0, 0);
      var selection = new Selection(sel);

      var guids = selection.guids();
      expect(guids.anchor).toBe('0101');
      expect(guids.focus).toBe('0102');
    });
  });


  describe('#offsets', () => {

    it('finds anchor and focus block offsets', () => {
      var sel = createSelection(this.thisIs, this.andMore, 1, 2);
      var selection = new Selection(sel);

      var offsets = selection.offsets();
      expect(offsets.anchor).toBe(1);
      expect(offsets.focus).toBe(2);
    });
  });

  describe('#position', () => {
    it('gives the anchor guid and offset', () => {
      createNode.apply(this);
      var sel = createSelection(this.thisIs, this.andMore, 0, 0);
      var selection = new Selection(sel);

      var position = selection.position();
      expect(position.guid).toBe('0101');
      expect(position.offset).toBe(0);
    });
  });


  describe('#isRange', () => {

    it('finds if the doc selection was a range', () => {
      createNode.apply(this);
      var sel = createSelection(this.thisIs, this.thisIs, 0, 0);
      var selection = new Selection(sel);

      assert(!selection.isRange());

      sel = createSelection(this.thisIs, this.thisIs, 0, 8);
      selection = new Selection(sel);

      assert(selection.isRange());
    });
  });


  describe('#crossBlock', () => {

    it('finds if the selection crosses multiple blocks', () => {
      createNode.apply(this);
      var sel = createSelection(this.thisIs, this.thisIs, 0, 0);
      var selection = new Selection(sel);

      assert(!selection.crossBlock());

      sel = createSelection(this.thisIs, this.andMore, 0, 0);
      selection = new Selection(sel);

      assert(selection.crossBlock());
    });
  });

  describe('#begOfBlock', () => {

    it('finds if the cursor is at the beginning of a block', () => {
      createNode.apply(this);
      var sel = createSelection(this.thisIs, this.thisIs, 0, 0);
      var selection = new Selection(sel);

      var anchorCallback = sinon.spy();
      selection.anchor.begOfBlock = anchorCallback;

      selection.begOfBlock();

      assert(anchorCallback.called);
    });
  });

  describe('#endOfBlock', () => {

    it('finds if the cursor is at the end of a block', () => {
      createNode.apply(this);
      var sel = createSelection(this.thisIs, this.thisIs, 0, 0);
      var selection = new Selection(sel);

      var focusCallback = sinon.spy();
      selection.focus.endOfBlock = focusCallback;

      selection.endOfBlock();

      assert(focusCallback.called);
    });
  });
});
