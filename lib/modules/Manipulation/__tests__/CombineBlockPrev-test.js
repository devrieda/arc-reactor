var expect = require('expect');

var CombineBlockPrev = require('../CombineBlockPrev');

describe('CombineBlockPrev', () => {
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
    it('should combine given block with previous sibling', () => {
      var block1 = {
        "id": "c6a8",
        "type": "p",
        "text": "cable? "
      };
      var block2 = {
        "id": "c6a9",
        "type": "p",
        "text": "Don't be fatuous"
      };
      content.sections[0].blocks = [block1, block2];
      var manager = new CombineBlockPrev(content);

      var guids = { anchor: 'c6a9', focus: 'c6a9' };
      var offsets = { anchor: 0, focus: 0 };
      manager.execute(guids, offsets);

      var blocks = content.sections[0].blocks;
      expect(blocks.length).toBe(1);
      expect(blocks[0].text).toBe('cable? Don\'t be fatuous');
    });

    it('should noop if no previous sibling', () => {
      var block = {
        "id": "c6a8",
        "type": "p",
        "text": "cable?"
      };
      content.sections[0].blocks = [block];
      var manager = new CombineBlockPrev(content);

      var guids = { anchor: 'c6a8', focus: 'c6a8' };
      var offsets = { anchor: 0, focus: 0 };
      manager.execute(guids, offsets);

      var blocks = content.sections[0].blocks;
      expect(blocks.length).toBe(1);
      expect(blocks[0].text).toBe('cable?');
    });
  });
});