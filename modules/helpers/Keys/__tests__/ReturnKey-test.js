import ReturnKey from '../ReturnKey';

describe('ReturnKey', () => {

  describe('#matches', () => {
    it('matches event for delete key', () => {
      const event = { keyCode: 13 };
      assert(ReturnKey.matches(event));
    });

    it('matches event for ctrl+m', () => {
      const event = { ctrlKey: true, keyCode: 77 };
      assert(ReturnKey.matches(event));
    });

    it("doesn't match event if not delete", () => {
      const event = {};
      assert(!ReturnKey.matches(event));
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
