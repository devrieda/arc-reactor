const expect = require('expect');

const { fromJS } = require('immutable');
const SplitBlock = require('../SplitBlock');

describe('SplitBlock', () => {
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

  describe('#execute', () => {
    it('should split a single block', () => {
      const block = {
        "id": "c6a7",
        "type": "p",
        "text": "this is some text to split"
      };
      content.sections[0].blocks = [block];
      const manager = new SplitBlock(fromJS(content));

      const guids = { anchor: 'c6a7', focus: 'c6a7' };
      const offsets = { anchor: 4, focus: 4 };
      const result = manager.execute(guids, offsets);

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks.length).toBe(2);
      expect(blocks[0].text).toBe('this');
      expect(blocks[1].text).toBe(' is some text to split');
    });

    it('should split a single block with range', () => {
      const block = {
        "id": "c6a7",
        "type": "p",
        "text": "this is some text to split"
      };
      content.sections[0].blocks = [block];
      const manager = new SplitBlock(fromJS(content));

      const guids = { anchor: 'c6a7', focus: 'c6a7' };
      const offsets = { anchor: 5, focus: 7 };
      const result = manager.execute(guids, offsets);

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks.length).toBe(2);
      expect(blocks[0].text).toBe('this ');
      expect(blocks[1].text).toBe(' some text to split');
    });

    it('should split across multiple blocks', () => {
      const block1 = {
        "id": "c6a7",
        "type": "p",
        "text": "You can imagine where it goes from here."
      };
      const block2 = {
        "id": "c6a8",
        "type": "p",
        "text": "He fixes the cable?"
      };
      const block3 = {
        "id": "c6a9",
        "type": "p",
        "text": "Don't be fatuous, Jeffrey."
      };
      content.sections[0].blocks = [block1, block2, block3];
      const manager = new SplitBlock(fromJS(content));

      const guids = { anchor: 'c6a7', focus: 'c6a9' };
      const offsets = { anchor: 8, focus: 6 };
      const result = manager.execute(guids, offsets);

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks.length).toBe(2);
      expect(blocks[0].text).toBe('You can ');
      expect(blocks[1].text).toBe('be fatuous, Jeffrey.');
    });
  });
});
