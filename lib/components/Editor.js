var React = require('react');
var Immutable = require('immutable');
var Content = require('./Content');
var Menu = require('./Menu');
var Buttons = require('./Buttons');

var Commands    = require('../modules/Commands');
var History     = require('../modules/History');
var Selection   = require('../modules/Selection');
var OtherKey    = require('../modules/Commands/OtherKey');
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
    var map = Immutable.fromJS(this.props.content);

    // focus on first element
    var selection = this.props.selection;
    selection.focusOn(map.getIn(['sections', 0, 'blocks', 0, 'id']), 0);

    return {
      content: map,
      selection: selection
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

    // init inital step in history
    History.getInstance().push({
      content: this.state.content,
      position: this.state.selection.position()
    });

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

  // option 'onlyChanges' only emits when 
  checkSelection(onlyChanges) {
    var newSelection = new Selection(document.getSelection());

    var emit = true;

    // only emit if range type changes
    if (onlyChanges) {
      var oldRange = EditorStore.get().selection.isRange();
      var newRange = newSelection.isRange();
      emit = oldRange !== newRange;
    }

    EditorStore.set({ selection: newSelection }, emit);
  },

  // simulate meta key since it doesn't work in some browsers
  handleKeyUp(e) {
    if (e.keyCode === 91) { this.metaKey = false; }

    this.checkSelection(true);
    this.doType(e);
  },

  // typing is a little different than other events
  // we want to limit how often we're emitting
  doType(e) {
    var state = EditorStore.get();
    var other = new OtherKey(state.content, state.selection);
    if (other.matches(e)) {
      var results = other.execute();
      EditorStore.set({content: results.content}, false);
    }
  },

  // delegate all commands to the command stack
  handleKeyDown(e) {
    if (e.keyCode === 91) { this.metaKey = true; }
    e.metaKey = this.metaKey;

    // execute commands that match key down
    var { content, selection } = EditorStore.get();
    var results = this.commands.execute(e, content, selection);

    // update results in the store
    if (results && results.emit) {
      EditorStore.set({
        content: results.content,
        selection: results.selection
      });
    }
  },

  render() {
    return (
      <div className="ic-Editor"
        onBlur={this.handleBlur}
        onMouseUp={this.handleMouseUp}
        onKeyUp={this.handleKeyUp}
        onKeyDown={this.handleKeyDown}
      >
        <Content content={this.state.content} />
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
    );
  },

  _onChange() {
    this.setState(EditorStore.get());
    this.props.onChange(this.state.content);
  },


});

module.exports = Editor;
