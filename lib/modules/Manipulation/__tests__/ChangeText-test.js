var expect = require('expect');

var ChangeText = require('../ChangeText');

describe('ChangeText', () => {
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
    it('should update text in a block', () => {
      var block = {
        "id": "c6a8",
        "type": "p",
        "text": "cable?"
      };
      content.sections[0].blocks = [block];
      var manager = new ChangeText(content);

      var guids = { anchor: 'c6a8', focus: 'c6a8' };
      var result = manager.execute(guids, {}, { text: 'cable!!!' });

      var blocks = result.content.sections[0].blocks;
      expect(blocks[0].text).toBe('cable!!!');
    });
  });
});
