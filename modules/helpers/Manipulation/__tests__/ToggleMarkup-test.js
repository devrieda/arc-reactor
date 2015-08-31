var expect = require('expect');

var { fromJS } = require('immutable');
var ToggleMarkup = require('../ToggleMarkup');

describe('ToggleMarkup', () => {
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
    it('should add markup for a single block', () => {
      var block = {
        "id": "c6a8",
        "type": "p",
        "text": "this is my formatted text"
      };
      content.sections[0].blocks = [block];
      var manager = new ToggleMarkup(fromJS(content));

      var guids   = { anchor: 'c6a8', focus: 'c6a8' };
      var offsets = { anchor: 0, focus: 4 };
      var result = manager.execute(guids, offsets, { type: 'strong' });

      var blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].markups).toEqual({"strong":[{"range": [0,4]}]});
    });

    it('should add markup across multiple blocks', () => {
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
      var manager = new ToggleMarkup(fromJS(content));

      var guids = { anchor: 'c6a7', focus: 'c6a9' };
      var offsets = { anchor: 2, focus: 4 };
      var result = manager.execute(guids, offsets, { type: 'strong' });

      var blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].markups).toEqual({"strong":[{"range": [2,40]}]});
      expect(blocks[1].markups).toEqual({"strong":[{"range": [0,19]}]});
      expect(blocks[2].markups).toEqual({"strong":[{"range": [0,4]}]});
    });

    it('should remove markup for a single block', () => {
      var block = {
        "id": "c6a8",
        "type": "p",
        "text": "this is my formatted text",
        "markups": {
          "strong": [{
            "range": [0,4]
          }]
        }
      };
      content.sections[0].blocks = [block];
      var manager = new ToggleMarkup(fromJS(content));

      var guids   = { anchor: 'c6a8', focus: 'c6a8' };
      var offsets = { anchor: 0, focus: 4 };
      var result = manager.execute(guids, offsets, { type: 'strong' });

      var blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].markups).toEqual({"strong":[]});
    });

    it('should remove markup across multiple blocks', () => {
      var block1 = {
        "id": "c6a7",
        "type": "p",
        "text": "You can imagine where it goes from here.",
        "markups": {
          "strong": [{
            "range": [2,40]
          }]
        }
      };
      var block2 = {
        "id": "c6a8",
        "type": "p",
        "text": "He fixes the cable?",
        "markups": {
          "strong": [{
            "range": [0,19]
          }]
        }
      };
      var block3 = {
        "id": "c6a9",
        "type": "p",
        "text": "Don't be fatuous, Jeffrey.",
        "markups": {
          "strong": [{
            "range": [0,4]
          }]
        }
      };

      content.sections[0].blocks = [block1, block2, block3];
      var manager = new ToggleMarkup(fromJS(content));

      var guids = { anchor: 'c6a7', focus: 'c6a9' };
      var offsets = { anchor: 2, focus: 4 };
      var result = manager.execute(guids, offsets, { type: 'strong' });

      var blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].markups).toEqual({"strong":[]});
      expect(blocks[1].markups).toEqual({"strong":[]});
      expect(blocks[2].markups).toEqual({"strong":[]});
    });
  });
});