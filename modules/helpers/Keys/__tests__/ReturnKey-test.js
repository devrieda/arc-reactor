import ReturnKey from '../ReturnKey';

describe('ReturnKey', () => {
  let content, selection;

  beforeEach( () => {
    content = {
    };
    selection = {
    };
  });

  describe('#matches', () => {
    it('matches event for delete key', () => {
      const event = { keyCode: 13 };
      const key = new ReturnKey(content, selection);

      assert(key.matches(event));
    });

    it('matches event for ctrl+m', () => {
      const event = { ctrlKey: true, keyCode: 77 };
      const key = new ReturnKey(content, selection);

      assert(key.matches(event));
    });

    it("doesn't match event if not delete", () => {
      const event = {};
      const key = new ReturnKey(content, selection);

      assert(!key.matches(event));
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
