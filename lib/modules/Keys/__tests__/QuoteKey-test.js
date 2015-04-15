var QuoteKey = require('../QuoteKey');

describe('QuoteKey', () => {
  var content, selection;

  beforeEach( () => {
    content = {
    };
    selection = {
    };
  });

  describe('#matches', () => {
    it('matches event for meta, alt, + 5', () => {
      var event = { metaKey: true, altKey: true, keyCode: 53 };
      var key = new QuoteKey(content, selection);

      assert(key.matches(event));
    });

    it('matches event for ctrl, alt, + 5', () => {
      var event = { ctrlKey: true, altKey: true, keyCode: 53 };
      var key = new QuoteKey(content, selection);

      assert(key.matches(event));
    });

    it("doesn't match event if meta or ctrl is not", () => {
      var event = { altKey: true, keyCode: 53 };
      var key = new QuoteKey(content, selection);

      assert(!key.matches(event));
    });

    it("doesn't match event if alt is not", () => {
      var event = { metaKey: true, keyCode: 53 };
      var key = new QuoteKey(content, selection);

      assert(!key.matches(event));
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
