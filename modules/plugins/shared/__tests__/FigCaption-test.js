import assert from 'assert';
import React from 'react/addons';
import FigCaption from '../FigCaption';

const TestUtils = React.addons.TestUtils;
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
    assert(captionComponent);
  });
});
