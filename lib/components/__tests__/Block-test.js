var expect = require('expect');
var assert = require('assert');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var findByClass = TestUtils.findRenderedDOMComponentWithClass

var Block = require('../Block.js');

describe('Block', () => {
  it('adds data align for centered text', () => {
    var content = {
      type: "p", text: "", meta: {"align": "center"}
    }

    var block = TestUtils.renderIntoDocument(
      <Block {...content} />
    );
    var dom = block.getDOMNode();

    expect(dom.getAttribute('data-align')).toBe('center');
  })

  // class names
  it('adds empty class if no text or blocks', () => {
    var content = {
      type: "p",
      text: ""
    }

    var block = TestUtils.renderIntoDocument(
      <Block {...content} />
    );
    var dom = block.getDOMNode();
    assert(dom.classList.contains('ic-Editor-Block--empty'))
  })

  it('doesnt add empty class if there is text', () => {
    var content = {
      type: "p",
      text: "hey"
    }

    var block = TestUtils.renderIntoDocument(
      <Block {...content} />
    );
    var dom = block.getDOMNode();
    assert(!dom.classList.contains('ic-Editor-Block--empty'))
  })

  it('doesnt add empty class if there are sub-blocks', () => {
    var content = {
      type: "p",
      text: "",
      blocks: [
        {"id": "0000", "text": "foo"}
      ],
    }

    var block = TestUtils.renderIntoDocument(
      <Block {...content} />
    );
    var dom = block.getDOMNode();
    assert(!dom.classList.contains('ic-Editor-Block--empty'))
  })

  it('adds header class if h2, h3, h4', () => {
    var content = {
      type: "h2",
      text: "hey"
    }

    var block = TestUtils.renderIntoDocument(
      <Block {...content} />
    );
    var dom = block.getDOMNode();
    assert(dom.classList.contains('ic-Editor-Block--header'))
  })

  it('doesnt add header class for lists', () => {
    var content = {
      type: "ol",
      text: "hey"
    }

    var block = TestUtils.renderIntoDocument(
      <Block {...content} />
    );
    var dom = block.getDOMNode();
    assert(!dom.classList.contains('ic-Editor-Block--header'))
  })

  it('adds list class if ol, ul', () => {
    var content = {
      type: "ol",
      text: "hey",
      blocks: []
    }

    var block = TestUtils.renderIntoDocument(
      <Block {...content} />
    );
    var dom = block.getDOMNode();
    assert(dom.classList.contains('ic-Editor-Block--list'))
  })

  it('doesnt add list class for headers', () => {
    var content = {
      type: "h2",
      text: "hey"
    }

    var block = TestUtils.renderIntoDocument(
      <Block {...content} />
    );
    var dom = block.getDOMNode();
    assert(!dom.classList.contains('ic-Editor-Block--list'))
  })

  it('adds first class if first block', () => {
    var content = {
      type: "p",
      text: "hey"
    }

    var block = TestUtils.renderIntoDocument(
      <Block {...content} first={true}/>
    );
    var dom = block.getDOMNode();
    assert(dom.classList.contains('ic-Editor-Block--first'))
  })

  it('doesnt add first class if not first block', () => {
    var content = {
      type: "p",
      text: "hey"
    }

    var block = TestUtils.renderIntoDocument(
      <Block {...content} />
    );
    var dom = block.getDOMNode();
    assert(!dom.classList.contains('ic-Editor-Block--first'))
  })

  it('adds id class', () => {
    var content = {
      id: "0000",
      type: "p",
      text: "hey"
    }

    var block = TestUtils.renderIntoDocument(
      <Block {...content} />
    );
    var dom = block.getDOMNode();
    assert(dom.classList.contains('ic-Editor-Block--0000'))
  })

  it('adds block type class', () => {
    var content = {
      type: "h2",
      text: "hey"
    }

    var block = TestUtils.renderIntoDocument(
      <Block {...content} />
    );
    var dom = block.getDOMNode();
    assert(dom.classList.contains('ic-Editor-Block--h2'))
  })


  // rendering
  it('renders child list items', () => {
    var content = {
      type: "ol",
      text: "hey",
      blocks: [
        {"id": "0000", "type": "li", "text": "foo"}
      ]
    }

    var block = TestUtils.renderIntoDocument(
      <Block {...content} />
    );
    var component = findByClass(block, 'ic-Editor-Block--li');
    assert(component);
  })

  it('renders inline formatting', () => {
    var content = {
      type: "p",
      text: "hey there",
      markups: {
        "em": [{"range": [4,9]}]
      }
    }

    var block = TestUtils.renderIntoDocument(
      <Block {...content} />
    );
    var formatted = 'hey <em class="ic-Editor-Block__em">there</em>';
    expect(block.getDOMNode().innerHTML).toBe(formatted)
  })

  it('renders line break if empty', () => {
    var content = {
      type: "p",
      text: ""
    }

    var block = TestUtils.renderIntoDocument(
      <Block {...content} />
    );
    expect(block.getDOMNode().innerHTML).toBe('<br>')
  })

})
