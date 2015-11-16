import { fromJS } from 'immutable';
import InsertSection from '../InsertSection';

describe('InsertSection', () => {
  let content;

  beforeEach(() => {
    content = {
      "sections": [
        {
          "id": "0000",
          "blocks": [
            {
              "id": "1000",
              "type": "p",
              "text": ""
            },
            {
              "id": "1001",
              "type": "p",
              "text": ""
            }
          ]
        }
      ]
    };
  });

  describe('#execute', () => {
    // content = {
    //   "sections": [
    //     {
    //       "id": "0000",
    //       "blocks": [
    //         {
    //           "id": "1000",
    //           "type": "p",
    //           "text": ""
    //         }
    //       ]
    //     },
    //     {
    //       "id": "0001",
    //       "blocks": [
    //         {
    //           "id": "1001",
    //           "type": "p",
    //           "text": ""
    //         }
    //       ]
    //     }
    //   ]
    // };
    it('prepends a section to the block', () => {
      const manager = new InsertSection(fromJS(content));

      const guids = { anchor: '1001', focus: '1001' };
      const offsets = { anchor: 0, focus: 0 };

      // we should be able to parse all these formats
      const result = manager.execute(guids, offsets);
      const sections = result.content.toJS().sections;
      expect(sections.length).to.equal(2);

      // first section
      expect(sections[0].blocks.length).to.equal(1);
      expect(sections[0].blocks[0].id).to.equal('1000');

      // second section
      expect(sections[1].blocks.length).to.equal(1);
      expect(sections[1].blocks[0].id).to.equal('1001');
    });

    it('makes sure that the section has at least one block', () => {
      const manager = new InsertSection(fromJS(content));

      const guids = { anchor: '1000', focus: '1000' };
      const offsets = { anchor: 0, focus: 0 };

      // we should be able to parse all these formats
      const result = manager.execute(guids, offsets);
      const sections = result.content.toJS().sections;
      expect(sections.length).to.equal(2);

      // first section
      expect(sections[0].blocks.length).to.equal(1);

      // second section
      expect(sections[1].blocks.length).to.equal(2);
      expect(sections[1].blocks[0].id).to.equal("1000");
      expect(sections[1].blocks[1].id).to.equal("1001");
    });


    it('works with multiple sections', () => {
      content = {
        "sections": [
          {
            "id": "de5f",
            "blocks": [
              {
                "id": "56ef",
                "type": "h2",
                "text": "History of Photography"
              },
              {
                "id": "666a",
                "type": "p",
                "text": ""
              },
              {
                "id": "6673",
                "type": "p",
                "text": "Photography is a word."
              },
            ]
          },
          {
            "id": "de00",
            "blocks": [
              {
                "id": "666a",
                "type": "p",
                "text": "abcd"
              },
            ]
          }
        ]
      }

      const manager = new InsertSection(fromJS(content));

      const guids = { anchor: '666a', focus: '666a' };
      const offsets = { anchor: 0, focus: 0 };

      // we should be able to parse all these formats
      const result = manager.execute(guids, offsets);
      const sections = result.content.toJS().sections;
      expect(sections.length).to.equal(3);

      // first section
      expect(sections[0].blocks.length).to.equal(1);
      expect(sections[0].blocks[0].id).to.equal("56ef");

      // second section
      expect(sections[1].blocks.length).to.equal(2);
      expect(sections[1].blocks[0].id).to.equal("666a");
      expect(sections[1].blocks[1].id).to.equal("6673");

      // third section
      expect(sections[2].blocks.length).to.equal(1);
      expect(sections[2].blocks[0].id).to.equal("666a");
    });
  });
});
