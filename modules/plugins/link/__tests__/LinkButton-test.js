import React from 'react/addons';
import { fromJS } from 'immutable';
import LinkButton from '../LinkButton';

const TestUtils = React.addons.TestUtils;
const render = TestUtils.renderIntoDocument;
const findByClass = TestUtils.findRenderedDOMComponentWithClass;

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
    expect(button).to.exist;
  });

  it('is visible', () => {
    const content = { sections: [] };
    const selection = {
      guids: () => {},
      offsets: () => {},
      position: () => {}
    };

    expect(LinkButton.isVisible(content, selection)).to.be.true;
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
    expect(result.sections[0].blocks[0].markups.a).to.eql(expected);
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
    expect(result.sections[0].blocks[0].markups.a).to.eql(expected);
  });
});
