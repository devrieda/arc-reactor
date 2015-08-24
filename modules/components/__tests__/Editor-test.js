var expect = require('expect');
var assert = require('assert');

var React = require('react/addons');
var { fromJS } = require('immutable');
var TestUtils = React.addons.TestUtils;
var findByClass = TestUtils.findRenderedDOMComponentWithClass;
var render = TestUtils.renderIntoDocument;
var { keyDown } = TestUtils.Simulate;

var EditorStore = require('../../stores/EditorStore');
var Editor = require('../Editor.js');

describe('Editor', () => {
  // state
  it('should set content state when mounted', () => {
    var changed = () => {};
    var content = { sections: [] };

    render(
      <Editor onChange={changed} content={content} />
    );

    expect(EditorStore.get().content.toJS()).toEqual(content);
  });

  it('should reselect selection when updated', () => {
    var callback = sinon.spy();

    var changed = () => {};
    var content = { sections: [] };
    var selection = {
      reselect: callback,
      rebound: () => {},
      guids: () => {},
      offsets: () => {},
      position: () => {},
      focusOn: () => {},
      isRange: () => { return false; },
      begOfBlock: () => { return false; },
      showMenuButtons: () => { return true; }
    };

    var editor = render(
      <Editor onChange={changed} selection={selection} content={content} />
    );

    editor.setProps({ content: content });

    assert(callback.called);
  });

  // actions
  it('should pass up change when content changes', () => {
    var called = false;
    var changed = () => { called = true; };
    var content = { sections: [] };

    render(
      <Editor onChange={changed} content={content} />
    );

    // simulate change to store
    EditorStore.set({ content: fromJS(content) });
    expect(called).toBe(true);
  });

  it('should delegate typing to key commands on key up', () => {
    var changed = () => {};
    var content = { sections: [] };

    var editor = render(
      <Editor onChange={changed} content={content} />
    );
    var component = findByClass(editor, 'arc-Editor');

    var callback = sinon.spy();
    editor.keys = { execute: callback };
    keyDown(component, {key: "b"});

    assert(callback.called);
  });

  it('should set meta key on key down', () => {
    var changed = () => {};
    var content = { sections: [] };

    var editor = render(
      <Editor onChange={changed} content={content} />
    );

    assert(!editor.metaKey);
    var component = findByClass(editor, 'arc-Editor');
    keyDown(component, {keyCode: 91});
    assert(editor.metaKey);
  });


  // rendering 
  it('should render content', () => {
    var changed = () => { };
    var content = { sections: [] };

    var editor = render(
      <Editor onChange={changed} content={content} />
    );

    var component = findByClass(editor, 'arc-Editor-Content');
    assert(component);
  });

  it('should render menu', () => {
    var changed = () => { };
    var content = { sections: [] };

    var editor = render(
      <Editor onChange={changed} content={content} />
    );

    var menu = findByClass(editor, 'arc-Editor-Menu');
    assert(menu);
  });
});
