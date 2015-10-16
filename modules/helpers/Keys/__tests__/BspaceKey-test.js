import BspaceKey from '../BspaceKey';

describe('BspaceKey', () => {

  describe('#matches', () => {
    it('matches event for bspace key', () => {
      const event = { keyCode: 8 };
      assert(BspaceKey.matches(event));
    });

    it("doesn't match event if not bspace", () => {
      const event = {};
      assert(!BspaceKey.matches(event));
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
