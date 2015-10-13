import H2Key from '../H2Key';

describe('H2Key', () => {
  let content, selection;

  beforeEach( () => {
    content = {
    };
    selection = {
    };
  });

  describe('#matches', () => {
    it('matches event for meta, alt, + 2', () => {
      const event = { metaKey: true, altKey: true, keyCode: 50 };
      const key = new H2Key(content, selection);

      assert(key.matches(event));
    });

    it('matches event for ctrl, alt, + 2', () => {
      const event = { ctrlKey: true, altKey: true, keyCode: 50 };
      const key = new H2Key(content, selection);

      assert(key.matches(event));
    });

    it("doesn't match event if meta or ctrl is not", () => {
      const event = { altKey: true, keyCode: 50 };
      const key = new H2Key(content, selection);

      assert(!key.matches(event));
    });

    it("doesn't match event if alt is not", () => {
      const event = { metaKey: true, keyCode: 50 };
      const key = new H2Key(content, selection);

      assert(!key.matches(event));
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
