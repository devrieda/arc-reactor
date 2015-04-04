var expect = require('expect');
var ReturnKey = require('../ReturnKey');

describe('ReturnKey', () => {
  var content, selection;

  beforeEach( () => {
    content = {
    };
    selection = {
    };
  });

  describe('#matches', () => {
    it('matches event for delete key', () => {
      var event = { keyCode: 13 };
      var key = new ReturnKey(content, selection);

      assert(key.matches(event));
    });

    it('matches event for ctrl+m', () => {
      var event = { ctrlKey: true, keyCode: 77 };
      var key = new ReturnKey(content, selection);

      assert(key.matches(event));
    });

    it("doesn't match event if not delete", () => {
      var event = {};
      var key = new ReturnKey(content, selection);

      assert(!key.matches(event));
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
