import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { fromJS } from 'immutable';
import H3Button from '../H3Button';

const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;

describe('H3Button', () => {
  it('should render', () => {
    const content = { sections: [] };
    const selection = {
      guids: () => {},
      offsets: () => {},
      position: () => {}
    };

    const component = render(
      <H3Button content={fromJS(content)} selection={selection} />
    );

    const button = findByClass(component, 'arc-Editor-MenuButton--h4');
    expect(button).to.exist;
  });

  it('should be visible', () => {
    const content = { sections: [] };
    const selection = {
      guids: () => {},
      offsets: () => {},
      position: () => {}
    };

    expect(H3Button.isVisible(content, selection)).to.be.true;
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
      <H3Button content={fromJS(content)} selection={selection} />
    );

    const result = component.handlePress().content.toJS();
    expect(result.sections[0].blocks[0].type).to.equal('h4');
  });
});
