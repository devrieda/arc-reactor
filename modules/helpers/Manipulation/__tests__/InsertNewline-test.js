var expect = require('expect');

var { fromJS } = require('immutable');
var InsertNewline = require('../InsertNewline');

describe('InsertNewline', () => {
  var content;

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
      var manager = new InsertNewline(fromJS(content));

      var guids = { anchor: 'c6a8', focus: 'c6a8' };
      var offsets = { anchor: 5, focus: 5 };
      var result = manager.execute(guids, offsets);

      var blocks = result.content.toJS().sections[0].blocks;
      expect(blocks.length).toBe(1);
      expect(blocks[0].text).toBe("<div>\n</div>");
    });

    it('insert two newlines if at the end of a block', () => {
      var manager = new InsertNewline(fromJS(content));

      var guids = { anchor: 'c6a8', focus: 'c6a8' };
      var offsets = { anchor: 11, focus: 11 };
      var result = manager.execute(guids, offsets);

      var blocks = result.content.toJS().sections[0].blocks;
      expect(blocks.length).toBe(1);
      expect(blocks[0].text).toBe("<div></div>\n\n");
    });
  });
});
