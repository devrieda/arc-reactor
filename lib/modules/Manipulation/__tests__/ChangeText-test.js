var expect = require('expect');

var { fromJS } = require('immutable');
var ChangeText = require('../ChangeText');

describe('ChangeText', () => {
  var content;

  function createNode(html) {
    var p = document.createElement('p');
    p.innerHTML = html;
    return p;
  }

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
      var manager = new ChangeText(fromJS(content));

      var guids = { anchor: 'c6a8', focus: 'c6a8' };
      var result = manager.execute(guids, {},
        { text: 'cable!!!', node: createNode('this is some text') }
      );

      var blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].text).toBe('cable!!!');
    });

    it('should parse markup from a given node', () => {
    });
  });
});
