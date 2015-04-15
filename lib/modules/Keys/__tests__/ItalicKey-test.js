var ItalicKey = require('../ItalicKey');

describe('ItalicKey', () => {
  var content, selection;

  beforeEach( () => {
    content = {
    };
    selection = {
    };
  });

  describe('#matches', () => {
    it('matches event for meta and e', () => {
      var event = { metaKey: true, keyCode: 73 };
      var key = new ItalicKey(content, selection);

      assert(key.matches(event));
    });

    it('matches event for ctrl and b', () => {
      var event = { ctrlKey: true, keyCode: 73 };
      var key = new ItalicKey(content, selection);

      assert(key.matches(event));
    });

    it("doesn't match event if meta or ctrl is not", () => {
      var event = { keyCode: 73 };
      var key = new ItalicKey(content, selection);

      assert(!key.matches(event));
    });

    it("doesn't match event if alt is pressed", () => {
      var event = { metaKey: true, altKey: true, keyCode: 73 };
      var key = new ItalicKey(content, selection);

      assert(!key.matches(event));
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
