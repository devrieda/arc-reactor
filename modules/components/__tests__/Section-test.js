const assert = require('assert');

const React = require('react/addons');
const Immutable = require('immutable');
const TestUtils = React.addons.TestUtils;
const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;

const Section = require('../Section.js');

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
