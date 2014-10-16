/** @jsx React.DOM */

jest.dontMock('../../app/components/EditorSection.js');

describe('Editor', function() {
  it('changes the text after click', function() {
    var React = require('react/addons');
    var EditorSection = require('../../app/components/EditorSection.js');
    var TestUtils = React.addons.TestUtils;

    var content = { blocks: [] };

    // Render a section
    var section = TestUtils.renderIntoDocument(
      <EditorSection content={content} />
    );

    // Simulate a click and verify that it is now On
    // var input = TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input');
    // TestUtils.Simulate.change(input);
    // expect(label.getDOMNode().textContent).toEqual('On');
  });
});

