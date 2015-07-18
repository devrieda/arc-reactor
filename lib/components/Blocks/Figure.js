var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var Immutable = require('immutable');
var cx = require('classnames');
var FigCaption = require('./FigCaption');

var { bool, string, instanceOf } = React.PropTypes;

var Figure = React.createClass({
  mixins: [PureRenderMixin],

  statics: {
    matches: (block) => {
      return block.get('type') === 'figure';
    }
  },

  propTypes: {
    id: string,
    type: string,
    text: string,
    meta: instanceOf(Immutable.Map),
    data: instanceOf(Immutable.Map),
    selected: bool
  },

  getDefaultProps() {
    return {
      type: 'figure',
      text: '',
      meta: Immutable.Map(),
      data: Immutable.Map(),
      selected: false
    };
  },

  getInitialState() {
    return {
      width: 700
    };
  },

  componentDidMount() {
    window.addEventListener("resize", this.resizeVideo);
    this.resizeVideo();
  },

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeVideo);
  },

  preventDrag(e) {
    e.preventDefault();
  },

  resizeVideo() {
    if (this.isMounted()) {
      var width = React.findDOMNode(this.refs.figure).clientWidth;
      this.setState({ width });
    }
  },

  isPhoto() {
    var src = this.props.meta.get('src');
    return !!src.match(/(png|jpe?g|gif)/);
  },

  getAspectRatio() {
    var height = this.props.meta.get('height');
    var width  = this.props.meta.get('width');
    return height / width;
  },

  getPhotoDimensions() {
    var height = this.props.meta.get('height');
    var width  = this.props.meta.get('width');
    var maxWidth  = width;
    var maxHeight = height;

    // scale down
    if (width > 700) {
      maxWidth  = 700;
      maxHeight = height * (700 / width);
    }
    return { maxWidth: maxWidth, maxHeight: maxHeight };
  },

  figureClasses() {
    return cx('ic-Editor-Figure', {
      'ic-Editor-Figure--outset-left': false,
      'ic-Editor-Figure--inset-left': false
    });
  },

  renderPhoto() {
    var imageClasses = cx('ic-Editor-Figure__image', {
      'ic-Editor-Figure__image--selected': this.props.selected,
    });

    return (
      <div className="ic-Editor-Figure__placeholder" style={this.getPhotoDimensions()}>
        <div style={{ paddingBottom: this.getAspectRatio() * 100 + '%' }}></div>
        <img className={imageClasses} src={this.props.meta.get('src')} />
      </div>
    );
  },

  renderVideo() {
    var iframeClasses = cx({
      'ic-Editor-Figure__iframe': true,
      'ic-Editor-Figure__iframe--selected': this.props.selected,
    });

    return (
      <iframe ref="iframe"
        className={iframeClasses}
        width={this.state.width}
        height={Math.round(this.state.width / 1.78)}
        src={this.props.meta.get('src')}
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
        <div data-figure="true" className="ic-Editor-Figure__wrapper" data-figureid={this.props.id}>
          {this.isPhoto() ? this.renderPhoto() : this.renderVideo()}
        </div>

        <div className="ic-Editor-Figure__focus" children=" " />
        <FigCaption text={this.props.text} />
      </figure>
    );
  }
});

module.exports = Figure;
