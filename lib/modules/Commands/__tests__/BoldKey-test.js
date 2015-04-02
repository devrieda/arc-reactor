var expect = require('expect');
var BoldKey = require('../BoldKey');

describe('BoldKey', () => {
  var content, selection;

  beforeEach( () => {
    content = {
      sections: [
        {
          id: "de5f",
          blocks: [
            {
              id: "56ef",
              type: "p",
              text: "this is the first paragraph"
            }
          ]
        }
      ]
    };

    selection = {
      anchor: {guid: "56ef", blockOffset: 0},
      focus:  {guid: "56ef", blockOffset: 4},
      types:  ['p'],
      text:   "this",
      guids: () => {},
      offsets: () => {}
    };
  });

  describe('#matches', () => {
    it('matches event for meta and b', () => {
      var event = { metaKey: true, keyCode: 66 };
      var key = new BoldKey(content, selection);

      assert(key.matches(event));
    });

    it('matches event for ctrl and b', () => {
      var event = { ctrlKey: true, keyCode: 66 };
      var key = new BoldKey(content, selection);

      assert(key.matches(event));
    });

    it("doesn't match event if meta or ctrl is not", () => {
      var event = { keyCode: 66 };
      var key = new BoldKey(content, selection);

      assert(!key.matches(event));
    });

    it("doesn't match event if alt is pressed", () => {
      var event = { metaKey: true, altKey: true, keyCode: 66 };
      var key = new BoldKey(content, selection);

      assert(!key.matches(event));
    });
  });

  describe('#execute', () => {
    it('sends message to manipulate content', () => {

    });
  });
});
