/** @jsx React.DOM */

var React = require('react');
var Editor = require('./components/Editor.js');
var Store = require('./stores/ContentStore.json');

var App = React.createClass({
  getInitialState: function() {
    return { content: {} }
  },

  componentWillMount: function() {
    this.setState({content: Store.find()});
  },

  contentChanged: function(json) {
    // handle when content changes
  },

  render: function() {
    return (
      <Editor content={this.state.content} onChange={this.contentChanged} />
    );
  }
});

React.renderComponent(<App/>, document.body);
