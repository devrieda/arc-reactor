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

var { string } = React.PropTypes;

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

  componentWillReceiveProps(nextProps) {
    if (!this.state.empty && nextProps.text.trim() === "") {
      this.setState({empty: true});
    }
  },

  // focus on the text when we click in
  handleClick() {
    if (this.state.empty) {
      setTimeout(this._selectTextNode, 0);
    }
  },

  // prevent selection of placeholder
  handleMouseDown(e) {
    if (this.state.empty) {
      e.preventDefault();
    }
  },

  // set our selection at the beginning of the node
  _selectTextNode() {
    var textNode = React.findDOMNode(this.refs.caption);
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
  handleKeyUp() {
    this._showPlaceholderWhenEmpty();
  },

  _showPlaceholderWhenEmpty() {
    var node = React.findDOMNode(this.refs.caption);
    if (node.textContent.trim() === "") {
      this.setState({empty: true}, this._selectTextNode);
    }
  },

  render() {
    var capClass = cx('ic-Editor-FigCaption', {
      'ic-Editor-FigCaption--empty': this.state.empty
    });

    var attr = {
      'ref': "caption",
      'contentEditable': "true",
      'className': capClass,
      'onKeyDown': this.handleKeyDown,
      'onKeyUp': this.handleKeyUp,
      'onMouseDown': this.handleMouseDown,
      'onClick': this.handleClick,
      'data-caption': "true",
      'data-figureid': this.props.figureId
    };

    if (this.state.empty) {
      attr.children = (
        <span className='ic-Editor-FigCaption__placeholder' data-caption="true">
          {PLACEHOLDER}
        </span>
      );
    } else {
      attr.dangerouslySetInnerHTML = { __html: this.props.text };
    }
    return React.createElement('figcaption', attr);
  }
});

module.exports = FigCaption;
