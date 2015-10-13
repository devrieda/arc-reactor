import expect from 'expect';
import { fromJS } from 'immutable';
import ToggleMarkup from '../ToggleMarkup';

describe('ToggleMarkup', () => {
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
    it('should add markup for a single block', () => {
      const block = {
        "id": "c6a8",
        "type": "p",
        "text": "this is my formatted text"
      };
      content.sections[0].blocks = [block];
      const manager = new ToggleMarkup(fromJS(content));

      const guids   = { anchor: 'c6a8', focus: 'c6a8' };
      const offsets = { anchor: 0, focus: 4 };
      const result = manager.execute(guids, offsets, { type: 'strong' });

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].markups).toEqual({"strong":[{"range": [0,4]}]});
    });

    it('should add markup across multiple blocks', () => {
      const block1 = {
        "id": "c6a7",
        "type": "p",
        "text": "You can imagine where it goes from here."
      };
      const block2 = {
        "id": "c6a8",
        "type": "p",
        "text": "He fixes the cable?"
      };
      const block3 = {
        "id": "c6a9",
        "type": "p",
        "text": "Don't be fatuous, Jeffrey."
      };

      content.sections[0].blocks = [block1, block2, block3];
      const manager = new ToggleMarkup(fromJS(content));

      const guids = { anchor: 'c6a7', focus: 'c6a9' };
      const offsets = { anchor: 2, focus: 4 };
      const result = manager.execute(guids, offsets, { type: 'strong' });

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].markups).toEqual({"strong":[{"range": [2,40]}]});
      expect(blocks[1].markups).toEqual({"strong":[{"range": [0,19]}]});
      expect(blocks[2].markups).toEqual({"strong":[{"range": [0,4]}]});
    });

    it('should remove markup for a single block', () => {
      const block = {
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
      const manager = new ToggleMarkup(fromJS(content));

      const guids   = { anchor: 'c6a8', focus: 'c6a8' };
      const offsets = { anchor: 0, focus: 4 };
      const result = manager.execute(guids, offsets, { type: 'strong' });

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].markups).toEqual({"strong":[]});
    });

    it('should remove markup across multiple blocks', () => {
      const block1 = {
        "id": "c6a7",
        "type": "p",
        "text": "You can imagine where it goes from here.",
        "markups": {
          "strong": [{
            "range": [2,40]
          }]
        }
      };
      const block2 = {
        "id": "c6a8",
        "type": "p",
        "text": "He fixes the cable?",
        "markups": {
          "strong": [{
            "range": [0,19]
          }]
        }
      };
      const block3 = {
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
      const manager = new ToggleMarkup(fromJS(content));

      const guids = { anchor: 'c6a7', focus: 'c6a9' };
      const offsets = { anchor: 2, focus: 4 };
      const result = manager.execute(guids, offsets, { type: 'strong' });

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].markups).toEqual({"strong":[]});
      expect(blocks[1].markups).toEqual({"strong":[]});
      expect(blocks[2].markups).toEqual({"strong":[]});
    });
  });
});
