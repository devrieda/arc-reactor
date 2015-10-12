const DeleteKey = require('../DeleteKey');

describe('DeleteKey', () => {
  let content, selection;

  beforeEach( () => {
    content = {
    };
    selection = {
    };
  });

  describe('#matches', () => {
    it('matches event for delete key', () => {
      const event = { keyCode: 46 };
      const key = new DeleteKey(content, selection);

      assert(key.matches(event));
    });

    it("doesn't match event if not delete", () => {
      const event = {};
      const key = new DeleteKey(content, selection);

      assert(!key.matches(event));
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
