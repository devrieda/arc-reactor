var expect = require('expect');
var assert = require('assert');

var BoldKey = require('../BoldKey');

describe('BoldKey', () => {

  var manager, selection;

  beforeEach(() => {
    manager = {
      toggleMarkup: () => {},
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

  describe('#press while inactive', () => {

    it('sends toggleMarkup to manager', () => {
      var callback = sinon.spy();
      manager.toggleMarkup = callback;

      var button = new BoldKey(manager, selection);
      var result = button.press();

      assert(callback.called);
    })
  })

  describe('#press while active', () => {

    it('sends toggleMarkup to manager', () => {
      selection.hasType = () => { return true; }

      var callback = sinon.spy();
      manager.toggleMarkup = callback;

      var button = new BoldKey(manager, selection);
      var result = button.press();

      assert(callback.called);
    })
  })
})
