import assert from 'assert';
import React from 'react/addons';
import LinkMenu from '../LinkMenu';

const TestUtils = React.addons.TestUtils;
const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;

describe('LinkMenu', () => {

  it('should render', () => {
    const linkMenu = render(
      <LinkMenu active={false} />
    );

    const menu = findByClass(linkMenu, 'arc-Editor-LinkMenu');
    assert(menu);
  });
});

