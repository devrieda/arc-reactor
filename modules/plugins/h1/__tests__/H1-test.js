import React from 'react';
import TestUtils from 'react-addons-test-utils';
import H1 from '../H1';

const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;

describe('H1', () => {
  it('renders', () => {
    const block = render(
      <H1 id={'0000'} type={'h1'} text={'hey'} />
    );

    const component = findByClass(block, 'arc-Editor-Block--h1');
    expect(component).to.exist;
  });
});
