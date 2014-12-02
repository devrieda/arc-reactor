var expect = require('expect');
var assert = require('assert');

var SelectionNode = require('../../lib/modules/SelectionNode');

describe('SelectionNode', () => {
  // this is some text
  // <p>this is <strong><em>some</em></strong> text</p>
  function createNode() {
    this.div = document.createElement('div');
    this.div.setAttribute('contenteditable', true);

    this.p = document.createElement('p');
    this.p.setAttribute('class', 'ic-Editor-Block ic-Editor-Block--0101');
    this.p.setAttribute('name',  '0101');

    this.thisIs = document.createTextNode('this is ');
    this.strong = document.createElement('strong');
    this.em     = document.createElement('em');
    this.some   = document.createTextNode('some');
    this.text   = document.createTextNode(' text');

    this.em.appendChild(this.some)
    this.strong.appendChild(this.em);

    this.p.appendChild(this.thisIs);
    this.p.appendChild(this.strong);
    this.p.appendChild(this.text);
    this.div.appendChild(this.p);

    document.body.innerHTML = '';
    document.body.appendChild(this.div);

    return this.div;
  }

  // construction
  it('sets the node', () => {
    createNode.apply(this);
    var sn = new SelectionNode(this.em, 0);

    expect(sn.node).toBe(this.em);
  })

  it('sets the offset', () => {
    createNode.apply(this);
    var sn = new SelectionNode(this.em, 1);

    expect(sn.offset).toBe(1);
  })

  it('sets the domNode', () => {
    createNode.apply(this);
    var sn = new SelectionNode(this.thisIs, 1);

    expect(sn.domNode).toBe(this.p);
  })

  it('sets the block node', () => {
    createNode.apply(this);
    var sn = new SelectionNode(this.some, 1);

    expect(sn.blockNode).toBe(this.p);
  })

  it('sets the guid', () => {
    createNode.apply(this);
    var sn = new SelectionNode(this.text, 1);

    expect(sn.guid).toBe('0101');
  })

  it('sets the block offset', () => {
    createNode.apply(this);
    var sn = new SelectionNode(this.some, 1);

    expect(sn.blockOffset).toBe(9);
  })


  // find text node offset
  it('finds text node offset for block node', () => {
    createNode.apply(this);
    var sn = new SelectionNode(this.some, 1);
    var nodeOffset = sn.textNodeOffset();

    expect(nodeOffset.node.text).toBe(this.some.text);
    expect(nodeOffset.offset).toBe(1);
  })


  // types
  it('finds all upstream node tag types', () => {
    createNode.apply(this);
    var sn = new SelectionNode(this.some, 1);

    var types = sn.types();
    expect(types[0]).toBe('em');
    expect(types[1]).toBe('strong');
    expect(types[2]).toBe('p');
  })

  // isCenter
  it('finds if the node is centered', () => {
    createNode.apply(this);

    // defaults to not centered
    var sn = new SelectionNode(this.p, 0);
    assert(!sn.isCenter());

    // add center
    this.p.setAttribute('data-align', 'center');
    assert(sn.isCenter());
  })

  // focusOn
  it('focuses on the given guid and offset', () => {
    createNode.apply(this);

    // add another block to focus on
    var p = document.createElement('p');
    p.setAttribute('class', 'ic-Editor-Block ic-Editor-Block--0102');
    p.setAttribute('name',  '0102');
    var text = document.createTextNode('text');
    p.appendChild(text);

    this.div.appendChild(p);

    var sn = new SelectionNode(this.p, 0);
    expect(sn.guid).toBe('0101');

    sn.focusOn('0102', 0);
    expect(sn.guid).toBe('0102');
  })

  // beg/end of block
  it('finds if cursor is at the beginning of a block', () => {
    createNode.apply(this);
    var sn = new SelectionNode(this.thisIs, 0);

    assert(sn.begOfBlock());
  })
  it('finds if cursor is not at the beginning of a block', () => {
    createNode.apply(this);
    var sn = new SelectionNode(this.thisIs, 1);

    assert(!sn.begOfBlock());
  })

  it('finds if cursor is at the end of a block', () => {
    createNode.apply(this);
    var sn = new SelectionNode(this.text, 5);

    assert(sn.endOfBlock());
  })
  it('finds if cursor is not at the end of a block', () => {
    createNode.apply(this);
    var sn = new SelectionNode(this.text, 0);

    assert(!sn.endOfBlock());
  })
})
