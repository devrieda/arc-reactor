var React = require('react');
var ReactEditor = require('react-editor');
var { Editor, Content, Toolbar } = ReactEditor;

var ContentStore = require('./ContentStore.js');

var App = React.createClass({
  getInitialState() {
    return { content: {} }
  },

  componentWillMount() {
    this.setState({content: ContentStore.find()});
  },

  contentChanged(json) {
    ContentStore.update(json);
  },

  render() {
    return (
      <Editor>
        <Content content={this.state.content} onChange={this.contentChanged} />
        <Toolbar.Basic />
      </Editor>
    );
  }
});

React.render(<App/>, document.getElementById("example"));
