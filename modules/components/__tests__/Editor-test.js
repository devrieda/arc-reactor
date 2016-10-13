import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { fromJS } from 'immutable';
import EditorStore from '../../stores/EditorStore';
import Editor from '../Editor.js';

const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;
const { keyDown } = TestUtils.Simulate;

describe('Editor', () => {
  // state
  it('should set content state when mounted', () => {
    const changed = () => {};
    const content = { sections: [] };

    render(
      <Editor onChange={changed} content={content} />
    );

    expect(EditorStore.get().content.toJS()).to.eql(content);
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

    const node = document.createElement('div');
    ReactDOM.render(
      <Editor onChange={changed} selection={selection} content={content} />, node
    );

    // trigger componentDidUpdate
    ReactDOM.render(
      <Editor onChange={changed} selection={selection} content={content} />, node
    );
    expect(callback.called).to.be.true;
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
    expect(called).to.be.true;
  });

  // TODO - need to figure out a better way to stub this out
  // it('should delegate typing to key commands on key up', () => {
  //   const changed = () => {};
  //   const content = { sections: [] };

  //   const editor = render(
  //     <Editor onChange={changed} content={content} />
  //   );
  //   const component = findByClass(editor, 'arc-Editor');

  //   const callback = sinon.spy();
  //   editor.keys = { execute: callback };
  //   keyDown(component, {key: "b"});

  //   expect(callback.called).to.be.true;
  // });

  it('should set meta key on key down', () => {
    const changed = () => {};
    const content = { sections: [] };

    const editor = render(
      <Editor onChange={changed} content={content} />
    );

    expect(editor.metaKey).to.not.be;
    const component = findByClass(editor, 'arc-Editor');
    keyDown(component, {keyCode: 91});
    expect(editor.metaKey).to.be.true;
  });


  // rendering
  it('should render content', () => {
    const changed = () => { };
    const content = { sections: [] };

    const editor = render(
      <Editor onChange={changed} content={content} />
    );

    const component = findByClass(editor, 'arc-Editor-Content');
    expect(component).to.exist;
  });

  it('should render menu', () => {
    const changed = () => { };
    const content = { sections: [] };

    const editor = render(
      <Editor onChange={changed} content={content} />
    );

    const menu = findByClass(editor, 'arc-Editor-Menu');
    expect(menu).to.exist;
  });
});
