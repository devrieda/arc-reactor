var expect = require('expect');
var assert = require('assert');
var sinon = require('sinon');

var ContentState = require('../../../lib/state/ContentState');
var SelectionState = require('../../../lib/state/SelectionState');
var OtherKey = require('../../../lib/actions/keys/OtherKey');

describe('OtherKey', () => {

  before(() => {
    ContentState.set({});
    SelectionState.set({});
  })

  describe('with caret selection', () => {
    describe('at the beginning of block', () => {
    })
    describe('in the middle of a block', () => {
    })
    describe('at the end of block', () => {
    })
  })

  describe('with range selection', () => {
    describe('within a single block', () => {
    })
    describe('across blocks', () => {
    })
  })
})
