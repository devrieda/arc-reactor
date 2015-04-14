var expect = require('expect');

var { fromJS } = require('immutable');
var DeleteFigure = require('../DeleteFigure');

describe('DeleteFigure', () => {
  var content;

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
      var manager = new DeleteFigure(fromJS(content));

      var guids = { anchor: 'c6a8', focus: 'c6a8' };
      var offsets = { anchor: 0, focus: 0 };
      var result = manager.execute(guids, offsets);

      var blocks = result.content.toJS().sections[0].blocks;
      expect(blocks.length).toBe(1);
      expect(blocks[0].text).toBe('');
      expect(blocks[0].type).toBe('p');
    });
  });
});
