import ReturnKey from '../ReturnKey';

describe('ReturnKey', () => {

  describe('#matches', () => {
    it('matches event for delete key', () => {
      const event = { keyCode: 13 };
      expect(ReturnKey.matches(event)).to.be.true;
    });

    it('matches event for ctrl+m', () => {
      const event = { ctrlKey: true, keyCode: 77 };
      expect(ReturnKey.matches(event)).to.be.true;
    });

    it("doesn't match event if not delete", () => {
      const event = {};
      expect(ReturnKey.matches(event)).to.be.false;
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
