import { fromJS } from 'immutable';
import ToggleBlockType from '../ToggleBlockType';

describe('ToggleBlockType', () => {
  let content;

  beforeEach(() => {
    content = {
      "sections": [
        {
          "id": "de5f",
          "blocks": []
        }
      ]
    };
  });

  describe('#execute with a single block', () => {
    it('adds a block type', () => {
      const block = {
        "id": "c6a8",
        "type": "p",
        "text": "a"
      };
      content.sections[0].blocks = [block];
      const manager = new ToggleBlockType(fromJS(content));

      const guids   = { anchor: 'c6a8', focus: 'c6a8' };
      const offsets = { anchor: 0, focus: 1 };
      const result = manager.execute(guids, offsets, { type: 'h1' });

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].type).to.equal('h1');
    });

    it('removes a block type', () => {
      const block = {
        "id": "c6a8",
        "type": "h1",
        "text": "a"
      };
      content.sections[0].blocks = [block];
      const manager = new ToggleBlockType(fromJS(content));

      const guids   = { anchor: 'c6a8', focus: 'c6a8' };
      const offsets = { anchor: 0, focus: 1 };
      const result = manager.execute(guids, offsets, { type: 'h1' });

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].type).to.equal('p');
    });

    /**
     * p          p
     * ul         ul
     *   li         li
     *   li         li
     *  <li>  =>  h3
     *   li       ul
     * p            li
     *            p
     */
    it('adds a block type to a list item', () => {
      const blocks = [
        {
          "id": "1000",
          "type": "p",
          "text": "hi"
        },
        {
          "id": "2000",
          "type": "ul",
          "blocks": [
            {
              "id": "0000",
              "type": "li",
              "text": "Alpha"
            },
            {
              "id": "0001",
              "type": "li",
              "text": "Bravo"
            },
            {
              "id": "0002",
              "type": "li",
              "text": "Charlie"
            },
            {
              "id": "0003",
              "type": "li",
              "text": "Delta"
            }
          ]
        },
        {
          "id": "3000",
          "type": "p",
          "text": "ho"
        }
      ];
      content.sections[0].blocks = blocks;
      const manager = new ToggleBlockType(fromJS(content));

      const guids   = { anchor: '0002', focus: '0002' };
      const offsets = { anchor: 0, focus: 1 };
      const result = manager.execute(guids, offsets, { type: 'h3' });
      const resultBlocks = result.content.toJS().sections[0].blocks;

      expect(resultBlocks.length).to.equal(5);
      expect(resultBlocks[0].type).to.equal('p');
      expect(resultBlocks[1].type).to.equal('ul');
      expect(resultBlocks[1].blocks[0].type).to.equal('li');
      expect(resultBlocks[1].blocks[1].type).to.equal('li');
      expect(resultBlocks[2].type).to.equal('h3');
      expect(resultBlocks[3].type).to.equal('ul');
      expect(resultBlocks[3].blocks[0].type).to.equal('li');
      expect(resultBlocks[4].type).to.equal('p');
    });
  });

  describe('#execute with multiple blocks', () => {

    it('adds a block type', () => {
      const block1 = {
        "id": "c6a8",
        "type": "p",
        "text": "a"
      };
      const block2 = {
        "id": "c6a9",
        "type": "p",
        "text": "b"
      };
      content.sections[0].blocks = [block1, block2];
      const manager = new ToggleBlockType(fromJS(content));

      const guids   = { anchor: 'c6a8', focus: 'c6a9' };
      const offsets = { anchor: 0, focus: 1 };
      const result = manager.execute(guids, offsets, { type: 'h1' });

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].type).to.equal('h1');
      expect(blocks[1].type).to.equal('h1');
    });

    it('removes block type across multiple blocks', () => {
      const block1 = {
        "id": "c6a8",
        "type": "h1",
        "text": "a"
      };
      const block2 = {
        "id": "c6a9",
        "type": "h1",
        "text": "b"
      };
      content.sections[0].blocks = [block1, block2];
      const manager = new ToggleBlockType(fromJS(content));

      const guids   = { anchor: 'c6a8', focus: 'c6a9' };
      const offsets = { anchor: 0, focus: 1 };
      const result = manager.execute(guids, offsets, { type: 'h1' });

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].type).to.equal('p');
      expect(blocks[1].type).to.equal('p');
    });

    it('adds block type to all blocks if a single one isnt formatted', () => {
      const block1 = {
        "id": "c6a8",
        "type": "h1",
        "text": "a"
      };
      const block2 = {
        "id": "c6a9",
        "type": "h1",
        "text": "b"
      };
      content.sections[0].blocks = [block1, block2];
      const manager = new ToggleBlockType(fromJS(content));

      const guids   = { anchor: 'c6a8', focus: 'c6a9' };
      const offsets = { anchor: 0, focus: 1 };
      const result = manager.execute(guids, offsets, { type: 'h1' });

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].type).to.equal('p');
      expect(blocks[1].type).to.equal('p');
    });

    /**
     * p          p
     * ul         ul
     *   li         li
     *  <li>      h3
     *  <li>  =>  h3
     *   li       ul
     * p            li
     *            p
     */
    it('adds a block type to a multiplelist item', () => {
      const blocks = [
        {
          "id": "1000",
          "type": "p",
          "text": "hi"
        },
        {
          "id": "2000",
          "type": "ul",
          "blocks": [
            {
              "id": "0000",
              "type": "li",
              "text": "Alpha"
            },
            {
              "id": "0001",
              "type": "li",
              "text": "Bravo"
            },
            {
              "id": "0002",
              "type": "li",
              "text": "Charlie"
            },
            {
              "id": "0003",
              "type": "li",
              "text": "Delta"
            }
          ]
        },
        {
          "id": "3000",
          "type": "p",
          "text": "ho"
        }
      ];
      content.sections[0].blocks = blocks;
      const manager = new ToggleBlockType(fromJS(content));

      const guids   = { anchor: '0001', focus: '0002' };
      const offsets = { anchor: 0, focus: 1 };
      const result = manager.execute(guids, offsets, { type: 'h3' });
      const resultBlocks = result.content.toJS().sections[0].blocks;

      expect(resultBlocks.length).to.equal(6);
      expect(resultBlocks[0].type).to.equal('p');
      expect(resultBlocks[1].type).to.equal('ul');
      expect(resultBlocks[1].blocks[0].type).to.equal('li');
      expect(resultBlocks[2].type).to.equal('h3');
      expect(resultBlocks[3].type).to.equal('h3');
      expect(resultBlocks[4].type).to.equal('ul');
      expect(resultBlocks[4].blocks[0].type).to.equal('li');
      expect(resultBlocks[5].type).to.equal('p');
    });

  });

});
