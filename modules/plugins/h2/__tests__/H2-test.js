import React from 'react/addons';
import H2 from '../H2';

const TestUtils = React.addons.TestUtils;
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
