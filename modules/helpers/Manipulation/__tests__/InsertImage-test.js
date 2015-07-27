var expect = require('expect');

var { fromJS } = require('immutable');
var InsertImage = require('../InsertImage');

describe('InsertImage', () => {
  var content;

  beforeEach(() => {
    content = {
      "sections": [
        {
          "id": "de5f",
          "blocks": [
            {
              "id": "c6a8",
              "type": "p",
              "text": "content text"
            }
          ]
        }
      ]
    };
  });

  describe('#execute', () => {
    it('should set content to inserting image... immediately', () => {
      var manager = new InsertImage(fromJS(content));
      sinon.stub(manager, 'loadImage', Function.prototype);

      var guids = { anchor: 'c6a8', focus: 'c6a8' };
      var offsets = { anchor: 0, focus: 0 };

      var options = { src: 'http://example.com/foo.png' };
      var callback = Function.prototype;
      var result = manager.execute(guids, offsets, options, callback);

      var blocks = result.content.toJS().sections[0].blocks;
      expect(blocks.length).toBe(1);
      expect(blocks[0].text).toBe('inserting image...');
    });

    it('should request to load image', () => {
      var manager = new InsertImage(fromJS(content));
      sinon.stub(manager, 'loadImage', Function.prototype);

      var guids = { anchor: 'c6a8', focus: 'c6a8' };
      var offsets = { anchor: 0, focus: 0 };

      var options = { src: 'http://example.com/foo.png' };
      var callback = Function.prototype;
      manager.execute(guids, offsets, options, callback);

      expect(manager.loadImage.called).toBe(true);
    });
  });
});
