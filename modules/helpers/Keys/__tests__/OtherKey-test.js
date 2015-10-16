import OtherKey from '../OtherKey';

describe('OtherKey', () => {

  describe('#matches', () => {
    it('always matches event', () => {
      assert(OtherKey.matches({}));
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
