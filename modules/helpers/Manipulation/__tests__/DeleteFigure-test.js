const expect = require('expect');

const { fromJS } = require('immutable');
const DeleteFigure = require('../DeleteFigure');

describe('DeleteFigure', () => {
  let content;

  beforeEach(() => {
    content = {
      "sections": [
        {
          "id": "de5f",
          "blocks": [
            {
              "id": "c6a8",
              "type": "figure",
              "src": "http://example.com.png",
              "text": "Caption text"
            }
          ]
        }
      ]
    };
  });

  describe('#execute', () => {
    it('should convert a figure to a paragraph', () => {
      const manager = new DeleteFigure(fromJS(content));

      const guids = { anchor: 'c6a8', focus: 'c6a8' };
      const offsets = { anchor: 0, focus: 0 };
      const result = manager.execute(guids, offsets);

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks.length).toBe(1);
      expect(blocks[0].text).toBe('');
      expect(blocks[0].type).toBe('p');
    });
  });
});
