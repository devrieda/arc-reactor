import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Code from '../Code';

const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;

describe('Code', () => {
  it('renders', () => {
    const block = render(
      <Code id={'0000'} type={'pre'} text={'hey'} />
    );

    const component = findByClass(block, 'arc-Editor-Block--pre');
    expect(component).to.exist;
  });
});
