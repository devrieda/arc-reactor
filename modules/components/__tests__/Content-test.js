import assert from 'assert';
import React from 'react/addons';
import { fromJS } from 'immutable';
import Content from '../Content.js';

const TestUtils = React.addons.TestUtils;
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
    assert(component);
  });
});
