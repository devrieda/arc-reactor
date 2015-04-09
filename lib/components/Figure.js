var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var Immutable = require('immutable');
var cx = require('classnames');
var FigCaption = require('./FigCaption');

require('../stylesheets/Figure.scss');

var { string, instanceOf } = React.PropTypes;

var Figure = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    id: string,
    type: string,
    text: string,
    src: string,
    meta: instanceOf(Immutable.Map)
  },

  getInitialState() {
    return {
      selected: false
    };
  },

  getDefaultProps() {
    return {
      type: 'figure',
      text: '',
      src: '',
      meta: Immutable.Map()
    };
  },

  componentDidMount() {
    document.addEventListener("click", this.handleDocumentClick);
  },

  componentWillUnmount() {
    document.removeEventListener("click", this.handleDocumentClick);
  },

  handleDocumentClick(e) {
    if (!React.findDOMNode(this.refs.figure).contains(e.target)) {
      this.setState({selected: false});
    }
  },

  handleDragStart(e) {
    e.preventDefault();
  },

  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({selected: true});
  },

  isPhoto() {
    return !!this.props.src.match(/(png|jpg|gif)/);
  },

  getAspectRatio() {
    return this.props.height / this.props.width;
  },

  getDimensions() {
    var ratio = this.getAspectRatio();
    var { width, height } = this.props;

    var maxWidth  = width;
    var maxHeight = height;

    // scale down
    if (width > 700) {
      maxWidth  = 700;
      maxHeight = height * (700 / width);
    }
    return { maxWidth: maxWidth, maxHeight: maxHeight };
  },

  // --outset-left
  // --inset-left
  //
  figureClasses() {
    return cx({
      'ic-Editor-Figure': true
    });
  },

  renderPhoto() {
    var imageClasses = cx({
      'ic-Editor-Figure__image': true,
      'ic-Editor-Figure__image--selected': this.state.selected,
    });

    var dimensions = this.getDimensions();

    return (
      <div className="ic-Editor-Figure__placeholder"
        style={this.getDimensions()}
        onClick={this.handleClick}
      >
        <div style={{ paddingBottom: this.getAspectRatio() * 100 + '%' }}></div>
        <img className={imageClasses} src={this.props.src} />
      </div>
    );
  },

  renderVideo() {
    var iframeClasses = cx({
      'ic-Editor-Figure__iframe': true,
      'ic-Editor-Figure__iframe--selected': this.state.selected,
    });

    return (
      <div className="ic-Editor-Figure__wrapper" onClick={this.handleClick}>
        <iframe
          className={iframeClasses}
          width="700"
          height="393"
          src={this.props.src}
          frameBorder="0">
        </iframe>
      </div>
    );
  },

  render() {
    return (
      <figure
        ref="figure"
        name={this.props.id}
        contentEditable="false"
        onDragStart={this.handleDragStart}
        className={this.figureClasses()}
      >
        {this.isPhoto() ? this.renderPhoto() : this.renderVideo()}

        <FigCaption text={this.props.text} />
      </figure>
    );
  }
});

module.exports = Figure;

// http://gdata.youtube.com/feeds/api/videos/oK6JW1prwTw?v=2&alt=jsonc

// var img = new Image();
// img.onload = function() {
//   alert(this.width + 'x' + this.height);
// }
// img.src = 'http://www.google.com/intl/en_ALL/images/logo.gif';
//
//

// <figure tabindex="0" contenteditable="false" name="e5f1" class="graf--figure graf--iframe is-defaultValue is-mediaFocused is-selected">
//   <div class="iframeContainer">
//     <iframe
//       data-width="854"
//       data-height="480"
//       width="700"
//       height="393"
//       src="/media/022cec5e90b56a6ef3174cf99b1958f0?maxWidth=700"
//       data-media-id="022cec5e90b56a6ef3174cf99b1958f0"
//       frameborder="0">
//     </iframe>
//   </div>
//   <figcaption class="imageCaption" contenteditable="true" data-default-value="Type caption for embed (optional)">
//     <span class="defaultValue">Type caption for embed (optional)</span><br>
//   </figcaption>
// </figure>
