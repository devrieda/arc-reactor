/** @jsx React.DOM */

var React = require('react');
var MediumEditor = require('medium-editor');

var MediumEditorWrap = React.createClass({
  componentDidMount: function() {
    this.node = this.getDOMNode();
    var editor = new MediumEditor(this.node);

    this.renderEditorContent();
  },
  componentWillReceiveProps: function(newProps) {
    this.renderEditorContent(newProps);
  },
  renderEditorContent: function(props) {
    props = props || this.props;
    React.renderComponent(<div>{props.children}</div>, this.node);
  },
  render: function() {
    return <div/>;
  }
});

module.exports = MediumEditorWrap;
