import CenterKey from '../CenterKey';

describe('CenterKey', () => {
  describe('#matches', () => {
    it('matches event for meta and e', () => {
      const event = { metaKey: true, keyCode: 69 };
      assert(CenterKey.matches(event));
    });

    it('matches event for ctrl and b', () => {
      const event = { ctrlKey: true, keyCode: 69 };
      assert(CenterKey.matches(event));
    });

    it("doesn't match event if meta or ctrl is not", () => {
      const event = { keyCode: 69 };
      assert(!CenterKey.matches(event));
    });

    it("doesn't match event if alt is pressed", () => {
      const event = { metaKey: true, altKey: true, keyCode: 69 };
      assert(!CenterKey.matches(event));
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
