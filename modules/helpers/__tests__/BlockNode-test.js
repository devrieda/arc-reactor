var expect = require('expect');

var BlockNode = require('../BlockNode');

describe('BlockNode', () => {
  var p, thisIs, strong, em, some, text;

  // this is some text
  // <p>this is <strong><em>some</em></strong> text</p>
  function createNode() {
    p      = document.createElement('p');
    thisIs = document.createTextNode('this is ');
    strong = document.createElement('strong');
    em     = document.createElement('em');
    some   = document.createTextNode('some');
    text   = document.createTextNode(' text');

    em.appendChild(some);
    strong.appendChild(em);

    p.appendChild(thisIs);
    p.appendChild(strong);
    p.appendChild(text);

    return p;
  }

  describe('#textNodes', () => {

    it('finds text nodes in the block node', () => {
      var node = createNode();
      var blockNode = new BlockNode(node);

      var textNodes = blockNode.textNodes();

      expect(textNodes[0]).toBe(thisIs);
      expect(textNodes[1]).toBe(some);
      expect(textNodes[2]).toBe(text);
    });
  });


  describe('#nodeOffset', () => {

    it('finds node offset from block offset', () => {
      var node = createNode();
      var blockNode = new BlockNode(node);

      var nodeOffset = blockNode.nodeOffset(9);

      expect(nodeOffset.node).toBe(some);
      expect(nodeOffset.offset).toBe(1);
    });

    it('finds node offset from block offset for focus', () => {
      var node = createNode();
      var blockNode = new BlockNode(node);

      var nodeOffset = blockNode.nodeOffset(12, true);

      expect(nodeOffset.node).toBe(some);
      expect(nodeOffset.offset).toBe(4);
    });

    it('finds first child of block if no text node was found', () => {
      var node = document.createElement('p');
      var br   = document.createElement('br');
      node.appendChild(br);

      var blockNode = new BlockNode(node);
      var nodeOffset = blockNode.nodeOffset(0);

      expect(nodeOffset.node).toBe(br);
      expect(nodeOffset.offset).toBe(0);
    });

    it('returns empty object if there is no nodes in this block', () => {
      var node = document.createElement('p');

      var blockNode = new BlockNode(node);
      var nodeOffset = blockNode.nodeOffset(0);

      expect(nodeOffset.node).toBe(undefined);
      expect(nodeOffset.offset).toBe(undefined);
    });
  });

  describe('#blockOffset', () => {

    it('finds block offset based on the node and offset', () => {
      var node = createNode();
      var blockNode = new BlockNode(node);

      var blockOffset = blockNode.blockOffset(some, 2);
      expect(blockOffset).toBe(10);
    });

    it('finds block offset for focus on block element', () => {
      var node = createNode();
      var blockNode = new BlockNode(node);

      var blockOffset = blockNode.blockOffset(p, 0);
      expect(blockOffset).toBe(0);
    });
  });

});
