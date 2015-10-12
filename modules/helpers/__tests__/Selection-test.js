const expect = require('expect');
const assert = require('assert');

const Selection = require('../Selection');

describe('Selection', () => {
  let div, p1, p2, thisIs, strong, em, some, text, andMore;

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
    const range = document.createRange();
    range.setStart(startNode, startOffset);
    range.setEnd(endNode, endOffset);

    const selection = document.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    return selection;
  }

  describe('.new', () => {

    it('sets text from doc selection', () => {
      createNode();
      const sel = createSelection(some, some, 0, 4);

      const selection = new Selection(sel);
      expect(selection.text).toBe('some');
    });
  });

  describe('#reselect', () => {

    it('doesnt reselect if there is no anchor or focus', () => {
      createNode();
      const sel = createSelection(some, some, 0, 4);
      const selection = new Selection(sel);

      selection.anchor = false;
      assert(!selection.reselect());
    });

    it('doesnt reselect if there is a selection range', () => {
      createNode();
      const sel = createSelection(some, some, 0, 4);
      const selection = new Selection(sel);

      assert(!selection.reselect());
    });

    it('doesnt reselect if no start or end is found', () => {
      createNode();
      const sel = createSelection(some, some, 0, 0);
      const selection = new Selection(sel);
      selection.anchor.guid = 'foo';

      assert(!selection.reselect());
    });

    it('doesnt reselect range for collapsed text nodes', () => {
      createNode();
      const sel = createSelection(thisIs, thisIs, 0, 0);
      const selection = new Selection(sel);
      selection.selType = 'Range';

      selection.anchor.focusOn('0101', 9);
      selection.focus.focusOn('0101', 9);
      assert(!selection.reselect());
    });

    it('doesnt reselect range if range hasnt changed', () => {
      createNode();
      const sel = createSelection(thisIs, thisIs, 0, 4);
      const selection = new Selection(sel);
      selection.selType = 'Caret';

      selection.anchor.focusOn('0101', 0);
      selection.focus.focusOn('0101', 4);
      assert(!selection.reselect());
    });

    it('reselects range for range text nodes', () => {
      createNode();
      const sel = createSelection(thisIs, thisIs, 0, 0);
      const selection = new Selection(sel);
      selection.selType = 'Range';

      selection.anchor.focusOn('0101', 4);
      selection.focus.focusOn('0101', 9);
      assert(selection.reselect());
    });

    it('reinitializes bounds after selection', () => {
      createNode();
      const sel = createSelection(thisIs, thisIs, 0, 0);
      const selection = new Selection(sel);
      selection.selType = 'Range';

      const boundsBefore = selection.bounds;

      selection.anchor.focusOn('0101', 9);
      selection.focus.focusOn('0101', 12);
      selection.reselect();

      const boundsAfter = selection.bounds;

      expect(boundsBefore.height).toNotBe(boundsAfter.height);
      expect(boundsBefore.width).toNotBe(boundsAfter.width);
      expect(boundsBefore.left).toNotBe(boundsAfter.left);
      expect(boundsBefore.right).toNotBe(boundsAfter.right);
    });
  });


  describe('#focusOn', () => {

    it('focuses on given guid and offset', () => {
      createNode();
      const sel = createSelection(thisIs, thisIs, 0, 0);
      const selection = new Selection(sel);

      const anchorCallback = sinon.spy();
      const focusCallback  = sinon.spy();
      selection.anchor.focusOn = anchorCallback;
      selection.focus.focusOn  = focusCallback;

      selection.focusOn('0101', 0);

      assert(anchorCallback.called);
      assert(focusCallback.called);
    });
  });


  describe('#guids', () => {

    it('finds anchor and focus guids', () => {
      const sel = createSelection(thisIs, andMore, 0, 0);
      const selection = new Selection(sel);

      const guids = selection.guids();
      expect(guids.anchor).toBe('0101');
      expect(guids.focus).toBe('0102');
    });
  });


  describe('#offsets', () => {

    it('finds anchor and focus block offsets', () => {
      const sel = createSelection(thisIs, andMore, 1, 2);
      const selection = new Selection(sel);

      const offsets = selection.offsets();
      expect(offsets.anchor).toBe(1);
      expect(offsets.focus).toBe(2);
    });
  });

  describe('#position', () => {
    it('gives the anchor guid and offset', () => {
      createNode();
      const sel = createSelection(thisIs, andMore, 0, 0);
      const selection = new Selection(sel);

      const position = selection.position();
      expect(position.guid).toBe('0101');
      expect(position.offset).toBe(0);
    });
  });


  describe('#isRange', () => {

    it('finds if the doc selection was a range', () => {
      createNode();

      const sel = createSelection(thisIs, thisIs, 0, 8);
      const selection = new Selection(sel);

      assert(selection.isRange());
    });

    it('finds if the doc selection was not a range', () => {
      createNode();

      const sel = createSelection(thisIs, thisIs, 0, 0);
      const selection = new Selection(sel);

      assert(!selection.isRange());
    });
  });


  describe('#crossBlock', () => {

    it('finds if the selection crosses multiple blocks', () => {
      createNode();
      const sel = createSelection(thisIs, andMore, 0, 0);
      const selection = new Selection(sel);

      assert(selection.crossBlock());
    });

    it('finds if the selection doesnt cross multiple blocks', () => {
      createNode();
      const sel = createSelection(thisIs, thisIs, 0, 0);
      const selection = new Selection(sel);

      assert(!selection.crossBlock());
    });
  });

  describe('#begOfBlock', () => {

    it('finds if the cursor is at the beginning of a block', () => {
      createNode();
      const sel = createSelection(thisIs, thisIs, 0, 0);
      const selection = new Selection(sel);

      const anchorCallback = sinon.spy();
      selection.anchor.begOfBlock = anchorCallback;

      selection.begOfBlock();

      assert(anchorCallback.called);
    });
  });

  describe('#endOfBlock', () => {

    it('finds if the cursor is at the end of a block', () => {
      createNode();
      const sel = createSelection(thisIs, thisIs, 0, 0);
      const selection = new Selection(sel);

      const focusCallback = sinon.spy();
      selection.focus.endOfBlock = focusCallback;

      selection.endOfBlock();

      assert(focusCallback.called);
    });
  });
});
