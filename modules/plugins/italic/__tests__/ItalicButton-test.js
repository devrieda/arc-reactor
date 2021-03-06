import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { fromJS } from 'immutable';
import ItalicButton from '../ItalicButton';

const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;

describe('ItalicButton', () => {
  it('should render', () => {
    const content = { sections: [] };
    const selection = {
      guids: () => {},
      offsets: () => {},
      position: () => {}
    };

    const component = render(
      <ItalicButton content={fromJS(content)} selection={selection} />
    );

    const button = findByClass(component, 'arc-Editor-MenuButton--em');
    expect(button).to.exist;
  });

  it('should not be visible if header is selected', () => {
    const content = {
      sections: [{
        id: "aaaa",
        blocks: [
          { id: '0000', type: 'h2', text: 'foo bar' }
        ]
      }]
    };

    const selection = {
      guids: () => { return { anchor: '0000', focus: '0000' }; },
      offsets: () => { return { anchor: 0, focus: 1 }; },
      position: () => {}
    };

    expect(ItalicButton.isVisible(fromJS(content), selection)).to.be.false;
  });

  it('should be visible if header is not selected', () => {
    const content = { sections: [] };
    const selection = {
      guids: () => {},
      offsets: () => {},
      position: () => {}
    };

    expect(ItalicButton.isVisible(fromJS(content), selection)).to.be.true;
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
      <ItalicButton content={fromJS(content)} selection={selection} />
    );

    const result = component.handlePress().content.toJS();
    expect(result.sections[0].blocks[0].markups.em).to.eql([{"range":[0,1]}]);
  });
});
