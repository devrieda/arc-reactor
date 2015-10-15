import H3Key from '../H3Key';

describe('H3Key', () => {
  let content, selection;

  beforeEach( () => {
    content = {
    };
    selection = {
    };
  });

  describe('#matches', () => {
    it('matches event for meta, alt, + 3', () => {
      const event = { metaKey: true, altKey: true, keyCode: 51 };
      const key = new H3Key(content, selection);

      assert(key.matches(event));
    });

    it('matches event for ctrl, alt, + 3', () => {
      const event = { ctrlKey: true, altKey: true, keyCode: 51 };
      const key = new H3Key(content, selection);

      assert(key.matches(event));
    });

    it("doesn't match event if meta or ctrl is not", () => {
      const event = { altKey: true, keyCode: 51 };
      const key = new H3Key(content, selection);

      assert(!key.matches(event));
    });

    it("doesn't match event if alt is not", () => {
      const event = { metaKey: true, keyCode: 51 };
      const key = new H3Key(content, selection);

      assert(!key.matches(event));
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
