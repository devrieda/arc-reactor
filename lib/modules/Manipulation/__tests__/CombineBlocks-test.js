var expect = require('expect');

var CombineBlocks = require('../CombineBlocks');

describe('CombineBlocks', () => {
  var content;

  beforeEach(() => {
    content = {
      "sections": [
        {
          "id": "de5f",
          "blocks": [
            {
              "id": "c6a7",
              "type": "p",
              "text": "You can imagine where it goes from here."
            },
            {
              "id": "c6a8",
              "type": "p",
              "text": "He fixes the cable?"
            },
            {
              "id": "c6a9",
              "type": "p",
              "text": "Don't be fatuous, Jeffrey."
            }
          ]
        }
      ]
    };
  });

  describe('#execute', () => {
    it('should combine multiple blocks', () => {
      var manager = new CombineBlocks(content);

      var guids = { anchor: 'c6a7', focus: 'c6a9' };
      var offsets = { anchor: 8, focus: 6 };
      var result = manager.execute(guids, offsets);

      var blocks = result.content.sections[0].blocks;
      expect(blocks.length).toBe(1);
      expect(blocks[0].text).toBe('You can be fatuous, Jeffrey.');
    });
  });
});
