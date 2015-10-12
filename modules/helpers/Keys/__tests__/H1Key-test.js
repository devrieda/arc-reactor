const H1Key = require('../H1Key');

describe('H1Key', () => {
  let content, selection;

  beforeEach( () => {
    content = {
    };
    selection = {
    };
  });

  describe('#matches', () => {
    it('matches event for meta, alt, + 1', () => {
      const event = { metaKey: true, altKey: true, keyCode: 49 };
      const key = new H1Key(content, selection);

      assert(key.matches(event));
    });

    it('matches event for ctrl, alt, + 1', () => {
      const event = { ctrlKey: true, altKey: true, keyCode: 49 };
      const key = new H1Key(content, selection);

      assert(key.matches(event));
    });

    it("doesn't match event if meta or ctrl is not", () => {
      const event = { altKey: true, keyCode: 49 };
      const key = new H1Key(content, selection);

      assert(!key.matches(event));
    });

    it("doesn't match event if alt is not", () => {
      const event = { metaKey: true, keyCode: 49 };
      const key = new H1Key(content, selection);

      assert(!key.matches(event));
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
