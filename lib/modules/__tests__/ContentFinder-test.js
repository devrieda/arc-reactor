var expect = require('expect');

var ContentFinder = require('../ContentFinder');

describe('ContentFinder', () => {

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
                },
                {
                  "id": "abce",
                  "type": "li",
                  "text": "list item 2"
                }
              ]
            }
          ]
        },
        {
          "id": "23ad",
          "blocks": [
            {
              "id": "23ae",
              "type": "p",
              "text": "another section para"
            }
          ]
        }
      ]
    }
  })


  describe('#findPath', () => {
    it('finds the position', () => {
      var finder = new ContentFinder(content);
      var path = finder.findPath('abcd');

      expect(path).toEqual(['sections', 0, 'blocks', 2, 'blocks', 0]);
    });
  });


  describe('#findBlock', () => {
    it('finds block by guid', () => {
      var finder = new ContentFinder(content);
      var block = finder.findBlock('56ef');

      expect(block).toBe(content.sections[0].blocks[0]);
    })

    it('finds sub-blocks by guid', () => {
      var finder = new ContentFinder(content);
      var block = finder.findBlock('abcd');

      expect(block).toBe(content.sections[0].blocks[2].blocks[0]);
    });
  })

  describe('#findBlocks', () => {
    it('finds reference to all sibling blocks by guid', () => {
      var finder = new ContentFinder(content);
      var blocks = finder.findBlocks('56ef');

      expect(blocks).toBe(content.sections[0].blocks);
    })
  })

  describe('#findRange', () => {
    it('finds reference to a range of blocks by guids', () => {
      var finder = new ContentFinder(content);
      var guids = finder.findRange({ anchor: '667a', focus: 'abcd'});
      expect(guids).toEqual(['667a', 'ad84', 'abcd'])
    })

    it('drops the last block if no content in the block is selected', () => {
      var finder = new ContentFinder(content);
      var guids = finder.findRange(
        { anchor: '667a', focus: 'abcd'},
        { anchor: 0, focus: 0 }
      );
      expect(guids).toEqual(['667a', 'ad84'])
    })
  })

  describe('#findPreviousBlock', () => {
    it('finds previous sibling block by guid', () => {
      var finder = new ContentFinder(content);
      var block = finder.findPreviousBlock('667a');

      expect(block).toBe(content.sections[0].blocks[0]);
    })
  })

  describe('#findNextBlock', () => {
    it('finds next sibling block by guid', () => {
      var finder = new ContentFinder(content);
      var block = finder.findNextBlock('56ef');

      expect(block).toBe(content.sections[0].blocks[1]);
    })
  })

  describe('#findParentBlock', () => {
    it('finds parent of a block by guid', () => {
      var finder = new ContentFinder(content);
      var block = finder.findParentBlock('abcd');

      expect(block).toBe(content.sections[0].blocks[2]);
    })
  })

  describe('#findBlockPosition', () => {
    it('finds block position by guid', () => {
      var finder = new ContentFinder(content);
      var position = finder.findBlockPosition('667a');

      expect(position).toBe(1);
    })
  })

})
