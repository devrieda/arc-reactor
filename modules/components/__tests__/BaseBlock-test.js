import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Immutable from 'immutable';
import Block from '../BaseBlock.js';

const findByClass = TestUtils.findRenderedDOMComponentWithClass;
const render = TestUtils.renderIntoDocument;

describe('BaseBlock', () => {
  it('adds data align for centered text', () => {
    const block = render(
      <Block type={'p'} text={''} data={Immutable.Map({ align: 'center'})} />
    );
    const dom = ReactDOM.findDOMNode(block);

    expect(dom.dataset.align).to.equal('center');
  });

  // class names
  describe('building class names', () => {
    it('adds empty class if no text or blocks', () => {
      const block = render(
        <Block type={'p'} text={''} />
      );
      const dom = ReactDOM.findDOMNode(block);
      expect(dom.classList.contains('arc-Editor-Block--empty')).to.equal.true;
    });

    it('doesnt add empty class if there is text', () => {
      const block = render(
        <Block type={'p'} text={'hey'} />
      );
      const dom = ReactDOM.findDOMNode(block);
      expect(dom.classList.contains('arc-Editor-Block--empty')).to.equal.false;
    });

    it('doesnt add empty class if there are sub-blocks', () => {
      const blocks = [
        {"id": "0000", "text": "foo"}
      ];

      const block = render(
        <Block type={'p'} text={''} blocks={Immutable.fromJS(blocks)} />
      );
      const dom = ReactDOM.findDOMNode(block);
      expect(dom.classList.contains('arc-Editor-Block--empty')).to.equal.false;
    });

    it('adds header class if h2, h3, h4', () => {
      const block = render(
        <Block type={'h2'} text={'hey'} />
      );
      const dom = ReactDOM.findDOMNode(block);
      expect(dom.classList.contains('arc-Editor-Block--header')).to.equal.true;
    });

    it('doesnt add header class for lists', () => {
      const block = render(
        <Block type={'ol'} text={'hey'} />
      );
      const dom = ReactDOM.findDOMNode(block);
      expect(dom.classList.contains('arc-Editor-Block--header')).to.equal.false;
    });

    it('adds list class if ol, ul', () => {
      const block = render(
        <Block type={'ol'} text={'hey'} blocks={Immutable.List()} />
      );
      const dom = ReactDOM.findDOMNode(block);
      expect(dom.classList.contains('arc-Editor-Block--list')).to.equal.true;
    });

    it('doesnt add list class for headers', () => {
      const block = render(
        <Block type={'h2'} text={'hey'} />
      );
      const dom = ReactDOM.findDOMNode(block);
      expect(dom.classList.contains('arc-Editor-Block--list')).to.equal.false;
    });

    it('adds first class if first block', () => {
      const block = render(
        <Block type={'p'} text={'hey'} meta={Immutable.Map({first: true})}/>
      );
      const dom = ReactDOM.findDOMNode(block);
      expect(dom.classList.contains('arc-Editor-Block--first')).to.equal.true;
    });

    it('doesnt add first class if not first block', () => {
      const block = render(
        <Block type={'p'} text={'hey'} />
      );
      const dom = ReactDOM.findDOMNode(block);
      expect(dom.classList.contains('arc-Editor-Block--first')).to.equal.false;
    });

    it('adds id class', () => {
      const block = render(
        <Block id={'0000'} type={'p'} text={'hey'} />
      );
      const dom = ReactDOM.findDOMNode(block);
      expect(dom.classList.contains('arc-Editor-Block--0000')).to.equal.true;
    });

    it('adds block type class', () => {
      const block = render(
        <Block type={'h2'} text={'hey'} />
      );
      const dom = ReactDOM.findDOMNode(block);
      expect(dom.classList.contains('arc-Editor-Block--h2')).to.equal.true;
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
      expect(component).to.exist;
    });

    it('shows line break if empty', () => {
      const block = render(
        <Block type={'p'} text={''} />
      );
      expect(ReactDOM.findDOMNode(block).innerHTML).to.equal('<br>');
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
      expect(ReactDOM.findDOMNode(block).innerHTML).to.equal(formatted);
    });
  });
});
