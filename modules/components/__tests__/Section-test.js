import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Immutable from 'immutable';
import Section from '../Section.js';

const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;

describe('Section', () => {
  // class names
  it('should set class name if first section', () => {
    const section = render(
      <Section id={'0000'} blocks={Immutable.List()} meta={Immutable.Map({first: true})} />
    );
    const dom = ReactDOM.findDOMNode(section);
    expect(dom.classList.contains('arc-Editor-Section--first')).to.be.true;
  });

  it('should not set class name if not first section', () => {
    const section = render(
      <Section id={'0000'} blocks={Immutable.List()} />
    );
    const dom = ReactDOM.findDOMNode(section);
    expect(dom.classList.contains('arc-Editor-Section--first')).to.be.false;
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
    expect(component).to.exi;
  });
});
