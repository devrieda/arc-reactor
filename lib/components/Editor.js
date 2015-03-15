var React = require('react');
var Content = require('./Content');
var Menu = require('./Menu');
var Buttons = require('./Buttons');

var Selection   = require('../modules/Selection');
var EditorStore = require('../stores/EditorStore');

require('../stylesheets/Editor.scss');

var { object, func } = React.PropTypes;

var Editor = React.createClass({
  propTypes: {
    content: object,
    selectin: object,
    onChange: func
  },

  getDefaultProps() {
    return {
      content: { sections: [] },
      selection: new Selection(document.getSelection()),
      onChange: () => {}
    }
  },

  getInitialState() {
    return {
      content: this.props.content,
      selection: this.props.selection
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

  // if content changed, selection may have changed
  componentDidUpdate() {
    if (this.state.selection.reselect() || this.state.selection.rebound()) {
      this.checkSelection();
    }
  },

  // handle changes

  handleMouseUp(e) {
    setTimeout(this.checkSelection, 1);
  },
  handleBlur(e) {
    setTimeout(this.checkSelection, 1);
  },

  handleKeyUp(e) {
    this.checkSelection();
  },

  checkSelection() {
    var newSelection = new Selection(document.getSelection());
    EditorStore.set({ selection: newSelection });
  },

  render() {
    return (
      <div className="ic-Editor"
        onBlur={this.handleBlur}
        onMouseUp={this.handleMouseUp}
        onKeyUp={this.handleKeyUp}
      >
        <Content content={this.state.content} selection={this.state.selection} />
        <Menu content={this.state.content} selection={this.state.selection}>
          <Buttons.Bold />
          <Buttons.Italic />
          <Buttons.H1 />
          <Buttons.H2 />
          <Buttons.H3 />
          <Buttons.Center />
          <Buttons.Quote />
          <Buttons.Link />
        </Menu>
      </div>
    )
  },

  _onChange() {
    this.setState(EditorStore.get());
    this.props.onChange(this.state.content)
  }
});

module.exports = Editor;

