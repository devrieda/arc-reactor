var assert = require('assert');

var React = require('react/addons');
var Immutable = require('immutable');

var TestUtils = React.addons.TestUtils;
var findByClass = TestUtils.findRenderedDOMComponentWithClass;
var render = TestUtils.renderIntoDocument;

var Figure = require('../Figure');

describe('Figure', () => {

  it('should render', () => {
    var meta = Immutable.Map({
      src: 'https://www.youtube.com/watch?v=kXzsnQax7Hs'
    });

    var figure = render(
      <Figure id='0000' type='figure' text="caption" meta={meta} />
    );

    var figureComponent = findByClass(figure, 'ic-Editor-Figure');
    assert(figureComponent);
  });
});
