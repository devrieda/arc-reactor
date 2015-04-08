var assert = require('assert');

var React = require('react/addons');
var { fromJS } = require('immutable');
var TestUtils = React.addons.TestUtils;
var findByClass = TestUtils.findRenderedDOMComponentWithClass;
var Content = require('../Content.js');

describe('Content', () => {

  // rendering
  it('should render sections', () => {
    var content = {sections: [
      { "id": "0000", "blocks": [] }
    ]};

    var selection = {
      guids: () => { return { anchor: "", focus: "" }; },
      offsets: () => { return { anchor: "", focus: "" }; }
    };

    var editorContent = TestUtils.renderIntoDocument(
      <Content content={fromJS(content)} selection={selection} />
    );

    var component = findByClass(editorContent, 'ic-Editor-Section');
    assert(component);
  });
});
