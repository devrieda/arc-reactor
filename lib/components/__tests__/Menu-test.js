var assert = require('assert');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var findByClass = TestUtils.findRenderedDOMComponentWithClass;

var Menu = require('../Menu.js');
var Buttons = require('../Buttons.js');

describe('Menu', () => {

  it('should render', () => {
    var content = { sections: [] };
    var selection = {
      guids: () => {},
      offsets: () => {}
    };

    var menu = TestUtils.renderIntoDocument(
      <Menu content={content} selection={selection}>
        <Buttons.Bold />
      </Menu>
    );

    var menuComponent = findByClass(menu, 'ic-Editor-Menu');
    assert(menuComponent);
  });

  it('should render buttons', () => {
    var content = { sections: [] };
    var selection = {
      guids: () => {},
      offsets: () => {}
    };

    var menu = TestUtils.renderIntoDocument(
      <Menu content={content} selection={selection}>
        <Buttons.Bold />
      </Menu>
    );

    var button = findByClass(menu, 'ic-Editor-Button--strong');
    assert(button);
  });

  // events
  it('should switch to input mode when clicking button that requires value', () => {
    var content = { sections: [] };
    var selection = {
      guids: () => {},
      offsets: () => {}
    };

    var menu = TestUtils.renderIntoDocument(
      <Menu content={content} selection={selection}>
        <Buttons.Link />
      </Menu>
    );

    var button = findByClass(menu, 'ic-Editor-Button--a');
    TestUtils.Simulate.click(button);

    var component = findByClass(menu, 'ic-Editor-Menu__linkinput--active');
    assert(component);
  });

  it('should switch back to button mode when entering input value', () => {
    var content = { sections: [] };
    var selection = {
      guids: () => {},
      offsets: () => {}
    };

    var menu = TestUtils.renderIntoDocument(
      <Menu content={content} selection={selection}>
        <Buttons.Link />
      </Menu>
    );

    var button = findByClass(menu, 'ic-Editor-Button--a');
    var input = findByClass(menu, 'ic-Editor-Menu__linkinput-field');

    TestUtils.Simulate.click(button);
    TestUtils.Simulate.input(input, "http://google.com");
    TestUtils.Simulate.keyUp(input, {keyCode: 13});

    var component = findByClass(menu, 'ic-Editor-Menu__items--active');
    assert(component);
  });

  it('should check whether button is visible', () => {
    var content = { sections: [] };
    var selection = {
      guids: () => {},
      offsets: () => {}
    };
    var bold = <Buttons.Bold />;
    sinon.stub(bold.type, "isVisible", () => true);

    TestUtils.renderIntoDocument(
      <Menu content={content} selection={selection}>
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
      rebound: () => {}
    };

    var menu = TestUtils.renderIntoDocument(
      <Menu content={content} selection={selection}>
        <Buttons.Bold />
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
      bounds: {top: 20, left: 20, width: 20}
    };

    var menu = TestUtils.renderIntoDocument(
      <Menu content={content} selection={selection}>
        <Buttons.Bold />
      </Menu>
    );

    var styles = menu.menuStyles();
    assert(styles.top);
    assert(styles.left);
  });
});
