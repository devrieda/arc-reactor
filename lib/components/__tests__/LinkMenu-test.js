var assert = require('assert');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var findByClass = TestUtils.findRenderedDOMComponentWithClass;
var render = TestUtils.renderIntoDocument;

var LinkMenu = require('../LinkMenu');

describe('LinkMenu', () => {

  it('should render', () => {
    var linkMenu = render(
      <LinkMenu active={false} />
    );

    var menu = findByClass(linkMenu, 'ic-Editor-LinkMenu');
    assert(menu);
  });
});

