var React = require('react');
var Content = require('./Content');
var Menu = require('./Menu');

var Selection   = require('../modules/Selection');
var EditorStore = require('../stores/EditorStore');

require('../stylesheets/Editor.scss');

var { object, func } = React.PropTypes;

var Editor = React.createClass({
  propTypes: {
    content: object,
    onChange: func
  },

  getDefaultProps() {
    return {
      content: { sections: [] },
      onChange: () => {}
    }
  },

  getInitialState() {
    return {
      content: this.props.content,
      selection: new Selection(document.getSelection()),
    }
  },

  componentWillMount() {
    EditorStore.set({
      content: this.state.content,
      selection: this.state.selection
    }, false);
  },

  componentDidMount() {
    EditorStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    EditorStore.removeChangeListener(this._onChange);
  },

  render() {
    return (
      <div className="ic-Editor">
        <Content content={this.state.content} selection={this.state.selection} />
        <Menu content={this.state.content} selection={this.state.selection} />
      </div>
    )
  },

  _onChange() {
    this.setState(EditorStore.get());
    this.props.onChange(this.state.content)
  }
});

module.exports = Editor;

