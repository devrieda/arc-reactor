var expect = require('expect');
var assert = require('assert');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var findByClass = TestUtils.findRenderedDOMComponentWithClass

var ContentState = require('../../lib/state/ContentState');
var Content = require('../../lib/components/Content.js');

describe('Content', () => {
  it('should callback on change', () => {
    var called = false;
    var changed = () => { called = true };

    var content = TestUtils.renderIntoDocument(
      <Content onChange={changed} />
    );

    // changes trigger callback
    var component = findByClass(content, 'ic-Editor-Content');
    TestUtils.Simulate.input(component, {key: "a"});
    expect(called).toBe(true);
  })

  it('should reselect selection when updated', () => {
    var changed = function() {};

    var content = TestUtils.renderIntoDocument(
      <Content onChange={changed} />
    );

    var callback = sinon.spy();
    ContentState.set({selection: {
      reselect: callback,
      rebound: () => {}
    }});
    content.checkSelection();

    assert(callback.called)
  })


  // actions
  it('should delegate typing to actions on key up', () => {
    var changed = function() {};

    var content = TestUtils.renderIntoDocument(
      <Content onChange={changed} />
    );
    var component = findByClass(content, 'ic-Editor-Content');

    var callback = sinon.spy()
    content.key.type = callback();
    TestUtils.Simulate.keyDown(component, {key: "b"});

    assert(callback.called);
  })

  it('should set meta key on key down', () => {
    var changed = function() {};

    var content = TestUtils.renderIntoDocument(
      <Content onChange={changed} />
    );

    assert(!content.metaKey)
    var component = findByClass(content, 'ic-Editor-Content');
    TestUtils.Simulate.keyDown(component, {keyCode: 91});
    assert(content.metaKey)
  })

  it('should call action from intent', () => {
    var changed = function() {};

    var content = TestUtils.renderIntoDocument(
      <Content onChange={changed} />
    );

    var callback = sinon.spy();
    content.key.press = callback;
    var component = findByClass(content, 'ic-Editor-Content');
    TestUtils.Simulate.keyDown(component, {keyCode: 91});
    TestUtils.Simulate.keyDown(component, {keyCode: 66});

    assert(callback.called);
  })


  // rendering
  it('should render sections', () => {
    var changed = function() {};

    var content = TestUtils.renderIntoDocument(
      <Content onChange={changed} />
    );
    var data = {"sections": [
      { "id": "0000", "blocks": [] }
    ]};
    ContentState.set({content: data});

    var component = findByClass(content, 'ic-Editor-Section');
    assert(component);
  })
});
