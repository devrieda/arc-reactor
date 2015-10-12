const QuoteKey = require('../QuoteKey');

describe('QuoteKey', () => {
  let content, selection;

  beforeEach( () => {
    content = {
    };
    selection = {
    };
  });

  describe('#matches', () => {
    it('matches event for meta, alt, + 5', () => {
      const event = { metaKey: true, altKey: true, keyCode: 53 };
      const key = new QuoteKey(content, selection);

      assert(key.matches(event));
    });

    it('matches event for ctrl, alt, + 5', () => {
      const event = { ctrlKey: true, altKey: true, keyCode: 53 };
      const key = new QuoteKey(content, selection);

      assert(key.matches(event));
    });

    it("doesn't match event if meta or ctrl is not", () => {
      const event = { altKey: true, keyCode: 53 };
      const key = new QuoteKey(content, selection);

      assert(!key.matches(event));
    });

    it("doesn't match event if alt is not", () => {
      const event = { metaKey: true, keyCode: 53 };
      const key = new QuoteKey(content, selection);

      assert(!key.matches(event));
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
