var expect = require('expect');
var assert = require('assert');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var findByClass = TestUtils.findRenderedDOMComponentWithClass

var MenuItem = require('../MenuItem');

describe('MenuItem', () => {
  it('should have item, button, and icon with active class if is active', () => {
    var type = 'strong';
    var text = 'Bold';
    var icon = 'fa-bold';
    var action = 'Bold';
    var active = true;

    var menuItem = TestUtils.renderIntoDocument(
      <MenuItem type={type}
                text={text}
                icon={icon}
              action={action}
              active={active} />
    );
    var component = findByClass(menuItem, 'ic-Editor-MenuItem__button--active');
    assert(component);
    var component = findByClass(menuItem, 'ic-Editor-MenuItem__icon--active');
    assert(component);
  })

  it('should have screenreader only class if is an icon', () => {
    var type = 'strong';
    var text = 'Bold';
    var icon = 'fa-bold';
    var action = 'Bold';
    var active = false;

    var menuItem = TestUtils.renderIntoDocument(
      <MenuItem type={type}
                text={text}
                icon={icon}
              action={action}
              active={active} />
    );
    var component = findByClass(menuItem, 'ic-Editor-MenuItem__icon-text--sr');
    assert(component);
  })

})