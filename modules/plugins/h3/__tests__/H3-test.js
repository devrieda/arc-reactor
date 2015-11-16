import React from 'react/addons';
import H3 from '../H3';

const TestUtils = React.addons.TestUtils;
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
