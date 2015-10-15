import CodeKey from '../CodeKey';

describe('CodeKey', () => {
  let content, selection;

  beforeEach( () => {
    content = {
    };
    selection = {
    };
  });

  describe('#matches', () => {
    it('matches event for meta, alt, + 6', () => {
      const event = { metaKey: true, altKey: true, keyCode: 54 };
      const key = new CodeKey(content, selection);

      assert(key.matches(event));
    });

    it('matches event for ctrl, alt, + 6', () => {
      const event = { ctrlKey: true, altKey: true, keyCode: 54 };
      const key = new CodeKey(content, selection);

      assert(key.matches(event));
    });

    it("doesn't match event if meta or ctrl is not", () => {
      const event = { altKey: true, keyCode: 54 };
      const key = new CodeKey(content, selection);

      assert(!key.matches(event));
    });

    it("doesn't match event if alt is not", () => {
      const event = { metaKey: true, keyCode: 54 };
      const key = new CodeKey(content, selection);

      assert(!key.matches(event));
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
