import expect from 'expect';
import { fromJS } from 'immutable';
import InsertImage from '../InsertImage';

describe('InsertImage', () => {
  let content;

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
      const manager = new InsertImage(fromJS(content));
      sinon.stub(manager, 'loadImage', Function.prototype);

      const guids = { anchor: 'c6a8', focus: 'c6a8' };
      const offsets = { anchor: 0, focus: 0 };

      const options = { src: 'http://example.com/foo.png' };
      const callback = Function.prototype;
      const result = manager.execute(guids, offsets, options, callback);

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks.length).toBe(1);
      expect(blocks[0].text).toBe('inserting image...');
    });

    it('should request to load image', () => {
      const manager = new InsertImage(fromJS(content));
      sinon.stub(manager, 'loadImage', Function.prototype);

      const guids = { anchor: 'c6a8', focus: 'c6a8' };
      const offsets = { anchor: 0, focus: 0 };

      const options = { src: 'http://example.com/foo.png' };
      const callback = Function.prototype;
      manager.execute(guids, offsets, options, callback);

      expect(manager.loadImage.called).toBe(true);
    });
  });
});
