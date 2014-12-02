var expect = require('expect');
var assert = require('assert');
var sinon = require('sinon');

var ContentState = require('../../../lib/state/ContentState');
var SelectionState = require('../../../lib/state/SelectionState');
var LinkButton = require('../../../lib/actions/buttons/LinkButton');

describe('LinkButton', () => {

  before(() => {
    ContentState.set({});
    SelectionState.set({});
  })

  it('adds link to a single block', () => {
  })

  it('removes link from a single block', () => {
  })

  it('adds link across multiple blocks', () => {
  })

  it('removes link across multiple blocks', () => {
  })
})
