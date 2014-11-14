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

  getDefaultProps() {
    return {
      content: { sections: [] },
      onChange() {}
    }
  },

  // pass json/html data back up to Editor
  changeContent(content, selection) {
    this.props.onChange(content);
  },

  componentDidMount() {
    ContentState.set({content: this.props.content});
  },

  render() {
    return (
      <div className="ic-Editor">
        <Content onChange={this.changeContent} />
        <Menu />
      </div>
    )
  }
});

module.exports = Editor;