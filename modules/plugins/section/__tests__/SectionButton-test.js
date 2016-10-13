import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { fromJS } from 'immutable';
import SectionButton from '../SectionButton';

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
    expect(button).to.exist;
  });
});
