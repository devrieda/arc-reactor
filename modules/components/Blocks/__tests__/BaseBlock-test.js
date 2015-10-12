const expect = require('expect');
const assert = require('assert');

const React = require('react/addons');
const Immutable = require('immutable');
const TestUtils = React.addons.TestUtils;
const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;

const Block = require('../BaseBlock.js');

describe('BaseBlock', () => {
  it('adds data align for centered text', () => {
    const block = render(
      <Block type={'p'} text={''} data={Immutable.Map({ align: 'center'})} />
    );
    const dom = React.findDOMNode(block);

    expect(dom.dataset.align).toBe('center');
  });

  // class names
  describe('building class names', () => {
    it('adds empty class if no text or blocks', () => {
      const block = render(
        <Block type={'p'} text={''} />
      );
      const dom = React.findDOMNode(block);
      assert(dom.classList.contains('arc-Editor-Block--empty'));
    });

    it('doesnt add empty class if there is text', () => {
      const block = render(
        <Block type={'p'} text={'hey'} />
      );
      const dom = React.findDOMNode(block);
      assert(!dom.classList.contains('arc-Editor-Block--empty'));
    });

    it('doesnt add empty class if there are sub-blocks', () => {
      const blocks = [
        {"id": "0000", "text": "foo"}
      ];

      const block = render(
        <Block type={'p'} text={''} blocks={Immutable.fromJS(blocks)} />
      );
      const dom = React.findDOMNode(block);
      assert(!dom.classList.contains('arc-Editor-Block--empty'));
    });

    it('adds header class if h2, h3, h4', () => {
      const block = render(
        <Block type={'h2'} text={'hey'} />
      );
      const dom = React.findDOMNode(block);
      assert(dom.classList.contains('arc-Editor-Block--header'));
    });

    it('doesnt add header class for lists', () => {
      const block = render(
        <Block type={'ol'} text={'hey'} />
      );
      const dom = React.findDOMNode(block);
      assert(!dom.classList.contains('arc-Editor-Block--header'));
    });

    it('adds list class if ol, ul', () => {
      const block = render(
        <Block type={'ol'} text={'hey'} blocks={Immutable.List()} />
      );
      const dom = React.findDOMNode(block);
      assert(dom.classList.contains('arc-Editor-Block--list'));
    });

    it('doesnt add list class for headers', () => {
      const block = render(
        <Block type={'h2'} text={'hey'} />
      );
      const dom = React.findDOMNode(block);
      assert(!dom.classList.contains('arc-Editor-Block--list'));
    });

    it('adds first class if first block', () => {
      const block = render(
        <Block type={'p'} text={'hey'} meta={Immutable.Map({first: true})}/>
      );
      const dom = React.findDOMNode(block);
      assert(dom.classList.contains('arc-Editor-Block--first'));
    });

    it('doesnt add first class if not first block', () => {
      const block = render(
        <Block type={'p'} text={'hey'} />
      );
      const dom = React.findDOMNode(block);
      assert(!dom.classList.contains('arc-Editor-Block--first'));
    });

    it('adds id class', () => {
      const block = render(
        <Block id={'0000'} type={'p'} text={'hey'} />
      );
      const dom = React.findDOMNode(block);
      assert(dom.classList.contains('arc-Editor-Block--0000'));
    });

    it('adds block type class', () => {
      const block = render(
        <Block type={'h2'} text={'hey'} />
      );
      const dom = React.findDOMNode(block);
      assert(dom.classList.contains('arc-Editor-Block--h2'));
    });
  });

  // rendering
  describe('rendering', () => {
    it('shows child list items', () => {
      const blocks = [
        {"id": "0000", "type": "li", "text": "foo"}
      ];

      const block = render(
        <Block type={'ol'} text={'hey'} blocks={Immutable.fromJS(blocks)} />
      );
      const component = findByClass(block, 'arc-Editor-Block--li');
      assert(component);
    });

    it('shows line break if empty', () => {
      const block = render(
        <Block type={'p'} text={''} />
      );
      expect(React.findDOMNode(block).innerHTML).toBe('<br>');
    });
  });

  // markup
  describe('with markup', () => {
    it('builds inline formatting', () => {
      const markups = {
        "em": [{"range": [4,9]}]
      };

      const block = render(
        <Block type={'p'} text={'hey there'} markups={Immutable.fromJS(markups)} />
      );
      const formatted = 'hey <em class="arc-Editor-Block__em">there</em>';
      expect(React.findDOMNode(block).innerHTML).toBe(formatted);
    });
  });
});
