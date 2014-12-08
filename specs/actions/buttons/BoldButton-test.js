var expect = require('expect');
var assert = require('assert');
var sinon = require('sinon');

var ContentState = require('../../../lib/state/ContentState');
var SelectionState = require('../../../lib/state/SelectionState');
var ContentManager = require('../../../lib/modules/ContentManager');

var BoldButton = require('../../../lib/actions/buttons/BoldButton');

describe('BoldButton', () => {

  beforeEach(() => {
  })

  describe('#press', () => {

    it('adds bold to a single block', () => {
      var manager = new ContentManager({});
      var callback = sinon.spy();

      var selection = {
        anchor: {guid: "56ef", blockOffset: 0},
        focus:  {guid: "56ef", blockOffset: 4},
        types:  ['p'],
        text:   "this",
        hasType: () => {},
        addType: () => {},
        removeType: () => {}
      }

      // var button = new BoldButton(manager, selection);
      // var result = button.press();

      // var result = ContentState.get();
      // console.log(JSON.stringify(result.content, null, 4))
    })

    it('removes bold from a single block', () => {
    })

    it('adds bold across multiple blocks', () => {
    })

    it('removes bold across multiple blocks', () => {
    })
  })
})
