import assert from 'assert';
import React from 'react/addons';
import { fromJS } from 'immutable';
import Bar from '../Bar';

const TestUtils = React.addons.TestUtils;
const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;

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
