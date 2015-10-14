import assert from 'assert';
import React from 'react/addons';
import { fromJS } from 'immutable';
import SectionButton from '../SectionButton';

const TestUtils = React.addons.TestUtils;
const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;

describe('SectionButton', () => {
  it('should render', () => {
    const content = { sections: [] };
    const selection = {
      guids: () => {},
      offsets: () => {},
      position: () => {}
    };

    const component = render(
      <SectionButton content={fromJS(content)} selection={selection} />
    );

    const button = findByClass(component, 'arc-Editor-BarButton--section');
    assert(button);
  });
});
