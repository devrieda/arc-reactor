var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var PreventDragMixin = require('../mixins/PreventDrag');
var Immutable = require('immutable');
var cx = require('classnames');
var FigCaption = require('./FigCaption');

var { bool, string, instanceOf } = React.PropTypes;

var Figure = React.createClass({
  mixins: [PureRenderMixin, PreventDragMixin],

  propTypes: {
    id: string,
    type: string,
    text: string,
    src: string,
    meta: instanceOf(Immutable.Map),
    selected: bool
  },

  getDefaultProps() {
    return {
      type: 'figure',
      text: '',
      src: '',
      meta: Immutable.Map(),
      selected: false
    };
  },

  isPhoto() {
    return !!this.props.src.match(/(png|jpg|gif)/);
  },

  getAspectRatio() {
    return this.props.height / this.props.width;
  },

  getDimensions() {
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
      'ic-Editor-Figure__image--selected': this.props.selected,
    });

    return (
      <div className="ic-Editor-Figure__placeholder" style={this.getDimensions()}>
        <div style={{ paddingBottom: this.getAspectRatio() * 100 + '%' }}></div>
        <img className={imageClasses} src={this.props.src} />
      </div>
    );
  },

  renderVideo() {
    var iframeClasses = cx({
      'ic-Editor-Figure__iframe': true,
      'ic-Editor-Figure__iframe--selected': this.props.selected,
    });

    return (
      <iframe
        className={iframeClasses}
        width="700"
        height="393"
        src={this.props.src}
        frameBorder="0">
      </iframe>
    );
  },

  render() {
    return (
      <figure
        ref="figure"
        name={this.props.id}
        data-figure="true"
        data-block="true"
        contentEditable="false"
        onDragStart={this.preventDrag}
        className={this.figureClasses()}
      >
        {this.isPhoto() ? this.renderPhoto() : this.renderVideo()}

        <div className="ic-Editor-Figure__wrapper" data-figureid={this.props.id}>
          <div className="ic-Editor-Figure__focus" children=" " />
          <FigCaption text={this.props.text} figSelected={this.props.selected} />
        </div>
      </figure>
    );
  }
});

module.exports = Figure;
