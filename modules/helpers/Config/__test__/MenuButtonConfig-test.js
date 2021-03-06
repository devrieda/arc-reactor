import MenuButtonConfig from '../MenuButtonConfig';
import BoldKey from '../../../plugins/bold/BoldKey';
import ItalicKey from '../../../plugins/italic/ItalicKey';

describe('MenuButtonConfig', () => {
  beforeEach(function() {
    MenuButtonConfig.reset();
    MenuButtonConfig.use(ItalicKey)
    MenuButtonConfig.use(BoldKey, { before: 'italic' })
  });

  describe("#getItems", () => {
    it("retrieves list of default items", () => {
      expect(MenuButtonConfig.getItems().length).to.equal(2);
    });
  });

  describe('#use', () => {
    it('should add item to stack', () => {
      const before = MenuButtonConfig.getItems().length;

      const obj = { getName: () => 'foo' };
      MenuButtonConfig.use(obj);

      const list = MenuButtonConfig.getItems();

      expect(list.length - before).to.equal(1);
      expect(list[list.length - 1]).to.equal(obj);
    });

    it('should insert item before another in stack', () => {
      const before = MenuButtonConfig.getItems().length;

      const obj = { getName: () => 'foo' };
      MenuButtonConfig.use(obj, { before: 'bold' });

      const list = MenuButtonConfig.getItems();

      expect(list.length - before).to.equal(1);
      expect(list[0]).to.equal(obj);
    });

    it('should insert item after another in stack', () => {
      const before = MenuButtonConfig.getItems().length;

      const obj = { getName: () => 'foo' };
      MenuButtonConfig.use(obj, { after: 'bold' });

      const list = MenuButtonConfig.getItems();

      expect(list.length - before).to.equal(1);
      expect(list[1]).to.equal(obj);
    });
  });

  describe('#remove', () => {
    it('should remove an item from the stack', () => {
      const before = MenuButtonConfig.getItems().length;

      MenuButtonConfig.remove('bold');

      const list = MenuButtonConfig.getItems();
      expect(before - list.length).to.equal(1);
    });
  });
});
