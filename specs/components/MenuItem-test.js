var expect = require('expect');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var ContentState = require('../../lib/state/ContentState');
var MenuItem = require('../../lib/components/MenuItem');

describe('MenuItem', function() {

  var appDiv;
  before(function() {
    appDiv = document.body.appendChild(document.createElement('div'))
  })
  after(function() {
    document.body.removeChild(appDiv)
  })

  it('changes the text after click', function() {
    var props = {
      type: '',
      text: '',
      icon: null,
      selection: {}
    }

    // Render a section
    var section = TestUtils.renderIntoDocument(
      <MenuItem />
    );

    // Simulate a click and verify that it is now On
    // var input = TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input');
    // TestUtils.Simulate.change(input);
    // expect(label.getDOMNode().textContent).toEqual('On');
  });
});
