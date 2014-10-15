/** @jsx React.DOM */

var React = require('react');
var ReactEditor = require('./components/Editor.js');
var ContentStore = require('./stores/ContentStore.json');

var App = React.createClass({
  getInitialState: function() {
    return {
      content: {}
    }
  },

  componentWillMount: function() {
    this.setState({content: ContentStore.find()});
  },

  editorChanged: function(json) {
    console.log(json);
  },

  render: function() {
    return (
      <ReactEditor onChange={this.editorChanged} content={this.state.content} />
    );
  }
});

React.renderComponent(<App/>, document.body);
