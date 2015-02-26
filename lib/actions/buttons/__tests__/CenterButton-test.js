var expect = require('expect');
var assert = require('assert');

var CenterButton = require('../CenterButton');

describe('CenterButton', () => {

  var manager, selection;

  beforeEach(() => {
    manager = {
      toggleCenter: () => {},
      flush: () => {}
    }

    selection = {
      anchor: {guid: "56ef", blockOffset: 0},
      focus:  {guid: "56ef", blockOffset: 4},
      types:  ['p'],
      text:   "this",
      guids: () => {},
      offsets: () => {}
    }
  })

  describe('#press while left aligned', () => {
    it('sends toggleCenter to manager', () => {
      var callback = sinon.spy();
      manager.toggleCenter = callback;

      var button = new CenterButton(manager, selection);
      var result = button.press();

      assert(callback.called);
    })
  })
})
