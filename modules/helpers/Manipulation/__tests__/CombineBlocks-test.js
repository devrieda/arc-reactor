import { fromJS } from 'immutable';
import CombineBlocks from '../CombineBlocks';

describe('CombineBlocks', () => {
  let content;

  beforeEach(() => {
    content = {
      "sections": [
        {
          "id": "de5f",
          "blocks": [
            { "id": "c6a7", "type": "p", "text": "You can imagine where it goes from here." },
            { "id": "c6a8", "type": "p", "text": "He fixes the cable?" },
            { "id": "c6a9", "type": "p", "text": "Don't be fatuous, Jeffrey." }
          ]
        },
        {
          "id": "0010",
          "blocks": [
            { "id": "0011", "type": "p", "text": "the first block" },
            { "id": "0101", "type": "p", "text": "sometimes be a jerk" }
          ]
        }
      ]
    };
  });

  describe('#execute', () => {
    it('should combine multiple blocks', () => {
      const manager = new CombineBlocks(fromJS(content));
      const guids = { anchor: 'c6a7', focus: 'c6a9' };
      const offsets = { anchor: 8, focus: 6 };
      const result = manager.execute(guids, offsets);

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks.length).to.equal(1);
      expect(blocks[0].text).to.equal('You can be fatuous, Jeffrey.');
    });

    it('should combine multiple blocks across sections and delete empty sects', () => {
      const manager = new CombineBlocks(fromJS(content));
      const guids = { anchor: 'c6a7', focus: '0101' };
      const offsets = { anchor: 8, focus: 10 };
      const result = manager.execute(guids, offsets);

      const expected = {
        "sections": [
          {
            "id": "de5f",
            "blocks": [
              { "id": "c6a7", "type": "p", "text": "You can be a jerk" }
            ]
          }
        ]
      };

      expect(result.content.toJS()).to.eql(expected);
    });

    it('should combine multiple blocks across sections and keep sects with blocks', () => {
      const manager = new CombineBlocks(fromJS(content));
      const guids = { anchor: 'c6a7', focus: '0011' };
      const offsets = { anchor: 8, focus: 10 };
      const result = manager.execute(guids, offsets);

      const expected = {
        "sections": [
          {
            "id": "de5f",
            "blocks": [
              { "id": "c6a7", "type": "p", "text": "You can block" },
              { "id": "0101", "type": "p", "text": "sometimes be a jerk" }
            ]
          }
        ]
      };

      expect(result.content.toJS()).to.eql(expected);
    });

  });
});
