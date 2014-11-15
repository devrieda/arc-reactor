var expect = require('expect');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var ContentState = require('../../lib/state/ContentState');
var Content = require('../../lib/components/Content.js');

describe('Content', function() {
  it('changes the text after click', function() {

    changed = function() {};

    // Render an editor
    var content = TestUtils.renderIntoDocument(
      <Content onChange={changed} />
    );

    // Simulate a click and verify that it is now On
    // var input = TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input');
    // TestUtils.Simulate.change(input);
    // expect(label.getDOMNode().textContent).toEqual('On');
  });
});
