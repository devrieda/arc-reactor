var RedoKey = require('../RedoKey');

describe('RedoKey', () => {
  var content, selection;

  beforeEach( () => {
    content = {
    };
    selection = {
    };
  });

  describe('#matches', () => {
    it('matches event for meta and y', () => {
      var event = { metaKey: true, keyCode: 89 };
      var key = new RedoKey(content, selection);

      assert(key.matches(event));
    });

    it('matches event for ctrl and y', () => {
      var event = { ctrlKey: true, keyCode: 89 };
      var key = new RedoKey(content, selection);

      assert(key.matches(event));
    });

    it('matches event for meta + shift + z', () => {
      var event = { metaKey: true, shiftKey: true, keyCode: 90 };
      var key = new RedoKey(content, selection);

      assert(key.matches(event));
    });

    it('matches event for ctrl + shift + z', () => {
      var event = { ctrlKey: true, shiftKey: true, keyCode: 90 };
      var key = new RedoKey(content, selection);

      assert(key.matches(event));
    });

    it("doesn't match event if meta or ctrl is not", () => {
      var event = { keyCode: 89 };
      var key = new RedoKey(content, selection);

      assert(!key.matches(event));
    });

    it("doesn't match event if alt is pressed", () => {
      var event = { metaKey: true, altKey: true, keyCode: 89 };
      var key = new RedoKey(content, selection);

      assert(!key.matches(event));
    });
  });

  describe('#execute', () => {
    it('pops onto the history stack', () => {
    });
  });
});
