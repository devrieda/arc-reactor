import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { fromJS } from 'immutable';
import Content from '../Content.js';

const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;

describe('Content', () => {

  // rendering
  it('should render sections', () => {
    const content = {sections: [
      { "id": "0000", "blocks": [] }
    ]};

    const selection = {
      guids: () => { return { anchor: "", focus: "" }; },
      offsets: () => { return { anchor: "", focus: "" }; }
    };

    const editorContent = render(
      <Content content={fromJS(content)} selection={selection} />
    );

    const component = findByClass(editorContent, 'arc-Editor-Section');
    expect(component).to.exist;
  });
});
