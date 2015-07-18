var assert = require('assert');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var findByClass = TestUtils.findRenderedDOMComponentWithClass;
var render = TestUtils.renderIntoDocument;

var FigCaption = require('../FigCaption');

describe('FigCaption', () => {

  it('should render', () => {
    var text = '';
    var figSelected = false;

    var caption = render(
      <FigCaption text={text} figSelected={figSelected} />
    );

    var captionComponent = findByClass(caption, 'ic-Editor-FigCaption');
    assert(captionComponent);
  });
});
