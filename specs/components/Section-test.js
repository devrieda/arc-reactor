/** @jsx React.DOM */

jest.dontMock('../../app/components/Section.js');

describe('Section', function() {
  it('changes the text after click', function() {
    var React = require('react/addons');
    var Section = require('../../app/components/Section.js');
    var TestUtils = React.addons.TestUtils;

    var content = { blocks: [] };

    // Render a section
    var section = TestUtils.renderIntoDocument(
      <Section content={content} />
    );

    // Simulate a click and verify that it is now On
    // var input = TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input');
    // TestUtils.Simulate.change(input);
    // expect(label.getDOMNode().textContent).toEqual('On');
  });
});
