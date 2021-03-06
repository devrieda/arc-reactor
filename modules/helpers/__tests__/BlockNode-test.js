import BlockNode from '../BlockNode';

describe('BlockNode', () => {
  let p, thisIs, strong, em, some, text;

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
      const node = createNode();
      const blockNode = new BlockNode(node);

      const textNodes = blockNode.textNodes();

      expect(textNodes[0]).to.equal(thisIs);
      expect(textNodes[1]).to.equal(some);
      expect(textNodes[2]).to.equal(text);
    });
  });


  describe('#nodeOffset', () => {

    it('finds node offset from block offset', () => {
      const node = createNode();
      const blockNode = new BlockNode(node);

      const nodeOffset = blockNode.nodeOffset(9);

      expect(nodeOffset.node).to.equal(some);
      expect(nodeOffset.offset).to.equal(1);
    });

    it('finds node offset from block offset for focus', () => {
      const node = createNode();
      const blockNode = new BlockNode(node);

      const nodeOffset = blockNode.nodeOffset(12, true);

      expect(nodeOffset.node).to.equal(some);
      expect(nodeOffset.offset).to.equal(4);
    });

    it('finds first child of block if no text node was found', () => {
      const node = document.createElement('p');
      const br   = document.createElement('br');
      node.appendChild(br);

      const blockNode = new BlockNode(node);
      const nodeOffset = blockNode.nodeOffset(0);

      expect(nodeOffset.node).to.equal(br);
      expect(nodeOffset.offset).to.equal(0);
    });

    it('returns empty object if there is no nodes in this block', () => {
      const node = document.createElement('p');

      const blockNode = new BlockNode(node);
      const nodeOffset = blockNode.nodeOffset(0);

      expect(nodeOffset.node).to.equal(undefined);
      expect(nodeOffset.offset).to.equal(undefined);
    });
  });

  describe('#blockOffset', () => {

    it('finds block offset based on the node and offset', () => {
      const node = createNode();
      const blockNode = new BlockNode(node);

      const blockOffset = blockNode.blockOffset(some, 2);
      expect(blockOffset).to.equal(10);
    });

    it('finds block offset for focus on block element', () => {
      const node = createNode();
      const blockNode = new BlockNode(node);

      const blockOffset = blockNode.blockOffset(p, 0);
      expect(blockOffset).to.equal(0);
    });
  });

});
