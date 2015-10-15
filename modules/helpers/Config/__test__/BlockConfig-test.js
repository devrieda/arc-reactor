import expect from 'expect';
import BlockConfig from "../BlockConfig";

describe('BlockConfig', () => {
  beforeEach(function() {
    BlockConfig.reset();
  });

  describe("#getItems", () => {
    it("retrieves list of default items", () => {
      expect(BlockConfig.getItems().length).toEqual(9);
    });
  });

  describe('#use', () => {
    it('should add item to stack', () => {
      const before = BlockConfig.getItems().length;

      BlockConfig.use('foo');

      const list = BlockConfig.getItems();

      expect(list.length - before).toEqual(1);
      expect(list[list.length - 1]).toBe('foo');
    });

    it('should insert item before another in stack', () => {
      const before = BlockConfig.getItems().length;

      BlockConfig.use('foo', { before: 'p' });

      const list = BlockConfig.getItems();

      expect(list.length - before).toEqual(1);
      expect(list[0]).toBe('foo');
    });

    it('should insert item after another in stack', () => {
      const before = BlockConfig.getItems().length;

      BlockConfig.use('foo', { after: 'p' });

      const list = BlockConfig.getItems();

      expect(list.length - before).toEqual(1);
      expect(list[1]).toBe('foo');
    });
  });

  describe('#remove', () => {
    it('should remove an item from the stack', () => {
      const before = BlockConfig.getItems().length;

      BlockConfig.remove('p');

      const list = BlockConfig.getItems();
      expect(before - list.length).toEqual(1);
    });
  });
});
