var expect = require('expect');
var assert = require('assert');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var findByClass = TestUtils.findRenderedDOMComponentWithClass

var SelectionState = require('../../state/SelectionState');
var Menu = require('../Menu.js');

describe('Menu', () => {

  // events
  it('should set link mode state when clicking link button', () => {
    var menu = TestUtils.renderIntoDocument(
      <Menu />
    );

    var button = findByClass(menu, 'ic-Editor-MenuItem__button--a');
    TestUtils.Simulate.click(button);

    var component = findByClass(menu, 'ic-Editor-Menu--link');
    assert(component)
  })

  it('should press a button when clicking the menu', () => {
    var menu = TestUtils.renderIntoDocument(
      <Menu />
    );
    var callback = sinon.spy();
    menu.button = {press: callback};

    var button = findByClass(menu, 'ic-Editor-MenuItem__button--strong');
    TestUtils.Simulate.click(button);

    assert(callback.called)
  })

  it('should create link when pressing enter in link mode', () => {
    var menu = TestUtils.renderIntoDocument(
      <Menu />
    );

    var button = findByClass(menu, 'ic-Editor-MenuItem__button--a');
    var input = findByClass(menu, 'ic-Editor-Menu__linkinput-field');

    TestUtils.Simulate.click(button);

    var callback = sinon.spy();
    menu.button = {press: callback};

    TestUtils.Simulate.input(input, "http://google.com");
    TestUtils.Simulate.keyUp(input, {keyCode: 13});

    assert(callback.called)
  })

  // TODO - come back to this when finished with SelectedContent
  //
  // it('should include bold when header is not selected', () => {
  //   var menu = TestUtils.renderIntoDocument(
  //     <Menu />
  //   );

  //   SelectionState.set({
  //     selection: {
  //       types: ['h2'], 
  //       guids: () => { return { anchor: '', focus: '' } },
  //       offsets: () => { return {} },
  //       reselect: () => {},
  //       rebound: () => {}
  //     }
  //   });
  //   var types = menu.buttonTypes();
  //   expect(types.length).toBe(6);
  // })

  it('should not include bold when header is selected', () => {
    var menu = TestUtils.renderIntoDocument(
      <Menu />
    );

    SelectionState.set({
      selection: {
        types: ['p'],
        guids: () => { return { anchor: '', focus: '' } },
        offsets: () => { return { anchor: 0, focus: 0 } },
        reselect: () => {},
        rebound: () => {}
      }
    });
    var types = menu.buttonTypes();
    expect(types.length).toBe(8);
  })


  // classes
  it('should be active if text is selected', () => {
    var menu = TestUtils.renderIntoDocument(
      <Menu />
    );

    SelectionState.set({
      selection: {
        text: 'hey',
        types: ['p'],
        guids: () => { return { anchor: '', focus: '' } },
        offsets: () => { return { anchor: 0, focus: 0 } },
        reselect: () => {},
        rebound: () => {}
      }
    });
    assert(menu.getDOMNode().classList.contains('ic-Editor-Menu--active'))
  })

  it('should build styles based off bounds', () => {
    var menu = TestUtils.renderIntoDocument(
      <Menu />
    );
    SelectionState.set({
      selection: {
        text: 'hey',
        types: ['p'], 
        guids: () => { return { anchor: '', focus: '' } },
        offsets: () => { return { anchor: 0, focus: 0 } },
        reselect: () => {},
        rebound: () => {},
        bounds: {top: 20, left: 20, width: 20}
      }
    });

    var styles = menu.menuStyles();
    assert(styles.top);
    assert(styles.left);
  })


  // rendering
  it('should render menu items', () => {
    var menu = TestUtils.renderIntoDocument(
      <Menu />
    );
    var button = findByClass(menu, 'ic-Editor-MenuItem__button--strong');
    assert(button);
  })
})
