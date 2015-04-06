var expect = require('expect');

var CombineBlock = require('../CombineBlock');

describe('CombineBlock', () => {
  var content;

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
    it('should combine multiple blocks', () => {
      var block1 = {
        "id": "c6a7",
        "type": "p",
        "text": "You can imagine where it goes from here."
      };
      var block2 = {
        "id": "c6a8",
        "type": "p",
        "text": "He fixes the cable?"
      };
      var block3 = {
        "id": "c6a9",
        "type": "p",
        "text": "Don't be fatuous, Jeffrey."
      };
      content.sections[0].blocks = [block1, block2, block3];
      var manager = new CombineBlock(content);

      var guids = { anchor: 'c6a7', focus: 'c6a9' };
      var offsets = { anchor: 8, focus: 6 };
      manager.execute(guids, offsets);

      var blocks = content.sections[0].blocks;
      expect(blocks.length).toBe(1);
      expect(blocks[0].text).toBe('You can be fatuous, Jeffrey.');
    });
  });
});
