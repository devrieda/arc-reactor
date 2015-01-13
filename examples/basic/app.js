var React = require('react');
var Editor = require('../../lib/index');

var Store = require('./ContentStore.js');

var App = React.createClass({
  getInitialState: function() {
    return { content: {} }
  },

  componentWillMount: function() {
    this.setState({content: Store.find()});
  },

  contentChanged: function(json) {
    Store.update(json);
  },

  render: function() {
    return (
      <Editor content={this.state.content} onChange={this.contentChanged} />
    );
  }
});

React.render(<App/>, document.getElementById("example"));
