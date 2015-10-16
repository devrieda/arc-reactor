import expect from 'expect';
import KeyConfig from "../KeyConfig";

describe('KeyConfig', () => {
  beforeEach(function() {
    KeyConfig.reset();
  });

  describe("#getItems", () => {
    it("retrieves list of default items", () => {
      expect(KeyConfig.getItems().length).toEqual(8);
    });
  });

  describe('#use', () => {
    it('should add item to stack', () => {
      const before = KeyConfig.getItems().length;

      const obj = { getName: () => 'foo' };
      KeyConfig.use(obj);

      const list = KeyConfig.getItems();

      expect(list.length - before).toEqual(1);
      expect(list[list.length - 1]).toBe(obj);
    });

    it('should insert item before another in stack', () => {
      const before = KeyConfig.getItems().length;

      const obj = { getName: () => 'foo' };
      KeyConfig.use(obj, { before: 'return' });

      const list = KeyConfig.getItems();

      expect(list.length - before).toEqual(1);
      expect(list[0]).toBe(obj);
    });

    it('should insert item after another in stack', () => {
      const before = KeyConfig.getItems().length;

      const obj = { getName: () => 'foo' };
      KeyConfig.use(obj, { after: 'return' });

      const list = KeyConfig.getItems();

      expect(list.length - before).toEqual(1);
      expect(list[1]).toBe(obj);
    });
  });

  describe('#remove', () => {
    it('should remove an item from the stack', () => {
      const before = KeyConfig.getItems().length;

      KeyConfig.remove('return');

      const list = KeyConfig.getItems();
      expect(before - list.length).toEqual(1);
    });
  });
});
