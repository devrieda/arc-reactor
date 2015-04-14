var expect = require('expect');

var { fromJS } = require('immutable');
var CombineBlocks = require('../CombineBlocks');

describe('CombineBlocks', () => {
  var content;

  beforeEach(() => {
    content = {
      "sections": [
        {
          "id": "de5f",
          "blocks": [
            { "id": "c6a7", "type": "p", "text": "You can imagine where it goes from here." },
            { "id": "c6a8", "type": "p", "text": "He fixes the cable?" },
            { "id": "c6a9", "type": "p", "text": "Don't be fatuous, Jeffrey." }
          ]
        },
        {
          "id": "0010",
          "blocks": [
            { "id": "0011", "type": "p", "text": "the first block" },
            { "id": "0101", "type": "p", "text": "sometimes be a jerk" }
          ]
        }
      ]
    };
  });

  describe('#execute', () => {
    it('should combine multiple blocks', () => {
      var manager = new CombineBlocks(fromJS(content)); 
      var guids = { anchor: 'c6a7', focus: 'c6a9' };
      var offsets = { anchor: 8, focus: 6 };
      var result = manager.execute(guids, offsets);

      var blocks = result.content.toJS().sections[0].blocks;
      expect(blocks.length).toBe(1);
      expect(blocks[0].text).toBe('You can be fatuous, Jeffrey.');
    });

    it('should combine multiple blocks across sections and delete empty sects', () => {
      var manager = new CombineBlocks(fromJS(content)); 
      var guids = { anchor: 'c6a7', focus: '0101' };
      var offsets = { anchor: 8, focus: 10 };
      var result = manager.execute(guids, offsets);

      var expected = {
        "sections": [
          {
            "id": "de5f",
            "blocks": [
              { "id": "c6a7", "type": "p", "text": "You can be a jerk" }
            ]
          }
        ]
      };

      expect(result.content.toJS()).toEqual(expected);
    });

    it('should combine multiple blocks across sections and keep sects with blocks', () => {
      var manager = new CombineBlocks(fromJS(content)); 
      var guids = { anchor: 'c6a7', focus: '0011' };
      var offsets = { anchor: 8, focus: 10 };
      var result = manager.execute(guids, offsets);

      var expected = {
        "sections": [
          {
            "id": "de5f",
            "blocks": [
              { "id": "c6a7", "type": "p", "text": "You can block" },
              { "id": "0101", "type": "p", "text": "sometimes be a jerk" }
            ]
          }
        ]
      };

      expect(result.content.toJS()).toEqual(expected);
    });

  });
});
