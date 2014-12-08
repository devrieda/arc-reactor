var expect = require('expect');
var assert = require('assert');
var sinon = require('sinon');

var ContentState = require('../../../lib/state/ContentState');
var SelectionState = require('../../../lib/state/SelectionState');
var ContentManager = require('../../../lib/modules/ContentManager');

var LinkButton = require('../../../lib/actions/buttons/LinkButton');

describe('LinkButton', () => {

  before(() => {
    ContentState.set({});
    SelectionState.set({});
  })

  it('press adds link to a single block', () => {
  })

  it('press removes link from a single block', () => {
  })

  it('press adds link across multiple blocks', () => {
  })

  it('press removes link across multiple blocks', () => {
  })
})
