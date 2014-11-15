var expect = require('expect');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var ContentState = require('../../lib/state/ContentState');
var Section = require('../../lib/components/Section.js');

describe('Section', function() {
  it('changes the text after click', function() {

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
