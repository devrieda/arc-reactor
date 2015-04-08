var expect = require('expect');

var { fromJS } = require('immutable');
var CombineBlockNext = require('../CombineBlockNext');

describe('CombineBlockNext', () => {
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
    it('should combine given block with next sibling', () => {
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
      var manager = new CombineBlockNext(fromJS(content));

      var guids = { anchor: 'c6a8', focus: 'c6a8' };
      var offsets = { anchor: 0, focus: 0 };
      var result = manager.execute(guids, offsets);

      var blocks = result.content.toJS().sections[0].blocks;
      expect(blocks.length).toBe(1);
      expect(blocks[0].text).toBe('cable? Don\'t be fatuous');
    });

    it('should noop if no next sibling', () => {
      var block = {
        "id": "c6a8",
        "type": "p",
        "text": "cable?"
      };
      content.sections[0].blocks = [block];
      var manager = new CombineBlockNext(fromJS(content));

      var guids = { anchor: 'c6a8', focus: 'c6a8' };
      var offsets = { anchor: 0, focus: 0 };
      var result = manager.execute(guids, offsets);

      var blocks = result.content.toJS().sections[0].blocks;
      expect(blocks.length).toBe(1);
      expect(blocks[0].text).toBe('cable?');
    });
  });
});
