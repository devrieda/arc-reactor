var expect = require('expect');
var assert = require('assert');
var sinon = require('sinon');

var ContentState = require('../../../lib/state/ContentState');
var SelectionState = require('../../../lib/state/SelectionState');
var ContentManager = require('../../../lib/modules/ContentManager');

var DeleteKey = require('../../../lib/actions/keys/DeleteKey');

describe('DeleteKey', () => {

  before(() => {
    ContentState.set({});
    SelectionState.set({});
  })

  describe('press with caret selection', () => {
    describe('at the beginning of block', () => {
    })
    describe('in the middle of a block', () => {
    })
    describe('at the end of block', () => {
    })
  })

  describe('press with range selection', () => {
    describe('within a single block', () => {
    })
    describe('across blocks', () => {
    })
  })
})
