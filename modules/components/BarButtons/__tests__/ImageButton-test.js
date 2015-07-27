var assert = require('assert');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var findByClass = TestUtils.findRenderedDOMComponentWithClass;
var render = TestUtils.renderIntoDocument;
var { fromJS } = require('immutable');

var ImageButton = require('../ImageButton');

describe('ImageButton', () => {
  it('should render', () => {
    var content = { sections: [] };
    var selection = {
      guids: () => {},
      offsets: () => {},
      position: () => {}
    };

    var component = render(
      <ImageButton content={fromJS(content)} selection={selection} />
    );

    var button = findByClass(component, 'ic-Editor-BarButton--image');
    assert(button);
  });
});
