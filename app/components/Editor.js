/** @jsx React.DOM */

var React = require('react');
var Content = require('./Content');
var Menu = require('./Menu');
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
      active: false
    }
  },

  componentWillMount: function() {
    this.setState({content: this.props.content});
  },

  render: function() {
    return (
      <div className="ic-Editor">
        <Content content={this.state.content} onChange={this.props.onChange} />
        <Menu active={this.state.active} />
      </div>
    )
  }
});

module.exports = Editor;
