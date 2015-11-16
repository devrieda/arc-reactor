import { fromJS } from 'immutable';
import InsertNewline from '../InsertNewline';

describe('InsertNewline', () => {
  let content;

  beforeEach(() => {
    content = {
      "sections": [
        {
          "id": "de5f",
          "blocks": [
            {
              "id": "c6a8",
              "type": "pre",
              "text": "<div></div>"
            }
          ]
        }
      ]
    };
  });

  describe('#execute', () => {
    it('insert one newline if in the middle of the block', () => {
      const manager = new InsertNewline(fromJS(content));

      const guids = { anchor: 'c6a8', focus: 'c6a8' };
      const offsets = { anchor: 5, focus: 5 };
      const result = manager.execute(guids, offsets);

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks.length).to.equal(1);
      expect(blocks[0].text).to.equal("<div>\n</div>");
    });

    it('insert two newlines if at the end of a block', () => {
      const manager = new InsertNewline(fromJS(content));

      const guids = { anchor: 'c6a8', focus: 'c6a8' };
      const offsets = { anchor: 11, focus: 11 };
      const result = manager.execute(guids, offsets);

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks.length).to.equal(1);
      expect(blocks[0].text).to.equal("<div></div>\n\n");
    });
  });
});
