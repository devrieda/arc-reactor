var assert = require('assert');

var React = require('react/addons');
var Immutable = require('immutable');
var TestUtils = React.addons.TestUtils;
var findByClass = TestUtils.findRenderedDOMComponentWithClass;
var render = TestUtils.renderIntoDocument;

var Section = require('../Section.js');

describe('Section', () => {
  // class names
  it('should set class name if first section', () => {
    var section = render(
      <Section id={'0000'} blocks={Immutable.List()} meta={Immutable.Map({first: true})} />
    );
    var dom = React.findDOMNode(section);
    assert(dom.classList.contains('ic-Editor-Section--first'));
  });

  it('should not set class name if not first section', () => {
    var section = render(
      <Section id={'0000'} blocks={Immutable.List()} />
    );
    var dom = React.findDOMNode(section);
    assert(!dom.classList.contains('ic-Editor-Section--first'));
  });

  // rendering
  it('should render blocks', () => {
    var blocks = [
      {"id": "0001", "type": "p", "text": "hey now"}
    ];

    var section = render(
      <Section id={'0000'} blocks={Immutable.fromJS(blocks)} />
    );

    var component = findByClass(section, 'ic-Editor-Block--p');
    assert(component);
  });
});
