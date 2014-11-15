var expect = require('expect');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var ContentState = require('../../lib/state/ContentState');
var Editor = require('../../lib/components/Editor.js');

describe('Editor', () => {
  // state
  it('should set content state when mounted', () => {
    var changed = () => {};
    var content = {sections: []};

    // Render an editor
    var editor = TestUtils.renderIntoDocument(
      <Editor onChange={changed} content={content} />
    );

    expect(content).toEqual(ContentState.get().content)
  });

  it('should pass up change when content changes', () => {
    var passedUp = false;
    var changed = () => { passedUp = true };
    var content = {sections: []};

    // Render an editor
    var editor = TestUtils.renderIntoDocument(
      <Editor onChange={changed} content={content} />
    );

    // simulate typing in content
    var content = TestUtils.findRenderedDOMComponentWithClass(editor, 'ic-Editor-Content');
    TestUtils.Simulate.input(content, {key: "a"});

    expect(passedUp).toBe(true);
  });

  // rendering 
  it('should render content', () => {
  });

  it('should render menu', () => {

  });

  it('changes the text after click', () => {

    // Simulate a click and verify that it is now On
    // var input = TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input');
    // TestUtils.Simulate.change(input);
    // expect(label.getDOMNode().textContent).toEqual('On');
  });
});
