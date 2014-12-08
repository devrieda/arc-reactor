var expect = require('expect');
var assert = require('assert');
var sinon = require('sinon');

var ContentState = require('../../../lib/state/ContentState');
var SelectionState = require('../../../lib/state/SelectionState');
var ContentManager = require('../../../lib/modules/ContentManager');

var Header3Button = require('../../../lib/actions/buttons/H3Button');

describe('H3Button', () => {

  before(() => {
    ContentState.set({});
    SelectionState.set({});
  })

  it('press converts a block to be a header', () => {
  })

  it('press converts a block from a header', () => {
  })

  it('press converts blocks to header across multiple blocks', () => {
  })

  it('press converts blocks from header across multiple blocks', () => {
  })
})
