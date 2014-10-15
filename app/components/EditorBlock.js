/** @jsx React.DOM */

var React = require('react');
require('./EditorBlock.css');

var k = function(){};

var EditorBlock = React.createClass({
  propTypes: {
    content: React.PropTypes.object,
    onChange: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      content: {
        type: "p",
        text: "",
        blocks: [],
        inlines: []
      },
      onChange: k
    }
  },

  blockChanged: function(json) {
    // handle when block changes
  },

  componentWillMount: function() {
    this.setState({content: this.props.content});
  },

  htmlTag: function() {
    var tag = this.state.content.type;
    if (tag == 'pullquote') {
      tag = 'blockquote';
    } else if (tag == 'h1') {
      tag = 'h2';
    } else if (tag == 'h2') {
      tag = 'h3';
    } else if (tag == 'h3') {
      tag = 'h4';
    }
    return tag;
  },
  htmlContent: function() {
    var type = this.state.content.type;
    if (type == "ul" || type == "ol") {
      return this.state.content.blocks.map(function(li) {
        return <EditorBlock content={li} />
      });
    } else {
      return this.buildText();
    }
  },
  buildText: function() {
    return this.state.content.text;
  },

  render: function() {
    return React.DOM[this.htmlTag()]({
        className: "ReactEditor_Block"
      },
      this.htmlContent()
    )
  }
});

module.exports = EditorBlock;

