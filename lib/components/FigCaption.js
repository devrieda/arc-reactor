var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var cx = require('classnames');

require('../stylesheets/FigCaption.scss');

var KEY_CODES = { 'return': 13, 'bspace': 8 };

var { string } = React.PropTypes;

var FigCaption = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    text: string
  },

  getInitialState() {
    return {
      empty: this.props.text.length === 0,
    }
  },

  // handle clicking out without setting a caption
  componentDidMount() {
    document.addEventListener("click", this.handleDocumentClick);
  },
  componentWillUnmount() {
    document.removeEventListener("click", this.handleDocumentClick);
  },
  handleDocumentClick(e) {
    var caption = React.findDOMNode(this.refs.figCaption);

    if (!e.target.classList.contains('ic-Editor-FigCaption__placeholder') &&
        e.target !== caption && !caption.contains(e.target)) {
      this.setState({empty: this.props.text.trim().length === 0});
    }
  },

  handleClickPlaceholder(e) {
    if (this.state.empty) {
      this.setState({empty: false});
    }
  },

  // don't allow us to move outside of caption text
  handleKeyDown(e) {
    var sel = document.getSelection();
    var beg = sel.anchorOffset === 0 && sel.type === 'Caret';

    var noBspace = beg && e.keyCode === KEY_CODES.bspace;
    if (noBspace || e.keyCode === KEY_CODES.return) {
      e.preventDefault();
      e.stopPropagation();
    }
  },

  classNames() {
    return cx({
      'ic-Editor-FigCaption': true,
      'ic-Editor-FigCaption--empty': this.props.text.trim().length === 0
    });
  },

  render() {
    return (
      <figcaption
        ref="figCaption"
        contentEditable="true"
        className={this.classNames()}
        onKeyDown={this.handleKeyDown}
        tabIndex="-1"
      >
        {!this.state.empty &&
          (this.props.text.length > 0 ? this.props.text : "\u00a0")
        }

        {this.state.empty &&
          <span className="ic-Editor-FigCaption__placeholder"onClick={this.handleClickPlaceholder}>
            Type caption for image (optional)
          </span>
        }
      </figcaption>
    );
  }
});

module.exports = FigCaption;
