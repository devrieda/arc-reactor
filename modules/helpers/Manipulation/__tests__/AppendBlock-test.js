const expect = require('expect');

const { fromJS } = require('immutable');
const AppendBlock = require('../AppendBlock');

describe('AppendBlock', () => {
  let content;

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
    it('should start an ordered list if text starts with number', () => {
      const block = {
        "id": "c6a7",
        "type": "p",
        "text": "1. starting a list"
      };
      content.sections[0].blocks = [block];
      const manager = new AppendBlock(fromJS(content));
      const result = manager.execute({ anchor: 'c6a7' });

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].type).toBe('ol');
      expect(blocks[0].blocks[0].type).toBe('li');
      expect(blocks[0].blocks[0].text).toBe('starting a list');
    });

    it('should start an unordered list if text starts with *', () => {
      const block = {
        "id": "c6a7",
        "type": "p",
        "text": "* starting a list"
      };
      content.sections[0].blocks = [block];
      const manager = new AppendBlock(fromJS(content));
      const result = manager.execute({ anchor: 'c6a7' });

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].type).toBe('ul');
      expect(blocks[0].blocks[0].type).toBe('li');
      expect(blocks[0].blocks[0].text).toBe('starting a list');
    });

    it('should start an unordered list if text starts with -', () => {
      const block = {
        "id": "c6a7",
        "type": "p",
        "text": "- starting a list"
      };
      content.sections[0].blocks = [block];
      const manager = new AppendBlock(fromJS(content));
      const result = manager.execute({ anchor: 'c6a7' });

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].type).toBe('ul');
      expect(blocks[0].blocks[0].type).toBe('li');
      expect(blocks[0].blocks[0].text).toBe('starting a list');
    });

    it('should add item to a list', () => {
      const block = {
        "id": "c6a7",
        "type": "ul",
        "text": "",
        "blocks": [
          {
            "id": "56ed",
            "type": "li",
            "text": "first item"
          }
        ]
      };
      content.sections[0].blocks = [block];
      const manager = new AppendBlock(fromJS(content));
      const result = manager.execute({ anchor: '56ed' });

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].blocks.length).toBe(2);
      expect(blocks[0].blocks[1].type).toBe('li');
    });

    it('should finish a list', () => {
      const block = {
        "id": "c6a7",
        "type": "ul",
        "text": "",
        "blocks": [
          {
            "id": "56ed",
            "type": "li",
            "text": "first item"
          },
          {
            "id": "1212",
            "type": "li",
            "text": ""
          }
        ]
      };
      content.sections[0].blocks = [block];
      const manager = new AppendBlock(fromJS(content));
      const result = manager.execute({ anchor: '1212' });

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].blocks.length).toBe(1);

      // added it to the top level as a new paragraph instead
      expect(blocks.length).toBe(2);
      expect(blocks[1].type).toBe('p');
    });

    it('should create a new paragraph', () => {
      const block = {
        "id": "c6a7",
        "type": "h1",
        "text": "this is a header"
      };
      content.sections[0].blocks = [block];

      const manager = new AppendBlock(fromJS(content));
      const result = manager.execute({ anchor: 'c6a7' });

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks.length).toBe(2);
      expect(blocks[1].type).toBe('p');
    });
  });
});
