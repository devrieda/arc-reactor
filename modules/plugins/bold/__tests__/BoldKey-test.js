import BoldKey from '../BoldKey';

describe('BoldKey', () => {
  describe('#matches', () => {
    it('matches event for meta and b', () => {
      const event = { metaKey: true, keyCode: 66 };
      assert(BoldKey.matches(event));
    });

    it('matches event for ctrl and b', () => {
      const event = { ctrlKey: true, keyCode: 66 };
      assert(BoldKey.matches(event));
    });

    it("doesn't match event if meta or ctrl is not", () => {
      const event = { keyCode: 66 };
      assert(!BoldKey.matches(event));
    });

    it("doesn't match event if alt is pressed", () => {
      const event = { metaKey: true, altKey: true, keyCode: 66 };
      assert(!BoldKey.matches(event));
    });
  });

  describe('#execute', () => {
    it('sends message to manipulate content', () => {

    });
  });
});
