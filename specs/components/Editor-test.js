/** @jsx React.DOM */

jest.dontMock('../../app/components/Editor.js');

describe('Editor', () => {
  it('changes the text after click', () => {
    var React = require('react/addons');
    var Editor = require('../../app/components/Editor.js');
    var TestUtils = React.addons.TestUtils;

    changed = () => {};
    content = {sections: []};

    // Render an editor
    var editor = TestUtils.renderIntoDocument(
      <Editor onChange={changed} content={content} />
    );

    // Simulate a click and verify that it is now On
    // var input = TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input');
    // TestUtils.Simulate.change(input);
    // expect(label.getDOMNode().textContent).toEqual('On');
  });
});