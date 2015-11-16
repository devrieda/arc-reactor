import OtherKey from '../OtherKey';

describe('OtherKey', () => {

  describe('#matches', () => {
    it('always matches event', () => {
      expect(OtherKey.matches({})).to.be.true;
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
