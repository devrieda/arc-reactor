import assert from 'assert';
import React from 'react/addons';
import Code from '../Code';

const TestUtils = React.addons.TestUtils;
const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;

describe('Code', () => {
  it('renders', () => {
    const block = render(
      <Code id={'0000'} type={'pre'} text={'hey'} />
    );

    const component = findByClass(block, 'arc-Editor-Block--pre');
    assert(component);
  });
});
