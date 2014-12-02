var expect = require('expect');
var assert = require('assert');
var sinon = require('sinon');

var ContentState = require('../../../lib/state/ContentState');
var SelectionState = require('../../../lib/state/SelectionState');
var CenterButton = require('../../../lib/actions/buttons/CenterButton');

describe('CenterButton', () => {

  before(() => {
    ContentState.set({});
    SelectionState.set({});
  })

  it('centers a single block', () => {
  })

  it('left aligns a single block', () => {
  })

  it('centers across multiple blocks', () => {
  })

  it('left aligns across multiple blocks', () => {
  })
})
