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
          "blocks": [
            {
              "id": "56ef",
              "type": "p",
              "text": "this is the first paragraph"
            },
            {
              "id": "667a",
              "type": "p",
              "text": "and this is the second"
            },
            {
              "id": "ad84",
              "type": "ul",
              "text": "",
              "blocks": [
                {
                  "id": "abcd",
                  "type": "li",
                  "text": "list item 1"
                }
              ]
            }
          ]
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
      manager.appendBlock({ anchor: 'c6a7' });

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
      manager.appendBlock({ anchor: 'c6a7' });

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
      manager.appendBlock({ anchor: 'c6a7' });

      var blocks = content.sections[0].blocks;
      expect(blocks[0].type).toBe('ul');
      expect(blocks[0].blocks[0].type).toBe('li');
      expect(blocks[0].blocks[0].text).toBe('starting a list');
    })

    it('should add item to a list', () => {
      var manager = new ContentManager(content);
      manager.appendBlock({ anchor: '56ef' });
    })

    it('should finish up a list', () => {
      var manager = new ContentManager(content);
      manager.appendBlock({ anchor: '56ef' });
    })

    it('should create a new paragraph', () => {
      var manager = new ContentManager(content);
      manager.appendBlock({ anchor: '56ef' });
    })
  })

  describe('#prependBlock', () => {
    it('should add a paragraph before the block', () => {
      var manager = new ContentManager(content);
    })
  })

  describe('#splitBlock', () => {
    it('should split a single block', () => {
      var manager = new ContentManager(content);
    })
    it('should split across multiple blocks', () => {
      var manager = new ContentManager(content);
    })
  })

  describe('#combineBlocks', () => {
    it('should combine multiple blocks', () => {
      var manager = new ContentManager(content);
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

