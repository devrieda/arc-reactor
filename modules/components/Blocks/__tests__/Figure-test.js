const assert = require('assert');

const React = require('react/addons');
const Immutable = require('immutable');

const TestUtils = React.addons.TestUtils;
const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;

const Figure = require('../Figure');

describe('Figure', () => {

  it('should render', () => {
    const meta = Immutable.Map({
      src: 'https://www.youtube.com/watch?v=kXzsnQax7Hs'
    });

    const figure = render(
      <Figure id='0000' type='figure' text="caption" meta={meta} />
    );

    const figureComponent = findByClass(figure, 'arc-Editor-Figure');
    assert(figureComponent);
  });
});
