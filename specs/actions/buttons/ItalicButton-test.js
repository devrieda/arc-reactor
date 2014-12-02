var expect = require('expect');
var assert = require('assert');
var sinon = require('sinon');

var ContentState = require('../../../lib/state/ContentState');
var SelectionState = require('../../../lib/state/SelectionState');
var ItalicButton = require('../../../lib/actions/buttons/ItalicButton');

describe('ItalicButton', () => {

  before(() => {
    ContentState.set({});
    SelectionState.set({});
  })

  it('adds italics to a single block', () => {
  })

  it('removes italics from a single block', () => {
  })

  it('adds italics across multiple blocks', () => {
  })

  it('removes italics across multiple blocks', () => {
  })
})
