import DeleteKey from '../DeleteKey';

describe('DeleteKey', () => {

  describe('#matches', () => {
    it('matches event for delete key', () => {
      const event = { keyCode: 46 };
      assert(DeleteKey.matches(event));
    });

    it("doesn't match event if not delete", () => {
      const event = {};
      assert(!DeleteKey.matches(event));
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
