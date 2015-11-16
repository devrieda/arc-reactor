import React from 'react/addons';
import H1 from '../H1';

const TestUtils = React.addons.TestUtils;
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
