var expect = require('expect');
var assert = require('assert');
var sinon = require('sinon');

var ContentState = require('../../../lib/state/ContentState');
var SelectionState = require('../../../lib/state/SelectionState');
var ContentManager = require('../../../lib/modules/ContentManager');

var QuoteButton = require('../../../lib/actions/buttons/QuoteButton');

describe('QuoteButton', () => {

  before(() => {
    ContentState.set({});
    SelectionState.set({});
  })

  it('press converts a block to be a quote', () => {
  })

  it('press converts a block from a quote', () => {
  })

  it('press converts blocks to quote across multiple blocks', () => {
  })

  it('press converts blocks from quote across multiple blocks', () => {
  })
})
