const expect = require('expect');
const assert = require('assert');

const React = require('react/addons');
const { fromJS } = require('immutable');
const TestUtils = React.addons.TestUtils;
const render = TestUtils.renderIntoDocument;
const findByClass = TestUtils.findRenderedDOMComponentWithClass;

const LinkButton = require('../LinkButton');

describe('LinkButton', () => {
  it('renders', () => {
    const content = { sections: [] };
    const selection = {
      guids: () => {},
      offsets: () => {},
      position: () => {}
    };

    const component = render(
      <LinkButton content={fromJS(content)} selection={selection} />
    );

    const button = findByClass(component, 'arc-Editor-MenuButton--a');
    assert(button);
  });

  it('is visible', () => {
    const content = { sections: [] };
    const selection = {
      guids: () => {},
      offsets: () => {},
      position: () => {}
    };

    assert(LinkButton.isVisible(content, selection));
  });

  it("modifies content with handlePress", () => {
    const content = {
      sections: [{
        id: "aaaa",
        blocks: [
          { id: '0000', type: 'p', text: 'foo bar' }
        ]
      }]
    };
    const selection = {
      guids: () => { return { anchor: '0000', focus: '0000' }; },
      offsets: () => { return { anchor: 0, focus: 1 }; },
      position: () => {}
    };

    const component = render(
      <LinkButton content={fromJS(content)} selection={selection} />
    );

    const result = component.handlePress('http://google.com').content.toJS();
    const expected = [{"range":[0,1], "value": "http://google.com"}];
    expect(result.sections[0].blocks[0].markups.a).toEqual(expected);
  });

  it("prefixes the value with http if missing", () => {
    const content = {
      sections: [{
        id: "aaaa",
        blocks: [
          { id: '0000', type: 'p', text: 'foo bar' }
        ]
      }]
    };
    const selection = {
      guids: () => { return { anchor: '0000', focus: '0000' }; },
      offsets: () => { return { anchor: 0, focus: 1 }; },
      position: () => {}
    };

    const component = render(
      <LinkButton content={fromJS(content)} selection={selection} />
    );

    const result = component.handlePress('google.com').content.toJS();
    const expected = [{"range":[0,1], "value": "http://google.com"}];
    expect(result.sections[0].blocks[0].markups.a).toEqual(expected);
  });
});
