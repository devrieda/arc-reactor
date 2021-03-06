import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { fromJS } from 'immutable';
import H2Button from '../H2Button';

const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;

describe('H2Button', () => {
  it('should render', () => {
    const content = { sections: [] };
    const selection = {
      guids: () => {},
      offsets: () => {},
      position: () => {}
    };

    const component = render(
      <H2Button content={fromJS(content)} selection={selection} />
    );

    const button = findByClass(component, 'arc-Editor-MenuButton--h3');
    expect(button).to.exist;
  });

  it('should be visible', () => {
    const content = { sections: [] };
    const selection = {
      guids: () => {},
      offsets: () => {},
      position: () => {}
    };

    expect(H2Button.isVisible(content, selection)).to.be.true;
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
      <H2Button content={fromJS(content)} selection={selection} />
    );

    const result = component.handlePress().content.toJS();
    expect(result.sections[0].blocks[0].type).to.equal('h3');
  });
});
