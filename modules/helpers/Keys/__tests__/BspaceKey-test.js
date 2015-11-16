import BspaceKey from '../BspaceKey';

describe('BspaceKey', () => {

  describe('#matches', () => {
    it('matches event for bspace key', () => {
      const event = { keyCode: 8 };
      expect(BspaceKey.matches(event)).to.be.true;
    });

    it("doesn't match event if not bspace", () => {
      const event = {};
      expect(BspaceKey.matches(event)).to.be.false;
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
