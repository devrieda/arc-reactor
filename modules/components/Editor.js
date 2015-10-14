import React from 'react';
import Immutable from 'immutable';
import Content from './Content';
import Menu from './Menu';
import LinkMenu from './LinkMenu';
import Bar from './Bar';

import ClipboardHandler from '../helpers/ClipboardHandler';
import KeyCommands from '../helpers/KeyCommands';
import History from '../helpers/History';
import Selection from '../helpers/Selection';
import EditorStore from '../stores/EditorStore';

const { object, func } = React.PropTypes;

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
const Editor = React.createClass({
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
    const content = Immutable.fromJS(this.props.content);
    const selection = this.props.selection;

    // focus on first element
    const guid = content.getIn(['sections', 0, 'blocks', 0, 'id']);
    selection.focusOn(guid, 0);

    // setup initial store state from props
    EditorStore.set({ content: content, selection: selection }, false);

    // initial step in history
    History.getInstance().push({
      content: content,
      position: { guid: guid, offset: 0 },
    });
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
    const { selection } = EditorStore.get();

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
    const { content, selection } = EditorStore.get();
    KeyCommands.execute(e, content, selection, this._updateKeyResults);
  },

  // simulate meta key since it doesn't work in some browsers
  handleKeyUp(e) {
    if (e.keyCode === 91) { this.metaKey = false; }

    // execute commands that match key down
    const { content, selection } = EditorStore.get();
    KeyCommands.execute(e, content, selection, this._updateKeyResults);

    // need to check the selection to see if anything changed
    this._checkSelection(true, e.keyCode);
    this._callbackChange();
  },

  // pasting needs to modify the content
  handlePaste(e) {
    const { content, selection } = EditorStore.get();

    const cbHandler = new ClipboardHandler(content, selection);
    cbHandler.paste(e);
  },

  // reinstate the selection when they cancel adding a link value
  handleChangeMenu(selection) {
    EditorStore.set({ selection: selection });
  },


  // ------ RENDER ------ //

  render() {
    const { content, selection, linkState } = EditorStore.get();

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
        />

        <Bar
          content={content}
          selection={selection}
          onChange={this.handleChangeMenu}
        />

        <LinkMenu {...linkState} />
      </div>
    );
  },


  // ------ STATE ------ //

  /**
   * Update selection state based on the document selection
   *
   * onlyChanges - only emits if there are changes in range
   * keyCode     - used to track when we're using arrow keys
   */
  _checkSelection(onlyChanges, keyCode) {
    const target = !keyCode ? this.target : null;
    const newSelection = new Selection(document.getSelection(), target);
    let emit = true;

    // only emit if range type changes or we're using arrow keys
    if (onlyChanges) {
      const oldRange = EditorStore.get().selection.isRange();
      const newRange = newSelection.isRange();
      const rangeTypeChanged = oldRange !== newRange;
      const arrowKeys = [37, 38, 39, 40].indexOf(keyCode) !== -1;
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

    let newState = { content: results.content };

    // update if selection changed
    if (results.position && results.position.guid) {
      const { selection } = EditorStore.get();
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
    const { content } = EditorStore.get();
    if (this.sentContent === content) return;

    this.props.onChange(content);
    this.sentContent = content;
  }
});

export default Editor;
