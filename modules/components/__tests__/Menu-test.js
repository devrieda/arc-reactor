const assert = require('assert');

const React = require('react/addons');
const { fromJS } = require('immutable');
const TestUtils = React.addons.TestUtils;
const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;
const { click, input, keyUp } = TestUtils.Simulate;

const Menu = require('../Menu.js');

describe('Menu', () => {

  it('should render', () => {
    const content = { sections: [] };
    const selection = {
      guids: () => {},
      offsets: () => {},
      showMenuButtons: () => { return true; }
    };

    const menu = render(
      <Menu content={fromJS(content)} selection={selection} />
    );

    const menuComponent = findByClass(menu, 'arc-Editor-Menu');
    assert(menuComponent);
  });

  it('should render buttons', () => {
    const content = { sections: [] };
    const selection = {
      guids: () => {},
      offsets: () => {},
      showMenuButtons: () => { return true; }
    };

    const menu = render(
      <Menu content={fromJS(content)} selection={selection} />
    );

    const button = findByClass(menu, 'arc-Editor-MenuButton--strong');
    assert(button);
  });

  // events
  it('should switch to input mode when clicking button that requires value', () => {
    const content = { sections: [] };
    const selection = {
      guids: () => {},
      offsets: () => {},
      showMenuButtons: () => { return true; }
    };

    const menu = render(
      <Menu content={fromJS(content)} selection={selection} />
    );

    const button = findByClass(menu, 'arc-Editor-MenuButton--a');
    click(button);

    const component = findByClass(menu, 'arc-Editor-Menu__linkinput--active');
    assert(component);
  });

  it('should switch back to button mode when entering input value', () => {
    const content = { sections: [] };
    const selection = {
      guids: () => {},
      offsets: () => {},
      showMenuButtons: () => { return true; }
    };

    const menu = render(
      <Menu content={fromJS(content)} selection={selection} />
    );

    const button = findByClass(menu, 'arc-Editor-MenuButton--a');
    click(button);
    input(button, "http://google.com");
    keyUp(button, {keyCode: 13});

    const component = findByClass(menu, 'arc-Editor-Menu--active');
    assert(component);
  });

  // TODO - can test this once we have full plugins working
  //        need to be able to customize buttons to work
  //
  // it('should check whether button is visible', () => {
  //   const content = { sections: [] };
  //   const selection = {
  //     guids: () => {},
  //     offsets: () => {},
  //     showMenuButtons: () => { return true; }
  //   };
  //   const bold = <MenuButtons.Bold />;
  //   sinon.stub(bold.type, "isVisible", () => true);

  //   render(
  //     <Menu content={fromJS(content)} selection={selection} />
  //   );

  //   assert(bold.type.isVisible.called);

  //   bold.type.isVisible.restore();
  // });

  // classes
  it('should be active if text is selected', () => {
    const content = { sections: [] };
    const selection = {
      text: 'hey',
      types: ['p'],
      guids: () => { return { anchor: '', focus: '' }; },
      offsets: () => { return { anchor: 0, focus: 0 }; },
      reselect: () => {},
      rebound: () => {},
      showMenuButtons: () => { return true; }
    };

    const menu = render(
      <Menu content={fromJS(content)} selection={selection} />
    );

    assert(React.findDOMNode(menu).classList.contains('arc-Editor-Menu--active'));
  });

  it('should build styles based off bounds', () => {
    const content = { sections: [] };
    const selection = {
      text: 'hey',
      types: ['p'], 
      guids: () => { return { anchor: '', focus: '' }; },
      offsets: () => { return { anchor: 0, focus: 0 }; },
      reselect: () => {},
      rebound: () => {},
      bounds: {top: 20, left: 20, width: 20},
      showMenuButtons: () => { return true; }
    };

    const menu = render(
      <Menu content={fromJS(content)} selection={selection} />
    );

    const styles = menu.menuStyles();
    assert(styles.top);
    assert(styles.left);
  });
});
