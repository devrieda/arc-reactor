var assert = require('assert');

var React = require('react/addons');
var { fromJS } = require('immutable');
var TestUtils = React.addons.TestUtils;
var findByClass = TestUtils.findRenderedDOMComponentWithClass;
var render = TestUtils.renderIntoDocument;
var { click, keyUp, keyDown } = TestUtils.Simulate;

var Bar = require('../Bar');
var BarButtons = require('../BarButtons.js');

describe('Bar', () => {
  it('should render', () => {
    var content = { sections: [] };
    var selection = {
      guids: () => {},
      offsets: () => {},
      isRange: () => { return false; },
      begOfBlock: () => { return false; },
      showMenuButtons: () => { return true; }
    };

    var bar = render(
      <Bar content={fromJS(content)} selection={selection}>
        <BarButtons.Image />
      </Bar>
    );

    var barComponent = findByClass(bar, 'ic-Editor-Bar');
    assert(barComponent);
  });
});
