var expect = require('expect');
var assert = require('assert');
var sinon = require('sinon');

var ContentState = require('../../../lib/state/ContentState');
var SelectionState = require('../../../lib/state/SelectionState');
var ContentManager = require('../../../lib/modules/ContentManager');

var ItalicButton = require('../../../lib/actions/buttons/ItalicButton');

describe('ItalicButton', () => {

  before(() => {
    ContentState.set({});
    SelectionState.set({});
  })

  it('press adds italics to a single block', () => {
  })

  it('press removes italics from a single block', () => {
  })

  it('press adds italics across multiple blocks', () => {
  })

  it('press removes italics across multiple blocks', () => {
  })
})
