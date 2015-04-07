var expect = require('expect');

var ToggleBlockType = require('../ToggleBlockType');

describe('ToggleBlockType', () => {
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
    it('should add a block type for a single block', () => {
      var block = {
        "id": "c6a8",
        "type": "p",
        "text": "a"
      };
      content.sections[0].blocks = [block];
      var manager = new ToggleBlockType(content);

      var guids   = { anchor: 'c6a8', focus: 'c6a8' };
      var offsets = { anchor: 0, focus: 1 };
      var result = manager.execute(guids, offsets, { type: 'h1' });

      var blocks = result.content.sections[0].blocks;
      expect(blocks[0].type).toBe('h1');
    });

    it('should add a block type across multiple blocks', () => {
      var block1 = {
        "id": "c6a8",
        "type": "p",
        "text": "a"
      };
      var block2 = {
        "id": "c6a9",
        "type": "p",
        "text": "b"
      };
      content.sections[0].blocks = [block1, block2];
      var manager = new ToggleBlockType(content);

      var guids   = { anchor: 'c6a8', focus: 'c6a9' };
      var offsets = { anchor: 0, focus: 1 };
      var result = manager.execute(guids, offsets, { type: 'h1' });

      var blocks = result.content.sections[0].blocks;
      expect(blocks[0].type).toBe('h1');
      expect(blocks[1].type).toBe('h1');
    });

    it('should remove block type for a single block', () => {
      var block = {
        "id": "c6a8",
        "type": "h1",
        "text": "a"
      };
      content.sections[0].blocks = [block];
      var manager = new ToggleBlockType(content);

      var guids   = { anchor: 'c6a8', focus: 'c6a8' };
      var offsets = { anchor: 0, focus: 1 };
      var result = manager.execute(guids, offsets, { type: 'h1' });

      var blocks = result.content.sections[0].blocks;
      expect(blocks[0].type).toBe('p');
    });

    it('should remove block type across multiple blocks', () => {
      var block1 = {
        "id": "c6a8",
        "type": "h1",
        "text": "a"
      };
      var block2 = {
        "id": "c6a9",
        "type": "h1",
        "text": "b"
      };
      content.sections[0].blocks = [block1, block2];
      var manager = new ToggleBlockType(content);

      var guids   = { anchor: 'c6a8', focus: 'c6a9' };
      var offsets = { anchor: 0, focus: 1 };
      var result = manager.execute(guids, offsets, { type: 'h1' });

      var blocks = result.content.sections[0].blocks;
      expect(blocks[0].type).toBe('p');
      expect(blocks[1].type).toBe('p');
    });

    it('should add block type to all blocks if a single one isnt formatted', () => {
      var block1 = {
        "id": "c6a8",
        "type": "h1",
        "text": "a"
      };
      var block2 = {
        "id": "c6a9",
        "type": "h1",
        "text": "b"
      };
      content.sections[0].blocks = [block1, block2];
      var manager = new ToggleBlockType(content);

      var guids   = { anchor: 'c6a8', focus: 'c6a9' };
      var offsets = { anchor: 0, focus: 1 };
      var result = manager.execute(guids, offsets, { type: 'h1' });

      var blocks = result.content.sections[0].blocks;
      expect(blocks[0].type).toBe('p');
      expect(blocks[1].type).toBe('p');
    });
  });
});
