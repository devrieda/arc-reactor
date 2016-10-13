import React from 'react';
import TestUtils from 'react-addons-test-utils';
import H3 from '../H3';

const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;

describe('H3', () => {
  it('renders', () => {
    const block = render(
      <H3 id={'0000'} type={'h3'} text={'hey'} />
    );

    const component = findByClass(block, 'arc-Editor-Block--h3');
    expect(component).to.exist;
  });
});
