const assert = require('assert');

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;

const FigCaption = require('../FigCaption');

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
