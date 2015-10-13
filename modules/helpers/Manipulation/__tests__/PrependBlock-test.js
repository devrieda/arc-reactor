import expect from 'expect';
import { fromJS } from 'immutable';
import PrependBlock from '../PrependBlock';

describe('PrependBlock', () => {
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
    it('should add a paragraph before the block', () => {
      const block = {
        "id": "c6a7",
        "type": "h1",
        "text": "this is a header"
      };
      content.sections[0].blocks = [block];
      const manager = new PrependBlock(fromJS(content));
      const result = manager.execute({ anchor: 'c6a7' });

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks.length).toBe(2);
      expect(blocks[0].type).toBe('p');
    });
  });
});
