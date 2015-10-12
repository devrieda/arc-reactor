const OtherKey = require('../OtherKey');

describe('OtherKey', () => {
  let content, selection;

  beforeEach( () => {
    content = {
    };
    selection = {
    };
  });

  describe('#matches', () => {
    it('always matches event', () => {
      const key = new OtherKey(content, selection);
      assert(key.matches({}));
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
