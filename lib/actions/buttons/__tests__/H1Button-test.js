var expect = require('expect');
var assert = require('assert');

var H1Button = require('../H1Button');

describe('H1Button', () => {

  var manager, selection;

  beforeEach(() => {
    manager = {
      toggleBlockType: () => { return {}; },
      flush: () => {}
    }

    selection = {
      anchor: {guid: "56ef", blockOffset: 0},
      focus:  {guid: "56ef", blockOffset: 4},
      types:  ['p'],
      text:   "this",
      guids: () => {},
      offsets: () => {},
      replaceType: () => {}
    }
  })

  describe('#press', () => {
    it('sends toggleBlockType to manager', () => {
      sinon.spy(manager, "toggleBlockType");

      var button = new H1Button(manager, selection);
      var result = button.press();

      assert(manager.toggleBlockType.calledOnce);
      manager.toggleBlockType.restore();
    })
  })
})
