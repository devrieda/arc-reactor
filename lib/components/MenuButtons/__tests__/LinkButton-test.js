var expect = require('expect');
var assert = require('assert');

var React = require('react/addons');
var { fromJS } = require('immutable');
var TestUtils = React.addons.TestUtils;
var render = TestUtils.renderIntoDocument;
var { click } = TestUtils.Simulate;
var findByClass = TestUtils.findRenderedDOMComponentWithClass;

var LinkButton = require('../LinkButton');

describe('LinkButton', () => {
  it('should render', () => {
    var content = { sections: [] };
    var selection = {
      guids: () => {},
      offsets: () => {},
      position: () => {}
    };

    var component = render(
      <LinkButton content={fromJS(content)} selection={selection} />
    );

    var button = findByClass(component, 'ic-Editor-MenuButton--a');
    assert(button);
  });

  it('should be visible', () => {
    var content = { sections: [] };
    var selection = {
      guids: () => {},
      offsets: () => {},
      position: () => {}
    };

    assert(LinkButton.isVisible(content, selection));
  });

  it('should trigger handle value prop when clicked', () => {
    var content = { sections: [] };
    var selection = {
      guids: () => {},
      offsets: () => {},
      position: () => {}
    };

    var stub = sinon.spy();
    var component = render(
      <LinkButton content={fromJS(content)} selection={selection} handleSetValue={stub} />
    );

    var button = findByClass(component, 'ic-Editor-MenuButton--a');
    click(button);

    assert(stub.called);
  });

  it("should modify content with handlePress", () => {
    var content = {
      sections: [{
        id: "aaaa",
        blocks: [
          { id: '0000', type: 'p', text: 'foo bar' }
        ]
      }]
    };
    var selection = {
      guids: () => { return { anchor: '0000', focus: '0000' }; },
      offsets: () => { return { anchor: 0, focus: 1 }; },
      position: () => {}
    };

    var component = render(
      <LinkButton content={fromJS(content)} selection={selection} />
    );

    var result = component.handlePress().toJS();
    expect(result.sections[0].blocks[0].markups.a).toEqual([{"range":[0,1]}]);
  });
});
