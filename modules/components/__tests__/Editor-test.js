const expect = require('expect');
const assert = require('assert');

const React = require('react/addons');
const { fromJS } = require('immutable');
const TestUtils = React.addons.TestUtils;
const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;
const { keyDown } = TestUtils.Simulate;

const EditorStore = require('../../stores/EditorStore');
const Editor = require('../Editor.js');

describe('Editor', () => {
  // state
  it('should set content state when mounted', () => {
    const changed = () => {};
    const content = { sections: [] };

    render(
      <Editor onChange={changed} content={content} />
    );

    expect(EditorStore.get().content.toJS()).toEqual(content);
  });

  it('should reselect selection when updated', () => {
    const callback = sinon.spy();

    const changed = () => {};
    const content = { sections: [] };
    const selection = {
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

    const editor = render(
      <Editor onChange={changed} selection={selection} content={content} />
    );

    editor.setProps({ content: content });

    assert(callback.called);
  });

  // actions
  it('should pass up change when content changes', () => {
    let called = false;
    const changed = () => { called = true; };
    const content = { sections: [] };

    render(
      <Editor onChange={changed} content={content} />
    );

    // simulate change to store
    EditorStore.set({ content: fromJS(content) });
    expect(called).toBe(true);
  });

  it('should delegate typing to key commands on key up', () => {
    const changed = () => {};
    const content = { sections: [] };

    const editor = render(
      <Editor onChange={changed} content={content} />
    );
    const component = findByClass(editor, 'arc-Editor');

    const callback = sinon.spy();
    editor.keys = { execute: callback };
    keyDown(component, {key: "b"});

    assert(callback.called);
  });

  it('should set meta key on key down', () => {
    const changed = () => {};
    const content = { sections: [] };

    const editor = render(
      <Editor onChange={changed} content={content} />
    );

    assert(!editor.metaKey);
    const component = findByClass(editor, 'arc-Editor');
    keyDown(component, {keyCode: 91});
    assert(editor.metaKey);
  });


  // rendering 
  it('should render content', () => {
    const changed = () => { };
    const content = { sections: [] };

    const editor = render(
      <Editor onChange={changed} content={content} />
    );

    const component = findByClass(editor, 'arc-Editor-Content');
    assert(component);
  });

  it('should render menu', () => {
    const changed = () => { };
    const content = { sections: [] };

    const editor = render(
      <Editor onChange={changed} content={content} />
    );

    const menu = findByClass(editor, 'arc-Editor-Menu');
    assert(menu);
  });
});
