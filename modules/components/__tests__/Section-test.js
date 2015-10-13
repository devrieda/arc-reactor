import assert from 'assert';
import React from 'react/addons';
import Immutable from 'immutable';
import Section from '../Section.js';

const TestUtils = React.addons.TestUtils;
const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;

describe('Section', () => {
  // class names
  it('should set class name if first section', () => {
    const section = render(
      <Section id={'0000'} blocks={Immutable.List()} meta={Immutable.Map({first: true})} />
    );
    const dom = React.findDOMNode(section);
    assert(dom.classList.contains('arc-Editor-Section--first'));
  });

  it('should not set class name if not first section', () => {
    const section = render(
      <Section id={'0000'} blocks={Immutable.List()} />
    );
    const dom = React.findDOMNode(section);
    assert(!dom.classList.contains('arc-Editor-Section--first'));
  });

  // rendering
  it('should render blocks', () => {
    const blocks = [
      {"id": "0001", "type": "p", "text": "hey now"}
    ];

    const section = render(
      <Section id={'0000'} blocks={Immutable.fromJS(blocks)} />
    );

    const component = findByClass(section, 'arc-Editor-Block--p');
    assert(component);
  });
});
