import UnderlineKey from '../UnderlineKey';

describe('UnderlineKey', () => {
  describe('#matches', () => {
    it('matches event for meta and e', () => {
      const event = { metaKey: true, keyCode: 85 };
      assert(UnderlineKey.matches(event));
    });

    it('matches event for ctrl and b', () => {
      const event = { ctrlKey: true, keyCode: 85 };
      assert(UnderlineKey.matches(event));
    });

    it("doesn't match event if meta or ctrl is not", () => {
      const event = { keyCode: 85 };
      assert(!UnderlineKey.matches(event));
    });

    it("doesn't match event if alt is pressed", () => {
      const event = { metaKey: true, altKey: true, keyCode: 85 };
      assert(!UnderlineKey.matches(event));
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
