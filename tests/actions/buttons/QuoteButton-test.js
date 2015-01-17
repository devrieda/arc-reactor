var expect = require('expect');
var assert = require('assert');

var ContentManager = require('../../../lib/modules/ContentManager');
var QuoteButton = require('../../../lib/actions/buttons/QuoteButton');

describe('QuoteButton', () => {

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

      var button = new QuoteButton(manager, selection);
      var result = button.press();

      assert(manager.toggleBlockType.calledOnce);
      manager.toggleBlockType.restore();
    })
  })
})
