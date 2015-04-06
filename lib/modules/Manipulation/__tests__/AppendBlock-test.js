var expect = require('expect');

var AppendBlock = require('../AppendBlock');

describe('AppendBlock', () => {
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
    it('should start an ordered list if text starts with number', () => {
      var block = {
        "id": "c6a7",
        "type": "p",
        "text": "1. starting a list"
      };
      content.sections[0].blocks = [block];
      var manager = new AppendBlock(content);
      manager.execute({ anchor: 'c6a7' });

      var blocks = content.sections[0].blocks;
      expect(blocks[0].type).toBe('ol');
      expect(blocks[0].blocks[0].type).toBe('li');
      expect(blocks[0].blocks[0].text).toBe('starting a list');
    });

    it('should start an unordered list if text starts with *', () => {
      var block = {
        "id": "c6a7",
        "type": "p",
        "text": "* starting a list"
      };
      content.sections[0].blocks = [block];
      var manager = new AppendBlock(content);
      manager.execute({ anchor: 'c6a7' });

      var blocks = content.sections[0].blocks;
      expect(blocks[0].type).toBe('ul');
      expect(blocks[0].blocks[0].type).toBe('li');
      expect(blocks[0].blocks[0].text).toBe('starting a list');
    });

    it('should start an unordered list if text starts with -', () => {
      var block = {
        "id": "c6a7",
        "type": "p",
        "text": "- starting a list"
      };
      content.sections[0].blocks = [block];
      var manager = new AppendBlock(content);
      manager.execute({ anchor: 'c6a7' });

      var blocks = content.sections[0].blocks;
      expect(blocks[0].type).toBe('ul');
      expect(blocks[0].blocks[0].type).toBe('li');
      expect(blocks[0].blocks[0].text).toBe('starting a list');
    });

    it('should add item to a list', () => {
      var block = {
        "id": "c6a7",
        "type": "ul",
        "text": "",
        "blocks": [
          {
            "id": "56ed",
            "type": "li",
            "text": "first item"
          }
        ]
      };
      content.sections[0].blocks = [block];
      var manager = new AppendBlock(content);
      manager.execute({ anchor: '56ed' });

      var blocks = content.sections[0].blocks;
      expect(blocks[0].blocks.length).toBe(2);
      expect(blocks[0].blocks[1].type).toBe('li');
    });

    it('should create a new paragraph', () => {
      var block = {
        "id": "c6a7",
        "type": "h1",
        "text": "this is a header"
      };
      content.sections[0].blocks = [block];

      var manager = new AppendBlock(content);
      manager.execute({ anchor: 'c6a7' });

      var blocks = content.sections[0].blocks;
      expect(blocks.length).toBe(2);
      expect(blocks[1].type).toBe('p');
    });
  });
});
