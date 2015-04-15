var BspaceKey = require('../BspaceKey');

describe('BspaceKey', () => {
  var content, selection;

  beforeEach( () => {
    content = {
    };
    selection = {
    };
  });

  describe('#matches', () => {
    it('matches event for bspace key', () => {
      var event = { keyCode: 8 };
      var key = new BspaceKey(content, selection);

      assert(key.matches(event));
    });

    it("doesn't match event if not bspace", () => {
      var event = {};
      var key = new BspaceKey(content, selection);

      assert(!key.matches(event));
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
    });
  });
});
