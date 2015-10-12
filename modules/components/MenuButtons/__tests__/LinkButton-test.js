var expect = require('expect');
var assert = require('assert');

var React = require('react/addons');
var { fromJS } = require('immutable');
var TestUtils = React.addons.TestUtils;
var render = TestUtils.renderIntoDocument;
var findByClass = TestUtils.findRenderedDOMComponentWithClass;

var LinkButton = require('../LinkButton');

describe('LinkButton', () => {
  it('renders', () => {
    var content = { sections: [] };
    var selection = {
      guids: () => {},
      offsets: () => {},
      position: () => {}
    };

    var component = render(
      <LinkButton content={fromJS(content)} selection={selection} />
    );

    var button = findByClass(component, 'arc-Editor-MenuButton--a');
    assert(button);
  });

  it('is visible', () => {
    var content = { sections: [] };
    var selection = {
      guids: () => {},
      offsets: () => {},
      position: () => {}
    };

    assert(LinkButton.isVisible(content, selection));
  });

  it("modifies content with handlePress", () => {
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
      offsets: () => { return { anchor: 0, focus: 1 }; },
      position: () => {}
    };

    var component = render(
      <LinkButton content={fromJS(content)} selection={selection} />
    );

    var result = component.handlePress('http://google.com').content.toJS();
    var expected = [{"range":[0,1], "value": "http://google.com"}];
    expect(result.sections[0].blocks[0].markups.a).toEqual(expected);
  });

  it("prefixes the value with http if missing", () => {
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
      offsets: () => { return { anchor: 0, focus: 1 }; },
      position: () => {}
    };

    var component = render(
      <LinkButton content={fromJS(content)} selection={selection} />
    );

    var result = component.handlePress('google.com').content.toJS();
    var expected = [{"range":[0,1], "value": "http://google.com"}];
    expect(result.sections[0].blocks[0].markups.a).toEqual(expected);
  });
});
