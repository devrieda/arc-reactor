import CodeKey from '../CodeKey';

describe('CodeKey', () => {
  describe('#matches', () => {
    it('matches event for meta, alt, + 6', () => {
      const event = { metaKey: true, altKey: true, keyCode: 54 };
      assert(CodeKey.matches(event));
    });

    it('matches event for ctrl, alt, + 6', () => {
      const event = { ctrlKey: true, altKey: true, keyCode: 54 };
      assert(CodeKey.matches(event));
    });

    it("doesn't match event if meta or ctrl is not", () => {
      const event = { altKey: true, keyCode: 54 };
      assert(!CodeKey.matches(event));
    });

    it("doesn't match event if alt is not", () => {
      const event = { metaKey: true, keyCode: 54 };
      assert(!CodeKey.matches(event));
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
