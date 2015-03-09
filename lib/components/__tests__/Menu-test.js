var expect = require('expect');
var assert = require('assert');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var findByClass = TestUtils.findRenderedDOMComponentWithClass

var EditorStore = require('../../stores/EditorStore');
var Menu = require('../Menu.js');

describe.only('Menu', () => {

  it('should render', () => {
    var content = { sections: [] };
    var selection = {
      guids: () => {},
      offsets: () => {}
    };

    var menu = TestUtils.renderIntoDocument(
      <Menu content={content} selection={selection} />
    );

    var menuComponent = findByClass(menu, 'ic-Editor-Menu');
    assert(menuComponent);
  });

  // events
  it('should set link mode state when clicking link button', () => {
    var content = { sections: [] };
    var selection = {
      guids: () => {},
      offsets: () => {}
    };

    var menu = TestUtils.renderIntoDocument(
      <Menu content={content} selection={selection} />
    );

    var button = findByClass(menu, 'ic-Editor-MenuItem__button--a');
    TestUtils.Simulate.click(button);

    var component = findByClass(menu, 'ic-Editor-Menu--link');
    assert(component);
  });

  it('should press a button when clicking the menu', () => {
    var content = { sections: [] };
    var selection = {
      guids: () => {},
      offsets: () => {}
    };

    var menu = TestUtils.renderIntoDocument(
      <Menu content={content} selection={selection} />
    );
    var callback = sinon.spy();
    menu.button = { press: callback };

    var button = findByClass(menu, 'ic-Editor-MenuItem__button--strong');
    TestUtils.Simulate.click(button);

    assert(callback.called);
  });

  it('should create link when pressing enter in link mode', () => {
    var content = { sections: [] };
    var selection = {
      guids: () => {},
      offsets: () => {}
    };

    var menu = TestUtils.renderIntoDocument(
      <Menu content={content} selection={selection} />
    );

    var button = findByClass(menu, 'ic-Editor-MenuItem__button--a');
    var input = findByClass(menu, 'ic-Editor-Menu__linkinput-field');

    TestUtils.Simulate.click(button);

    var callback = sinon.spy();
    menu.button = { press: callback };

    TestUtils.Simulate.input(input, "http://google.com");
    TestUtils.Simulate.keyUp(input, {keyCode: 13});

    assert(callback.called)
  });

  // TODO - come back to this when finished with SelectedContent

  // it('should include bold when header is not selected', () => {
  //   var content = { sections: [] };
  //   var selection = {
  //     types: ['h2'], 
  //     guids: () => { return { anchor: '', focus: '' } },
  //     offsets: () => { return {} },
  //     reselect: () => {},
  //     rebound: () => {}
  //   };

  //   var menu = TestUtils.renderIntoDocument(
  //     <Menu content={content} selection={selection} />
  //   );

  //   var types = menu.buttonTypes();
  //   expect(types.length).toBe(6);
  // });

  it('should not include bold when header is selected', () => {
    var content = { sections: [] };
    var selection = {
      types: ['p'],
      guids: () => { return { anchor: '', focus: '' } },
      offsets: () => { return { anchor: 0, focus: 0 } },
      reselect: () => {},
      rebound: () => {}
    };

    var menu = TestUtils.renderIntoDocument(
      <Menu content={content} selection={selection} />
    );

    var types = menu.buttonTypes();
    expect(types.length).toBe(8);
  });

  // classes
  it('should be active if text is selected', () => {
    var content = { sections: [] };
    var selection = {
      text: 'hey',
      types: ['p'],
      guids: () => { return { anchor: '', focus: '' } },
      offsets: () => { return { anchor: 0, focus: 0 } },
      reselect: () => {},
      rebound: () => {}
    };

    var menu = TestUtils.renderIntoDocument(
      <Menu content={content} selection={selection} />
    );

    assert(menu.getDOMNode().classList.contains('ic-Editor-Menu--active'))
  });

  it('should build styles based off bounds', () => {
    var content = { sections: [] };
    var selection = {
      text: 'hey',
      types: ['p'], 
      guids: () => { return { anchor: '', focus: '' } },
      offsets: () => { return { anchor: 0, focus: 0 } },
      reselect: () => {},
      rebound: () => {},
      bounds: {top: 20, left: 20, width: 20}
    };

    var menu = TestUtils.renderIntoDocument(
      <Menu content={content} selection={selection} />
    );

    var styles = menu.menuStyles();
    assert(styles.top);
    assert(styles.left);
  });

  // rendering
  it('should render menu items', () => {
    var content = { sections: [] };
    var selection = {
      guids: () => {},
      offsets: () => {}
    };

    var menu = TestUtils.renderIntoDocument(
      <Menu content={content} selection={selection} />
    );
    var button = findByClass(menu, 'ic-Editor-MenuItem__button--strong');
    assert(button);
  });
});
