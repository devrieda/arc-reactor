import React from 'react';
import TestUtils from 'react-addons-test-utils';
import H2 from '../H2';

const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;

describe('H2', () => {
  it('renders', () => {
    const block = render(
      <H2 id={'0000'} type={'h2'} text={'hey'} />
    );

    const component = findByClass(block, 'arc-Editor-Block--h2');
    expect(component).to.exist;
  });
});
