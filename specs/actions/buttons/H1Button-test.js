var expect = require('expect');
var assert = require('assert');
var sinon = require('sinon');

var ContentState = require('../../../lib/state/ContentState');
var SelectionState = require('../../../lib/state/SelectionState');
var Header1Button = require('../../../lib/actions/buttons/H1Button');

describe('H1Button', () => {

  before(() => {
    ContentState.set({});
    SelectionState.set({});
  })

  it('converts a block to be a header', () => {
  })

  it('converts a block from a header', () => {
  })

  it('converts blocks to header across multiple blocks', () => {
  })

  it('converts blocks from header across multiple blocks', () => {
  })
})
