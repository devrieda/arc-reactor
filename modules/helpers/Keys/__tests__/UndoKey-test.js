const UndoKey = require('../UndoKey');

describe('UndoKey', () => {
  let content, selection;

  beforeEach( () => {
    content = {
    };
    selection = {
    };
  });

  describe('#matches', () => {
    it('matches event for meta and z', () => {
      const event = { metaKey: true, keyCode: 90 };
      const key = new UndoKey(content, selection);

      assert(key.matches(event));
    });

    it('matches event for ctrl and z', () => {
      const event = { ctrlKey: true, keyCode: 90 };
      const key = new UndoKey(content, selection);

      assert(key.matches(event));
    });

    it("doesn't match event if meta or ctrl is not", () => {
      const event = { keyCode: 90 };
      const key = new UndoKey(content, selection);

      assert(!key.matches(event));
    });

    it("doesn't match event if shift is pressed", () => {
      const event = { metaKey: true, shiftKey: true, keyCode: 90 };
      const key = new UndoKey(content, selection);

      assert(!key.matches(event));
    });

    it("doesn't match event if alt is pressed", () => {
      const event = { metaKey: true, altKey: true, keyCode: 90 };
      const key = new UndoKey(content, selection);

      assert(!key.matches(event));
    });
  });

  describe('#execute', () => {
    it('pops off the history stack', () => {
    });
  });
});
