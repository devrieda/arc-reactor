import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Quote from '../Quote';

const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;

describe('Quote', () => {
  it('renders', () => {
    const block = render(
      <Quote id={'0000'} type={'blockquote'} text={'hey'} />
    );

    const component = findByClass(block, 'arc-Editor-Block--blockquote');
    expect(component).to.exist;
  });
});
