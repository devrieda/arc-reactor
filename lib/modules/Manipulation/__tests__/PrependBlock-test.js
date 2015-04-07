var expect = require('expect');

var PrependBlock = require('../PrependBlock');

describe('PrependBlock', () => {
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
    it('should add a paragraph before the block', () => {
      var block = {
        "id": "c6a7",
        "type": "h1",
        "text": "this is a header"
      };
      content.sections[0].blocks = [block];
      var manager = new PrependBlock(content);
      var result = manager.execute({ anchor: 'c6a7' });

      var blocks = result.content.sections[0].blocks;
      expect(blocks.length).toBe(2);
      expect(blocks[0].type).toBe('p');
    });
  });
});
