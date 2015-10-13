import RedoKey from '../RedoKey';

describe('RedoKey', () => {
  let content, selection;

  beforeEach( () => {
    content = {
    };
    selection = {
    };
  });

  describe('#matches', () => {
    it('matches event for meta and y', () => {
      const event = { metaKey: true, keyCode: 89 };
      const key = new RedoKey(content, selection);

      assert(key.matches(event));
    });

    it('matches event for ctrl and y', () => {
      const event = { ctrlKey: true, keyCode: 89 };
      const key = new RedoKey(content, selection);

      assert(key.matches(event));
    });

    it('matches event for meta + shift + z', () => {
      const event = { metaKey: true, shiftKey: true, keyCode: 90 };
      const key = new RedoKey(content, selection);

      assert(key.matches(event));
    });

    it('matches event for ctrl + shift + z', () => {
      const event = { ctrlKey: true, shiftKey: true, keyCode: 90 };
      const key = new RedoKey(content, selection);

      assert(key.matches(event));
    });

    it("doesn't match event if meta or ctrl is not", () => {
      const event = { keyCode: 89 };
      const key = new RedoKey(content, selection);

      assert(!key.matches(event));
    });

    it("doesn't match event if alt is pressed", () => {
      const event = { metaKey: true, altKey: true, keyCode: 89 };
      const key = new RedoKey(content, selection);

      assert(!key.matches(event));
    });
  });

  describe('#execute', () => {
    it('pops onto the history stack', () => {
    });
  });
});
