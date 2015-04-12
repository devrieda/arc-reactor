var expect = require('expect');
var assert = require('assert');

var React = require('react/addons');
var Immutable = require('immutable');
var TestUtils = React.addons.TestUtils;
var findByClass = TestUtils.findRenderedDOMComponentWithClass;
var render = TestUtils.renderIntoDocument;

var Block = require('../Block.js');

describe('Block', () => {
  it('adds data align for centered text', () => {
    var block = render(
      <Block type={'p'} text={''} meta={Immutable.Map({ align: 'center'})} />
    );
    var dom = React.findDOMNode(block);

    expect(dom.dataset.align).toBe('center');
  });

  // class names
  it('adds empty class if no text or blocks', () => {
    var block = render(
      <Block type={'p'} text={''} />
    );
    var dom = React.findDOMNode(block);
    assert(dom.classList.contains('ic-Editor-Block--empty'));
  });

  it('doesnt add empty class if there is text', () => {
    var block = render(
      <Block type={'p'} text={'hey'} />
    );
    var dom = React.findDOMNode(block);
    assert(!dom.classList.contains('ic-Editor-Block--empty'));
  });

  it('doesnt add empty class if there are sub-blocks', () => {
    var blocks = [
      {"id": "0000", "text": "foo"}
    ];

    var block = render(
      <Block type={'p'} text={''} blocks={Immutable.fromJS(blocks)} />
    );
    var dom = React.findDOMNode(block);
    assert(!dom.classList.contains('ic-Editor-Block--empty'));
  });

  it('adds header class if h2, h3, h4', () => {
    var block = render(
      <Block type={'h2'} text={'hey'} />
    );
    var dom = React.findDOMNode(block);
    assert(dom.classList.contains('ic-Editor-Block--header'));
  });

  it('doesnt add header class for lists', () => {
    var block = render(
      <Block type={'ol'} text={'hey'} />
    );
    var dom = React.findDOMNode(block);
    assert(!dom.classList.contains('ic-Editor-Block--header'));
  });

  it('adds list class if ol, ul', () => {
    var block = render(
      <Block type={'ol'} text={'hey'} blocks={Immutable.List()} />
    );
    var dom = React.findDOMNode(block);
    assert(dom.classList.contains('ic-Editor-Block--list'));
  });

  it('doesnt add list class for headers', () => {
    var block = render(
      <Block type={'h2'} text={'hey'} />
    );
    var dom = React.findDOMNode(block);
    assert(!dom.classList.contains('ic-Editor-Block--list'));
  });

  it('adds first class if first block', () => {
    var block = render(
      <Block type={'p'} text={'hey'} meta={Immutable.Map({first: true})}/>
    );
    var dom = React.findDOMNode(block);
    assert(dom.classList.contains('ic-Editor-Block--first'));
  });

  it('doesnt add first class if not first block', () => {
    var block = render(
      <Block type={'p'} text={'hey'} />
    );
    var dom = React.findDOMNode(block);
    assert(!dom.classList.contains('ic-Editor-Block--first'));
  });

  it('adds id class', () => {
    var block = render(
      <Block id={'0000'} type={'p'} text={'hey'} />
    );
    var dom = React.findDOMNode(block);
    assert(dom.classList.contains('ic-Editor-Block--0000'));
  });

  it('adds block type class', () => {
    var block = render(
      <Block type={'h2'} text={'hey'} />
    );
    var dom = React.findDOMNode(block);
    assert(dom.classList.contains('ic-Editor-Block--h2'));
  });


  // rendering
  it('renders child list items', () => {
    var blocks = [
      {"id": "0000", "type": "li", "text": "foo"}
    ];

    var block = render(
      <Block type={'ol'} text={'hey'} blocks={Immutable.fromJS(blocks)} />
    );
    var component = findByClass(block, 'ic-Editor-Block--li');
    assert(component);
  });

  it('renders inline formatting', () => {
    var markups = {
      "em": [{"range": [4,9]}]
    };

    var block = render(
      <Block type={'p'} text={'hey there'} markups={Immutable.fromJS(markups)} />
    );
    var formatted = 'hey <em class="ic-Editor-Block__em">there</em>';
    expect(React.findDOMNode(block).innerHTML).toBe(formatted);
  });

  it('renders line break if empty', () => {
    var block = render(
      <Block type={'p'} text={''} />
    );
    expect(React.findDOMNode(block).innerHTML).toBe('<br>');
  });

});
