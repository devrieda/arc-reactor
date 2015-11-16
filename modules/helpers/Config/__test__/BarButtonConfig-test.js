import BarButtonConfig from "../BarButtonConfig";
import SectionButton from '../../../plugins/section/SectionButton';

describe('BarButtonConfig', () => {
  beforeEach(function() {
    BarButtonConfig.reset();
    BarButtonConfig.use(SectionButton)
  });

  describe("#getItems", () => {
    it("retrieves list of default items", () => {
      expect(BarButtonConfig.getItems().length).to.equal(1);
    });
  });

  describe('#use', () => {
    it('should add item to stack', () => {
      const before = BarButtonConfig.getItems().length;

      const obj = { getName: () => 'foo' };
      BarButtonConfig.use(obj);

      const list = BarButtonConfig.getItems();

      expect(list.length - before).to.equal(1);
      expect(list[list.length - 1]).to.equal(obj);
    });

    it('should insert item before another in stack', () => {
      const before = BarButtonConfig.getItems().length;

      const obj = { getName: () => 'foo' };
      BarButtonConfig.use(obj, { before: 'section' });

      const list = BarButtonConfig.getItems();

      expect(list.length - before).to.equal(1);
      expect(list[0]).to.equal(obj);
    });

    it('should insert item after another in stack', () => {
      const before = BarButtonConfig.getItems().length;

      const obj = { getName: () => 'foo' };
      BarButtonConfig.use(obj, { after: 'section' });

      const list = BarButtonConfig.getItems();

      expect(list.length - before).to.equal(1);
      expect(list[1]).to.equal(obj);
    });
  });

  describe('#remove', () => {
    it('should remove an item from the stack', () => {
      const before = BarButtonConfig.getItems().length;

      BarButtonConfig.remove('section');

      const list = BarButtonConfig.getItems();
      expect(before - list.length).to.equal(1);
    });
  });
});
