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

/**
 * LIFECYCLE
 *   - default props
 *     - get document selection
 *
 *   - will mount
 *     - set store state
 *     - set initial focus position
 *     - push initial history
 *
 *   - did mount
 *     - observe document for clicks
 *     - start listening to store
 *
 *   - will unmount
 *     - stop observing document for clicks
 *     - stop listening to store
 *
 *   - did update
 *     - reselect range, update selection bounds
 *     - check selection
 *
 * EVENTS
 *   - document click
 *     - check the selection
 *   - click
 *     - check the selection
 *   - keyDown
 *     - run through key stack
 *   - keyUp
 *     - run through key stack
 *     - check the selection
 *   - paste
 *   - menuChange
 *
 */
var Editor = React.createClass({
  propTypes: {
    content: object,
    selection: object,
    onChange: func
  },

  // get initial document selection
  getDefaultProps() {
    return {
      content: { sections: [] },
      selection: new Selection(document.getSelection()),
      onChange: Function.prototype,
    };
  },

  // ------ LIFECYCLE METHODS ------ //

  componentWillMount() {
    var content = Immutable.fromJS(this.props.content);
    var selection = this.props.selection;

    // focus on first element
    var guid = content.getIn(['sections', 0, 'blocks', 0, 'id']);
    selection.focusOn(guid, 0);

    // setup initial store state from props
    EditorStore.set({ content: content, selection: selection }, false);

    // initial step in history
    History.getInstance().push({
      content: content,
      position: { guid: guid, offset: 0 },
    });

    // setup key command stack
    this.keys = KeyCommands.getInstance();
  },

  // handle clicking outside the editor
  componentDidMount() {
    EditorStore.addChangeListener(this._onChange);
    document.addEventListener("click", this.handleDocumentClick);
  },

  componentWillUnmount() {
    EditorStore.removeChangeListener(this._onChange);
    document.removeEventListener("click", this.handleDocumentClick);
  },

  // if content changed, selection may have changed
  componentDidUpdate() {
    var { selection } = EditorStore.get();

    if (selection.reselect() || selection.rebound()) {
      this._checkSelection();
    }
  },


  // ------ EVENT HANDLERS ------ //

  handleDocumentClick(e) {
    if (!React.findDOMNode(this.refs.editor).contains(e.target)) {
      setTimeout(this._checkSelection, 0);
    }
  },

  // clicks triggers selection check
  handleClick(e) {
    this.target = e.target;
    setTimeout(this._checkSelection, 0);
  },

  // delegate all key commands to the command stack
  handleKeyDown(e) {
    if (e.keyCode === 91) { this.metaKey = true; }
    e.metaKey = this.metaKey;

    // execute commands that match key down
    var { content, selection } = EditorStore.get();
    this.keys.execute(e, content, selection, this._updateKeyResults);
  },

  // simulate meta key since it doesn't work in some browsers
  handleKeyUp(e) {
    if (e.keyCode === 91) { this.metaKey = false; }

    // execute commands that match key down
    var { content, selection } = EditorStore.get();
    this.keys.execute(e, content, selection, this._updateKeyResults);

    // need to check the selection to see if anything changed
    this._checkSelection(true, e.keyCode);
    this._callbackChange();
  },

  // pasting needs to modify the content
  handlePaste(e) {
    e.preventDefault();
    var { content, selection } = EditorStore.get();

    var cbHandler = new ClipboardHandler(content, selection);
    cbHandler.paste(e);
  },

  // reinstate the selection when they cancel adding a link value
  handleChangeMenu(selection) {
    EditorStore.set({ selection: selection });
  },


  // ------ RENDER ------ //

  render() {
    var { content, selection, linkState } = EditorStore.get();

    return (
      <div className="arc-Editor"
        ref="editor"
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

  /**
   * Update selection state based on the document selection
   *
   * onlyChanges - only emits if there are changes in range
   * keyCode     - used to track when we're using arrow keys
   */
  _checkSelection(onlyChanges, keyCode) {
    var target = !keyCode ? this.target : null;
    var newSelection = new Selection(document.getSelection(), target);
    var emit = true;

    // only emit if range type changes or we're using arrow keys
    if (onlyChanges) {
      var oldRange = EditorStore.get().selection.isRange();
      var newRange = newSelection.isRange();
      var rangeTypeChanged = oldRange !== newRange;
      var arrowKeys = [37, 38, 39, 40].indexOf(keyCode) !== -1;
      emit = arrowKeys || rangeTypeChanged;
    }

    EditorStore.set({ selection: newSelection }, emit);
  },

  /**
   * Update state from results of a key(up|down) operation
   *
   * results:
   *   content - the updated content data map
   *   position:
   *     guid - where to reposition the cursor
   *     offset - where to reposition the cursor
   *   emit - should we emit the change
   */
  _updateKeyResults(results) {
    if (!results) { return; }

    var newState = { content: results.content };

    // update if selection changed
    if (results.position && results.position.guid) {
      var { selection } = EditorStore.get();
      selection.focusOn(results.position.guid, results.position.offset);
      newState.selection = selection;
    }

    EditorStore.set(newState, results.emit);
  },

  /**
   * Handle when the store changes, update the component
   */
  _onChange() {
    this.forceUpdate();
    this._callbackChange();
  },

  /**
   * Send content back to the onChange callback if it has changed
   */
  _callbackChange() {
    var { content } = EditorStore.get();
    if (this.sentContent === content) return;

    this.props.onChange(content);
    this.sentContent = content;
  }
});

module.exports = Editor;
