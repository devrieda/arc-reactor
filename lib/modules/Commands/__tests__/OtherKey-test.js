var expect = require('expect');
var OtherKey = require('../OtherKey');

describe('OtherKey', () => {
  var content, selection;

  beforeEach( () => {
    content = {
    }
    selection = {
    }
  });

  describe('#matches', () => {
    it('always matches event', () => {
      var key = new OtherKey(content, selection);
      assert(key.matches({}));
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
