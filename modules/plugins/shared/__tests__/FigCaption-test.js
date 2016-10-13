import React from 'react';
import TestUtils from 'react-addons-test-utils';
import FigCaption from '../FigCaption';

const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;

describe('FigCaption', () => {

  it('should render', () => {
    const text = '';
    const figSelected = false;

    const caption = render(
      <FigCaption text={text} figSelected={figSelected} />
    );

    const captionComponent = findByClass(caption, 'arc-Editor-FigCaption');
    expect(captionComponent).to.exist;
  });
});
