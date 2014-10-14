/** @jsx React.DOM */

var React = require('react');
require('./Editor.css')

var ReactEditor = React.createClass({
  render: function() {
    return (
      <div contentEditable="true">
        {this.props.children}
      </div>
    )
  }
});

module.exports = ReactEditor;

