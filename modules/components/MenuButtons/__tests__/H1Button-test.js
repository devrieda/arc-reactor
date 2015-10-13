import expect from 'expect';
import assert from 'assert';
import React from 'react/addons';
import { fromJS } from 'immutable';
import H1Button from '../H1Button';

const TestUtils = React.addons.TestUtils;
const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;

describe('H1Button', () => {
  it('should render', () => {
    const content = { sections: [] };
    const selection = {
      guids: () => {},
      offsets: () => {},
      position: () => {}
    };

    const component = render(
      <H1Button content={fromJS(content)} selection={selection} />
    );

    const button = findByClass(component, 'arc-Editor-MenuButton--h2');
    assert(button);
  });

  it('should be visible', () => {
    const content = { sections: [] };
    const selection = {
      guids: () => {},
      offsets: () => {},
      position: () => {}
    };

    assert(H1Button.isVisible(content, selection));
  });

  it("should modify content with handlePress", () => {
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
      <H1Button content={fromJS(content)} selection={selection} />
    );

    const result = component.handlePress().content.toJS();
    expect(result.sections[0].blocks[0].type).toEqual('h2');
  });
});
