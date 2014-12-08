var expect = require('expect');
var assert = require('assert');
var sinon = require('sinon');

var ContentManager = require('../../../lib/modules/ContentManager');
var CenterButton = require('../../../lib/actions/buttons/CenterButton');

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
      guids: () => {}
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

    it('toggles selection centered', () => {
      selection.centered = false

      var button = new CenterButton(manager, selection);
      var result = button.press();

      assert(selection.centered);
    })

  })

  describe('#press while centered', () => {
    it('toggles selection centered', () => {
      selection.centered = true 

      var button = new CenterButton(manager, selection);
      var result = button.press();

      assert(!selection.centered);
    })

  })
})
