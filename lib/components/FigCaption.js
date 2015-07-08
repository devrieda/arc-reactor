var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var cx = require('classnames');

var KEY_CODES = {
  'return': 13,
  'bspace': 8,
  'delete': 46,
  'cmd':    91,
  'cmd2':   92
};
var PLACEHOLDER = 'Type caption for image';

var { string, bool } = React.PropTypes;

var FigCaption = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    text: string
  },

  getDefaultProps() {
    return {
      text: ''
    };
  },

  getInitialState() {
    return {
      empty: this.props.text.length === 0
    };
  },

  // focus on the text when we click in
  handleClick() {
    if (this.state.empty) {
      this._selectTextNode();
    }
  },

  // set our selection at the beginning of the node
  _selectTextNode() {
    var textNode = React.findDOMNode(this.refs.text);
    var selection = document.getSelection();
    var range = document.createRange();
    range.setStart(textNode.firstChild, 0);
    range.setEnd(textNode.firstChild, 0);
    selection.removeAllRanges();
    selection.addRange(range);
  },

  // clear out placeholder once typing starts
  handleKeyDown(e) {
    this._setNonEmptyWhenTyping(e);
    this._preventDeletionOutsideCaption(e);
  },

  _setNonEmptyWhenTyping(e) {
    if (e.keyCode > KEY_CODES.delete &&
        e.keyCode !== KEY_CODES.cmd &&
        e.keyCode !== KEY_CODES.cmd2) {
      this.setState({empty: false});
    }
  },

  _preventDeletionOutsideCaption(e) {
    // only allow deletion of actual caption text
    var sel = document.getSelection();
    var beg = sel.anchorOffset === 0 && sel.type === 'Caret';

    var noBspace = beg && e.keyCode === KEY_CODES.bspace;
    if (noBspace || e.keyCode === KEY_CODES.return) {
      e.preventDefault();
      e.stopPropagation();
    }
  },

  // show placeholder if content is empty
  handleKeyUp(e) {
    this._showPlaceholderWhenEmpty();
  },

  _showPlaceholderWhenEmpty() {
    var node = React.findDOMNode(this.refs.text);
    if (node.textContent.trim() === "") {
      this.setState({empty: true}, this._selectTextNode);
    }
  },

  // we need a non-breaking space to keep focus on the text
  getText() {
    return this.props.text.length > 0 ? this.props.text : "\u00a0";
  },

  render() {
    var capClass = cx({
      'ic-Editor-FigCaption': true,
      'ic-Editor-FigCaption--empty': this.state.empty
    });

    var textClass = cx({
      'ic-Editor-FigCaption__placeholder': this.state.empty,
      'ic-Editor-FigCaption__text': !this.state.empty
    });

    return (
      <figcaption
        ref="caption"
        contentEditable="true"
        className={capClass}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        data-caption="true"
        data-figureid={this.props.figureId}
        tabIndex="-1"
      >
        <span ref="text" onClick={this.handleClick} className={textClass}>
          {this.state.empty ? PLACEHOLDER : this.getText()}
        </span>
      </figcaption>
    );
  }
});

module.exports = FigCaption;
