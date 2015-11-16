import SelectionNode from '../SelectionNode';

describe('SelectionNode', () => {
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

  describe('.new', () => {

    it('sets the node', () => {
      createNode();
      const sn = new SelectionNode(em, 0);

      expect(sn.node).to.equal(em);
    });

    it('sets the offset', () => {
      createNode();
      const sn = new SelectionNode(em, 1);

      expect(sn.offset).to.equal(1);
    });

    it('sets the domNode', () => {
      createNode();
      const sn = new SelectionNode(thisIs, 1);

      expect(sn.domNode).to.equal(p1);
    });

    it('sets the block node', () => {
      createNode();
      const sn = new SelectionNode(some, 1);

      expect(sn.blockNode).to.equal(p1);
    });

    it('sets the guid', () => {
      createNode();
      const sn = new SelectionNode(text, 1);

      expect(sn.guid).to.equal('0101');
    });

    it('sets the block offset', () => {
      createNode();
      const sn = new SelectionNode(some, 1);

      expect(sn.blockOffset).to.equal(9);
    });
  });


  describe('#textNodeOffset', () => {

    it('finds text node offset for block node', () => {
      createNode();
      const sn = new SelectionNode(some, 1);
      const nodeOffset = sn.textNodeOffset();

      expect(nodeOffset.node.text).to.equal(some.text);
      expect(nodeOffset.offset).to.equal(1);
    });
  });


  // describe('#types', () => {

  //   it('finds all upstream node tag types', () => {
  //     createNode();
  //     const sn = new SelectionNode(some, 1);

  //     const types = sn.types();
  //     expect(types[0]).to.equal('em');
  //     expect(types[1]).to.equal('strong');
  //     expect(types[2]).to.equal('p');
  //   });
  // });


  // describe('#isCenter', () => {

  //   it('finds if the node is centered', () => {
  //     createNode();

  //     // no align=center
  //     const sn = new SelectionNode(p2, 0);
  //     expect(sn.isCenter(sn)).to.be.false;

  //     // has align=center
  //     const sn = new SelectionNode(p1, 0);
  //     expect(sn.isCenter(sn)).to.be.true;
  //   })

  //   it('finds if the node is centered until another node', () => {
  //     createNode();

  //     // only one is centered
  //     const sn1 = new SelectionNode(p1, 0);
  //     const sn2 = new SelectionNode(p2, 0);
  //     expect(sn1.isCenter(sn2)).to.be.false;

  //     // both are centered
  //     p2.setAttribute('data-align', 'center');
  //     expect(sn1.isCenter(sn2)).to.be.true;
  //   });
  // });


  describe('#focusOn', () => {

    it('focuses on the given guid and offset', () => {
      createNode();

      // add another block to focus on
      const p = document.createElement('p');
      p.setAttribute('class', 'arc-Editor-Block arc-Editor-Block--0102');
      p.setAttribute('name',  '0102');
      const text = document.createTextNode('text');
      p.appendChild(text);

      div.appendChild(p);

      const sn = new SelectionNode(p1, 0);
      expect(sn.guid).to.equal('0101');

      sn.focusOn('0102', 0);
      expect(sn.guid).to.equal('0102');
    });
  });


  describe('#begOfBlock', () => {

    // beg/end of block
    it('finds if cursor is at the beginning of a block', () => {
      createNode();
      const sn = new SelectionNode(thisIs, 0);

      expect(sn.begOfBlock()).to.be.true;
    });
    it('finds if cursor is not at the beginning of a block', () => {
      createNode();
      const sn = new SelectionNode(thisIs, 1);

      expect(sn.begOfBlock()).to.be.false;
    });
  });

  describe('#endOfBlock', () => {

    it('finds if cursor is at the end of a block', () => {
      createNode();
      const sn = new SelectionNode(text, 5);

      expect(sn.endOfBlock()).to.be.true;
    });
    it('finds if cursor is not at the end of a block', () => {
      createNode();
      const sn = new SelectionNode(text, 0);

      expect(sn.endOfBlock()).to.be.false;
    });
  });
});
