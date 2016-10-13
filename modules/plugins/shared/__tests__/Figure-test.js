import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Immutable from 'immutable';
import Figure from '../Figure';

const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;

describe('Figure', () => {

  it('should render', () => {
    const meta = Immutable.Map({
      src: 'https://www.youtube.com/watch?v=kXzsnQax7Hs'
    });

    const figure = render(
      <Figure id='0000' type='figure' text="caption" meta={meta} />
    );

    const figureComponent = findByClass(figure, 'arc-Editor-Figure');
    expect(figureComponent).to.exist;
  });
});
