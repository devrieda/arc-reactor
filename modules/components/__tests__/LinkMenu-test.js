import React from 'react';
import TestUtils from 'react-addons-test-utils';
import LinkMenu from '../LinkMenu';

const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;

describe('LinkMenu', () => {

  it('should render', () => {
    const linkMenu = render(
      <LinkMenu active={false} />
    );

    const menu = findByClass(linkMenu, 'arc-Editor-LinkMenu');
    expect(menu).to.exist;
  });
});

