var React = require('react');
var Immutable = require('immutable');
var Content = require('./Content');
var Menu = require('./Menu');
var MenuButtons = require('./MenuButtons');
var LinkMenu = require('./LinkMenu');
var Bar = require('./Bar');
var BarButtons = require('./BarButtons');

var ClipboardHandler = require('../helpers/ClipboardHandler');
var KeyCommands = require('../helpers/KeyCommands');
var History     = require('../helpers/History');
var Selection   = require('../helpers/Selection');
var EditorStore = require('../stores/EditorStore');

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
      onChange: Function.prototype,
    };
  },

  statics: {
    install() {
      console.log('install');
    }
  },

  getInitialState() {
    // create immutable map from the content prop
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
    var { content, selection } = this.state;

    // setup initial store from the state
    EditorStore.set({ content: content, selection: selection }, false);

    // initial step in history
    History.getInstance().push({
      content: content,
      position: selection.position()
    });

    this.keys = KeyCommands.getInstance();
  },

  // handle clicking outside the editor
  componentDidMount() {
    EditorStore.addChangeListener(this._onChange);
    document.addEventListener("click", this.handleClick);
  },
  componentWillUnmount() {
    EditorStore.removeChangeListener(this._onChange);
    document.removeEventListener("click", this.handleClick);
  },

  // if content changed, selection may have changed
  componentDidUpdate() {
    var { selection } = EditorStore.get();
    if (selection.reselect() || selection.rebound()) {
      this._checkSelection();
    }
  },

  handleClick(e) {
    this.target = e.target;
    setTimeout(this._checkSelection, 0);
  },

  handlePaste(e) {
    var { content, selection } = EditorStore.get();
    var cbHandler = new ClipboardHandler(content, selection);
    cbHandler.paste(e);
  },

  // delegate all key commands to the command stack
  handleKeyDown(e) {
    if (e.keyCode === 91) { this.metaKey = true; }
    e.metaKey = this.metaKey;

    // execute commands that match key down
    var { content, selection } = EditorStore.get();
    this.keys.execute(e, content, selection, this._updateResults);
  },

  // simulate meta key since it doesn't work in some browsers
  handleKeyUp(e) {
    if (e.keyCode === 91) { this.metaKey = false; }

    // execute commands that match key down
    var { content, selection } = EditorStore.get();
    this.keys.execute(e, content, selection, this._updateResults);

    this._checkSelection(true, e.keyCode);
    this.callbackChange();
  },

  handleChangeMenu(sel) {
    EditorStore.set({ selection: sel });
  },

  // option 'onlyChanges' only emits when
  _checkSelection(onlyChanges, keyCode) {
    var target = !keyCode ? this.target : null;
    var newSelection = new Selection(document.getSelection(), target);
    var emit = true;

    // only emit if range type changes
    if (onlyChanges) {
      var oldRange = EditorStore.get().selection.isRange();
      var newRange = newSelection.isRange();
      var arrowKeys = [37, 38, 39, 40].indexOf(keyCode) !== -1;
      emit = arrowKeys || oldRange !== newRange;
    }

    EditorStore.set({ selection: newSelection }, emit);
  },

  _updateResults(results) {
    if (!results) { return; }

    EditorStore.set({
      content: results.content,
      selection: results.selection
    }, results.emit);
  },

  render() {
    var { content, selection, linkState } = EditorStore.get();

    return (
      <div className="arc-Editor"
        onMouseUp={this.handleClick}
        onKeyUp={this.handleKeyUp}
        onKeyDown={this.handleKeyDown}
        onPaste={this.handlePaste}
      >
        <Content
          content={content}
          guids={selection.guids()}
          offsets={selection.offsets()}
        />

        <Menu
          content={content}
          selection={selection}
          onChange={this.handleChangeMenu}
        >
          <MenuButtons.Bold />
          <MenuButtons.Italic />
          <MenuButtons.H1 />
          <MenuButtons.H2 />
          <MenuButtons.H3 />
          <MenuButtons.Center />
          <MenuButtons.Quote />
          <MenuButtons.Link />
        </Menu>

        <Bar content={content} selection={selection}>
          <BarButtons.Image />
        </Bar>

        <LinkMenu {...linkState} />
      </div>
    );
  },

  _onChange() {
    this.setState(EditorStore.get());
    this.callbackChange();
  },

  callbackChange() {
    var { content } = EditorStore.get();
    if (this.sentContent === content) return;

    this.props.onChange(content);
    this.sentContent = content;
  }
});

module.exports = Editor;