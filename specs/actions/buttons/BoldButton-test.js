var expect = require('expect');
var assert = require('assert');
var sinon = require('sinon');

var ContentState = require('../../../lib/state/ContentState');
var SelectionState = require('../../../lib/state/SelectionState');
var BoldButton = require('../../../lib/actions/buttons/BoldButton');

describe('BoldButton', () => {

  var content;

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
  })

  it('adds bold to a single block', () => {
    var selection = {
      anchor: {guid: "56ef", blockOffset: 0},
      focus:  {guid: "56ef", blockOffset: 4},
      types:  ['p'],
      text:   "this"
    }

    // var button = new BoldButton(content, selection);
    // button.press();

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
