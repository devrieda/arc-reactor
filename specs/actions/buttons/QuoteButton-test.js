var expect = require('expect');
var assert = require('assert');
var sinon = require('sinon');

var ContentState = require('../../../lib/state/ContentState');
var SelectionState = require('../../../lib/state/SelectionState');
var QuoteButton = require('../../../lib/actions/buttons/QuoteButton');

describe('QuoteButton', () => {

  before(() => {
    ContentState.set({});
    SelectionState.set({});
  })

  it('converts a block to be a quote', () => {
  })

  it('converts a block from a quote', () => {
  })

  it('converts blocks to quote across multiple blocks', () => {
  })

  it('converts blocks from quote across multiple blocks', () => {
  })
})
