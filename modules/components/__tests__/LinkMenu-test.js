const assert = require('assert');

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;

const LinkMenu = require('../LinkMenu');

describe('LinkMenu', () => {

  it('should render', () => {
    const linkMenu = render(
      <LinkMenu active={false} />
    );

    const menu = findByClass(linkMenu, 'arc-Editor-LinkMenu');
    assert(menu);
  });
});

