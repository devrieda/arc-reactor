var expect = require('expect');
var assert = require('assert');
var sinon = require('sinon');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var findByClass = TestUtils.findRenderedDOMComponentWithClass

var ContentState = require('../../lib/state/ContentState');
var MenuItem = require('../../lib/components/MenuItem');

describe('MenuItem', () => {

  it('should be active if selection is centered and type is center', () => {
    var type = 'center';
    var text = 'Center';
    var icon = 'fa-align-center';
    var action = 'Center';
    var selection = {"centered": true};

    var menuItem = TestUtils.renderIntoDocument(
      <MenuItem type={type}
                text={text}
                icon={icon}
              action={action}
           selection={selection} />
    );
    expect(menuItem.isActive()).toBe(true);
  })

  it('should be active if selection is bolded and type is bold', () => {
    var type = 'strong';
    var text = 'Bold';
    var icon = 'fa-bold';
    var action = 'Bold';
    var selection = {"types": ['strong']};

    var menuItem = TestUtils.renderIntoDocument(
      <MenuItem type={type}
                text={text}
                icon={icon}
              action={action}
           selection={selection} />
    );
    expect(menuItem.isActive()).toBe(true);
  })

  it('should have item, button, and icon with active class if is active', () => {
    var type = 'strong';
    var text = 'Bold';
    var icon = 'fa-bold';
    var action = 'Bold';
    var selection = {"types": ['strong']};

    var menuItem = TestUtils.renderIntoDocument(
      <MenuItem type={type}
                text={text}
                icon={icon}
              action={action}
           selection={selection} />
    );
    var component = findByClass(menuItem, 'ic-Editor-MenuItem--active');
    assert(component);
    var component = findByClass(menuItem, 'ic-Editor-MenuItem__icon--active');
    assert(component);
    var component = findByClass(menuItem, 'ic-Editor-MenuItem__icon--active');
    assert(component);
  })

  it('should have screenreader only class if is an icon', () => {
    var type = 'strong';
    var text = 'Bold';
    var icon = 'fa-bold';
    var action = 'Bold';
    var selection = {};

    var menuItem = TestUtils.renderIntoDocument(
      <MenuItem type={type}
                text={text}
                icon={icon}
              action={action}
           selection={selection} />
    );
    var component = findByClass(menuItem, 'ic-Editor-MenuItem__icon-text--sr');
    assert(component);
  })

})
