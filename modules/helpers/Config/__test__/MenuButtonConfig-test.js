import expect from 'expect';
import MenuButtonConfig from "../MenuButtonConfig";

describe('MenuButtonConfig', () => {
  beforeEach(function() {
    MenuButtonConfig.reset();
  });

  describe("#getItems", () => {
    it("retrieves list of default items", () => {
      expect(MenuButtonConfig.getItems().length).toEqual(6);
    });
  });

  describe('#use', () => {
    it('should add item to stack', () => {
      const before = MenuButtonConfig.getItems().length;

      MenuButtonConfig.use('foo');

      const list = MenuButtonConfig.getItems();

      expect(list.length - before).toEqual(1);
      expect(list[list.length - 1]).toBe('foo');
    });

    it('should insert item before another in stack', () => {
      const before = MenuButtonConfig.getItems().length;

      MenuButtonConfig.use('foo', { before: 'bold' });

      const list = MenuButtonConfig.getItems();

      expect(list.length - before).toEqual(1);
      expect(list[0]).toBe('foo');
    });

    it('should insert item after another in stack', () => {
      const before = MenuButtonConfig.getItems().length;

      MenuButtonConfig.use('foo', { after: 'bold' });

      const list = MenuButtonConfig.getItems();

      expect(list.length - before).toEqual(1);
      expect(list[1]).toBe('foo');
    });
  });

  describe('#remove', () => {
    it('should remove an item from the stack', () => {
      const before = MenuButtonConfig.getItems().length;

      MenuButtonConfig.remove('bold');

      const list = MenuButtonConfig.getItems();
      expect(before - list.length).toEqual(1);
    });
  });
});
