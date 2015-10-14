import expect from 'expect';
import BarButtonConfig from "../BarButtonConfig";

describe('BarButtonConfig', () => {
  beforeEach(function() {
    BarButtonConfig.reset();
  });

  describe("#getItems", () => {
    it("retrieves list of default items", () => {
      expect(BarButtonConfig.getItems().length).toEqual(2);
    });
  });

  describe('#use', () => {
    it('should add item to stack', () => {
      const before = BarButtonConfig.getItems().length;

      BarButtonConfig.use('foo');

      const list = BarButtonConfig.getItems();

      expect(list.length - before).toEqual(1);
      expect(list[list.length - 1]).toBe('foo');
    });

    it('should insert item before another in stack', () => {
      const before = BarButtonConfig.getItems().length;

      BarButtonConfig.use('foo', { before: 'image' });

      const list = BarButtonConfig.getItems();

      expect(list.length - before).toEqual(1);
      expect(list[0]).toBe('foo');
    });

    it('should insert item after another in stack', () => {
      const before = BarButtonConfig.getItems().length;

      BarButtonConfig.use('foo', { after: 'image' });

      const list = BarButtonConfig.getItems();

      expect(list.length - before).toEqual(1);
      expect(list[1]).toBe('foo');
    });
  });

  describe('#remove', () => {
    it('should remove an item from the stack', () => {
      const before = BarButtonConfig.getItems().length;

      BarButtonConfig.remove('image');

      const list = BarButtonConfig.getItems();
      expect(before - list.length).toEqual(1);
    });
  });
});
