/** @jsx React.DOM */

jest.dontMock('../../app/components/Block.js');

describe('Block', function() {
  it('changes the text after click', function() {
    var React = require('react/addons');
    var Block = require('../../app/components/Block.js');
    var TestUtils = React.addons.TestUtils;

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
