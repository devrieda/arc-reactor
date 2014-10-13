/** @jsx React.DOM */

var React = require('react');
var MediumEditor = require('medium-editor');

var ReactEditor = React.createClass({
  componentDidMount: function() {
    var node = this.getDOMNode();
    var editor = new MediumEditor(node);
    React.renderComponent(<div>{this.props.children}</div>, node);
  },
  render: function() {
    return <div/>;
  }
});

module.exports = ReactEditor;
