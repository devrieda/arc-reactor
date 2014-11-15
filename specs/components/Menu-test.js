var expect = require('expect');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var ContentState = require('../../lib/state/ContentState');
var Menu = require('../../lib/components/Menu.js');

describe('Menu', function() {
  it('changes the text after click', function() {

    var content = { blocks: [] };

    // Render a section
    var section = TestUtils.renderIntoDocument(
      <Menu />
    );

    // Simulate a click and verify that it is now On
    // var input = TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input');
    // TestUtils.Simulate.change(input);
    // expect(label.getDOMNode().textContent).toEqual('On');
  });
});
