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
      selection: {}
    }
  },

  changeContent: function(content, selection) {
    // update menu based on selection
    this.setState({selection: selection});

    // pass json/html data back up to Editor
    this.props.onChange(content);
  },
  clickMenu: function(type, state) {
    console.log(type + ':' + state);
  },

  componentWillMount: function() {
    this.setState({content: this.props.content});
  },

  render: function() {
    return (
      <div className="ic-Editor">
        <Content content={this.state.content} onChange={this.changeContent} />
        <Menu selection={this.state.selection} onClick={this.clickMenu} />
      </div>
    )
  }
});

module.exports = Editor;
