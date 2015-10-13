import expect from 'expect';
import { fromJS } from 'immutable';
import ToggleCenter from '../ToggleCenter';

describe('ToggleCenter', () => {
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
    it('should add center data for a single block', () => {
      const block = {
        "id": "c6a8",
        "type": "p",
        "text": "a"
      };
      content.sections[0].blocks = [block];
      const manager = new ToggleCenter(fromJS(content));

      const guids   = { anchor: 'c6a8', focus: 'c6a8' };
      const offsets = { anchor: 0, focus: 1 };
      const result = manager.execute(guids, offsets);

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].data).toEqual({align: 'center'});
    });

    it('should add center data across multiple blocks', () => {
      const block1 = {
        "id": "c6a8",
        "type": "p",
        "text": "a"
      };
      const block2 = {
        "id": "c6a9",
        "type": "p",
        "text": "b"
      };
      content.sections[0].blocks = [block1, block2];
      const manager = new ToggleCenter(fromJS(content));

      const guids   = { anchor: 'c6a8', focus: 'c6a9' };
      const offsets = { anchor: 0, focus: 1 };
      const result = manager.execute(guids, offsets);

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].data).toEqual({align: 'center'});
      expect(blocks[1].data).toEqual({align: 'center'});
    });

    it('should remove center data for a single block', () => {
      const block = {
        "id": "c6a8",
        "type": "p",
        "text": "a",
        "data": {"align": "center"}
      };
      content.sections[0].blocks = [block];
      const manager = new ToggleCenter(fromJS(content));

      const guids   = { anchor: 'c6a8', focus: 'c6a8' };
      const offsets = { anchor: 0, focus: 1 };
      const result = manager.execute(guids, offsets);

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].data).toEqual({});
    });

    it('should remove center data across multiple blocks', () => {
      const block1 = {
        "id": "c6a8",
        "type": "p",
        "text": "a",
        "data": {"align": "center"}
      };
      const block2 = {
        "id": "c6a9",
        "type": "p",
        "text": "b",
        "data": {"align": "center"}
      };
      content.sections[0].blocks = [block1, block2];
      const manager = new ToggleCenter(fromJS(content));

      const guids   = { anchor: 'c6a8', focus: 'c6a9' };
      const offsets = { anchor: 0, focus: 1 };
      const result = manager.execute(guids, offsets);

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].data).toEqual({});
      expect(blocks[1].data).toEqual({});
    });

    it('should center all blocks if a single one isnt centered', () => {
      const block1 = {
        "id": "c6a8",
        "type": "p",
        "text": "a",
        "data": {"align": "center"}
      };
      const block2 = {
        "id": "c6a9",
        "type": "p",
        "text": "b"
      };
      content.sections[0].blocks = [block1, block2];
      const manager = new ToggleCenter(fromJS(content));

      const guids   = { anchor: 'c6a8', focus: 'c6a9' };
      const offsets = { anchor: 0, focus: 1 };
      const result = manager.execute(guids, offsets);

      const blocks = result.content.toJS().sections[0].blocks;
      expect(blocks[0].data).toEqual({align: 'center'});
      expect(blocks[1].data).toEqual({align: 'center'});
    });
  });
});
