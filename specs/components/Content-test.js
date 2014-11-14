/** @jsx React.DOM */

jest.dontMock('../../app/components/Content.js');

describe('Content', function() {
  it('changes the text after click', function() {
    var React = require('react/addons');
    var Content = require('../../app/components/Content.js');
    var TestUtils = React.addons.TestUtils;

    changed = function() {};
    content = {sections: []};

    // Render an editor
    var content = TestUtils.renderIntoDocument(
      <Content onChange={changed} content={content} />
    );

    // Simulate a click and verify that it is now On
    // var input = TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input');
    // TestUtils.Simulate.change(input);
    // expect(label.getDOMNode().textContent).toEqual('On');
  });
});
