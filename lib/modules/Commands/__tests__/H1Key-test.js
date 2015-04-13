var H1Key = require('../H1Key');

describe('H1Key', () => {
  var content, selection;

  beforeEach( () => {
    content = {
    };
    selection = {
    };
  });

  describe('#matches', () => {
    it('matches event for meta, alt, + 1', () => {
      var event = { metaKey: true, altKey: true, keyCode: 49 };
      var key = new H1Key(content, selection);

      assert(key.matches(event));
    });

    it('matches event for ctrl, alt, + 1', () => {
      var event = { ctrlKey: true, altKey: true, keyCode: 49 };
      var key = new H1Key(content, selection);

      assert(key.matches(event));
    });

    it("doesn't match event if meta or ctrl is not", () => {
      var event = { altKey: true, keyCode: 49 };
      var key = new H1Key(content, selection);

      assert(!key.matches(event));
    });

    it("doesn't match event if alt is not", () => {
      var event = { metaKey: true, keyCode: 49 };
      var key = new H1Key(content, selection);

      assert(!key.matches(event));
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
