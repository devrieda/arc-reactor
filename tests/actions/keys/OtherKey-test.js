var expect = require('expect');
var assert = require('assert');

var ContentManager = require('../../../lib/modules/ContentManager');
var OtherKey = require('../../../lib/actions/keys/OtherKey');

describe('OtherKey', () => {

  var manager, selection;

  beforeEach(() => {
    manager = {
      toggleMarkup: () => {},
      updateText: () => {},
      flush: () => {}
    }

    selection = {
      anchor: {guid: "56ef", blockOffset: 0},
      focus:  {guid: "56ef", blockOffset: 4},
      types:  ['p'],
      text:   "this",
      guids: () => { return { anchor: '56ef' } },
      offsets: () => {},
      isRange: () => { return false; },
      crossBlock: () => { return false; },
      begOfBlock: () => { return false; },
      endOfBlock: () => { return false; }
    }

    sinon.stub(document, "getElementsByName", () => {
      return [{textContent: 'foo'}]
    });

  })

  afterEach(() => {
    document.getElementsByName.restore();
  })

  describe('#press with caret selection', () => {

    describe('at the beginning of block', () => {
      it('should pass through and update text', () => {
        selection.begOfBlock = () => { return true; }

        var callback = sinon.spy();
        manager.updateText = callback;

        var button = new OtherKey(manager, selection);
        var result = button.press();
        assert(!result);
        assert(callback.called);
      })
    })
    describe('in the middle of a block', () => {
      it('should pass through and update text', () => {
        var callback = sinon.spy();
        manager.updateText = callback;

        var button = new OtherKey(manager, selection);
        var result = button.press();
        assert(!result);
        assert(callback.called);
      })
    })
    describe('at the end of block', () => {
      it('should pass through and update text', () => {
        selection.endOfBlock = () => { return true; }

        var callback = sinon.spy();
        manager.updateText = callback;

        var button = new OtherKey(manager, selection);
        var result = button.press();
        assert(!result);
        assert(callback.called);
      })
    })
  })

  describe('#press with range selection', () => {

    beforeEach(() => {
      selection.isRange = () => { return true; }
    })

    // describe('within a single block', () => {
    //   it('should pass through and update text', () => {
    //     var callback = sinon.spy();
    //     manager.updateText = callback;

    //     var button = new OtherKey(manager, selection);
    //     var result = button.press();
    //     assert(!result);
    //     assert(callback.called); 
    //   })
    // })
    // describe('across blocks', () => {
    //   it('should combine blocks', () => {
    //     selection.crossBlock = () => { return true; }

    //     var callback = sinon.spy();
    //     manager.combineBlocks = callback;

    //     var button = new OtherKey(manager, selection);
    //     var result = button.press();

    //     assert(callback.called);
    //   })
    // })
  })
})
