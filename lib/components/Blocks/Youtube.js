var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var Immutable = require('immutable');
var Figure = require('./Figure');
var cx = require('classnames');

var { bool, string, instanceOf } = React.PropTypes;

var Youtube = React.createClass({
  mixins: [PureRenderMixin],

  statics: {
    matches: (block) => {
      return block.get('type') === 'youtube';
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

  render() {
    var classNames = cx({
      'ic-Editor-Figure__iframe': true,
      'ic-Editor-Figure__iframe--selected': this.props.selected,
    });

    return (
      <Figure id={this.props.id} text={this.props.text} ref="figure">
        <iframe ref="iframe"
          className={classNames}
          width={this.state.width}
          height={Math.round(this.state.width / 1.78)}
          src={this.props.meta.get('src')}
          frameBorder="0">
        </iframe>
      </Figure>
    );
  }
});

module.exports = Youtube;
