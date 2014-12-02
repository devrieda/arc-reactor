var expect = require('expect');
var assert = require('assert');
var sinon = require('sinon');

var ContentState = require('../../../lib/state/ContentState');
var SelectionState = require('../../../lib/state/SelectionState');
var BoldButton = require('../../../lib/actions/buttons/BoldButton');

describe('BoldButton', () => {

  before(() => {
    ContentState.set({});
    SelectionState.set({});
  })

  it('adds bold to a single block', () => {
    var button = new BoldButton();
  })

  it('removes bold from a single block', () => {
  })

  it('adds bold across multiple blocks', () => {
  })

  it('removes bold across multiple blocks', () => {
  })
})
