var expect = require('expect');
var assert = require('assert');

var BlockNode = require('../BlockNode');

describe('BlockNode', () => {
  // this is some text
  // <p>this is <strong><em>some</em></strong> text</p>
  function createNode() {
    this.p      = document.createElement('p');
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

    return this.p;
  }

  describe('#textNodes', () => {

    it('finds text nodes in the block node', () => {
      var node = createNode.apply(this);
      var blockNode = new BlockNode(node);

      var textNodes = blockNode.textNodes();

      expect(textNodes[0]).toBe(this.thisIs);
      expect(textNodes[1]).toBe(this.some);
      expect(textNodes[2]).toBe(this.text);
    })
  })


  describe('#nodeOffset', () => {

    it('finds node offset from block offset', () => {
      var node = createNode.apply(this);
      var blockNode = new BlockNode(node);

      var nodeOffset = blockNode.nodeOffset(9)

      expect(nodeOffset.node).toBe(this.some);
      expect(nodeOffset.offset).toBe(1);
    })

    it('finds node offset from block offset for focus', () => {
      var node = createNode.apply(this);
      var blockNode = new BlockNode(node);

      var nodeOffset = blockNode.nodeOffset(12, true)

      expect(nodeOffset.node).toBe(this.some);
      expect(nodeOffset.offset).toBe(4);
    })

    it('finds first child of block if no text node was found', () => {
      var node = document.createElement('p');
      var br   = document.createElement('br');
      node.appendChild(br);

      var blockNode = new BlockNode(node);
      var nodeOffset = blockNode.nodeOffset(0);

      expect(nodeOffset.node).toBe(br);
      expect(nodeOffset.offset).toBe(0);
    })

    it('returns empty object if there is no nodes in this block', () => {
      var node = document.createElement('p');

      var blockNode = new BlockNode(node);
      var nodeOffset = blockNode.nodeOffset(0);

      expect(nodeOffset.node).toBe(undefined);
      expect(nodeOffset.offset).toBe(undefined);
    })
  })

  describe('#blockOffset', () => {

    it('finds block offset based on the node and offset', () => {
      var node = createNode.apply(this);
      var blockNode = new BlockNode(node);

      var blockOffset = blockNode.blockOffset(this.some, 2);
      expect(blockOffset).toBe(10);
    })

    it('finds block offset for focus on block element', () => {
      var node = createNode.apply(this);
      var blockNode = new BlockNode(node);

      var blockOffset = blockNode.blockOffset(this.p, 0);
      expect(blockOffset).toBe(0);
    })
  })

})
