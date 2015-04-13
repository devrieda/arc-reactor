var H2Key = require('../H2Key');

describe('H2Key', () => {
  var content, selection;

  beforeEach( () => {
    content = {
    };
    selection = {
    };
  });

  describe('#matches', () => {
    it('matches event for meta, alt, + 2', () => {
      var event = { metaKey: true, altKey: true, keyCode: 50 };
      var key = new H2Key(content, selection);

      assert(key.matches(event));
    });

    it('matches event for ctrl, alt, + 2', () => {
      var event = { ctrlKey: true, altKey: true, keyCode: 50 };
      var key = new H2Key(content, selection);

      assert(key.matches(event));
    });

    it("doesn't match event if meta or ctrl is not", () => {
      var event = { altKey: true, keyCode: 50 };
      var key = new H2Key(content, selection);

      assert(!key.matches(event));
    });

    it("doesn't match event if alt is not", () => {
      var event = { metaKey: true, keyCode: 50 };
      var key = new H2Key(content, selection);

      assert(!key.matches(event));
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
