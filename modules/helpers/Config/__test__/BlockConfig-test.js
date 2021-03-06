import BlockConfig from "../BlockConfig";

describe('BlockConfig', () => {
  beforeEach(function() {
    BlockConfig.reset();
  });

  describe("#getItems", () => {
    it("retrieves list of default items", () => {
      expect(BlockConfig.getItems().length).to.equal(1);
    });
  });

  describe('#use', () => {
    it('should add item to stack', () => {
      const before = BlockConfig.getItems().length;

      const obj = { getName: () => 'foo' };
      BlockConfig.use(obj);

      const list = BlockConfig.getItems();

      expect(list.length - before).to.equal(1);
      expect(list[list.length - 1]).to.equal(obj);
    });

    it('should insert item before another in stack', () => {
      const before = BlockConfig.getItems().length;

      const obj = { getName: () => 'foo' };
      BlockConfig.use(obj, { before: 'p' });

      const list = BlockConfig.getItems();

      expect(list.length - before).to.equal(1);
      expect(list[0]).to.equal(obj);
    });

    it('should insert item after another in stack', () => {
      const before = BlockConfig.getItems().length;

      const obj = { getName: () => 'foo' };
      BlockConfig.use(obj, { after: 'p' });

      const list = BlockConfig.getItems();

      expect(list.length - before).to.equal(1);
      expect(list[1]).to.equal(obj);
    });
  });

  describe('#remove', () => {
    it('should remove an item from the stack', () => {
      const before = BlockConfig.getItems().length;

      BlockConfig.remove('p');

      const list = BlockConfig.getItems();
      expect(before - list.length).to.equal(1);
    });
  });
});
