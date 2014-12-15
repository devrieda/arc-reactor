var expect = require('expect');
var React = require('react');

var ContentManager = require('../../lib/modules/ContentManager');

describe('ContentManager', () => {

  var content;

  beforeEach(() => {
    content = {
      "sections": [
        {
          "id": "de5f",
          "blocks": []
        }
      ]
    }
  })

  describe('#appendBlock', () => {
    it('should start an ordered list if text starts with number', () => {
      var block = {
        "id": "c6a7",
        "type": "p",
        "text": "1. starting a list"
      }
      content.sections[0].blocks = [block];
      var manager = new ContentManager(content);
      var result = manager.appendBlock({ anchor: 'c6a7' });

      var blocks = content.sections[0].blocks;
      expect(blocks[0].type).toBe('ol');
      expect(blocks[0].blocks[0].type).toBe('li');
      expect(blocks[0].blocks[0].text).toBe('starting a list');
    })

    it('should start an unordered list if text starts with *', () => {
      var block = {
        "id": "c6a7",
        "type": "p",
        "text": "* starting a list"
      }
      content.sections[0].blocks = [block];
      var manager = new ContentManager(content);
      var result = manager.appendBlock({ anchor: 'c6a7' });

      var blocks = content.sections[0].blocks;
      expect(blocks[0].type).toBe('ul');
      expect(blocks[0].blocks[0].type).toBe('li');
      expect(blocks[0].blocks[0].text).toBe('starting a list');
    })

    it('should start an unordered list if text starts with -', () => {
      var block = {
        "id": "c6a7",
        "type": "p",
        "text": "- starting a list"
      }
      content.sections[0].blocks = [block];
      var manager = new ContentManager(content);
      var result = manager.appendBlock({ anchor: 'c6a7' });

      var blocks = content.sections[0].blocks;
      expect(blocks[0].type).toBe('ul');
      expect(blocks[0].blocks[0].type).toBe('li');
      expect(blocks[0].blocks[0].text).toBe('starting a list');
    })

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
      }
      content.sections[0].blocks = [block];
      var manager = new ContentManager(content);
      var result = manager.appendBlock({ anchor: '56ed' });

      var blocks = content.sections[0].blocks;

      expect(blocks[0].blocks[0].type).toBe('li');
      expect(blocks[0].blocks[0].text).toBe('first item');

      expect(blocks[0].blocks[1].type).toBe('li');
      expect(blocks[0].blocks[1].text).toBe('');
    })

    it('should finish up a list', () => {
      var block = {
        "id": "c6a7",
        "type": "ul",
        "text": "",
        "blocks": [
          {
            "id": "56ed",
            "type": "li",
            "text": "first item"
          },
          {
            "id": "56ef",
            "type": "li",
            "text": ""
          }
        ]
      }
      content.sections[0].blocks = [block];
      var manager = new ContentManager(content);
      var result = manager.appendBlock({ anchor: '56ef' });

      var blocks = content.sections[0].blocks;
      expect(blocks[0].blocks.length).toBe(1);
      expect(blocks[1].type).toBe('p');
    })

    it('should create a new paragraph', () => {
      var block = {
        "id": "c6a7",
        "type": "h1",
        "text": "this is a header"
      }
      content.sections[0].blocks = [block];

      var manager = new ContentManager(content);
      var result = manager.appendBlock({ anchor: 'c6a7' });

      var blocks = content.sections[0].blocks;
      expect(blocks.length).toBe(2);
      expect(blocks[1].type).toBe('p');
    })
  })

  describe('#prependBlock', () => {
    it('should add a paragraph before the block', () => {
      var block = {
        "id": "c6a7",
        "type": "h1",
        "text": "this is a header"
      }
      content.sections[0].blocks = [block];
      var manager = new ContentManager(content);
      var result = manager.prependBlock({ anchor: 'c6a7' });

      var blocks = content.sections[0].blocks;
      expect(blocks.length).toBe(2);
      expect(blocks[0].type).toBe('p');
    })
  })

  describe('#splitBlock', () => {
    it('should split a single block', () => {
      var block = {
        "id": "c6a7",
        "type": "p",
        "text": "this is some text to split"
      }
      content.sections[0].blocks = [block];
      var manager = new ContentManager(content);

      var guids = { anchor: 'c6a7', focus: 'c6a7' };
      var offsets = { anchor: 4, focus: 4 };
      var result = manager.splitBlock(guids, offsets);

      var blocks = content.sections[0].blocks;
      expect(blocks.length).toBe(2);
      expect(blocks[0].text).toBe('this');
      expect(blocks[1].text).toBe(' is some text to split');
    })

    it('should split a single block with range', () => {
      var block = {
        "id": "c6a7",
        "type": "p",
        "text": "this is some text to split"
      }
      content.sections[0].blocks = [block];
      var manager = new ContentManager(content);

      var guids = { anchor: 'c6a7', focus: 'c6a7' };
      var offsets = { anchor: 5, focus: 7 };
      var result = manager.splitBlock(guids, offsets);

      var blocks = content.sections[0].blocks;
      expect(blocks.length).toBe(2);
      expect(blocks[0].text).toBe('this ');
      expect(blocks[1].text).toBe(' some text to split');
    })

    it('should split across multiple blocks', () => {
      var block1 = {
        "id": "c6a7",
        "type": "p",
        "text": "You can imagine where it goes from here."
      }
      var block2 = {
        "id": "c6a8",
        "type": "p",
        "text": "He fixes the cable?"
      }
      var block3 = {
        "id": "c6a9",
        "type": "p",
        "text": "Don't be fatuous, Jeffrey."
      }
      content.sections[0].blocks = [block1, block2, block3];
      var manager = new ContentManager(content);

      var guids = { anchor: 'c6a7', focus: 'c6a9' };
      var offsets = { anchor: 8, focus: 6 };
      var result = manager.splitBlock(guids, offsets);

      var blocks = content.sections[0].blocks;
      expect(blocks.length).toBe(2);
      expect(blocks[0].text).toBe('You can ');
      expect(blocks[1].text).toBe('be fatuous, Jeffrey.');
    })
  })

  describe('#combineBlocks', () => {
    it('should combine multiple blocks', () => {

      var block1 = {
        "id": "c6a7",
        "type": "p",
        "text": "You can imagine where it goes from here."
      }
      var block2 = {
        "id": "c6a8",
        "type": "p",
        "text": "He fixes the cable?"
      }
      var block3 = {
        "id": "c6a9",
        "type": "p",
        "text": "Don't be fatuous, Jeffrey."
      }
      content.sections[0].blocks = [block1, block2, block3];
      var manager = new ContentManager(content);

      var guids = { anchor: 'c6a7', focus: 'c6a9' };
      var offsets = { anchor: 8, focus: 6 };
      var result = manager.combineBlocks(guids, offsets);

      var blocks = content.sections[0].blocks;
      expect(blocks.length).toBe(1);
      expect(blocks[0].text).toBe('You can be fatuous, Jeffrey.');
    })
  })

  describe('#combineBlockWithPrevious', () => {
    it('should combine given block with previous sibling', () => {
      var manager = new ContentManager(content);
    })
    it('should noop if no previous sibling', () => {
      var manager = new ContentManager(content);
    })
  })

  describe('#combineBlockWithNext', () => {
    it('should combine given block with next sibling', () => {
      var manager = new ContentManager(content);
    })
    it('should noop if no next sibling', () => {
      var manager = new ContentManager(content);
    })
  })
})

