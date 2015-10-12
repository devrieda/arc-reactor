const assert = require('assert');

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;
const { fromJS } = require('immutable');

const ImageButton = require('../ImageButton');

describe('ImageButton', () => {
  it('should render', () => {
    const content = { sections: [] };
    const selection = {
      guids: () => {},
      offsets: () => {},
      position: () => {}
    };

    const component = render(
      <ImageButton content={fromJS(content)} selection={selection} />
    );

    const button = findByClass(component, 'arc-Editor-BarButton--image');
    assert(button);
  });
});
