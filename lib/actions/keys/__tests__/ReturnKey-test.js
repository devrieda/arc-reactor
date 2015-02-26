var expect = require('expect');
var assert = require('assert');

var ReturnKey = require('../ReturnKey');

describe('ReturnKey', () => {

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
      it('should prepend an empty block', () => {
        selection.begOfBlock = () => { return true; }

        var callback = sinon.spy();
        manager.prependBlock = callback;

        var button = new ReturnKey(manager, selection);
        var result = button.press();
        assert(result);
        assert(callback.called);
      })
    })
    describe('in the middle of a block', () => {
      it('should split the current block', () => {
        var callback = sinon.spy();
        manager.splitBlock = callback;

        var button = new ReturnKey(manager, selection);
        var result = button.press();
        assert(result);
        assert(callback.called);
      })
    })
    describe('at the end of block', () => {
      it('should append an empty block', () => {
        selection.endOfBlock = () => { return true; }

        var callback = sinon.spy();
        manager.appendBlock = callback;

        var button = new ReturnKey(manager, selection);
        var result = button.press();
        assert(result);
        assert(callback.called);
      })
    })
  })

  describe('#press with range selection', () => {

    beforeEach(() => {
      selection.isRange = () => { return true; }
    })

    describe('within a single block', () => {
      it('should split the block', () => {
        var callback = sinon.spy();
        manager.splitBlock = callback;

        var button = new ReturnKey(manager, selection);
        var result = button.press();
        assert(callback.called);
        assert(result);
      })
    })
    describe('across blocks', () => {
      it('should split the selected blocks', () => {
        selection.crossBlock = () => { return true; }

        var callback = sinon.spy();
        manager.splitBlock = callback;

        var button = new ReturnKey(manager, selection);
        var result = button.press();
        assert(result);
        assert(callback.called);
      })
    })
  })
})
