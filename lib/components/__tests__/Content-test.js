var expect = require('expect');
var assert = require('assert');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var findByClass = TestUtils.findRenderedDOMComponentWithClass;
var Content = require('../Content.js');

describe('Content', () => {

  // actions
  it('should delegate typing to actions on key up', () => {
    var content = { sections: [] };
    var selection = {};

    var editorContent = TestUtils.renderIntoDocument(
      <Content content={content} selection={selection} />
    );
    var component = findByClass(editorContent, 'ic-Editor-Content');

    var callback = sinon.spy();
    editorContent.key.type = callback();
    TestUtils.Simulate.keyDown(component, {key: "b"});

    assert(callback.called);
  });

  it('should set meta key on key down', () => {
    var content = { sections: [] };
    var selection = {};

    var editorContent = TestUtils.renderIntoDocument(
      <Content content={content} selection={selection} />
    );

    assert(!editorContent.metaKey);
    var component = findByClass(editorContent, 'ic-Editor-Content');
    TestUtils.Simulate.keyDown(component, {keyCode: 91});
    assert(editorContent.metaKey);
  });

  it('should call action from intent', () => {
    var content = { sections: [] };
    var selection = {};

    var editorContent = TestUtils.renderIntoDocument(
      <Content content={content} selection={selection} />
    );

    var callback = sinon.spy();
    editorContent.key.press = callback;
    var component = findByClass(editorContent, 'ic-Editor-Content');
    TestUtils.Simulate.keyDown(component, {keyCode: 91});
    TestUtils.Simulate.keyDown(component, {keyCode: 66});

    assert(callback.called);
  });


  // rendering
  it('should render sections', () => {
    var content = {sections: [
      { "id": "0000", "blocks": [] }
    ]};

    var selection = {};

    var editorContent = TestUtils.renderIntoDocument(
      <Content content={content} selection={selection} />
    );

    var component = findByClass(editorContent, 'ic-Editor-Section');
    assert(component);
  });
});
