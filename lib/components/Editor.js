var React = require('react');
var { fromJS } = require('immutable');
var Content = require('./Content');
var Menu = require('./Menu');
var Buttons = require('./Buttons');

var Commands    = require('../modules/Commands');
var Selection   = require('../modules/Selection');
var EditorStore = require('../stores/EditorStore');

require('../stylesheets/Editor.scss');

var { object, func } = React.PropTypes;

var Editor = React.createClass({
  propTypes: {
    content: object,
    selection: object,
    onChange: func
  },

  getDefaultProps() {
    return {
      content: { sections: [] },
      selection: new Selection(document.getSelection()),
      onChange: () => {}
    };
  },

  getInitialState() {
    return {
      content: this.props.content,
      selection: this.props.selection
    };
  },

  componentWillMount() {
    EditorStore.set({
      content: this.state.content,
      selection: this.state.selection
    }, false);
  },

  componentDidMount() {
    this.commands = Commands.getInstance();
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

  // handle selection updates

  handleMouseUp() {
    setTimeout(this.checkSelection, 1);
  },

  handleBlur() {
    setTimeout(this.checkSelection, 1);
  },

  checkSelection() {
    var newSelection = new Selection(document.getSelection());
    EditorStore.set({ selection: newSelection });
  },

  // simulate meta key since it doesn't work in some browsers
  handleKeyUp(e) {
    if (e.keyCode === 91) { this.metaKey = false; }
  },

  // delegate all commands to the command stack
  handleKeyDown(e) {
    this.checkSelection();

    if (e.keyCode === 91) { this.metaKey = true; }
    e.metaKey = this.metaKey;

    // execute commands that match key down
    var { content, selection } = EditorStore.get();
    var results = this.commands.execute(e, content, selection);

    // update results in the store
    if (results) {
      EditorStore.set({
        content: results.content,
        selection: results.selection
      }, results.emit);
    }
  },

  render() {
    var map = fromJS(this.state.content);

    return (
      <div className="ic-Editor"
        onBlur={this.handleBlur}
        onMouseUp={this.handleMouseUp}
        onKeyUp={this.handleKeyUp}
        onKeyDown={this.handleKeyDown}
      >
        <Content content={this.state.content} />
        <Menu content={map} selection={this.state.selection}>
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
    );
  },

  _onChange() {
    this.setState(EditorStore.get());
    this.props.onChange(this.state.content);
  }
});

module.exports = Editor;
