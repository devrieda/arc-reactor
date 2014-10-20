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
    Store.update(json);
    // save when content changes
  },

  render: function() {
    return (
      <div>
        <Editor content={this.state.content} onChange={this.contentChanged} />
      </div>
    );
  }
});

React.renderComponent(<App/>, document.body);
