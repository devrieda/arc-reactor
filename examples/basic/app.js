var React = require('react');
var ReactEditor = require('react-editor');
var { Editor, MenuToolbar } = ReactEditor;

var Store = require('./ContentStore.js');

var App = React.createClass({
  getInitialState: function() {
    return { content: {} };
  },

  componentWillMount: function() {
    this.setState({content: Store.find()});
  },

  contentChanged: function(json) {
    Store.update(json);
  },

  render: function() {
    return (
      <Editor content={this.state.content} onChange={this.contentChanged}>
        <MenuToolbar.Basic />
      </Editor>
    );
  }
});

React.render(<App/>, document.getElementById("example"));
