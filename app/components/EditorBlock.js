/** @jsx React.DOM */

var React = require('react');

require('./EditorBlock.css');

var EditorBlock = React.createClass({
  getDefaultProps: function() {
    return {
      content: {
        type: "p",
        text: "",
        blocks: [],
        inlines: []
      }
    };
  },

  render: function() {
    return (
      <p className="ReactEditor_Block">{this.props.content.text}</p>
    )
  }
});

module.exports = EditorBlock;

