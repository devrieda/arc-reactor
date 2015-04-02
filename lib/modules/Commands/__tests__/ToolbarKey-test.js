var expect = require('expect');
var ToolbarKey = require('../ToolbarKey');

describe('ToolbarKey', () => {
  var content, selection;

  beforeEach( () => {
    content = {
    }
    selection = {
    }
  });

  describe('#matches', () => {
    it('matches event for alt and f10 keys', () => {
      var event = { altKey: true, keyCode: 121 };
      var key = new ToolbarKey(content, selection);

      assert(key.matches(event));
    });

    it("doesn't match event if no alt key", () => {
      var event = { keyCode: 121 };
      var key = new ToolbarKey(content, selection);

      assert(!key.matches(event));
    });

    it("doesn't match event if no f10 key", () => {
      var event = { altKey: true };
      var key = new ToolbarKey(content, selection);

      assert(!key.matches(event));
    });
  });

  describe('#execute', () => {
    it('modifies the selected content', () => {
      // TODO
    });
  });
});
