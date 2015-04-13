var assert = require('assert');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var findByClass = TestUtils.findRenderedDOMComponentWithClass;
var render = TestUtils.renderIntoDocument;
var { click, keyUp, keyDown } = TestUtils.Simulate;

var Figure = require('../Figure');

describe('Figure', () => {

  it('should render', () => {
    var id = '0000';

    var figure = render(
      <Figure id='0000'
        type='figure'
        text="caption"
        src="https://www.youtube.com/watch?v=kXzsnQax7Hs" />
    );

    var figureComponent = findByClass(figure, 'ic-Editor-Figure');
    assert(figureComponent);
  });
});
