var assert = require('assert');

var React = require('react/addons');
var { fromJS } = require('immutable');
var TestUtils = React.addons.TestUtils;
var findByClass = TestUtils.findRenderedDOMComponentWithClass;
var render = TestUtils.renderIntoDocument;
var { click, input, keyUp } = TestUtils.Simulate;

var Menu = require('../Menu.js');
var MenuButtons = require('../MenuButtons.js');

describe('Menu', () => {

  it('should render', () => {
    var content = { sections: [] };
    var selection = {
      guids: () => {},
      offsets: () => {},
      showMenuButtons: () => { return true; }
    };

    var menu = render(
      <Menu content={fromJS(content)} selection={selection}>
        <MenuButtons.Bold />
      </Menu>
    );

    var menuComponent = findByClass(menu, 'ic-Editor-Menu');
    assert(menuComponent);
  });

  it('should render buttons', () => {
    var content = { sections: [] };
    var selection = {
      guids: () => {},
      offsets: () => {},
      showMenuButtons: () => { return true; }
    };

    var menu = render(
      <Menu content={fromJS(content)} selection={selection}>
        <MenuButtons.Bold />
      </Menu>
    );

    var button = findByClass(menu, 'ic-Editor-MenuButton--strong');
    assert(button);
  });

  // events
  it('should switch to input mode when clicking button that requires value', () => {
    var content = { sections: [] };
    var selection = {
      guids: () => {},
      offsets: () => {},
      showMenuButtons: () => { return true; }
    };

    var menu = render(
      <Menu content={fromJS(content)} selection={selection}>
        <MenuButtons.Link />
      </Menu>
    );

    var button = findByClass(menu, 'ic-Editor-MenuButton--a');
    click(button);

    var component = findByClass(menu, 'ic-Editor-Menu__linkinput--active');
    assert(component);
  });

  it('should switch back to button mode when entering input value', () => {
    var content = { sections: [] };
    var selection = {
      guids: () => {},
      offsets: () => {},
      showMenuButtons: () => { return true; }
    };

    var menu = render(
      <Menu content={fromJS(content)} selection={selection}>
        <MenuButtons.Link />
      </Menu>
    );

    var button = findByClass(menu, 'ic-Editor-MenuButton--a');
    click(button);
    input(button, "http://google.com");
    keyUp(button, {keyCode: 13});

    var component = findByClass(menu, 'ic-Editor-Menu--active');
    assert(component);
  });

  it('should check whether button is visible', () => {
    var content = { sections: [] };
    var selection = {
      guids: () => {},
      offsets: () => {},
      showMenuButtons: () => { return true; }
    };
    var bold = <MenuButtons.Bold />;
    sinon.stub(bold.type, "isVisible", () => true);

    render(
      <Menu content={fromJS(content)} selection={selection}>
        {bold}
      </Menu>
    );

    assert(bold.type.isVisible.called);

    bold.type.isVisible.restore();
  });

  // classes
  it('should be active if text is selected', () => {
    var content = { sections: [] };
    var selection = {
      text: 'hey',
      types: ['p'],
      guids: () => { return { anchor: '', focus: '' }; },
      offsets: () => { return { anchor: 0, focus: 0 }; },
      reselect: () => {},
      rebound: () => {},
      showMenuButtons: () => { return true; }
    };

    var menu = render(
      <Menu content={fromJS(content)} selection={selection}>
        <MenuButtons.Bold />
      </Menu>
    );

    assert(React.findDOMNode(menu).classList.contains('ic-Editor-Menu--active'));
  });

  it('should build styles based off bounds', () => {
    var content = { sections: [] };
    var selection = {
      text: 'hey',
      types: ['p'], 
      guids: () => { return { anchor: '', focus: '' }; },
      offsets: () => { return { anchor: 0, focus: 0 }; },
      reselect: () => {},
      rebound: () => {},
      bounds: {top: 20, left: 20, width: 20},
      showMenuButtons: () => { return true; }
    };

    var menu = render(
      <Menu content={fromJS(content)} selection={selection}>
        <MenuButtons.Bold />
      </Menu>
    );

    var styles = menu.menuStyles();
    assert(styles.top);
    assert(styles.left);
  });
});
