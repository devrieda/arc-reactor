const assert = require('assert');

const React = require('react/addons');
const { fromJS } = require('immutable');
const TestUtils = React.addons.TestUtils;
const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;

const Bar = require('../Bar');

describe('Bar', () => {
  it('should render', () => {
    const content = { sections: [] };
    const selection = {
      guids: () => {},
      offsets: () => {},
      isRange: () => { return false; },
      begOfBlock: () => { return false; },
      showMenuButtons: () => { return true; }
    };

    const bar = render(
      <Bar content={fromJS(content)} selection={selection} />
    );

    const barComponent = findByClass(bar, 'arc-Editor-Bar');
    assert(barComponent);
  });
});
