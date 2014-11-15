var expect = require('expect');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var ContentState = require('../../lib/state/ContentState');
var Block = require('../../lib/components/Block.js');

describe('Block', function() {
  it('changes the text after click', function() {

    var content = {type: "p"};

    // Render an block
    var block = TestUtils.renderIntoDocument(
      <Block content={content} />
    );

    // Simulate a click and verify that it is now On
    // var input = TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input');
    // TestUtils.Simulate.change(input);
    // expect(label.getDOMNode().textContent).toEqual('On');
  });
});
