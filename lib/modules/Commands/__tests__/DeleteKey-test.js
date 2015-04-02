var expect = require('expect');
var DeleteKey = require('../DeleteKey');

describe('DeleteKey', () => {
  var content, selection;

  beforeEach( () => {
    content = {
    }
    selection = {
    }
  });

  describe('#matches', () => {
    it('matches event for delete key', () => {
      var event = { keyCode: 46 };
      var key = new DeleteKey(content, selection);

      assert(key.matches(event));
    });

    it("doesn't match event if not delete", () => {
      var event = {};
      var key = new DeleteKey(content, selection);

      assert(!key.matches(event));
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
