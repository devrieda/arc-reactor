var expect = require('expect');

var { fromJS } = require('immutable');
var ToggleCenter = require('../ToggleCenter');

describe('ToggleCenter', () => {
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
    it('should add center data for a single block', () => {
      var block = {
        "id": "c6a8",
        "type": "p",
        "text": "a"
      };
      content.sections[0].blocks = [block];
      var manager = new ToggleCenter(fromJS(content));

      var guids   = { anchor: 'c6a8', focus: 'c6a8' };
      var offsets = { anchor: 0, focus: 1 };
      var result = manager.execute(guids, offsets);

      var blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].data).toEqual({align: 'center'});
    });

    it('should add center data across multiple blocks', () => {
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
      var manager = new ToggleCenter(fromJS(content));

      var guids   = { anchor: 'c6a8', focus: 'c6a9' };
      var offsets = { anchor: 0, focus: 1 };
      var result = manager.execute(guids, offsets);

      var blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].data).toEqual({align: 'center'});
      expect(blocks[1].data).toEqual({align: 'center'});
    });

    it('should remove center data for a single block', () => {
      var block = {
        "id": "c6a8",
        "type": "p",
        "text": "a",
        "data": {"align": "center"}
      };
      content.sections[0].blocks = [block];
      var manager = new ToggleCenter(fromJS(content));

      var guids   = { anchor: 'c6a8', focus: 'c6a8' };
      var offsets = { anchor: 0, focus: 1 };
      var result = manager.execute(guids, offsets);

      var blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].data).toEqual({});
    });

    it('should remove center data across multiple blocks', () => {
      var block1 = {
        "id": "c6a8",
        "type": "p",
        "text": "a",
        "data": {"align": "center"}
      };
      var block2 = {
        "id": "c6a9",
        "type": "p",
        "text": "b",
        "data": {"align": "center"}
      };
      content.sections[0].blocks = [block1, block2];
      var manager = new ToggleCenter(fromJS(content));

      var guids   = { anchor: 'c6a8', focus: 'c6a9' };
      var offsets = { anchor: 0, focus: 1 };
      var result = manager.execute(guids, offsets);

      var blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].data).toEqual({});
      expect(blocks[1].data).toEqual({});
    });

    it('should center all blocks if a single one isnt centered', () => {
      var block1 = {
        "id": "c6a8",
        "type": "p",
        "text": "a",
        "data": {"align": "center"}
      };
      var block2 = {
        "id": "c6a9",
        "type": "p",
        "text": "b"
      };
      content.sections[0].blocks = [block1, block2];
      var manager = new ToggleCenter(fromJS(content));

      var guids   = { anchor: 'c6a8', focus: 'c6a9' };
      var offsets = { anchor: 0, focus: 1 };
      var result = manager.execute(guids, offsets);

      var blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].data).toEqual({align: 'center'});
      expect(blocks[1].data).toEqual({align: 'center'});
    });
  });
});