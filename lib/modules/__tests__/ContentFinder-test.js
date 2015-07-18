var expect = require('expect');

var { fromJS } = require('immutable');
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
        },
        {
          "id": "0010",
          "blocks": [
            {
              "id": "0101",
              "type": "p",
              "text": "a third section"
            }
          ]
        }
      ]
    };
  });


  // Immutable

  describe('#findPath', () => {
    it('finds the position', () => {
      var finder = new ContentFinder(fromJS(content));
      var path = finder.findPath('abcd');

      expect(path).toEqual(['sections', 0, 'blocks', 2, 'blocks', 0]);
    });

    it('finds the position in later sections', () => {
      var finder = new ContentFinder(fromJS(content));
      var path = finder.findPath('23ae');

      expect(path).toEqual(['sections', 1, 'blocks', 0]);
    });
  });

  describe('#findRange', () => {
    it('finds no results if content is empty', () => {
      var finder = new ContentFinder(fromJS({}));
      var guids = finder.findRange({ anchor: '667a', focus: 'abcd'});
      expect(guids).toEqual([]);
    });

    it('finds reference to a range of blocks by guids', () => {
      var finder = new ContentFinder(fromJS(content));
      var guids = finder.findRange({ anchor: '667a', focus: 'abcd'});
      expect(guids).toEqual(['667a', 'ad84', 'abcd']);
    });

    it('drops the last block if no content in the block is selected', () => {
      var finder = new ContentFinder(fromJS(content));
      var guids = finder.findRange(
        { anchor: '667a', focus: 'abce'},
        { anchor: 0, focus: 0 }
      );
      expect(guids).toEqual(['667a', 'ad84', 'abcd']);
    });

    it('drops the last block if it is an orphaned ul', () => {
      var finder = new ContentFinder(fromJS(content));
      var guids = finder.findRange(
        { anchor: '667a', focus: 'abcd'},
        { anchor: 0, focus: 0 }
      );
      expect(guids).toEqual(['667a']);
    });
  });

  describe('#findBlockPosition', () => {
    it('finds block position by guid', () => {
      var finder = new ContentFinder(fromJS(content));

      var position1 = finder.findBlockPosition('667a');
      expect(position1).toBe(1);

      var position2 = finder.findBlockPosition('ad84');
      expect(position2).toBe(2);
    });
  });

  describe('#findPrevPath', () => {
    it('finds path to previous sibling block by guid', () => {
      var finder = new ContentFinder(fromJS(content));

      var path = finder.findPrevPath('667a');
      expect(path).toEqual(['sections', 0, 'blocks', 0]);
    });

    it('finds path to previous sibling block across sections', () => {
      var finder = new ContentFinder(fromJS(content));

      var path = finder.findPrevPath('0101');
      expect(path).toEqual(['sections', 1, 'blocks', 0]);
    });

    it('finds path to previous sibling block across sections with sub-blocks', () => {
      var finder = new ContentFinder(fromJS(content));

      var path = finder.findPrevPath('23ae');
      expect(path).toEqual(['sections', 0, 'blocks', 2, 'blocks', 1]);
    });

    it('finds empty path if there are no previous siblings', () => {
      var finder = new ContentFinder(fromJS(content));

      var path = finder.findPrevPath('56ef');
      expect(path).toEqual(null);
    });
  });

  describe('#findNextPath', () => {
    it('finds path to next sibling block by guid', () => {
      var finder = new ContentFinder(fromJS(content));
      var path = finder.findNextPath('56ef');

      expect(path).toEqual(['sections', 0, 'blocks', 1]);
    });

    it('finds path to next sibling block by guid across sections', () => {
      var finder = new ContentFinder(fromJS(content));
      var path = finder.findNextPath('abce');

      expect(path).toEqual(['sections', 1, 'blocks', 0]);
    });

    it('finds empty path if there are no next siblings', () => {
      var finder = new ContentFinder(fromJS(content));
      var path = finder.findNextPath('0101');

      expect(path).toEqual(null);
    });
  });

  describe('#findParentPath', () => {
    it('finds path to parent of a block by guid', () => {
      var finder = new ContentFinder(fromJS(content));
      var path = finder.findParentPath('abcd');

      expect(path).toEqual(['sections', 0, 'blocks', 2]);
    });
  });
});
