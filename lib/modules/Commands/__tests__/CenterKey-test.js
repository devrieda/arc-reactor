var expect = require('expect');
var CenterKey = require('../CenterKey');

describe('CenterKey', () => {
  var content, selection;

  beforeEach( () => {
    content = {
    }
    selection = {
    }
  });

  describe('#matches', () => {
    it('matches event for meta and e', () => {
      var event = { metaKey: true, keyCode: 69 };
      var key = new CenterKey(content, selection);

      assert(key.matches(event));
    });

    it('matches event for ctrl and b', () => {
      var event = { ctrlKey: true, keyCode: 69 };
      var key = new CenterKey(content, selection);

      assert(key.matches(event));
    });

    it("doesn't match event if meta or ctrl is not", () => {
      var event = { keyCode: 69 };
      var key = new CenterKey(content, selection);

      assert(!key.matches(event));
    });

    it("doesn't match event if alt is pressed", () => {
      var event = { metaKey: true, altKey: true, keyCode: 69 };
      var key = new CenterKey(content, selection);

      assert(!key.matches(event));
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
