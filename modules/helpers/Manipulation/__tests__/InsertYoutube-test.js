const expect = require('expect');

const { fromJS } = require('immutable');
const InsertYoutube = require('../InsertYoutube');

describe('InsertYoutube', () => {
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
              "text": ""
            }
          ]
        }
      ]
    };
  });

  describe('#execute', () => {
    it('should parse youtube url from the given src', () => {
      const manager = new InsertYoutube(fromJS(content));

      const guids = { anchor: 'c6a8', focus: 'c6a8' };
      const offsets = { anchor: 0, focus: 0 };

      // we should be able to parse all these formats
      const formats = [
        'http://www.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index',
        'http://www.youtube.com/user/IngridMichaelsonVEVO#p/a/u/1/0zM3nApSvMg',
        'http://www.youtube.com/v/0zM3nApSvMg?fs=1&amp;hl=en_US&amp;rel=0',
        'http://www.youtube.com/watch?v=0zM3nApSvMg#t=0m10s',
        'http://www.youtube.com/embed/0zM3nApSvMg?rel=0',
        'http://www.youtube.com/watch?v=0zM3nApSvMg',
        'http://youtu.be/0zM3nApSvMg'
      ];

      formats.forEach( (format) => {
        const options = { src: format };
        const result = manager.execute(guids, offsets, options);

        const blocks = result.content.toJS().sections[0].blocks;
        expect(blocks.length).toBe(1);
        expect(blocks[0].type).toBe('youtube');
        expect(blocks[0].text).toBe('');
        expect(blocks[0].meta.src).toBe('https://www.youtube.com/embed/0zM3nApSvMg');
      });
    });
  });
});
