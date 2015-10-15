import assert from 'assert';
import React from 'react/addons';
import { fromJS } from 'immutable';
import ImageButton from '../ImageUploadButton';

const TestUtils = React.addons.TestUtils;
const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;

describe('ImageUploadButton', () => {
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
