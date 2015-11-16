import { fromJS } from 'immutable';
import CombineBlockPrev from '../CombineBlockPrev';

describe('CombineBlockPrev', () => {
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
    it('should combine given block with previous sibling', () => {
      const block1 = {
        "id": "c6a8",
        "type": "p",
        "text": "cable? "
      };
      const block2 = {
        "id": "c6a9",
        "type": "p",
        "text": "Don't be fatuous"
      };
      content.sections[0].blocks = [block1, block2];
      const manager = new CombineBlockPrev(fromJS(content));

      const guids = { anchor: 'c6a9', focus: 'c6a9' };
      const offsets = { anchor: 0, focus: 0 };
      const result = manager.execute(guids, offsets);

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks.length).to.equal(1);
      expect(blocks[0].text).to.equal('cable? Don\'t be fatuous');
    });

    it('should combine sections if prev is a diff section', () => {
      content = {
        "sections": [
          {
            "id": "0001",
            "blocks": [
              { "id": "c6a8", "type": "p", "text": "cable? " }
            ]
          },
          {
            "id": "0002",
            "blocks": [
              { "id": "c6a9", "type": "p", "text": "Don't be fatuous" }
            ]
          }
        ]
      };

      const manager = new CombineBlockPrev(fromJS(content));

      const guids = { anchor: 'c6a9', focus: 'c6a9' };
      const offsets = { anchor: 0, focus: 0 };
      const result = manager.execute(guids, offsets);

      const expected = {
        "sections": [
          {
            "id": "0001",
            "blocks": [
              { "id": "c6a8", "type": "p", "text": "cable? " },
              { "id": "c6a9", "type": "p", "text": "Don't be fatuous" }
            ]
          }
        ]
      };

      expect(result.content.toJS()).to.eql(expected);
    });

    it('should noop if no previous sibling', () => {
      const block = {
        "id": "c6a8",
        "type": "p",
        "text": "cable?"
      };
      content.sections[0].blocks = [block];
      const manager = new CombineBlockPrev(fromJS(content));

      const guids = { anchor: 'c6a8', focus: 'c6a8' };
      const offsets = { anchor: 0, focus: 0 };
      const result = manager.execute(guids, offsets);

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks.length).to.equal(1);
      expect(blocks[0].text).to.equal('cable?');
    });
  });
});
