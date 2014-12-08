var expect = require('expect');
var assert = require('assert');
var sinon = require('sinon');

var ContentManager = require('../../../lib/modules/ContentManager');
var BoldButton = require('../../../lib/actions/buttons/BoldButton');

describe('BoldButton', () => {

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
      hasType: () => { return false; },
      addType: () => {},
      removeType: () => {}
    }
  })

  describe('#press while inactive', () => {

    it('sends toggleMarkup to manager', () => {
      var callback = sinon.spy();
      manager.toggleMarkup = callback;

      var button = new BoldButton(manager, selection);
      var result = button.press();

      assert(callback.called);
    })
    it('adds type to selection', () => {
      var callback = sinon.spy();
      selection.addType = callback;

      var button = new BoldButton(manager, selection);
      var result = button.press();

      assert(callback.called);
    })
  })

  describe('#press while active', () => {

    it('sends toggleMarkup to manager', () => {
      selection.hasType = () => { return true; }

      var callback = sinon.spy();
      manager.toggleMarkup = callback;

      var button = new BoldButton(manager, selection);
      var result = button.press();

      assert(callback.called);
    })

    it('removes type from selection', () => {
      selection.hasType = () => { return true; }

      var callback = sinon.spy();
      selection.removeType = callback;

      var button = new BoldButton(manager, selection);
      var result = button.press();

      assert(callback.called);
    })
  })
})
