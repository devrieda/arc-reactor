var UndoKey = require('../UndoKey');

describe('UndoKey', () => {
  var content, selection;

  beforeEach( () => {
    content = {
    };
    selection = {
    };
  });

  describe('#matches', () => {
    it('matches event for meta and z', () => {
      var event = { metaKey: true, keyCode: 90 };
      var key = new UndoKey(content, selection);

      assert(key.matches(event));
    });

    it('matches event for ctrl and z', () => {
      var event = { ctrlKey: true, keyCode: 90 };
      var key = new UndoKey(content, selection);

      assert(key.matches(event));
    });

    it("doesn't match event if meta or ctrl is not", () => {
      var event = { keyCode: 90 };
      var key = new UndoKey(content, selection);

      assert(!key.matches(event));
    });

    it("doesn't match event if shift is pressed", () => {
      var event = { metaKey: true, shiftKey: true, keyCode: 90 };
      var key = new UndoKey(content, selection);

      assert(!key.matches(event));
    });

    it("doesn't match event if alt is pressed", () => {
      var event = { metaKey: true, altKey: true, keyCode: 90 };
      var key = new UndoKey(content, selection);

      assert(!key.matches(event));
    });
  });

  describe('#execute', () => {
    it('pops off the history stack', () => {
    });
  });
});
