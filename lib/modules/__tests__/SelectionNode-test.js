var expect = require('expect');
var assert = require('assert');

var SelectionNode = require('../SelectionNode');

describe('SelectionNode', () => {
  // this is some text
  // <p>this is <strong><em>some</em></strong> text</p>
  // <p>and more</p>
  function createNode() {
    this.div = document.createElement('div');
    this.div.setAttribute('class', 'ic-Editor-Content');

    this.p1 = document.createElement('p');
    this.p1.setAttribute('class', 'ic-Editor-Block ic-Editor-Block--0101');
    this.p1.setAttribute('name',  '0101');
    this.p1.setAttribute('data-align', 'center');

    this.p2 = document.createElement('p');
    this.p2.setAttribute('class', 'ic-Editor-Block ic-Editor-Block--0102');
    this.p2.setAttribute('name',  '0102');

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

  describe('.new', () => {

    it('sets the node', () => {
      createNode.apply(this);
      var sn = new SelectionNode(this.em, 0);

      expect(sn.node).toBe(this.em);
    });

    it('sets the offset', () => {
      createNode.apply(this);
      var sn = new SelectionNode(this.em, 1);

      expect(sn.offset).toBe(1);
    });

    it('sets the domNode', () => {
      createNode.apply(this);
      var sn = new SelectionNode(this.thisIs, 1);

      expect(sn.domNode).toBe(this.p1);
    });

    it('sets the block node', () => {
      createNode.apply(this);
      var sn = new SelectionNode(this.some, 1);

      expect(sn.blockNode).toBe(this.p1);
    });

    it('sets the guid', () => {
      createNode.apply(this);
      var sn = new SelectionNode(this.text, 1);

      expect(sn.guid).toBe('0101');
    });

    it('sets the block offset', () => {
      createNode.apply(this);
      var sn = new SelectionNode(this.some, 1);

      expect(sn.blockOffset).toBe(9);
    });
  });


  describe('#textNodeOffset', () => {

    it('finds text node offset for block node', () => {
      createNode.apply(this);
      var sn = new SelectionNode(this.some, 1);
      var nodeOffset = sn.textNodeOffset();

      expect(nodeOffset.node.text).toBe(this.some.text);
      expect(nodeOffset.offset).toBe(1);
    });
  });


  // describe('#types', () => {

  //   it('finds all upstream node tag types', () => {
  //     createNode.apply(this);
  //     var sn = new SelectionNode(this.some, 1);

  //     var types = sn.types();
  //     expect(types[0]).toBe('em');
  //     expect(types[1]).toBe('strong');
  //     expect(types[2]).toBe('p');
  //   });
  // });


  // describe('#isCenter', () => {

  //   it('finds if the node is centered', () => {
  //     createNode.apply(this);

  //     // no align=center
  //     var sn = new SelectionNode(this.p2, 0);
  //     assert(!sn.isCenter(sn));

  //     // has align=center
  //     var sn = new SelectionNode(this.p1, 0);
  //     assert(sn.isCenter(sn));
  //   })

  //   it('finds if the node is centered until another node', () => {
  //     createNode.apply(this);

  //     // only one is centered
  //     var sn1 = new SelectionNode(this.p1, 0);
  //     var sn2 = new SelectionNode(this.p2, 0);
  //     assert(!sn1.isCenter(sn2));

  //     // both are centered
  //     this.p2.setAttribute('data-align', 'center');
  //     assert(sn1.isCenter(sn2));
  //   });
  // });


  describe('#focusOn', () => {

    it('focuses on the given guid and offset', () => {
      createNode.apply(this);

      // add another block to focus on
      var p = document.createElement('p');
      p.setAttribute('class', 'ic-Editor-Block ic-Editor-Block--0102');
      p.setAttribute('name',  '0102');
      var text = document.createTextNode('text');
      p.appendChild(text);

      this.div.appendChild(p);

      var sn = new SelectionNode(this.p1, 0);
      expect(sn.guid).toBe('0101');

      sn.focusOn('0102', 0);
      expect(sn.guid).toBe('0102');
    });
  });


  describe('#begOfBlock', () => {

    // beg/end of block
    it('finds if cursor is at the beginning of a block', () => {
      createNode.apply(this);
      var sn = new SelectionNode(this.thisIs, 0);

      assert(sn.begOfBlock());
    });
    it('finds if cursor is not at the beginning of a block', () => {
      createNode.apply(this);
      var sn = new SelectionNode(this.thisIs, 1);

      assert(!sn.begOfBlock());
    });
  });

  describe('#endOfBlock', () => {

    it('finds if cursor is at the end of a block', () => {
      createNode.apply(this);
      var sn = new SelectionNode(this.text, 5);

      assert(sn.endOfBlock());
    });
    it('finds if cursor is not at the end of a block', () => {
      createNode.apply(this);
      var sn = new SelectionNode(this.text, 0);

      assert(!sn.endOfBlock());
    });
  });
});
