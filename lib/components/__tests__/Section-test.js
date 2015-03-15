var expect = require('expect');
var assert = require('assert');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var findByClass = TestUtils.findRenderedDOMComponentWithClass

var Section = require('../Section.js');

describe('Section', () => {
  // class names
  it('should set class name if first section', () => {
    var content = { "id": "0000", "blocks": [], "meta": {"first": true} }
    var section = TestUtils.renderIntoDocument(
      <Section {...content} />
    );
    var dom = React.findDOMNode(section);
    assert(dom.classList.contains('ic-Editor-Section--first'))
  })

  it('should not set class name if not first section', () => {
    var content = { "id": "0000", "blocks": [] }
    var section = TestUtils.renderIntoDocument(
      <Section {...content} />
    );
    var dom = React.findDOMNode(section);
    assert(!dom.classList.contains('ic-Editor-Section--first'))
  })

  // rendering
  it('should render blocks', () => {
    var content = {
      "id": "0000",
      "blocks": [
        {"id": "0001", "type": "p", "text": "hey now"}
      ]
    }

    var section = TestUtils.renderIntoDocument(
      <Section {...content} />
    );

    var component = findByClass(section, 'ic-Editor-Block--p');
    assert(component);
  })
})
