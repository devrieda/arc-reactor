var expect = require('expect');
var assert = require('assert');
var sinon = require('sinon');

var ContentState = require('../../../lib/state/ContentState');
var SelectionState = require('../../../lib/state/SelectionState');
var ContentManager = require('../../../lib/modules/ContentManager');

var BoldButton = require('../../../lib/actions/buttons/BoldButton');

describe('BoldButton', () => {

  var content, manager;

  beforeEach(() => {
    content = {
      "sections": [
        {
          "id": "de5f",
          "blocks": [
            {
              "id": "56ef",
              "type": "p",
              "text": "this is the first paragraph"
            },
            {
              "id": "667a",
              "type": "p",
              "text": "and this is the second"
            }
          ]
        }
      ]
    }
    manager = new ContentManager(content);
  })

  it('press adds bold to a single block', () => {
    var selection = {
      anchor: {guid: "56ef", blockOffset: 0},
      focus:  {guid: "56ef", blockOffset: 4},
      types:  ['p'],
      text:   "this",
      hasType: () => {},
      addType: () => {},
      removeType: () => {}
    }

    var button = new BoldButton(manager, selection);
    button.press();

    // var result = ContentState.get();
    // console.log(JSON.stringify(result.content, null, 4))
  })

  it('press removes bold from a single block', () => {
  })

  it('press adds bold across multiple blocks', () => {
  })

  it('press removes bold across multiple blocks', () => {
  })
})
