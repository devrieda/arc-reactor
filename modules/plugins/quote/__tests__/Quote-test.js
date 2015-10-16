import assert from 'assert';
import React from 'react/addons';
import Quote from '../Quote';

const TestUtils = React.addons.TestUtils;
const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;

describe('Quote', () => {
  it('renders', () => {
    const block = render(
      <Quote id={'0000'} type={'blockquote'} text={'hey'} />
    );

    const component = findByClass(block, 'arc-Editor-Block--blockquote');
    assert(component);
  });
});
