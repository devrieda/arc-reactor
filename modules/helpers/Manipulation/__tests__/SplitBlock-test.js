var expect = require('expect');

var { fromJS } = require('immutable');
var SplitBlock = require('../SplitBlock');

describe('SplitBlock', () => {
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
    it('should split a single block', () => {
      var block = {
        "id": "c6a7",
        "type": "p",
        "text": "this is some text to split"
      };
      content.sections[0].blocks = [block];
      var manager = new SplitBlock(fromJS(content));

      var guids = { anchor: 'c6a7', focus: 'c6a7' };
      var offsets = { anchor: 4, focus: 4 };
      var result = manager.execute(guids, offsets);

      var blocks = result.content.toJS().sections[0].blocks;
      expect(blocks.length).toBe(2);
      expect(blocks[0].text).toBe('this');
      expect(blocks[1].text).toBe(' is some text to split');
    });

    it('should split a single block with range', () => {
      var block = {
        "id": "c6a7",
        "type": "p",
        "text": "this is some text to split"
      };
      content.sections[0].blocks = [block];
      var manager = new SplitBlock(fromJS(content));

      var guids = { anchor: 'c6a7', focus: 'c6a7' };
      var offsets = { anchor: 5, focus: 7 };
      var result = manager.execute(guids, offsets);

      var blocks = result.content.toJS().sections[0].blocks;
      expect(blocks.length).toBe(2);
      expect(blocks[0].text).toBe('this ');
      expect(blocks[1].text).toBe(' some text to split');
    });

    it('should split across multiple blocks', () => {
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
      var manager = new SplitBlock(fromJS(content));

      var guids = { anchor: 'c6a7', focus: 'c6a9' };
      var offsets = { anchor: 8, focus: 6 };
      var result = manager.execute(guids, offsets);

      var blocks = result.content.toJS().sections[0].blocks;
      expect(blocks.length).toBe(2);
      expect(blocks[0].text).toBe('You can ');
      expect(blocks[1].text).toBe('be fatuous, Jeffrey.');
    });
  });
});
