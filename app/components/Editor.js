/** @jsx React.DOM */

var React = require('react');
var Content = require('./Content');
var Menu = require('./Menu');

var ContentState = require('../state/ContentState');

require('../stylesheets/Editor.css');

var Editor = React.createClass({
  propTypes: {
    content: React.PropTypes.object,
    onChange: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      content: { sections: [] },
      onChange: function() {}
    }
  },
  getInitialState: function() {
    return {
      selection: {}
    }
  },

  // pass json/html data back up to Editor
  changeContent: function(content, selection) {
    this.props.onChange(content);
    this.setState({selection: selection});
  },

  render: function() {
    return (
      <div className="ic-Editor">
        <Content content={this.props.content} onChange={this.changeContent} />
        <Menu selection={this.state.selection} />
      </div>
    )
  }
});

module.exports = Editor;
