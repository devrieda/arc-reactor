var expect = require('expect');
var assert = require('assert');

var ContentManager = require('../../../lib/modules/ContentManager');
var BspaceKey = require('../../../lib/actions/keys/BspaceKey');

describe('BspaceKey', () => {

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
      offsets: () => {},
      isRange: () => { return false; },
      crossBlock: () => { return false; },
      begOfBlock: () => { return false; },
      endOfBlock: () => { return false; }
    }
  })

  describe('#press with caret selection', () => {

    describe('at the beginning of block', () => {
      it('should combine block with previous block', () => {
        selection.begOfBlock = () => { return true; }

        var callback = sinon.spy();
        manager.combineBlockWithPrevious = callback;

        var button = new BspaceKey(manager, selection);
        var result = button.press();

        assert(callback.called);
      })
    })
    describe('in the middle of a block', () => {
      it('should pass through', () => {
        var button = new BspaceKey(manager, selection);
        var result = button.press();
        assert(!result)
      })
    })
    describe('at the end of block', () => {
      it('should pass through', () => {
        selection.endOfBlock = () => { return true; }

        var button = new BspaceKey(manager, selection);
        var result = button.press();
        assert(!result)
      })
    })
  })

  describe('#press with range selection', () => {

    beforeEach(() => {
      selection.isRange = () => { return true; }
    })

    describe('within a single block', () => {
      it('should pass through', () => {
        var button = new BspaceKey(manager, selection);
        var result = button.press();
        assert(!result)
      })
    })
    describe('across blocks', () => {
      it('should combine blocks', () => {
        selection.crossBlock = () => { return true; }

        var callback = sinon.spy();
        manager.combineBlocks = callback;

        var button = new BspaceKey(manager, selection);
        var result = button.press();

        assert(callback.called);
      })
    })
  })
})
