/** @jsx React.DOM */

var React = require('react');
var Content = require('./Content');
var Menu = require('./Menu');

var ContentState = require('../state/ContentState');

require('../stylesheets/Editor.scss');

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

  // pass json/html data back up to Editor
  changeContent: function(content, selection) {
    this.props.onChange(content);
  },

  componentDidMount: function() {
    ContentState.set({content: this.props.content});
  },

  render: function() {
    return (
      <div className="ic-Editor">
        <Content onChange={this.changeContent} />
        <Menu />
      </div>
    )
  }
});

module.exports = Editor;
