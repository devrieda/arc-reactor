var expect = require('expect');
var assert = require('assert');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var findByClass = TestUtils.findRenderedDOMComponentWithClass

var ContentState = require('../../lib/state/ContentState');
var Editor = require('../../lib/components/Editor.js');

describe('Editor', () => {
  // state
  it('should set content state when mounted', () => {
    var changed = () => {};
    var content = {sections: []};

    var editor = TestUtils.renderIntoDocument(
      <Editor onChange={changed} content={content} />
    );

    expect(content).toEqual(ContentState.get().content)
  });

  it('should pass up change when content changes', () => {
    var called = false;
    var changed = () => { called = true };
    var content = {sections: []};

    var editor = TestUtils.renderIntoDocument(
      <Editor onChange={changed} content={content} />
    );

    var component = findByClass(editor, 'ic-Editor-Content');
    TestUtils.Simulate.input(component, {key: "a"});
    expect(called).toBe(true);
  });


  // rendering 
  it('should render content', () => {
    var changed = () => { };
    var content = {sections: []};

    var editor = TestUtils.renderIntoDocument(
      <Editor onChange={changed} content={content} />
    );

    var component = findByClass(editor, 'ic-Editor-Content');
    assert(component);
  });

  it('should render menu', () => {
    var changed = () => { };
    var content = {sections: []};

    var editor = TestUtils.renderIntoDocument(
      <Editor onChange={changed} content={content} />
    );

    var menu = findByClass(editor, 'ic-Editor-Menu');
    assert(menu);
  });
});
