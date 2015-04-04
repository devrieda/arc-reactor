var expect = require('expect');
var assert = require('assert');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var findByClass = TestUtils.findRenderedDOMComponentWithClass;

var H3Button = require('../H3Button');

describe('H3Button', () => {
  it('should render', () => {
    var content = { sections: [] };
    var selection = {
      guids: () => {},
      offsets: () => {}
    };

    var component = TestUtils.renderIntoDocument(
      <H3Button content={content} selection={selection} />
    );

    var button = findByClass(component, 'ic-Editor-Button--h4');
    assert(button);
  });

  it('should be visible', () => {
    var content = { sections: [] };
    var selection = {
      guids: () => {},
      offsets: () => {}
    };

    assert(H3Button.isVisible(content, selection));
  });

  it('should trigger handlePress when clicked', () => {
    var content = { sections: [] };
    var selection = {
      guids: () => {},
      offsets: () => {}
    };

    var component = TestUtils.renderIntoDocument(
      <H3Button content={content} selection={selection} />
    );

    sinon.stub(component, 'handlePress', () => { return content; });

    var button = findByClass(component, 'ic-Editor-Button--h4');
    TestUtils.Simulate.click(button);

    assert(component.handlePress.called);

    component.handlePress.restore();
  });

  it("should modify content with handlePress", () => {
    var content = {
      sections: [{
        id: "aaaa",
        blocks: [
          { id: '0000', type: 'p', text: 'foo bar' }
        ]
      }]
    };
    var selection = {
      guids: () => { return { anchor: '0000', focus: '0000' }; },
      offsets: () => { return { anchor: 0, focus: 1 }; }
    };

    var component = TestUtils.renderIntoDocument(
      <H3Button content={content} selection={selection} />
    );

    var result = component.handlePress();
    expect(result.sections[0].blocks[0].type).toEqual('h4');
  });
});
