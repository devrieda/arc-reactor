import DeleteKey from '../DeleteKey';

describe('DeleteKey', () => {

  describe('#matches', () => {
    it('matches event for delete key', () => {
      const event = { keyCode: 46 };
      expect(DeleteKey.matches(event)).to.be.true;
    });

    it("doesn't match event if not delete", () => {
      const event = {};
      expect(DeleteKey.matches(event)).to.be.false;
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
